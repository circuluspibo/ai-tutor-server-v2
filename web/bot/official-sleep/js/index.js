const music = [
  '01 브람스 - 자장가 (관현악 편곡).mp3',
  '06 하이든 - 교향곡 8번 `저녁` 2악장.mp3',
  '12 바흐 - 피아노 협주곡 BWV.1056 2악장.mp3',
  '14 바흐 - 평균율 1권 中 1번 전주곡.mp3',
  "16 베토벤 - 피아노 소나타 14번 '월광' 1악장.mp3"
]

function shuffle(array) { array.sort(() => Math.random() - 0.5); }

let audio = new Audio(`/bot/official-sleep/music/${music[0]}`)

export function create(){
  shuffle(music)
  audio = new Audio(`/bot/official-sleep/music/${music[0]}`)
  audio.play()
}

export function destroy(){
  audio.pause()
}

