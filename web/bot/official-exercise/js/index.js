let intv

export function create(){
  clearInterval(intv)
  const user = document.querySelector('#official-exercise img[name=user]')

  console.log('>',user)

  pibo.extend('head_tilt', { pos : 'vup' } )
  pibo.pose_estimate()

  intv = setInterval(()=>{
    console.log('refresh')
    user.src = user.src + '?' + Date.now() 
    //user.setAttribute('img',`/temp/pose.jpg?t=${Date.now()}`)
  },500)
}