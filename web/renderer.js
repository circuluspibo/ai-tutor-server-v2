
const ipc = require('electron').ipcRenderer
const webview = document.getElementById('main')
const looksSame = require('looks-same')
//const {createCanvas} = require('canvas')
const execSync = require('child_process').execSync
//var Frame = require("canvas-to-buffer");
//const FD = require('form-data')


let url = ""
let cnt = 0
let c_h = 0
let interval = 0
let lastTime = 0

let curTitle = 0
let lastTitle = 0

const history = []

function konsole(k,v){
    ipc.send('console', { k , v })
}

let profile = 0

const os = require('os')

const id = `${os.homedir()}\\_${Date.now()}`

fs.mkdirSync(id)

alert("1225 " + id)

webview.addEventListener('load-commit', (e) => {
    console.log('change1',e)

    if (e.url != "about:blank"){

        if(url != e.url){
            ipc.send('change', { url : e.url})

            if(!profile){
                if(e.url.indexOf('?profile') > 0){
                    const assist = document.getElementById('assist')
                    profile = e.url.split("profile=")[1]
                    setTutor(profile)
                    //assist.loadURL(`http://127.0.0.1:9999/web/tutor.html?mode=${profile}`)
                    //console.log(profile,assist)
                    //assist.url = `http://127.0.0.1:9999/web/tutor.html?mode=${profile}`
                }
            }

            /*
            setTimeout(()=>{
                webview.capturePage().then(image => {
                    history.push({ k : 'url', v : e.url, t : new Date() })




                    fs.writeFileSync(`./${id}/cap_${++cnt}.png`, image.toPNG(), (err) => {
                        if (err) throw err
                    })
                    konsole(cnt,url)
                })
            },1000)
            */
        }
    }
    
  webview.stopFindInPage('keepSelection')
})


async function initCap(){
    const cam = document.getElementById("cam")

    webview.capturePage().then(async image => {
        fs.writeFile(`${id}//cap_${cnt}.png`, image.toPNG(), (err) => {
            if (err) throw err
        })
    })

    const canvas = document.getElementById('capture')
    //const canvas = createCanvas(640, 320)
    ctx = canvas.getContext("2d")
    canvas.width = 720;
    canvas.height = 480;    
    ctx.drawImage(cam,0,0,720,480)
    
    console.log(cam.width,cam.height)
    //const buffer = canvas.toDataURL("image/png");
    const blob = await new Promise(
        (resolve) => canvas.toBlob(blob => resolve(blob), "image/jpg", 0.8)
    );
    
    const buffer = new Buffer(await blob.arrayBuffer());
    fs.writeFile(`${id}//cam_${c_h}.png`,buffer,(err,out)=>{

    })
}

setTimeout(initCap,2000)

setInterval(async ()=>{
    webview.capturePage().then(async image => {
        fs.writeFile('temp.png', image.toPNG(), async (err) => {
            if (err) throw err

            const out = await looksSame('temp.png',`${id}//cap_${cnt}.png`)
            konsole('comp',out)
            if(!out.equal){
                execSync(`move temp.png ${id}//cap_${++cnt}.png`)
                konsole(cnt, 'change image capture')
            }
        })
    })

    //fs.writeFileSync(`${id}/cam_${++cam}.png`,buffer)


    //const resp = await fetch('http://127.0.0.1:9999/v1/face2emotion?file=human.jpg').catch(e=>{
    //    console.log('error',e)
    //})
    
    //const data = await resp.json()
    //console.log(data)

   
},5000)

setInterval(async ()=>{
    const cam = document.getElementById("cam")
    const canvas = document.getElementById('capture')
    //const canvas = createCanvas(640, 320)
    ctx = canvas.getContext("2d")
    canvas.width = 720;
    canvas.height = 480;    
    ctx.drawImage(cam,0,0,720,480)
    
    console.log(cam.width,cam.height)
    //const buffer = canvas.toDataURL("image/png");
    const blob = await new Promise(
        (resolve) => canvas.toBlob(blob => resolve(blob), "image/jpg", 0.8)
    );
    
    const buffer = new Buffer(await blob.arrayBuffer());
    fs.writeFile(`human.png`,buffer, async (err,out)=>{
        const out = await looksSame('human.png',`${id}//cam_${c_h}.png`)
        konsole('comp',out)
        if(!out.equal){
            execSync(`move human.png ${id}//cam_${++c_h}.png`)
            konsole(cnt, 'change human capture')
        }
    })

},30000)


webview.addEventListener('page-title-updated', (e) => {
    konsole('title',e)
    curTitle = e.title
    lastTime = Date.now()  
    webview.stopFindInPage('keepSelection')
})      

interval = setInterval(()=>{
    if(Date.now() - lastTime > 1000 && curTitle != lastTitle){
        lastTitle = curTitle
        history.push({ k : 'title', v : lastTitle, t : new Date() })
        //const audio = new Audio(`https://oe-sapi.circul.us/v1/tts?text=${curTitle} 페이지를 학습해 봅니다.&voice=${voice}`)
        //audio.play()

        const elem = document.querySelector('#assist ul[name=chats]')

        // tell(type, voice)
       
         const bot = document.createElement('li')
         bot.className = 'chat user'
         bot.innerHTML = `${curTitle} 페이지를 학습해 봅니다.`
         
         bot.onclick = e=>{
           tell(e.target.textContent)
         }

         elem.appendChild(bot)
         elem.scroll({ top: elem.scrollHeight }) //, behavior: "smooth"})
    }
},1000)


async function camera(evt){
    konsole('start camera','cam------------------------------------')
    if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia ){
        alert("Media Device not supported")
        return;
    }
      
    const devices = await navigator.mediaDevices.enumerateDevices()
  
    let deviceId = 0
  
    for (const dev of devices){
      if(dev.label.startsWith('USB Camera')){
        console.log(dev)
        deviceId = dev.deviceId
      }
    }
  
    //, deviceId: {  exact: deviceI }  

    navigator.mediaDevices.getUserMedia({video: {width: {exact: 720}, height: {exact: 480}}}).then(stream=>{

    //  document.getElementById("cam").style.display = 'block'
      const cam = document.getElementById("cam")
      cam.srcObject = stream
      console.log(cam.height, cam.width)

    }).catch(err=>{
      alert("카메라의 연결을 확인할 수 없습니다. 카메라를 다시 연결한 후 프로그램을 재 시작해 주십시오.")
    });
  
}

setTimeout(()=>{
    camera()
,1000})