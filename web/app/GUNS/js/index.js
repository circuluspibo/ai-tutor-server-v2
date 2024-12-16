let isFinish = false
let pos = 0
let timeout = 0
let intv = 0

let down = 60

let canvasElement = 0
let canvasCtx = 0

const pass = new Audio('/app/FLAG/sound/pass.mp3')
const fail = new Audio('/app/FLAG/sound/fail.mp3')


const chart = new Donutty( document.getElementById('GUNS_donut'),{ 
  color: "#b22729",
  max : 60,
  value : 60,
  text: function(state) {
    return state.value
  }
})


export function create(){
  isFinish = false
  const videoElement = $.query('video')
   canvasElement = $.query('canvas')
  canvasCtx = canvasElement.getContext('2d');

  /*
  const pose = new Pose({locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
  }})
  
  pose.setOptions({
    selfieMode: true,
    modelComplexity: 1,
    smoothLandmarks: false,
    enableSegmentation: true,
    smoothSegmentation: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
  });
 
  pose.onResults(onResults);
  
  const camera = new Camera(videoElement, {
    onFrame: async () => {
      await pose.send({image: videoElement});
    },
    width: 480,
    height: 270
  });
  camera.start()*/

  $.pose.onResults(onResults)
  
  $.camera = new Camera(videoElement, {
    onFrame: async () => {
      await $.pose.send({image: videoElement});
    },
    width: 480,
    height: 270
  })

  $.camera.start()

  interval = setInterval(()=>{

    chart.set( "value", --down )

    if(down == 0)
      clearInterval(interval)
  },1000)

  //start()

}


export function talk(recv){
 
}

export function destroy(){
  clearTimeout(timeout)
  clearInterval(intv)
}

export function finish(data){
  console.log('finish',data)
  if(isFinish)
    setTimeout($.exit,1500)
}

function onResults(results) {
  if(!results.poseLandmarks)
    return

  const marks = results.poseLandmarks 

  const l_eye_0 = marks[1]
  const l_eye_1 = marks[2]

  const r_eye_0 = marks[4]
  const r_eye_1 = marks[5]

  const l_arm = marks[13]
  const r_arm = marks[14]

  const l_hand = marks[15]
  const r_hand = marks[16]

  const l_mouse = marks[9]
  const r_mouse = marks[10]


  if(l_mouse.y - r_mouse.y  > 0.01 && pos != 'RM'){
    pos = 'RM'
    console.error(pos)
    $.query('td.right').classList.add('pass')
    pass.play()

    clearTimeout(timeout)

    setTimeout(()=>{
      $.query('td.right').classList.remove('pass')
    },1000)

    timeout = setTimeout(()=>{
      pos = 0
    },3000)
  } else if(r_mouse.y - l_mouse.y  > 0.01 && pos != 'LM'){
    pos = 'LM'
    console.error(pos)
    $.query('td.left').classList.add('pass')
    fail.play()

    clearTimeout(timeout)

    setTimeout(()=>{
      $.query('td.left').classList.remove('pass')
    },1000)
    timeout = setTimeout(()=>{
      pos = 0
    },3000)
  }

  canvasCtx.save()
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height)

  canvasCtx.drawImage(results.segmentationMask, 0, 0, canvasElement.width, canvasElement.height)
  canvasCtx.globalCompositeOperation = 'source-out';
  canvasCtx.fillStyle = '#fec1a6';
  canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);

  canvasCtx.globalCompositeOperation = 'destination-atop';
  canvasCtx.drawImage(
      results.image, 0, 0, canvasElement.width , canvasElement.height);

  canvasCtx.globalCompositeOperation = 'source-over';
  drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS,
                 {color: '#00FF00', lineWidth: 4});
  drawLandmarks(canvasCtx, results.poseLandmarks,
                {color: '#0000FF', lineWidth: 2});
  canvasCtx.restore();

}

function start(pt = 0){
  point = pt

  intv = setInterval(()=>{

    if(point == 4)
      fail.play()

    if(point == 5){
      mosquito.play()
      point = 0
    }

    document.querySelectorAll('#CLAP img').forEach(item=>{
      item.src = ""
    })

    target = rand(1,3)

    $.query(`td[name=t${target}${++point}] img`).src = '/app/CLAP/image/mosquito.png'

  },2000)
}

function rand(min, max) {
  return ~~(Math.random() * (max - min + 1)) + min
}