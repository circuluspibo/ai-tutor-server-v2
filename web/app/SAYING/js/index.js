let isFinish = false

export function create(){
  isFinish = false
  pibo.talk('명언 들려줘')

  const date = new Date()
  const year = date.getFullYear()
  const month = format(date.getMonth() + 1)
  const day = format(date.getDate())

//  $.query('img').src = `https://wstatic.godowon.com/photo_letter/${year}/${month}/${year}${month}${day}.png`
//  console.error('>>>img>>>>',`https://wstatic.godowon.com/photo_letter/${year}/${month}/${year}${month}${day}.png`)  
}

export function talk(recv){
  console.log('talk',recv)
  isFinish = true
  //$.query('section[name=text]').textContent = data.text.replace(/(<([^>]+)>)/ig,"")

  $.query('img').src = `/app/SAYING/image/${recv.data.type}${rand(0,2)}.jpg`
  $.query('h1[name=message]').textContent = recv.data.content
  $.query('i[name=author]').textContent = recv.data.author
}

export function finish(data){
  console.log('finish',data)
  if(isFinish)
    setTimeout($.exit,1500)
}

function format(num){
  if(num <10)
    return `0${num}`
  return num
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}