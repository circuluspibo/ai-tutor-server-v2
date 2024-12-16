//alert('hello world')


export function create(){
  document.querySelectorAll('#official-number td').forEach(e=>{

    //e.innerText = numbers[i++]
  
    e.addEventListener('click',elem=>{
  
      const piano = {
        snd1 : new Audio('/bot/official-piano/sound/sound1.mp3'),
        snd2 : new Audio('/bot/official-piano/sound/sound2.mp3'),
        snd3 : new Audio('/bot/official-piano/sound/sound3.mp3'),
        snd4 : new Audio('/bot/official-piano/sound/sound4.mp3'),
        snd5 : new Audio('/bot/official-piano/sound/sound5.mp3'),
        snd6 : new Audio('/bot/official-piano/sound/sound6.mp3'),
        snd7 : new Audio('/bot/official-piano/sound/sound7.mp3'),
        snd8 : new Audio('/bot/official-piano/sound/sound8.mp3')
      }
  
      console.log(elem.target.attributes.name.textContent, elem.target.textContent)
  
      const value = elem.target.attributes.name.textContent
  
      piano[value].play()
      elem.target.className = 'animate__animated animate__pulse fail'
      setTimeout(()=>{
        elem.target.className = ''
      },500)
  
      /*
      if(value == count ){
        pass.play()
        pibo.motion('happy',{ cycle : 1})
  
      } else {
        fail.play()
        pibo.motion('sad',{ cycle : 1})
        elem.target.className = 'animate__animated animate__flip fail'
        setTimeout(()=>{
          elem.target.className = ''
        },1000)
      }
      */
    })
  
    e.addEventListener('mouseover',elem=>{
      console.log(elem.target.attributes.name.textContent, elem.target.textContent)
  
      const value = elem.target.textContent

  
    })
  })
}




pibo.ready = ()=>{

  //let serial = localStorage.getItem('robotId')

  pibo.init('c1546094','ops')

  pibo.receive('pibo',(data)=>{
    if(data.alive)
      document.querySelector(`button[name=robot]`).classList.add('alive')
    else
      document.querySelector(`button[name=robot]`).classList.remove('alive')
  }) 

  
  pibo.receive('editor', data=>{
    const point = data.value.split('_')[1]
    document.querySelectorAll("td.alive").forEach(obj=>obj.classList.remove("alive"));
    document.querySelector(`td[name="t_time|${point}"]`).className = 'active alive'
  })

  pibo.info(data=>{
    console.log(data)
  })
}

  //if(serial != null){
  //  pibo.init(serial,'stg') //pibo.init(robotId,'stg')
    /*
    pibo.mode('avatar',{ value : true})
    document.querySelector(`button[name=robot]`).textContent = serial
    pibo.stop()

    pibo.info(data=>{
      document.querySelector('#volume').value = data.config.volume
    })
    */
  //} else {
  //  serial = prompt('input serial')
  //  pibo.init(serial,'ops')
  //}
  


