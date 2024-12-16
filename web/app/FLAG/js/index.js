let isStart = false
let isFinish = false
let pos = 0
let timeout = 0
let intv = 0

let level = 1
let step = 0
let down = 10 
const limit = [20,10,5]

let count = 0
let initTime = 0

const state = [
  { level : -1, scores : []}, // [1/0,time, concent]
  { level : -1, scores : []},
  { level : -1, scores : []}
]


let canvasElement = 0
let canvasCtx = 0

let time = 0

const pass = new Audio('/app/COLOR/sound/pass.mp3')
const fail = new Audio('/app/COLOR/sound/fail.mp3')

const chart = new Donutty( document.getElementById( "FLAG_donut" ),{ 
  color: "#b22729",
  max : 20,
  value : 20,
  text: function(state) {
    return state.value
  }
})

const music = new Audio('/music/exercise.mp3')
music.volume = 0.5

export function create(){
  document.querySelectorAll(`#${_.id} ul > li`).forEach(elem=>{elem.className = ''})
  document.querySelectorAll(`#${_.id} ul > li`).forEach(elem=>{elem.textContent = ''})
  music.play()
  step = 0
  count = 0
  isStart = false

  setLevel()
  
  isFinish = false

  const videoElement = $.query('video')
  canvasElement = $.query('canvas')
  canvasCtx = canvasElement.getContext('2d');

  $.pose.onResults(onResults)
    
  $.camera = new Camera(videoElement, {
    onFrame: async () => {
      await $.pose.send({image: videoElement});
    },
    width: 480,
    height: 270
  })

  $.camera.start()
}


export function talk(recv){
 
}

export function finish(data){
  console.log('finish',data)
  if(isFinish)
    setTimeout($.exit,1500)
}

export function destroy(){
  clearInterval(intv)
  clearTimeout(timeout)
  music.pause()
  music.currentTime = 0
}

let unfocusTime = 0
let lastTime = 0

function onResults(results) {

  const marks = results.poseLandmarks 

  if(!marks)
    return

  canvasCtx.save()
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height)

  //canvasCtx.drawImage(results.segmentationMask, 0, 0, canvasElement.width, canvasElement.height)
  //canvasCtx.globalCompositeOperation = 'source-out';
  //canvasCtx.fillStyle = '#fec1a6';
  //canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);

  canvasCtx.globalCompositeOperation = 'destination-atop'
  canvasCtx.drawImage(results.image, 0, 0, canvasElement.width , canvasElement.height)

  canvasCtx.globalCompositeOperation = 'source-over'
  drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, {color: '#00FF00', lineWidth: 2})
  drawLandmarks(canvasCtx, results.poseLandmarks, {color: '#0000FF', lineWidth: 1})
  canvasCtx.restore()

  if(!isStart){
    initTime = Date.now()
    isStart = true
    start(true)
  }

  if(!results.poseLandmarks || Date.now() - lastTime < 1000)
    return

  const l_hand = marks[15]
  const r_hand = marks[16]

  if(l_hand.visibility > 0.8 && pos != 'RH'){
    lastTime = Date.now()
    pos = 'RH'
    calc('right')
  } else if(r_hand.visibility > 0.8 && pos != 'LH'){
    lastTime = Date.now()
    pos = 'LH'
    calc('left')
  }

}

let target = 0
let wrong = 0
let startTime = 0

function start(isStep){
  startTime = Date.now()
  unfocusTime = 0

  clearInterval(intv)
  
  if(isStep)
    setLevel()

  down = limit[level] 
  chart.set("value", down)    

  intv = setInterval(()=>{
    chart.set( "value", --down )

    if(down == 0)
      calc() 
  },1000)

  if(Date.now() % 2 == 0){
    target = 'left'
    wrong = 'right'
    pibo.handshake('right')
  } else {
    target = 'right'
    wrong = 'left'
    pibo.handshake('left')
  }

  $.query(`img.${wrong}`).src = '/app/FLAG/image/shrug.png'
  $.query(`img.${target}`).src = `/app/FLAG/image/${target}.png`
}

function setLevel(){
  let lv = 1
  let type = '중급'
  let passed = 0

  if(step != 0){
   
    for(const score of state[step - 1].scores){
      if(score[0] == true)
        passed += 1
    }

    if(passed == 10){
      lv = 2
      type = '상급'
    } else if(passed > 5){
      lv = 1
    } else { 
      type = '초급'
      lv = 0
    }
  }
  
  pibo.tell(`${type} 레벨로 게임을 시작해 볼게.`)

  $.query(`li[name=s${step}`).className = `lv${lv}`
  $.query(`li[name=s${step}`).textContent = type

  state[step].level = lv

  level = lv 
}

function calc(side){
  clearInterval(intv)
  const spendTime = Date.now() - startTime

  console.log(side,count)

  if(target == side){
    $.query(`td.${target}`).classList.add('pass')
    $.query(`li[name=t${count % 10}]`).className = 'pass'
    pass.play()

    setTimeout(()=>{
      $.query(`td.${target}`).classList.remove('pass')
      next()
    },1000)

    console.log(step, state)
    state[step].scores.push([true, spendTime,unfocusTime])


    //if(pibo){
    //  pibo.motion('happy',{ cycle : 1})
    //  pibo.tell($.message.pass.random()[0])
    //}

  } else {
    $.query(`td.${wrong}`).classList.add('fail')
    $.query(`li[name=t${count % 10}]`).className = 'fail'
    fail.play()

    //if(pibo){
     // pibo.motion('sad',{ cycle : 1})
     // pibo.tell($.message.fail.random()[0])
    //}
    
    setTimeout(()=>{
      $.query(`td.${wrong}`).classList.remove('fail')
      next()
    },1000)

    state[step].scores.push([false, spendTime,unfocusTime])

  }
}

function next(){
  pos = 0

  if(++count % 10 == 0){ // 단계 올림
    if(count == 30){
      const totalTime = Date.now() - initTime
      clearInterval(intv)
      console.log(totalTime, state)

      let pass_cnt = 0
      let fail_cnt = 0

      let pass_time = 0
      let fail_time = 0

      let stage = 0
      let advise = 0

      for(const step of state){
        stage += step.level
        for(const score of step.scores)
          if(score[0]){
            pass_cnt += 1
            pass_time += score[1]
          } else {
            fail_cnt += 1
            fail_time += score[1]
          }
      }

      let medal_img = ''
      let pass_img = ''
      let speed_img = ''
      let concent_img = 'step3'

      if(stage == 5){ // 훌륭
        advise = '금메달'
        medal_img = 'gold'
      } else if(stage == 4){ // 우수
        advise = '은메달'
        medal_img = 'silver'
      } else if(stage == 3){ // 보통
        advise = '동메달'
        medal_img = 'bronze'
      } else if(stage == 2){ // 미흡 
        advise = '노메달'
        medal_img = 'no'
      } else { 
        advise = '시합포기'
        medal_img = 'diagnosis'
      }

      const percent = pass_cnt * 100 / (pass_cnt + fail_cnt)

      if(percent > 80)
        pass_img = 'step3'
      if(percent > 60)
        pass_img = 'step2'
      else
        pass_img = 'step1'

      const time = pass_time / pass_cnt

      if(time < 5)
        speed_img = 'step3'
      else if(time < 10)
        speed_img = 'step2'
      else
        speed_img = 'step1'

      console.log(percent,time)

      document.querySelector('footer').style.visibility = 'visible' 
      document.querySelector('footer img.medal').src = `/image/${medal_img}.png`
      document.querySelector('footer span.score').src = advise

      document.querySelector('footer img.acc').src = `/image/${pass_img}.png`
      document.querySelector('footer img.spd').src = `/image/${speed_img}.png`
      document.querySelector('footer img.cct').src = `/image/${concent_img}.png`

      pibo.tell(`고생했어! ${Math.round(totalTime/1000)}초 동안, ${advise} 등급으로 게임을 마무리 했어.`)
      
      setTimeout($.exit,10000)
    } else {
      // 카운트
      document.querySelectorAll(`#${_.id} ul.check > li`).forEach(elem=>{elem.className = ''})

      ++step
      start(true) // 단계 소개
    }
  } else 
    start()
}