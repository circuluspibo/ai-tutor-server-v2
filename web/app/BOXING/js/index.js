let isFinish = false
let isStart = false
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

const pass = new Audio('/app/COLOR/sound/pass.mp3')
const fail = new Audio('/app/COLOR/sound/fail.mp3')

const chart = new Donutty( document.getElementById('BOXING_donut'),{ 
  color: "#b22729",
  max : 20,
  value : 20,
  text: function(state) {
    return state.value
  }
})

export function create(){
  document.querySelectorAll(`#${_.id} ul > li`).forEach(elem=>{elem.className = ''})
  document.querySelectorAll(`#${_.id} ul > li`).forEach(elem=>{elem.textContent = ''})
  
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
  clearTimeout(timeout)
  clearInterval(intv)
}


let unfocusTime = 0
let lastTime = 0

function onResults(results) {

  if(!isStart){
    initTime = Date.now()
    isStart = true
    start(true)
  }

  if(!results.poseLandmarks || Date.now() - lastTime < 1000)
    return

  const marks = results.poseLandmarks 

  const l_arm = marks[13]
  const r_arm = marks[14]

  if(l_arm.visibility > 0.8 && pos != 'RA'){
    lastTime = Date.now()
    pos = 'RA'
    calc('right')
  } else if(r_arm.visibility > 0.8 && pos != 'LA'){
    lastTime = Date.now()
    pos = 'LA'
    calc('left')
  }


  canvasCtx.save()
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height)

  //canvasCtx.drawImage(results.segmentationMask, 0, 0, canvasElement.width, canvasElement.height)
  //canvasCtx.globalCompositeOperation = 'source-out';
  //canvasCtx.fillStyle = '#fec1a6';
  //canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);

  canvasCtx.globalCompositeOperation = 'destination-atop';
  canvasCtx.drawImage(results.image, 0, 0, canvasElement.width , canvasElement.height);

  canvasCtx.globalCompositeOperation = 'source-over';
  drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, {color: '#00FF00', lineWidth: 4});
  drawLandmarks(canvasCtx, results.poseLandmarks, {color: '#0000FF', lineWidth: 2});
  canvasCtx.restore();

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
    //pibo.handshake('right')
  } else {
    target = 'right'
    wrong = 'left'
    //pibo.handshake('left')
  }

  $.query(`img.${wrong}`).src = '/app/BOXING/image/boxer.png'
  $.query(`img.${target}`).src = `/app/BOXING/image/punch.png`
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

    pibo.tell('잘했어 친구!')

  } else {
    $.query(`td.${wrong}`).classList.add('fail')
    $.query(`li[name=t${count % 10}]`).className = 'fail'
    fail.play()
    
    setTimeout(()=>{
      $.query(`td.${wrong}`).classList.remove('fail')
      next()
    },1000)

    state[step].scores.push([false, spendTime,unfocusTime])

    pibo.tell('다음번에는 좀더 잘해보는게 좋을것 같아!')
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

      pibo.tell(`고생했어! ${Math.round(totalTime/1000)}초 동안, ${advise} 등급으로 게임을 마무리 했어. 총 30회 중에 평균 ${Math.round(pass_time / (30 * 1000))}초로 ${pass_cnt}회 성공했어. ${fail_cnt}회 실패했는데 다음번에 좀더 잘해보자!`)
      
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