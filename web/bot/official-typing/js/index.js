//alert('hello world')

const hover = new Audio(`./sound/hover.mp3`)
const complete = new Audio(`./sound/complete.mp3`)

const stat = {
  pass : 0,
  fail : 0,
  key_pass : 0, 
  key_fail : 0,
  fastTime : 9999999999999999999999999999999999, // 기록
  slowTime : 0,
  duration : 0, // 총 시간
}

const items = [
  { k : 'neopixel', v : '빨강, 초록, 파랑색을 조합해 파이보 눈 색상을 표현하는 전자부품'},
  { k : 'speaker', v:'파이보 귀에 위치하여 오디오 파일을 재생하는 전자부품'},
  { k : 'servo motor', v:'파이보의 관절을 담당하는 전자부품'},
  { k : 'microphone', v:'파이보의 가슴에 위치하여 주변의 소리를 듣는 전자부품'},
  { k : 'camera', v:'사진을 촬영하여 파이보가 사람, 사물 등을 확인할 수 있도록 하는 전자부품'},
  { k : 'oled', v:'파이보 가슴에 위치하여 문자, 도형, 이미지를 표현하는 전자부품'},
  { k : 'pir sensor', v:'파이보의 배꼽에 위치하여 적외선을 통해 사람 또는 동물을 감지하는 전자부품'},
  { k : 'controller', v:'제어 장치'},
  { k : 'raspberry pi', v:'파이보의 머리 역할을 하는 컴퓨팅 보드'},
  { k : 'touch sensor', v:'파이보 이마에 위치하여 사람의 손길을 느낄 수 있는 전자부품'},
  { k : 'sensor', v:'센서'},
  { k : 'computer', v:'컴퓨터'},
  { k : 'head', v:'머리'},
  { k : 'shoulder', v:'어깨'},
  { k : 'chest', v:'가슴'},
  { k : 'arm', v:'팔'},
  { k : 'hand', v:'손'},
  { k : 'leg', v:'다리'},
  { k : 'foot', v:'발'},
  { k : 'mouth', v:'입'},
  { k : 'ear', v:'귀'},
  { k : 'eye', v:'눈'}
]

let point = 0
let item = null

let donut = new Donutty( document.getElementById( "donut" ),{ 
  color: "mediumslateblue",
  max : 10,
  value : 10,
  text: function(state) {
    return state.value
  }
})
/*
const ctx = document.getElementById('chart').getContext('2d');

const chart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Red', 'Blue'],
        datasets: [{
            label: 'Pass/Fail',
            data: [50,50],
        }]
    }
});
console.log(chart)
*/
export function create(){

  start()

  document.querySelectorAll('#official-number td').forEach(e=>{

    //e.innerText = numbers[i++]
  
    e.addEventListener('click',elem=>{

      console.log(elem)

      const item = randomItem(items)
      console.log(item.v)


      /*
      const piano = {
        snd1 : new Audio('/bot/official-piano/sound/sound1.mp3'),
        snd2 : new Audio('/bot/official-piano/sound/sound2.mp3'),
        snd3 : new Audio('/bot/official-piano/sound/sound3.mp3'),
        snd4 : new Audio('/bot/official-piano/sound/sound4.mp3'),
        snd5 : new Audio('/bot/official-piano/sound/sound5.mp3'),
        snd6 : new Audio('/bot/official-piano/sound/sound6.mp3'),
        snd7 : new Audio('/bot/official-piano/sound/sound7.mp3'),
        snd8 : new Audio('/bot/official-piano/sound/sound8.mp3')
      }
  
      console.log(elem.target.attributes.name.textContent, elem.target.textContent)
  
      const value = elem.target.attributes.name.textContent
  
      piano[value].play()
      elem.target.className = 'animate__animated animate__pulse fail'
      setTimeout(()=>{
        elem.target.className = ''
      },500)
      */
      /*
      if(value == count ){
        pass.play()
        pibo.motion('happy',{ cycle : 1})
  
      } else {
        fail.play()
        pibo.motion('sad',{ cycle : 1})
        elem.target.className = 'animate__animated animate__flip fail'
        setTimeout(()=>{
          elem.target.className = ''
        },1000)
      }
      */
    })
  
    e.addEventListener('mouseover',elem=>{
      console.log(elem.target.attributes.name.textContent, elem.target.textContent)
  
      const value = elem.target.textContent

  
    })
  })
}

let down = 0
let intv = 0
/*
const stat = {
  pass : 0,
  fail : 0,
  key_pass : 0, 
  key_fail : 0,
  duration : 0, // 총 시간
  time : 0, // 총 횟수
}
*/

let lastTime = Date.now()

function start(){
  const dur = Date.now() - lastTime

  if(dur > stat.slowTime)
    stat.slowTime = dur
  else if(dur < stat.fastTime && !dur == 0)
    stat.fastTime = dur

  stat.duration += dur

  lastTime = Date.now()

  document.querySelector('textarea[name=stat]').value = JSON.stringify(stat)

  //chart.data = [stat.pass,stat.fail]
  //chart.update()

  console.log(stat)
  clearInterval(intv)
  down = 10
  document.querySelector("tr[name=word]").innerHTML = ""
  point = 0
  item = randomItem(items)
  console.log(item)

  const eng = new Audio(`http://stg-tapi.circul.us/tts?text=${item.k}&lang=en`)
  eng.play()

  for(let i = 0 ; i < item.k.length ; i++){
    const td  = document.createElement('td')
    td.innerText = item.k.charAt(i)

    let key = item.k.charAt(i)
    if(item.k.charAt(i) == " ")
      key = "_"
    td.setAttribute('name',`_${i}_${key}`)
    document.querySelector("tr[name=word]").appendChild(td)
  }

  intv = setInterval(()=>{
    //elem_count.innerText = --down
    donut.set( "value", --down )
    //elem_count.className = 'animate__animated animate__zoomIn'

    setTimeout(()=>{
      //elem_count.className = ''
    },900)
    if(down == 0){
      ++stat.fail
      start()
    }
  },1000) 

}


export function event(){
  const fail = new Audio(`./sound/fail.mp3`)

  //const doc = document.getElementById('official-number')
  //console.log(doc)
  document.addEventListener('keypress',e=>{
    console.log(e)

    let key = e.key
   
    if(key == " ")
      key = "_"

    if(item.k[point] == e.key){
      const doc = document.querySelector(`td[name=_${point++}_${key}]`)
      const pass = new Audio(`./sound/pass.mp3`)
      doc.classList.add('pass')
      pass.play()

      ++stat.key_pass

      if(point == item.k.length){
        const ko = new Audio(`http://192.168.21.150:57727/tts?text="${item.v}"`)
        ko.play()
        ++stat.pass
        complete.play()
        setTimeout(start,1000)
      }


    } else {
      ++stat.key_fail
      const fail = new Audio(`./sound/fail.mp3`)
      fail.play()    
    }

  })
}


pibo.ready = ()=>{

  //let serial = localStorage.getItem('robotId')

  pibo.init('c1546094','ops')

  pibo.receive('pibo',(data)=>{
    if(data.alive)
      document.querySelector(`button[name=robot]`).classList.add('alive')
    else
      document.querySelector(`button[name=robot]`).classList.remove('alive')
  }) 

  
  pibo.receive('editor', data=>{
    const point = data.value.split('_')[1]
    document.querySelectorAll("td.alive").forEach(obj=>obj.classList.remove("alive"));
    document.querySelector(`td[name="t_time|${point}"]`).className = 'active alive'
  })

  pibo.info(data=>{
    console.log(data)
  })
}

  //if(serial != null){
  //  pibo.init(serial,'stg') //pibo.init(robotId,'stg')
    /*
    pibo.mode('avatar',{ value : true})
    document.querySelector(`button[name=robot]`).textContent = serial
    pibo.stop()

    pibo.info(data=>{
      document.querySelector('#volume').value = data.config.volume
    })
    */
  //} else {
  //  serial = prompt('input serial')
  //  pibo.init(serial,'ops')
  //}
  

  function randomItem(a) {
    return a[Math.floor(Math.random() * a.length)];
  }

  function shuffle(array) { array.sort(() => Math.random() - 0.5) }
  Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))]
  }
