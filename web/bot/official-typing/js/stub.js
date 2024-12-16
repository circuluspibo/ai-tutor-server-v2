// stub for local testing
// css load
const css = document.createElement("link")
css.setAttribute("rel", "stylesheet")
css.setAttribute("type", "text/css")
css.setAttribute("href", `./css/index.css`)
document.getElementsByTagName("head")[0].appendChild(css)  

// script load
import(`./index.js`).then(script=>{
  script.event()
  script.create()
})


