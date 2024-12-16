let isFinish = false
const cMap = L.map('map').setView([37.541,126.986],6)


export function create(){
  isFinish = false
  pibo.talk('여행 정보 알려줘')


  const tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
      maxZoom: 18,
      //id: 'mapbox/dark-v10',
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1
    }).addTo(cMap)


}

export function talk(recv){
  console.log('talk',recv)
  isFinish = true

  const lats = []
  let lat =0
  const lngs = []
  let lng = 0

  for(const item of recv.data.list){
    const marker = L.marker([item.lat, item.lng])
    marker.bindTooltip(item.name, { permanent: true, offset: [0, 6] });
    marker.addTo(cMap)
    
    lats.push(item.lat)
    lngs.push(item.lng)

    lat += parseFloat(item.lat)
    lng += parseFloat(item.lng)
  }

  lats.sort()
  lngs.sort()

  cMap.setView([(lat/3).toFixed(3),(lng/3).toFixed(3)],14)

  const data = recv.data

  $.query('h1[name=travel0]').textContent = data.list[0].name
  $.query('i[name=category0]').textContent = data.list[0].category
  $.query('i[name=address0]').textContent = data.list[0].address

  $.query('h1[name=travel1]').textContent = data.list[1].name
  $.query('i[name=category1]').textContent = data.list[1].category
  $.query('i[name=address1]').textContent = data.list[1].address

  $.query('h1[name=travel2]').textContent = data.list[2].name
  $.query('i[name=category2]').textContent = data.list[2].category
  $.query('i[name=address2]').textContent = data.list[2].address

  fetch(`/v1/content/image?q=${data.area} ${data.list[0].name}`).then((response) => response.json()).then(resp => {
    let hasItem = false
    for(const item of resp.data){
      if(item.width < 700 && item.height < 400 && item.width > 600 && item.height > 300 && item.url.indexOf('.jp') > -1){
        hasItem = true
        $.query('img[name=travel0]').src = item.url
        return
      }

      if(!hasItem)
        $.query('img[name=travel0]').src = resp.data[0].url
    }

    fetch(`/v1/content/image?q=${data.area} ${data.list[1].name}`).then((response) => response.json()).then(resp => {
      let hasItem = false
      for(const item of resp.data){
        if(item.width < 700 && item.height < 400 && item.width > 600 && item.height > 300 && item.url.indexOf('.jp') > -1){
          hasItem = true
          $.query('img[name=travel1]').src = item.url
          return
        }
      }
  
      if(!hasItem)
          $.query('img[name=travel1]').src = resp.data[0].url
    })

    fetch(`/v1/content/image?q=${data.area} ${data.list[2].name}`).then((response) => response.json()).then(resp => {
      let hasItem = false
      for(const item of resp.data){
        if(item.width < 700 && item.height < 400 && item.width > 600 && item.height > 300 && item.url.indexOf('.jp') > -1){
          hasItem = true
          $.query('img[name=travel2]').src = item.url
          return
        }
      }
  
      if(!hasItem)
        $.query('img[name=travel2]').src = resp.data[0].url
  
    }) 
    
  })
}

export function finish(data){
  console.log('finish',data)
  if(isFinish)
    setTimeout($.exit,1500)
}