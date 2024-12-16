let isFinish = false

export function create(){
  isFinish = false
  

  setTimeout(()=>{
    console.log('frame-----------------------',window.frames[0])
    window.frames[0].pibo = pibo
  },1000)

  //pibo.talk('도서수위 알려줘')
}

export function talk(data){
  //console.log('talk',data)
  //isFinish = true
  //$.query('section[name=text]').textContent = data.text.replace(/(<([^>]+)>)/ig,"")
}

export function finish(data){
  //console.log('finish',data)
  //if(isFinish)
  //  setTimeout($.exit,1500)
}