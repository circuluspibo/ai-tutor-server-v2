let isFinish = false

export function create(){
  isFinish = false
  pibo.talk('날씨 좀 알려줘')
}

export function talk(recv){
  console.log('talk',recv)
  isFinish = true
  //$.query('section[name=text]').textContent = data.text.replace(/(<([^>]+)>)/ig,"")

  const text = recv.text.replace(/(<([^>]+)>)/ig,"")
  const data = recv.data

  $.query('img').src = `/app/WEATHER/image/${data.sky ? data.sky : data.skyPm}.png`
  $.query('h1[name=location]').textContent = data.locationKeyword
  $.query('h1[name=pm10]').textContent = data.pm10[0]
  $.query('h1[name=pm25]').textContent = data.pm25[0]
  $.query('h1[name=temp]').textContent = `${data.temp ? data.temp : data.tempMax}°C`

}

export function finish(data){
  console.log('finish',data)
  if(isFinish)
    setTimeout($.exit,1500)
}


/*

 {"key":"talk","value":{"q":"날씨 좀 알려줘","a":" 서울특별시 금천구 가산동 현재 기온은 28°C, 하늘에서 비가 내려. 측정소 이상으로 미세먼지와 초미세먼지 정보를 알 수 없어. 파이보는 비 오는 날씨도 좋아해. ","text":"<speak> 서울특별시 금천구 가산동 현재 기온은 <sub alias='이십팔'>28</sub><sub alias='도'>°C</sub>, 하늘에서 비가 내려. 측정소 이상으로 미세먼지와 초미세먼지 정보를 알 수 없어. 파이보는 비 오는 날씨도 좋아해. </speak>","bot":"OFFICIAL_WEATHER","cmd":"weather","data":{"locationKeyword":"서울특별시 금천구 가산동","pm10":[null,"측정소 이상"],"pm25":[null,"측정소 이상"],"type":"00","temp":"28","sky":"rain","hash":"43970af2a197c09825b4fc71b9d678ec"},"date":1659944753644}}
pibo.js:67 true true


*/