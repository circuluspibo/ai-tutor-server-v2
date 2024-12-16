$ = {
  id : 'home',
  script : {},
}


pibo.ready = ()=>{

  //let serial = localStorage.getItem('robotId')

  pibo.init('100000000a265748','stg')

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

document.querySelector('#home').addEventListener('mouseover',elem=>{
  //if(navigator.vibrate)
  //  navigator.vibrate([200, 100, 200]);
})

document.querySelector('#home').addEventListener('click',elem=>{

  //const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-arcade-game-jump-coin-216.mp3');
  const audio = new Audio('/sound/click.mp3');
  audio.play();
})

function weather(){
  document.getElementById('home').className = 'animate__animated animate__fadeOut'
  document.getElementById('test').style.display = 'block'
  document.getElementById('test').className = 'animate__animated animate__zoomIn'
}


var hammertime = new Hammer(document.body);
hammertime.on('swipeleft', function(ev) {
  document.getElementById('home').className = 'animate__animated animate__fadeIn'
  document.getElementById('test').className = 'animate__animated animate__zoomOut'
});

hammertime.on('swiperight', function(ev) {
  //document.getElementById('home').className = 'animate__animated animate__fadeOut'
  document.getElementById('test2').style.display = 'block'
  document.getElementById('test2').className = 'animate__animated animate__slideInRight'
})

hammertime.on('swipeup', function(ev) {
	alert('up')
})

hammertime.on('swipedown', function(ev) {
	alert('down')
})

async function load(bot, type='bot'){

  if(navigator.vibrate)
    navigator.vibrate([200, 100, 200]);

  pibo.mode('avatar',{ value : true})

  console.log('loading',bot)
  // css load
  const css = document.createElement("link")
  css.setAttribute("rel", "stylesheet")
  css.setAttribute("type", "text/css")
  css.setAttribute("href", `/${type}/${bot}/css/index.css`)
  document.getElementsByTagName("head")[0].appendChild(css)  
  

  // html load
  const data = await fetch(`/${type}/${bot}/`)
  const html = await data.text()
  const body = html.split('<body>')[1].split('</body>')[0]

  const article = document.createElement("article")
  article.id = bot
  article.innerHTML = body;
  document.querySelector('section').appendChild(article)

  // transition
  document.getElementById('home').className = 'animate__animated animate__fadeOut'
  //document.getElementById('test').style.display = 'block'
  article.className = 'animate__animated animate__zoomIn'

  // script load

  if(!$.script[bot]){
		const script = await import(`/${type}/${bot}/js/index.js`)
		$.script[bot] = script
		
  }

  if($.script[$.id] && $.script[$.id].destroy)
    $.script[$.id].destroy()

  $.id = bot
  $.script[bot].create()

  if($.script[bot].event)
    $.script[bot].event()
}

function exit(){

  if($.script[$.id] && $.script[$.id].destroy)
    $.script[$.id].destroy()

  pibo.mode('avatar',{ value : false})

  document.getElementById('home').className = 'animate__animated animate__fadeIn'
  document.getElementById($.id).className = 'animate__animated animate__zoomOut'
  setTimeout(()=>{
    document.getElementById($.id).remove()
    $.id = 'home'
  },1000)
}

/*
document.addEventListener('keydown',e=>{
  e.preventDefault()
  console.log(e)
  if (e.keyCode == 36)
    e.preventDefault()
  
})
*/

function loadScript(url, callback) {
	return new Promise(res=>{
		var head = document.getElementsByTagName('head')[0];
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = url;
	
		script.onload = res;
		head.appendChild(script);
	})
}