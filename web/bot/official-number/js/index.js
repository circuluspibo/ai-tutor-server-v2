const numbers = [1,2,3,4,5,6,7,8,9]

const messages = [
  "너무 잘했어",
  "탁월한 솜씨인걸?",
  "대회 나가도 될것 같아!"
]

const starts = [
  "자 게임을 시작해 보자",
  "다시 한번 해볼까?",
  "너의 숨은 솜씨를 보여줘."
]

let i = 0
let count = 1
let down = 20


let intv = 0
let chart = new Donutty( document.getElementById( "donut" ),{ 
  color: "mediumslateblue",
  max : 20,
  value : 20,
  text: function(state) {
      return state.value;
  }

})
//https://codepen.io/simeydotme/pen/rrOEmO/

const music = new Audio('/music/music.mp3')

function shuffle(array) { array.sort(() => Math.random() - 0.5); }

export function create(){

  music.play()
  //const elem_count = document.querySelector('#official-number div[name=count]')
    
  setTimeout(()=>{
    shuffle(starts)

    if(pibo && pibo.tell)
      pibo.tell(starts[0])
  },500)

  document.querySelectorAll('#official-number td').forEach(e=>{
    e.className = ''
  })

  document.querySelectorAll('#official-number li').forEach(e=>{
    e.className = ''
  })


  i = 0
  count = 1
  down = 20

  //elem_count.innerText = down

  shuffle(numbers)
  clearInterval(intv)
  document.querySelectorAll('#official-number td').forEach(e=>{
    e.innerText = numbers[i++]
  })

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
  document.querySelectorAll('#official-number td').forEach(e=>{

    //e.innerText = numbers[i++]
    // caching
    //new Audio('./sound/pass.mp3')
    //new Audio('./sound/fail.mp3')
  
    e.addEventListener('click',elem=>{
  
      const pass = new Audio('/bot/official-number/sound/pass.mp3')
      const fail = new Audio('/bot/official-number/sound/fail.mp3')
  
      console.log(elem.target.attributes.name.textContent, elem.target.textContent)
  
      const value = elem.target.textContent
  
      if(value == count ){
        pass.play()
        elem.target.className = 'animate__animated animate__zoomOut'
        document.querySelector(`#official-number li[name=t_${value}]`).classList.add('pass')
        count++

        if(count % 3 == 0 && pibo && pibo.motion)
          pibo.motion('happy',{ cycle : 1})
  
        if(count == numbers.length + 1){
          clearInterval(intv)
          shuffle(messages)
          const complete = new Audio('/bot/official-number/sound/complete.mp3')
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
  
      //const hover = new Audio('/bot/official-number/sound/hover.mp3')
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
