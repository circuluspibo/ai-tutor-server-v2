let robotId = localStorage.getItem('robotId')
const _SYSTEM = 'ops'

window.addEventListener('beforeinstallprompt', function(e) {
  alert('beforeinstallprompt Event fired');
  e.preventDefault();

  // Stash the event so it can be triggered later.
  deferredPrompt = e;

  return false;
});

function login(){
  $.tts('파이보와 함께 해 줘서 고마워!')

  //document.body.requestFullscreen()
  $.load('MAIN')
}


  //  self.pibo.onload('STG')

    
  //  if (self.pibo.ready)
  //    self.pibo.ready()
    //else
    //  alert('Not defined - pibo.ready function')

  //})

  pibo.receive('pibo',(data)=>{

    if(data.alive)
      document.querySelector('img[name=bot]').src = `/icon/on.png`
    else 
      document.querySelector('img[name=bot]').src = `/icon/off.png`      
    /*
    if(data.alive)
      document.querySelector(`#DEVELOP button[name=robot]`).classList.add('alive')
    else
      document.querySelector(`#DEVELOP button[name=robot]`).classList.remove('alive')
      */
  }) 

	pibo.receive('$_log',(data)=>{

		console.log('log>',data)
		const date = new Date()
		const p = document.createElement('p')
		p.innerHTML = `  
			<span class='time'>${format(date.getMinutes())}:${format(date.getSeconds())}</span>
			<span class='${data.type}'>${data.module}</span>
			<span class='text'>${data.msg}</span>
		`

		
    document.querySelector('#DEVELOP section[name=console] div[name=full]').append(p)
		
		if(!state.isLock)
			document.querySelector('#DEVELOP section[name=console] dd.foot').scrollTo(0, document.querySelector('#DEVELOP section[name=console] dd.foot').scrollHeight);

	})

  pibo.receive('editor', data=>{
		console.log(data)
		// type, module, msg
    //const point = data.value.split('_')[1]
    //document.querySelectorAll("td.alive").forEach(obj=>obj.classList.remove("alive"));
    //document.querySelector(`td[name="t_time|${point}"]`).className = 'active alive'
  })

  pibo.receive('finish',data=>{
    //document.querySelector('img[name=bot]').src = `/icon/on.png`
    if(_.script[_.id] && _.script[_.id].finish && _.id != 'EXERCISE')
      _.script[_.id].finish(data)

  })

  pibo.receive('talk', data=>{
    console.log('talk-----------------')

    if(_.script[_.id] && _.script[_.id].talk){
      _.script[_.id].talk(data)
      return
    } 

    console.log('test!!>>>',data )
    //$.tts(data.text)
    console.log(data.bot)

    /*
    if(data.bot)
      document.querySelector('img[name=bot]').src = `https://s-rapi.circul.us/v1/bot/m/pibo/${data.bot}`
    else
      document.querySelector('img[name=bot]').src = `/icon/on.png`
    */
  })  

  pibo.receive('play', data=>{
    console.log('play>>>',data )
    //$.play(data.url)
  })  

let startTime = 0
let lastTime = 0
let interval = 0
let limit = 2

let bot_list = []

let lastType = 0

const programs = {
  info : ['WEATHER','NEWS','TREND','MOVIE','TRAVEL'],
  exercise : ['HEAD','GRAB','FLAG','CLAP','EXERCISE'], // BOXING 은 보훈처꺼로 바꿀것
  train : ['COLOR','NUMBER','ANIMAL','PIANO','WORD'],
  mental : ['LETTER','MUSIC','SAYING','SOUND','MEDITATION']
}

function stop(){
  pibo.tell('프로그램을 강제종료 할께요!')
  bot_list.length = 0
  $.isRepeat = false
  clearInterval(interval)

  document.querySelector('span[name=passTime]').textContent = `00:00`
  document.querySelector('div.bar').style.height = `0%` 
  $.exit()
}

function repeat(type){
  if(type && bot_list.length == 0){
    lastType = type
    $.isRepeat = true
    _.len = ''
 
    /* 실시간 건강체조교실 노래와 함께하는 건강체조 */

    switch(type){
      case 'long':
        startTime = Date.now()
        _.len = '길게'
        //pibo.tell('파이보와 45분 긴 수업을 진행해 볼께.')
        limit = 45

        for(const key in programs)
          for(let i = 0 ; i < 5 ; i++)
            bot_list.push(programs[key][i])
        
            console.log('short',bot_list)
            interval = setInterval(progress,1000)
        break;
      case 'medium':
        startTime = Date.now()
        limit = 30
        //pibo.tell('파이보와 30분 수업을 진행해 볼께.')

        for(const key in programs)
          for(let i = 0 ; i < 4 ; i++)
            bot_list.push(programs[key][i])

          console.log('medium',bot_list)
          interval = setInterval(progress,1000)
        break;
      case 'short':
        limit = 15
        startTime = Date.now()
        _.len = '짧게'
       // pibo.tell('파이보와 15분 짧은 수업을 진행해 볼께.')

        for(const key in programs)
          for(let i = 0 ; i < 2 ; i++)
            bot_list.push(programs[key][i])

        console.log('short',bot_list)
        interval = setInterval(progress,1000)
        break;
      case 'info':
        limit = 30
        pibo.tell('파이보가 오늘의 정보를 제공해 줄께!')
        bot_list = programs.info
        interval = setInterval(progress,1000)
        break;
      case 'train':
        limit = 30
        pibo.tell('파이보와 함께 두뇌 게임을 진행해 보자!')
        bot_list = programs.train
        interval = setInterval(progress,1000)
        break;   
      case 'exercise':
        limit = 30
        pibo.tell('파이보와 함께 건강 운동을 진행해 보자!')
        bot_list = programs.exercise
        interval = setInterval(progress,1000)
        break;
      case 'mental':
        limit = 30
        pibo.tell('파이보와 함께 마음을 평안하게 다스려 보자.')
        bot_list = programs.mental
        interval = setInterval(progress,1000)
        break;                                        
    } 
  }
  
  if(Date.now() - startTime > limit * 60 * 1000 || bot_list.length == 0){
    //$.tts('프로그램은 이제 그만 종료할께. 고생했어!')
    pibo.tell('프로그램은 이제 그만 종료할게요.')
    bot_list.length = 0
    $.isRepeat = false
    clearInterval(interval)

    document.querySelector('span[name=passTime]').textContent = `00:00`
    document.querySelector('div.bar').style.height = `0%` 

    return
  }
 
  const bot = bot_list.shift()//random(['WEATHER','NEWS','TRAVEL','MOVIE','TREND'])
  console.log('start',bot)
  $.load(bot) // 
}


function progress(){
  let percent = Math.round((Date.now() - startTime) * 100 / (limit * 60 * 1000))
  let pass = new Date(Date.now() - startTime)

  if(percent > 100){
    percent = 0
    pass = new Date(0)
  } 

  document.querySelector('span[name=passTime]').textContent = `${f(limit - 1 - pass.getMinutes())}:${f(60 - pass.getSeconds())}`
  document.querySelector('div.bar').style.height = `${percent}%`  
}

function random(array){
  var rand = Math.random()*array.length | 0;
  var rValue = array[rand];
  return rValue;
}

function f(num){
  if(num < 10)
    return `0${num}`
  return num
}

function hotword(){
  pibo.hotword()
}

function volume_up(){
  pibo.volume_up()
}

function volume_down(){
  pibo.volume_down()
}

function robot(){
  if(robotId == null || robotId == 'null')
    robotId = ""
  robotId = prompt("로봇 일련번호를 입력해 주세요. (로봇 하단부나 박스 QR코드가 일련번호)",robotId)
  pibo.init(robotId,_SYSTEM)  
  localStorage.setItem('robotId', robotId)  
  //<input type="file" accept="image/*" capture="camera"> 
  //출처: https://fimtrus.tistory.com/entry/HTML5-안드로이드-및-아이폰에서-input-file-사용시-카메라-호출하기 [Lv.Max 를 꿈꾸는 개발자 블로그:티스토리]
}


/*
  document.addEventListener('play', e=>{
    console.log('event',e)
    $.tts('로그인을 위해서 얼굴이 모니터에 보이도록 맞춰줘.')
  })

  new Event('play')
*/

let isFirst = false

function onResults(results) {
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  canvasCtx.drawImage(
      results.image, 0, 0, canvasElement.width, canvasElement.height);
  if (results.multiFaceLandmarks) {
    //console.log(results.multiFaceLandmarks)
    //console.log('right,',FACEMESH_RIGHT_EYE)
    //console.log('left,',FACEMESH_LEFT_EYE)

    for (const landmarks of results.multiFaceLandmarks) {
      //console.log(landmarks)
      drawConnectors(canvasCtx, landmarks, FACEMESH_TESSELATION, {color: '#C0C0C070', lineWidth: 1});
      drawConnectors(canvasCtx, landmarks, FACEMESH_RIGHT_EYE, {color: '#30FF30'});
      drawConnectors(canvasCtx, landmarks, FACEMESH_RIGHT_EYEBROW, {color: '#30FF30'});
      drawConnectors(canvasCtx, landmarks, FACEMESH_RIGHT_IRIS, {color: '#30FF30'});
      drawConnectors(canvasCtx, landmarks, FACEMESH_LEFT_EYE, {color: '#3030FF'});
      drawConnectors(canvasCtx, landmarks, FACEMESH_LEFT_EYEBROW, {color: '#3030FF'});
      drawConnectors(canvasCtx, landmarks, FACEMESH_LEFT_IRIS, {color: '#3030FF'});
      drawConnectors(canvasCtx, landmarks, FACEMESH_FACE_OVAL, {color: '#E0E0E0'});
      drawConnectors(canvasCtx, landmarks, FACEMESH_LIPS, {color: '#FF3030'});
    }
  }
  canvasCtx.restore()

  
  if(lastTime == 0){
    lastTime = Date.now()
    //pibo.tell('얼굴을 탐지하고 있어.')
    //pibo.talk('음소거 모드')
    //alert('test')
  }
  
  if(Date.now() - lastTime > 3000){
    lastTime = Date.now()
    //$.bg.play()
    $.camera.stop()
    pibo.tell('파이보와 함께 하는 인지 훈련 프로그램에 참가해 줘서 고마워!')

    document.getElementById('HOME').style.visibility = 'visible'
    document.getElementById('HOME').className = 'animate__animated animate__fadeIn'

    document.getElementById('NAV').style.visibility = 'visible'
    document.getElementById('NAV').className = 'animate__animated animate__fadeIn'

    document.getElementById('LOGIN').className = 'animate__animated animate__fadeOut'
    setTimeout(()=>{
      document.getElementById('LOGIN').style.visibility = 'hidden'
    },1500)
    return
  }
}

const videoElement = document.querySelector('#login video')
var canvasElement = document.querySelector('#login canvas')
//var canvasCtx = canvasElement.getContext('2d');

$.camera = new Camera(videoElement, {
  onFrame: async () => {
    await $.pose.send({image: videoElement})
    await $.hands.send({image: videoElement})
    await $.faceMesh.send({image: videoElement})
  },
  width: 720,
  height: 480
});
$.camera.start()

//$.pose.onResults()
//$.hands.onResults()

$.faceMesh.onResults(onResults)


const image = new Image()
image.onload = ()=>{
  pibo.talk('음소거 모드')
  //pibo.tell('로그인을 위해서 모니터에 얼굴과 어깨가 보이도록 다가와 줘.')
  canvasCtx.drawImage(image,0,0)
}

image.src = '../image/loading.png'



if(robotId != null &&  robotId != 'null'){
  pibo.init(robotId,_SYSTEM)
  document.querySelector('#LOGIN input').value = robotId
} else {
  robot()
}
