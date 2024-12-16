const axios = require('axios')
//const Josa = require("josa-js")

let step = 0
let game = 1
const name = '철수'

exports.bot = async (param, api) => {
  const BOT = api.bot.getCurrentBot()
  logger.info(BOT,`step, ${step} / state, ${JSON.stringify(param.state)}`)




  if(param.state.cmd == '_NO'){
    let data = param.dialog
    
    if(data)
      logger.info(BOT,JSON.stringify(data))
    //if(!data)
    //  resp = await axios.get(`${_[ENV].NAPI}/think`, { params : { q : param.state.text, lang : 'ko', robotId : $.robotId}})
    //logger.info('BOT',`resp, ${JSON.stringify(resp.data.data)}`)

    const disp = []
    if(data.emotion)
      disp.push(`${step} ${data.emotion[0].label}`)
    else 
      disp.push(`${step} none`)

    if(data.sentiment){
      //api.play.joy()
      disp.push('GOOD!')
    } else {
      //api.play.bad()
      disp.push('-BAD-')
      ++step
    }
    
    api.heart(disp)
  } else {
    api.heart(['Play>','역할놀이'])
  }

  dialog()
}

function dialog(){
  const name = api.bus.nickName
  switch(step){
    case 0:
      $('dialog', true) // { name: Josa.r(api.bus.nickName, "을/를") }
      pibo.tell(api.message.get('st1_1',{ name }), { play : '/home/pi/pibo-resource/sound/human.mp3'})
      game = 1 // 진행행할 게임 선택
      pibo.tell(api.message.get(`st2_${game}_1`))
      pibo.tell(api.message.get(`st2_${game}_2`), { play : '/media/usb/thunder.mp3'})
      break;
    case 1:
      pibo.tell(api.message.get(`st2_${game}_3`), { play : '/media/usb/thunder.mp3'})
      pibo.tell(api.message.get(`st2_${game}_4`))
      break;
    case 2: //
      pibo.tell(api.message.get(`st2_${game}_5`), { play : '/media/usb/carol.mp3'})
      pibo.tell(api.message.get('st3_1', { name }))
      break;
    case 3:
      pibo.tell(api.message.get('st3_2'), { play : `${_[ENV].RAPI}/v1/stream/quiz/1`, eye : 'happy'})
      break;
    case 4:
      pibo.tell(api.message.get('st3_3'), { play : `${_[ENV].RAPI}/v1/stream/quiz/0`})
      step += 2
      dialog()
      break
    case 5:
      pibo.tell(api.message.get('st3_4'))
      break;
    case 6:
      pibo.tell(api.message.get('st3_5'), { play : `${_[ENV].RAPI}/v1/stream/quiz/1`, eye : 'happy'})
      break;
    case 7:
      pibo.tell(api.message.get('st3_6'), { play : `${_[ENV].RAPI}/v1/stream/quiz/0`, eye : 'sad'})
      step += 2
      dialog()
      break;
    case 8:
      pibo.tell(api.message.get('st3_7',{ name }))
      step += 1
      dialog()
      break;
    case 9:
      pibo.tell(api.message.get('st3_8'), { play : `${_[ENV].RAPI}/v1/stream/quiz/1`, eye : 'happy'})
      break;
    case 10:
      pibo.tell(api.message.get('st3_9'), { play : `${_[ENV].RAPI}/v1/stream/quiz/0`, eye : 'sad'})
      step += 2
      dialog()
      break;
    case 11:
      pibo.tell(api.message.get('st3_10', { name }))
      step += 1
      dialog()
      break;
    case 12:
      pibo.tell(api.message.get('st3_11'), { play : `${_[ENV].RAPI}/v1/stream/quiz/1`, eye : 'happy'})
      break;
    case 13:
      pibo.tell(api.message.get('st3_12'), { play : `${_[ENV].RAPI}/v1/stream/quiz/0`, eye : 'sad'})
      step += 2
      dialog()
      break;
    case 14:
      pibo.tell(api.message.get('st3_13',{ name }))
      step += 1
      dialog()
      break;
    case 15:
      pibo.tell(api.message.get('st3_14', { name }), { play : `${_[ENV].RAPI}/v1/stream/quiz/1`, eye : 'happy'})
      break;
    case 16:
      pibo.tell(api.message.get('st3_15', { name }), { play : `${_[ENV].RAPI}/v1/stream/quiz/0`, eye : 'sad'})
      step += 2
      dialog()
      break;
    default:
      step = 0
      pibo.tell(api.message.get('st3_16',{ name }), { play : `${_[ENV].RAPI}/v1/stream/quiz/2`})
      $('bot',false)  //봇 종료
      $('dialog', false)
      return
  }

  step++  
}


exports.end = (param, api)=>{
  $('dialog', false)
}
