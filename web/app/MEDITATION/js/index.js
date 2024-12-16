
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

let point = 0

const pass = new Audio('/app/EXERCISE/sound/pass.mp3')
const complete = new Audio('/app/EXERCISE/sound/complete.mp3')
const mosquito = new Audio('/app/EXERCISE/sound/mosquito.mp3')
const fail = new Audio('/app/EXERCISE/sound/blood.mp3')

/*
const chart = new Donutty( document.getElementById('EXERCISE_donut'),{ 
  color: "#b22729",
  max : 15,
  value : 15,
  text: function(state) {
    return state.value
  }
})
*/

let createAt = 0

const content = [
  { id : 'qkDjMJkLxIo', title : '마음 안정화를 위한 복식훈련기법', time : '3:28'},
  { id : 'j6ICKnpn054', title : '마음 안정화를 위한 근육이완운동', time : '12:54'}
]


export function create(){

  createAt = Date.now()


  let item = content[0]

  if(Date.now() % 2 == 1)
    item = content[1]

  pibo.tell(item.title + '을 따라해 보세요.')
  $.query('iframe').src = `https://www.youtube.com/embed/${item.id}?autoplay=1&t=0`
  $.query('div.title h1').innerText = `(${item.time}) ${item.title}`

}

export function talk(recv){
 
}

  /*
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
  */

export function finish(data){

  if(Date.now() - createAt < 5000)
    return

  console.log('finish',data)
  if(isFinish)
    setTimeout($.exit,1500)
}

export function destroy(){
  $.query('iframe').src = ""
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

  const l_hand = marks[15]
  const r_hand = marks[16]

  if(l_hand.visibility > 0.5 && r_hand.visibility > 0.5 && l_hand.x - r_hand.x < 0.25 && pos != 'CL'){
    lastTime = Date.now()
    pos = 'CL'
    calc(pos)
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
  drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS,{color: '#00FF00', lineWidth: 2});
  drawLandmarks(canvasCtx, results.poseLandmarks,{color: '#0000FF', lineWidth: 1});
  canvasCtx.restore();
}

let target = 0
let startTime = 0

function start(isStep){
  point = 0
  startTime = Date.now()
  unfocusTime = 0

  clearInterval(intv)
  
  if(isStep)
    setLevel()

  down = limit[level] 
  //chart.set("value", down)    

  intv = setInterval(()=>{
    //chart.set( "value", --down )

    if(point == 4){
      calc()
      mosquito.play()
      point = 0    
    }

    /*
    if(point == 5){
      mosquito.play()
      point = 0
    }
    */

    document.querySelectorAll('#EXERCISE img').forEach(item=>{
      item.src = ""
    })

    target = $.rand(1,3)

    $.query(`td[name=t${target}${++point}] img`).src = '/app/EXERCISE/image/mosquito.png'

  }, down * 1000 / 5)
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

  let pt = point
  let tg = target
  
  if(point == 4){
    $.query(`td[name=t${target}${point}]`).classList.add('catch')
    $.query(`li[name=t${count % 10}]`).className = 'pass'
    clearInterval(intv)
    pass.play()
    state[step].scores.push([true, spendTime,unfocusTime])
  } else if(point == 3){
    $.query(`td[name=t${target}${point}]`).classList.add('catch')
    $.query(`li[name=t${count % 10}]`).className = 'pass'
    clearInterval(intv)
    complete.play()
    state[step].scores.push([true, spendTime,unfocusTime])
  } else {
    $.query(`td.${wrong}`).classList.add('fail')
    $.query(`li[name=t${count % 10}]`).className = 'fail'
    fail.play()

    state[step].scores.push([false, spendTime,unfocusTime])
  }

  timeout = setTimeout(()=>{
    $.query(`td[name=t${tg}${pt}]`).classList.remove('catch')
    next()
  },1000)

}

function next(){

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
