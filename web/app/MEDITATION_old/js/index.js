let isFinish = false

export function create(){
  isFinish = false
  pibo.talk('명상을 시작하자')

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

  $.query('h1[name=title]').textContent = recv.data.title
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

function get_average_rgb(img) {
  var context = document.createElement('canvas').getContext('2d');
  if (typeof img == 'string') {
      var src = img;
      img = new Image;
      img.setAttribute('crossOrigin', ''); 
      img.src = src;
  }
  context.imageSmoothingEnabled = true;
  context.drawImage(img, 0, 0, 1, 1);
  return context.getImageData(1, 1, 1, 1).data.slice(0,3);
}