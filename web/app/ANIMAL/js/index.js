let isStart = false
const alphabet = {
	"E_A_ALLIGATOR": "악어",
	"E_B_BEAR": "곰",
	"E_C_CAT": "고양이",
	"E_D_DOG": "개",
	"E_E_ELEPHANT": "코끼리",
	"E_F_FROG": "개구리",
	"E_G_GOAT": "염소",
	"E_H_HORSE": "말",
	"E_I_IMPALA": "영양",
	"E_J_JAGUAR": "재규어",
	"E_K_KANGAROO": "캥거루",
	"E_L_LION": "사자",
	"E_M_MONKEY": "원숭이",
	"E_N_NEWT": "도롱뇽",
	"E_O_OWL": "올빼미",
	"E_P_PIG": "돼지",
	"E_Q_QUAIL": "메추라기",
	"E_R_RACCOON": "너구리",
	"E_S_SHEEP": "양",
	"E_T_TIGER": "호랑이",
	"E_U_UNICORN": "유니콘",
	"E_V_VULTURE": "독수리",
	"E_W_WOLF": "늑대",
	"E_X_XERUS": "다람쥐",
	"E_Y_YAK": "야크",
	"E_Z_ZEBRA": "얼룩말"
}

const cache = {}
 
const messages = [
  "너무 잘했어",
  "탁월한 솜씨인걸?",
  "대회 나가도 될것 같아!"
]

let pos = 0

let map = {}

let isFinish = false
let timeout = 0
let intv = 0

let level = 1
let step = 0
let down = 10 
const limit = [20,10,5]

let cnt = 0

let count = 0
let initTime = 0

const state = [
  { level : -1, scores : []}, // [1/0,time, concent]
  { level : -1, scores : []},
  { level : -1, scores : []}
]

const chart = new Donutty( document.getElementById( "ANIMAL_D" ),{ 
  color: "#2870b3",
  max : 20,
  value : 10,
  text: function(state) {
    return state.value
  }
})

//https://codepen.io/simeydotme/pen/rrOEmO/

const music = new Audio('/music/train.mp3')
music.volume = 0.5
//music.volume = 50

export function create(){
  cnt = 0
  isStart = false

  alert(0)

  music.play()
 
  alert(1)

  document.querySelectorAll(`#${_.id} ul > li`).forEach(elem=>{elem.className = ''})
  
  step = 0
  count = 0


  alert(2)

  setLevel()

  isFinish = false
  /*
  const videoElement = $.query('video')
 
  canvasElement = $.query('canvas')
  canvasCtx = canvasElement.getContext('2d')

  $.faceMesh.onResults(onResults);

  $.camera = new Camera(videoElement, {
    onFrame: async () => {
      await $.faceMesh.send({image: videoElement});
    },
    width: 460,
    height: 250
  });
  $.camera.start();
  */
  alert(3)
  start()
}

export function event(){
  document.querySelectorAll('#ANIMAL td').forEach(e=>{
    e.addEventListener('click',elem=>{
      console.log(elem.target.attributes.name.textContent, elem.target.value)
      const value = elem.target.value
      calc(elem,value)
    })
  
    e.addEventListener('mouseover',elem=>{
      console.log(elem.target.attributes.name.textContent, elem.target.textContent)
      const value = elem.target.textContent
  
      if(value == cnt ){
  
      } else {
  
      }
    })
  })  
}

let unfocusTime = 0
let lastTime = 0

function onResults(results) {
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);
  if (results.multiFaceLandmarks) {

    for (const landmarks of results.multiFaceLandmarks) {
      drawConnectors(canvasCtx, landmarks, FACEMESH_TESSELATION,{color: '#C0C0C070', lineWidth: 1});
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
  canvasCtx.restore();
}

export function destroy(){
  clearInterval(intv)
  //clearTimeout(timeout)
  music.pause()
  music.currentTime = 0
}

function sample(arr){
  let key = JSON.stringify(arr);

  if (
    cache[key] == undefined ||
    (cache[key] != undefined && cache[key].length == 0)
  ) {
    cache[key] = JSON.parse(JSON.stringify(arr));
  } else if (cache[key].length == 1) {
    return cache[key].pop();
  }
  //console.log('CACHE', cache);

  let point = ~~(Math.random() * cache[key].length);
  let item = cache[key][point];
  cache[key].splice(point, 1);
  return item;
}

let target = 0
let wrong = 0
let startTime = 0

function start(isStep){
  cnt = 0

  document.querySelectorAll('#ANIMAL td').forEach(e=>{ e.className = ''})

  startTime = Date.now()
  unfocusTime = 0

  clearInterval(intv)

  if(isStep)
    setLevel()

  down = limit[level] 
  chart.set("value", down)    
  map = {}

  clearInterval(intv)

  const arr = []

  document.querySelectorAll('#ANIMAL td').forEach(el=>{
    const alpha = sample(Object.keys(alphabet))
    arr.push(alpha)
    el.style.backgroundImage = `url('/web/bot/official-game/image/${alpha.split('_')[2].toLowerCase()}_.png')`
    el.style.backgroundSize="100% 100%";
    el.value = alpha
  })

  target = arr.random()

  const el = document.querySelector('#ANIMAL div[name=target]')
  const char = target.split('_')
  //el.textContent = char[1] + ' ' + char[2] + '\n' + alphabet[turn]
  el.textContent = alphabet[target]
  getAverageRGB(`/web/bot/official-game/image/${target.split('_')[2].toLowerCase()}_.png`)

  const audio = new Audio(`https://s-tapi.circul.us/v1/tts?text=${char[1]}, ${char[2]}&lang=en`)
  audio.play()

  setTimeout(()=>{
    const kr = new Audio(`https://s-tapi.circul.us/v1/tts?text=${alphabet[target]}`)
    kr.play()
  },1000)

  setTimeout(()=>{
    const audio = new Audio(`https://s-rapi.circul.us/v1/stream/game/${target}`)
    audio.play()
  },1000)

  intv = setInterval(()=>{
    //elem_cnt.innerText = --down
    chart.set( "value", --down )
    //elem_cnt.className = 'animate__animated animate__zoomIn'

    if(down == 15){
      const audio = new Audio(`https://s-tapi.circul.us/v1/tts?text=${char[1]}, ${char[2]}&lang=en`)
      audio.play()
    
      setTimeout(()=>{
        const kr = new Audio(`https://s-tapi.circul.us/v1/tts?text=${alphabet[target]}`)
        kr.play()
      },1000)    
    }

    if(down == 0)
      calc()

  },1000)  
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

function calc(elem, value){
  const pass = new Audio('app/ANIMAL/sound/pass.mp3')
  const fail = new Audio('app/ANIMAL/sound/fail.mp3')
  const spendTime = Date.now() - startTime

  if(value == target ){
    const char = value.split('_')
    const audio = new Audio(`https://s-tapi.circul.us/v1/tts?text=${char[1]}, ${char[2]}&lang=en`)
    audio.play()
    elem.target.className = 'animate__animated animate__zoomOut'

    if( pibo && pibo.motion)
      pibo.motion('happy',{ cycle : 1})

    clearInterval(intv)
    $.query(`li[name=t${count % 10}]`).className = 'pass'
    $.query('img').src = 'app/COLOR/image/positive-vote.png'

    $.shuffle(messages)
    //const complete = new Audio('/bot/official-game/sound/complete.mp3')
    pass.play()
    setTimeout(next,2000)
    state[step].scores.push([true, spendTime,unfocusTime])
  
    if(pibo && pibo.tell)
      pibo.tell(messages[0])
      
  } else if(elem != undefined){
    const char = value.split('_')
    const audio = new Audio(`https://s-tapi.circul.us/v1/tts?text=${char[1]}, ${char[2]}&lang=en`)
    audio.play()
    fail.play()
    if(pibo && pibo.motion)
      pibo.motion('sad',{ cycle : 1})
    //elem.target.style.color = 'black'
    //elem.target.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
    elem.target.className = 'animate__animated animate__flip fail'
    //elem.target.style.backgroundBlendMode = 'overlay';
    
    elem.target.textContent = `${char[1]}, ${char[2]}`
    setTimeout(()=>{
      elem.target.className = ''
      elem.target.textContent = ''
      elem.target.color = ''
    },2000)
  } else {
    clearInterval(intv)
    if(pibo && pibo.motion)
      pibo.motion('sad',{ cycle : 1})
    $.query(`li[name=t${count % 10}]`).className = 'fail'
    $.query('img').src = 'app/COLOR/image/negative-vote.png'
    state[step].scores.push([false, spendTime,unfocusTime])
    pibo.tell('다음번에는 좀더 잘해보는게 좋을것 같아!')

    setTimeout(()=>{
      if(elem)
        elem.target.className = ''
      next()
    },2000)    
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

function getAverageRGB(url) {
  const imgEl = new Image(256, 256);
  imgEl.src = url;

  var blockSize = 5, // only visit every 5 pixels
      defaultRGB = {r:0,g:0,b:0}, // for non-supporting envs
      canvas = document.createElement('canvas'),
      context = canvas.getContext && canvas.getContext('2d'),
      data, width, height,
      i = -4,
      length,
      rgb = {r:0,g:0,b:0},
      cnt = 0;

  if (!context) {
      return defaultRGB;
  }

  imgEl.onload = function() {
    height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
    width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;
  
    context.drawImage(imgEl, 0, 0);
  
    try {
        data = context.getImageData(0, 0, width, height);
    } catch(e) {
        /* security error, img on diff domain */
        return defaultRGB;
    }
  
    length = data.data.length;
  
    while ( (i += blockSize * 4) < length ) {
        ++cnt;
        rgb.r += data.data[i];
        rgb.g += data.data[i+1];
        rgb.b += data.data[i+2];
    }
  
    // ~~ used to floor values
    rgb.r = ~~(rgb.r/cnt);
    rgb.g = ~~(rgb.g/cnt);
    rgb.b = ~~(rgb.b/cnt);

    $.query('div[name=target]').style.backgroundColor = `rgba(${rgb.r},${rgb.g},${rgb.b},1)`

  }
}