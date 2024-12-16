let isFinish = false

export function create(){
  isFinish = false
  //pibo.talk('트로트 틀어줘')

  fetch(`/v1/content/chart/Trot`).then((response) => response.json()).then(resp => {
    const musics = resp.data
    console.log(musics)
    for (const music of musics){
      const elem = document.createElement("button")
      elem.innerText = `${music[0]} ${music[1]}`      
      elem.onclick = e=>{
        console.log('click',e.target.innerText)
        pibo.talk(`${music[1]}  틀어줘.`)
      }
      $.query('.list').append(elem)
    }
  })

  /*
  fetch(`/v1/content/chart/K-Pop`).then((response) => response.json()).then(resp => {
    console.log(resp.data.data)
  })

  fetch(`/v1/content/chart/NewAge`).then((response) => response.json()).then(resp => {
    console.log(resp.data.data)
  })

  fetch(`/v1/content/chart/Pop`).then((response) => response.json()).then(resp => {
    console.log(resp.data.data)
  })

  fetch(`/v1/content/chart/Jazz`).then((response) => response.json()).then(resp => {
    console.log(resp.data.data)
  })
  */    
}

export function talk(recv){
 // console.log('talk',data)
  //$.query('section[name=text]').textContent = data.text.replace(/(<([^>]+)>)/ig,"")
  console.log('talk',recv)
  //isFinish = true
  //$.query('section[name=text]').textContent = data.text.replace(/(<([^>]+)>)/ig,"")

  const text = recv.text.replace(/(<([^>]+)>)/ig,"")
  const data = recv.data

  $.query('h1[name=title]').textContent = data.title
  $.query('i[name=artist]').textContent = data.artist
  $.query('i[name=length]').textContent = data.length

  $.query('img').src = data.cover
     
}

export function finish(data){
  console.log('finish',data)
  if(isFinish)
    setTimeout($.exit,1500)
}