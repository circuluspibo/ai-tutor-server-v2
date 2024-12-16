let isFinish = false

export function create(){
  isFinish = false
  pibo.talk('뉴스 알려줘') // 짧게 
}

export function talk(recv){
  isFinish = true
  //$.query('section[name=text]').textContent = data.text.replace(/(<([^>]+)>)/ig,"")
  console.log('news talk',recv)
  isFinish = true
  //$.query('section[name=text]').textContent = data.text.replace(/(<([^>]+)>)/ig,"")

  const text = recv.text.replace(/(<([^>]+)>)/ig,"")
  const data = recv.data

  $.query('h1[name=news0]').textContent = data.list[0].title
  $.query('h1[name=news1]').textContent = data.list[1].title
  $.query('h1[name=news2]').textContent = data.list[2].title

  fetch(`/v1/content/image?q=${data.list[0].title}`).then((response) => response.json()).then(resp => {
    let hasItem = false
    console.log(resp.data)
    for(const item of resp.data){
      if(item.width < 700 && item.height < 400 && item.width > 600 && item.height > 300){
        hasItem = true
        $.query('img[name=news0]').src = item.url
        return
      }
    }

    if(!hasItem)
      $.query('img[name=news0]').src = resp.data[1].url

  })
  fetch(`/v1/content/image?q=${data.list[1].title}`).then((response) => response.json()).then(resp => {
    let hasItem = false
    for(const item of resp.data){
      if(item.width < 700 && item.height < 400 && item.width > 600 && item.height > 300){
        hasItem = true
        $.query('img[name=news1]').src = item.url
        return
      }
    }

    if(!hasItem)
        $.query('img[name=news1]').src = resp.data[1].url
  })

  fetch(`/v1/content/image?q=${data.list[2].title}`).then((response) => response.json()).then(resp => {
    let hasItem = false
    for(const item of resp.data){
      if(item.width < 700 && item.height < 400 && item.width > 600 && item.height > 300){
        hasItem = true
        $.query('img[name=news2]').src = item.url
        return
      }
    }

    if(!hasItem)
      $.query('img[name=news2]').src = resp.data[1].url

  })    
}

export function finish(data){
  console.log('finish',data)
  if(isFinish)
    setTimeout($.exit,1500)
}