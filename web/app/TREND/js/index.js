let isFinish = false

export function create(){
  isFinish = false
  pibo.talk('트렌드 알려줘')
}

export function talk(recv){
 // console.log('talk',data)
  isFinish = true
  //$.query('section[name=text]').textContent = data.text.replace(/(<([^>]+)>)/ig,"")
  console.log('talk',recv)
  isFinish = true
  //$.query('section[name=text]').textContent = data.text.replace(/(<([^>]+)>)/ig,"")

  const text = recv.text.replace(/(<([^>]+)>)/ig,"")
  const data = recv.data

  $.query('h1[name=trend0]').textContent = data.list[0].content
  $.query('i[name=keyword0]').textContent = data.list[0].keyword
  $.query('i[name=count0]').textContent = data.list[0].view

  $.query('h1[name=trend1]').textContent = data.list[1].content
  $.query('i[name=keyword1]').textContent = data.list[1].keyword
  $.query('i[name=count1]').textContent = data.list[1].view

  $.query('h1[name=trend2]').textContent = data.list[2].content
  $.query('i[name=keyword2]').textContent = data.list[2].keyword
  $.query('i[name=count2]').textContent = data.list[2].view

  fetch(`/v1/content/image?q=${data.list[0].content}`).then((response) => response.json()).then(resp => {
    let hasItem = false
    for(const item of resp.data){
      if(item.width < 700 && item.height < 400 && item.width > 600 && item.height > 300){
        hasItem = true
        $.query('img[name=trend0]').src = item.url
        return
      }
    }

    if(!hasItem)
      $.query('img[name=trend0]').src = resp.data[1].url
  })
  
  fetch(`/v1/content/image?q=${data.list[1].content}`).then((response) => response.json()).then(resp => {
    let hasItem = false
    for(const item of resp.data){
      if(item.width < 700 && item.height < 400 && item.width > 600 && item.height > 300){
        hasItem = true
        $.query('img[name=trend1]').src = item.url
        return
      }
    }

    if(!hasItem)
        $.query('img[name=trend1]').src = resp.data[1].url
  })
  fetch(`/v1/content/image?q=${data.list[2].content}`).then((response) => response.json()).then(resp => {
    let hasItem = false
    for(const item of resp.data){
      if(item.width < 700 && item.height < 400 && item.width > 600 && item.height > 300){
        hasItem = true
        $.query('img[name=trend2]').src = item.url
        return
      }
    }

    if(!hasItem)
      $.query('img[name=trend2]').src = resp.data[1].url

  })    
}

export function finish(data){
  console.log('finish',data)
  if(isFinish)
    setTimeout($.exit,1500)
}