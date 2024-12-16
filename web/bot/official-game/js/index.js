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

let i = 0
let count = 1
let down = 10
let map = {}
let turn = 0
let max = 0

let intv = 0
const chart = new Donutty( document.getElementById( "donut" ),{ 
  color: "mediumslateblue",
  max : 10,
  value : 10,
  text: function(state) {
    return state.value
  }
})

//https://codepen.io/simeydotme/pen/rrOEmO/

const music = new Audio('/music/link_inst.mp3')
music.volume = 0.2
//music.volume = 50

function shuffle(array) { array.sort(() => Math.random() - 0.5) }
Array.prototype.random = function () {
  return this[Math.floor((Math.random()*this.length))]
}

export function create(){
  count = 0
  max = 0
  music.play()
  //const elem_count = document.querySelector('#official-game div[name=count]')
    
  setTimeout(()=>{
    if(pibo && pibo.tell)
      pibo.tell('자 색상을 맞춰보자!')
  },500)

  document.querySelectorAll('#official-game td').forEach(e=>{
    e.className = ''
  })

  document.querySelectorAll('#official-game li').forEach(e=>{
    e.className = ''
  })

  down = 30
  map = {}
  //elem_count.innerText = down

  clearInterval(intv)

  const arr = []

  document.querySelectorAll('#official-game td').forEach(el=>{
    const alpha = sample(Object.keys(alphabet))
    arr.push(alpha)
    el.style.backgroundImage = `url('/bot/official-game/image/${alpha.split('_')[2].toLowerCase()}_.png')`
    //el.style.background = 'url(images/Noti.png) no-repeat center center';
    el.style.backgroundSize="100% 100%";
    el.value = alpha
  })

  turn = arr.random()

  const el = document.querySelector('#official-game div[name=target]')
  const char = turn.split('_')
  el.textContent = char[1] + ' ' + char[2] 
  const audio = new Audio(`https://s-tapi.circul.us/v1/tts?text=${char[1]}, ${char[2]}&lang=en`)
  audio.play()

  
  setTimeout(()=>{
    const kr = new Audio(`https://s-tapi.circul.us/v1/tts?text=${alphabet[turn]}`)
    kr.play()
  },1000)

  setTimeout(()=>{
    const audio = new Audio(`https://s-rapi.circul.us/v1/stream/game/${turn}`)
    audio.play()
  },1000)
  //el.style.backgroundImage = `url('/bot/official-game/image/${turn.split('_')[2].toLowerCase()}_.png')`
  //el.style.backgroundSize="100% 100%";
  //el.value = turn
  //chart.set('color',turn)

  //console.log(turn, map[turn])

  intv = setInterval(()=>{
    //elem_count.innerText = --down
    chart.set( "value", --down )
    //elem_count.className = 'animate__animated animate__zoomIn'

    if(down == 15){
      const audio = new Audio(`https://s-tapi.circul.us/v1/tts?text=${char[1]}, ${char[2]}&lang=en`)
      audio.play()
    
      setTimeout(()=>{
        const kr = new Audio(`https://s-tapi.circul.us/v1/tts?text=${alphabet[turn]}`)
        kr.play()
      },1000)    
    }

    setTimeout(()=>{
      //elem_count.className = ''
    },900)
    if(down == 0)
      create()
  },1000)  

}

export function event(){
  document.querySelectorAll('#official-game td').forEach(e=>{

    //e.innerText = numbers[i++]
    // caching
    //new Audio('./sound/pass.mp3')
    //new Audio('./sound/fail.mp3')
  
    e.addEventListener('click',elem=>{
  
      const pass = new Audio('/bot/official-game/sound/pass.mp3')
      const fail = new Audio('/bot/official-game/sound/fail.mp3')
  
      console.log(elem.target.attributes.name.textContent, elem.target.value)
  
      const value = elem.target.value
  
      if(value == turn ){
        const char = value.split('_')
        const audio = new Audio(`https://s-tapi.circul.us/v1/tts?text=${char[1]}, ${char[2]}&lang=en`)
        audio.play()
        elem.target.className = 'animate__animated animate__zoomOut'


        if( pibo && pibo.motion)
          pibo.motion('happy',{ cycle : 1})
  
        clearInterval(intv)
        shuffle(messages)
        //const complete = new Audio('/bot/official-game/sound/complete.mp3')
        pass.play()
        setTimeout(create,3000)

        if(pibo && pibo.tell)
          pibo.tell(messages[0])
        
        
      } else {
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
      }
  
    })
  
    e.addEventListener('mouseover',elem=>{
  
      //const hover = new Audio('/bot/official-game/sound/hover.mp3')
      console.log(elem.target.attributes.name.textContent, elem.target.textContent)
  
      const value = elem.target.textContent
  
      if(value == count ){
  
      } else {
  
      }
  
      //hover.play();
    })
  })  
}

export function destroy(){
  clearInterval(intv)
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
};