//alert('hello world')


const cMap = L.map('map').setView([36.3585927,127.378623],11)
const tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
    id: 'mapbox/dark-v10',
		//id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1
	}).addTo(cMap)

L.marker([36.3585927,127.378623]).addTo(cMap).bindPopup('Center')//.openPopup();  

const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
];

const topic_map = {}

const data = {
  labels: labels,
  datasets: [{
    label: 'Loading...',
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data: [0, 10, 5, 2, 20, 30, 45],
  }]
}


const c_label = []
const c_data = []

const cDialog = new Chart(document.querySelector('#cDialog'), {
  type: 'line', data : {
    labels: c_label,
    datasets: [{
      label: 'Loading...',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: c_data,
    }]
  }, options: {
    plugins: { title: { display: true, text: '대화량', padding: 5 } }    
  }
})

const cBot = new Chart(document.querySelector('#cBot'), {
  type: 'bar', data, options: {
    plugins: { title: { display: true, text: '봇 사용량', padding: 5 } }    
  }
})

const cEmotion = new Chart(document.querySelector('#cEmotion'), {
  type: 'doughnut', data, options: {
    plugins: { title: { display: true, text: '얼굴 표정', padding: 5 } }    
  }
    /*plugins: {
      legend: {
          display: true,
          position : "right"
      }
    }*/
  //}    
})

const cUser = new Chart(document.querySelector('#cUser'), {
  type: 'bubble', data, options: {
    plugins: { title: { display: true, text: '사용자 랭킹', padding: 5 } }    
  }
})

const cObject = new Chart(document.querySelector('#cObject'), {
  type: 'bubble', data, options: {
    plugins: { title: { display: true, text: '사물 감지', padding: 5 } }    
  }
})

const cNetwork = new Chart(document.querySelector('#cNetwork'), {
  type: 'line', data, options: {
    plugins: { title: { display: true, text: '네트워크', padding: 5 } }    
  }
})

const _client = mqtt.connect(`wss://o-proxy.circul.us:8443`, { keepalive: 5 }); // magic number // 3
    //pibo._client = mqtt.connect('wss://tmp-log.circul.us:8443',{ keepalive : 5 })

_client.on('connect', () => {
  console.log('MQTT','Connected!')
})

_client.on('reconnect', () => {
  console.log('MQTT','Reconnected!') 
})

_client.on('offline', () => {
  console.log('MQTT','Offline!') 
});

// 끊어진 경우 명령어 forwording 수행
_client.on('close', () => {
  console.log('MQTT','Close!') 
});

_client.on('message', (topic, message)=>{
  //console.log()
  
  // 
  const json = JSON.parse(message.toString())

  console.log(topic,json)

  topic_map[topic] = true

  document.querySelector('p[name=active_cnt]').innerText = Object.keys(topic_map).length

  if(json.value){
    const obj = json.value
    console.log(json,obj)

    const elem = document.createElement('p')
    elem.innerText = `${obj.type} ${obj.module} ${obj.msg}`

    document.getElementById('log').appendChild(elem)
   
  }
})


const list = [
'53bafea', '21770fae', '30c0946a', 'f84e49cb', 'ff953cd4', 
'f27909b5', '4189fe61','d8b11313', 'de3d3f58', 'e0b0f478',
'bd8bc58b', 'c439c21e', '13833bb6', '3b9456e1', 'e40e3bcd',
'c676a728', '1f3fb8f8', 'd12a5dfc', '6e851e1b', '5db89ea4'
]

/*
db.getCollection('pibos').find({robotId : { $in : [
'53bafea', '21770fae', '30c0946a', 'f84e49cb', 'ff953cd4', 
'f27909b5', '4189fe61','d8b11313', 'de3d3f58', 'e0b0f478',
'bd8bc58b', 'c439c21e', '13833bb6', '3b9456e1', 'e40e3bcd',
'c676a728', '1f3fb8f8', 'd12a5dfc', '6e851e1b', '5db89ea4'
]}, use : true}).projection({robotId : 1, userId : 1})


]
*/

//const list = ['100000000a265748']

for (const serial of list)
  _client.subscribe(`c_${serial}`);

let level0 = 0;
let level1 = 0;
let count = 0;
let users = []
const robots = []
let dialog_cnt = 0;
let dialog_max = 0;

(async () => {
  const resp = await fetch('/v1/insight/robot', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ robotId : list})
  });
  const result = await resp.json();

  count = result.data.length

  for(const item of result.data){

    robots.push(item._id)
    console.log(item)

    if(item.mode)
      ++level1
    else
      ++level0

    users.push(item.alias)

  
    //if(item.coordinate){
     // console.log('cor',[item.coordinate.coordinates[1],item.coordinate.coordinates[0]])
    //  L.marker([item.coordinate.coordinates[1],item.coordinate.coordinates[0]]).addTo(cMap)
   // } else {
      //console.log('geo',[item.geo.lat, item.geo.lng])
      L.marker([item.geo.lat, item.geo.lng]).addTo(cMap)
    //}
  }

  document.querySelector('p[name=robot_cnt]').innerText = count
  document.querySelector('p[name=manager_cnt]').innerText = count
  document.querySelector('p[name=auto_cnt]').innerText = `${level1}`
  
  console.log(robots)

  const labels = [ ]
  const datas = []


  for(const item of result.data){
    const resp = await fetch(`/v1/insight/robot?robotId=${item._id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })

    const result = await resp.json()
    console.log(item._id, result.data)
    labels.push(item._id)
    datas.push(result.data)
    dialog_cnt += result.data

    document.querySelector('p[name=dialog_cnt]').innerText = dialog_cnt

    cDialog.data.labels.push(item._id)
    cDialog.data.datasets.forEach((dataset) => {
      dataset.data.push(result.data)
    })

    if(dialog_max < result.data)
      dialog_max = result.data

    cDialog.update()
  }





})()

let audio = 0

function tts(){
  const text = `파이보가 대전지방보훈청 브리핑을 해줄게. 총 도입로봇은 ${count}대, 사용자는 ${users.length} 분이 사용하고 있어. 지금까지 ${dialog_cnt} 번의 대화를 나누었고, 가장 많이 대화를 나눈건 ${dialog_max} 번이야. 다음에도 또 물어봐줘!`

  if(audio)
    audio.pause()
  audio = new Audio(`https://o-tapi.circul.us/tts?text=${text}`)
  audio.play()
}