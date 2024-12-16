let isFinish = false

export function create(){
  isFinish = false
  pibo.talk('자연의 소리 들려줘')

  const date = new Date()
  const year = date.getFullYear()
  const month = format(date.getMonth() + 1)
  const day = format(date.getDate())

//  $.query('img').src = `https://wstatic.godowon.com/photo_letter/${year}/${month}/${year}${month}${day}.png`
//  console.error('>>>img>>>>',`https://wstatic.godowon.com/photo_letter/${year}/${month}/${year}${month}${day}.png`)  
}

export function talk(data){
  console.log('talk',data)
  isFinish = true
  //$.query('section[name=text]').textContent = data.text.replace(/(<([^>]+)>)/ig,"")
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

/*

// mountain
https://www.youtube.com/watch?v=DeHUFsrCYr0

// waterfall
https://www.youtube.com/watch?v=MPUBSZYESgU

// wave
https://www.youtube.com/watch?v=eyDlmT5ck2w

// forest
https://www.youtube.com/watch?v=YaHHRelS4P0

// flower
https://www.youtube.com/watch?v=h7fEbAXkm18

// rain
https://www.youtube.com/watch?v=wjDgiF1AXJw

*/