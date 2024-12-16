const colors = [
  '#F02C03',
  '#FF950C',
  '#FEDC03',
  '#7CDA01',
  '#0D8DFF',
  '#B02FF7'
]
 
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

function shuffle(array) { array.sort(() => Math.random() - 0.5) }
Array.prototype.random = function () {
  return this[Math.floor((Math.random()*this.length))]
}

export function create(){
  count = 0
  max = 0
  music.play()
  //const elem_count = document.querySelector('#official-color div[name=count]')
    
  setTimeout(()=>{
    if(pibo && pibo.tell)
      pibo.tell('자 색상을 맞춰보자!')
  },500)

  document.querySelectorAll('#official-color td').forEach(e=>{
    e.className = ''
  })

  document.querySelectorAll('#official-color li').forEach(e=>{
    e.className = ''
  })

  down = 10
  map = {}
  //elem_count.innerText = down

  clearInterval(intv)
  document.querySelectorAll('#official-color td').forEach(e=>{
    const color = colors.random()
    if(map[color])
      ++map[color]
    else
      map[color] = 1
    e.style.backgroundColor = color 
    e.value = color
  })

  for(const key in map){
    if(map[key] > max){
      max = map[key]
      turn = key
    }
  }

  //turn = Object.keys(map).random()

  document.querySelector('#official-color div[name=target]').style.backgroundColor = turn
  chart.set('color',turn)

  console.log(turn, map[turn])

  intv = setInterval(()=>{
    //elem_count.innerText = --down
    chart.set( "value", --down )
    //elem_count.className = 'animate__animated animate__zoomIn'

    setTimeout(()=>{
      //elem_count.className = ''
    },900)
    if(down == 0)
      create()
  },1000)  

}

export function event(){
  document.querySelectorAll('#official-color td').forEach(e=>{

    //e.innerText = numbers[i++]
    // caching
    //new Audio('./sound/pass.mp3')
    //new Audio('./sound/fail.mp3')
  
    e.addEventListener('click',elem=>{
  
      const pass = new Audio('/bot/official-color/sound/pass.mp3')
      const fail = new Audio('/bot/official-color/sound/fail.mp3')
  
      console.log(elem.target.attributes.name.textContent, elem.target.value)
  
      const value = elem.target.value
  
      if(value == turn ){
        pass.play()
        elem.target.className = 'animate__animated animate__zoomOut'
        //document.querySelector(`#official-color li[name=t_${value}]`).classList.add('pass')
        count++

        if( pibo && pibo.motion)
          pibo.motion('happy',{ cycle : 1})
  
        if( map[value] == count){
          clearInterval(intv)
          shuffle(messages)
          const complete = new Audio('/bot/official-color/sound/complete.mp3')
          complete.play()
          setTimeout(create,3000)

          if(pibo && pibo.tell)
            pibo.tell(messages[0])
        }
        
      } else {
        fail.play()
        if(pibo && pibo.motion)
          pibo.motion('sad',{ cycle : 1})
        elem.target.className = 'animate__animated animate__flip fail'
        setTimeout(()=>{
          elem.target.className = ''
        },2000)
      }
  
    })
  
    e.addEventListener('mouseover',elem=>{
  
      //const hover = new Audio('/bot/official-color/sound/hover.mp3')
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
