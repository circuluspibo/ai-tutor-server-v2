const complete = new Audio(`./sound/complete.mp3`)

const stat = {
  pass : 0,
  fail : 0,
  key_pass : 0, 
  key_fail : 0,
  fastTime : 9999999999999999999999999999999999, // 기록
  slowTime : 0,
  duration : 0, // 총 시간
}

const items = [{"k":"a","v":"하나의"},{"k":"about","v":"-에 대하여"},{"k":"above","v":"-보다 위에"},{"k":"academy","v":"학원"},{"k":"accent","v":"말투"},{"k":"accident","v":"사건"},{"k":"across","v":"가로질러"},{"k":"act","v":"행동하다"},
{"k":"add","v":"추가하다"},{"k":"address","v":"주소"},{"k":"adult","v":"어른"},{"k":"adventure","v":"모험 "},{"k":"advise","v":"충고하다"},{"k":"afraid","v":"두려워하여"},{"k":"after","v":"나중에"},{"k":"afternoon","v":"오후"},
{"k":"again","v":"다시"},{"k":"against","v":"…에 반대하여"},{"k":"age","v":"나이"},{"k":"ago","v":"이전에"},{"k":"agree","v":"동의하다"},{"k":"ahead","v":"전방에"},{"k":"air","v":"공기"},{"k":"airplane","v":"비행기"},
{"k":"airline","v":"항공사"},{"k":"airport","v":"공항"},{"k":"all","v":"모든"},{"k":"almost","v":"거의"},{"k":"alone","v":"혼자"},{"k":"along","v":"-을 따라"},{"k":"aloud","v":"큰 소리로"},{"k":"already","v":"이미"},{"k":"alright","v":"좋은"},
{"k":"also","v":"또한"},{"k":"always","v":"항상"},{"k":"A.M.","v":"오전"},{"k":"and","v":"그리고"},{"k":"angel","v":"천사"},{"k":"anger","v":"화난"},{"k":"animal","v":"동물"},{"k":"another","v":"또 하나"},{"k":"answer","v":"대답하다"},
{"k":"ant","v":"개미"},{"k":"any","v":"어떤"},{"k":"apple","v":"사과"},{"k":"area","v":"지역"},{"k":"arm","v":"팔"},{"k":"around","v":"약"},{"k":"arrive","v":"도착하다"},{"k":"art","v":"예술"},{"k":"as","v":"같이"},{"k":"ask","v":"부탁하다"},
{"k":"at ","v":"에"},{"k":"aunt","v":"이모"},{"k":"away","v":"멀리"},{"k":"baby","v":"갓난아이"},{"k":"back","v":"등"},{"k":"background","v":"배경"},{"k":"bad","v":"나쁜"},{"k":"bake","v":"굽다"},{"k":"ball","v":"공"},{"k":"balloon","v":"풍선"},
{"k":"band","v":"악단"},{"k":"bank","v":"은행"},{"k":"base","v":"기초"},{"k":"baseball","v":"야구"},{"k":"basic","v":"기본의"},{"k":"basket","v":"바구니"},{"k":"basketball","v":"농구"},{"k":"bat","v":"방망이"},{"k":"bath","v":"목욕"},
{"k":"bathroom","v":"욕실"},{"k":"battery","v":"전지"},{"k":"battle","v":"전투"},{"k":"be","v":"-이다"},{"k":"beach","v":"해안"},{"k":"bean","v":"콩"},{"k":"bear","v":"곰"},{"k":"beauty","v":"아름다움"},{"k":"because","v":"왜냐하면"},
{"k":"become","v":"-이 되다"},{"k":"bed","v":"침대"},{"k":"bedroom","v":"침실"},{"k":"bee","v":"꿀벌"},{"k":"beef","v":"쇠고기"},{"k":"before","v":"앞에"},{"k":"begin","v":"시작하다"},{"k":"behind","v":"뒤에"},{"k":"believe","v":"믿다"},
{"k":"bell","v":"종"},{"k":"below","v":"아래에"},{"k":"beside","v":"-의 곁에"},{"k":"between","v":"사이에"},{"k":"bicycle","v":"자전거"},{"k":"big","v":"큰"},{"k":"bill","v":"계산서"},{"k":"bird","v":"새"},{"k":"birth","v":"출생"},
{"k":"birthday","v":"생일"},{"k":"bite","v":"물다"},{"k":"black","v":"검은"},{"k":"block","v":"덩어리"},{"k":"blood","v":"피"},{"k":"blue","v":"푸른"},{"k":"board","v":"널빤지"},{"k":"boat","v":"배"},{"k":"body","v":"신체"},
{"k":"bomb","v":"폭탄"},{"k":"bone","v":"뼈"},{"k":"book","v":"책"},{"k":"boot","v":"장화"},{"k":"borrow","v":"빌다"},{"k":"boss","v":"사장"},{"k":"both","v":"쌍방의"},{"k":"bottle","v":"병"},{"k":"bottom","v":"밑바닥"},
{"k":"bowl","v":"그릇"},{"k":"boy","v":"소년"},{"k":"brain","v":"뇌"},{"k":"brake","v":"브레이크"},{"k":"branch","v":"가지"},{"k":"brand","v":"상표"},{"k":"brave","v":"용감한"},{"k":"bread","v":"빵"},{"k":"break","v":"중단,휴식"},
{"k":"breakfast","v":"아침밥"},{"k":"bridge","v":"다리"},{"k":"bright","v":"밝은"},{"k":"bring","v":"가져오다"},{"k":"brother","v":"형제"},{"k":"brown","v":"갈색"},{"k":"brush","v":"솔,양치질하다"},{"k":"bubble","v":"거품,거품이 일다"},
{"k":"bug","v":"벌레"},{"k":"build","v":"짓다"},{"k":"burn","v":"불에 타다"},{"k":"business","v":"직업"},{"k":"busy","v":"바쁜"},{"k":"but","v":"그러나 다만 (-을)제외하고"},{"k":"button","v":"단추 단추를 채우다 단추로 채워지다"},
{"k":"buy","v":"사다"},{"k":"by","v":"곁에, 의해"},{"k":"cage","v":"새장"},{"k":"calendar","v":"달력"},{"k":"call","v":"부르다"},{"k":"calm","v":"평온한"},{"k":"can","v":"할 수 있다"},{"k":"candy","v":"사탕과자"},{"k":"cap","v":"모자"},
{"k":"captain","v":"우두머리"},{"k":"car","v":"자동차"},{"k":"care","v":"걱정"},{"k":"carrot","v":"당근"},{"k":"carry","v":"나르다"},{"k":"cart","v":"2륜마차"},{"k":"case","v":"경우"},{"k":"cash","v":"현금"},{"k":"castle","v":"성"},
{"k":"cat","v":"고양이"},{"k":"catch","v":"붙잡다"},{"k":"certain","v":"확신하는"},{"k":"chain","v":"사슬"},{"k":"chair","v":"의자"},{"k":"chance","v":"기회"},{"k":"change","v":"변화"},{"k":"cheap","v":"값싼"},{"k":"check","v":"점검하다"},
{"k":"child","v":"아이"},{"k":"choose","v":"고르다"},{"k":"church","v":"교회"},{"k":"cinema","v":"영화,극장"},{"k":"circle","v":"원"},{"k":"city","v":"도시"},{"k":"class","v":"수업,계급"},{"k":"classroom","v":"교실"},
{"k":"clean","v":"청소하다"},{"k":"clear","v":"맑은"},{"k":"clerk","v":"직원"},{"k":"clever","v":"영리한"},{"k":"climb","v":"기어 오르다"},{"k":"clip","v":"가위로 자르다"},{"k":"clock","v":"시계"},{"k":"close","v":"닫다"},{"k":"cloth","v":"천"},
{"k":"cloud","v":"구름"},{"k":"club","v":"클럽"},{"k":"coin","v":"화폐"},{"k":"cold","v":"추운"},{"k":"collect","v":"모으다"},{"k":"college","v":"단과대학"},{"k":"color","v":"색"},{"k":"come","v":"오다"},{"k":"comedy","v":"희극"},
{"k":"company","v":"회사"},{"k":"concert","v":"연주회"},{"k":"condition","v":"조건"},{"k":"congratulate","v":"축하하다"},{"k":"contest","v":"겨루다"},{"k":"control","v":"조정,통제"},{"k":"cook","v":"요리하다 요리사"},
{"k":"cookie","v":"쿠키"},{"k":"cool","v":"서늘한"},{"k":"copy","v":"사본,복사"},{"k":"corner","v":"모퉁이"},{"k":"cost","v":"가격"},{"k":"cotton","v":"목화"},{"k":"could","v":"할 수 있다"},{"k":"country","v":"나라"},
{"k":"countryside","v":"시골"},{"k":"couple","v":"한 쌍"},{"k":"cousin","v":"사촌"},{"k":"cover","v":"덮다"},{"k":"cow","v":"암소"},{"k":"crazy","v":"미친"},{"k":"cross","v":"십자형"},{"k":"crowd","v":"군중"},{"k":"crown","v":"왕관"},
{"k":"cry","v":"소리치다"},{"k":"culture","v":"문화"},{"k":"curious","v":"호기심 많은"},{"k":"curtain","v":"커어튼"},{"k":"customer","v":"고객"},{"k":"cut","v":"베다"},{"k":"cute","v":"귀여운"},{"k":"cycle","v":"순환"},
{"k":"dad","v":"아버지"},{"k":"dance","v":"춤"},{"k":"danger","v":"위험"},{"k":"dark","v":"어두운"},{"k":"date","v":"날짜"},{"k":"daughter","v":"딸"},{"k":"day","v":"낮"},{"k":"dead","v":"죽은"},{"k":"death","v":"죽음"},
{"k":"decide","v":"결정하다"},{"k":"deep","v":"깊은"},{"k":"delicious","v":"맛있는"},{"k":"dentist","v":"치과의사"},{"k":"design","v":"설계"},{"k":"desk","v":"책상"},{"k":"dialogue","v":"대화"},{"k":"diary","v":"일기"},
{"k":"die","v":"죽다"},{"k":"different","v":"다른"},{"k":"difficult","v":"곤란한"},{"k":"dinner","v":"저녁"},{"k":"dirty","v":"더러운"},{"k":"discuss","v":"토론하다"},{"k":"dish","v":"접시,음식"},{"k":"divide","v":"나누다"},
{"k":"do","v":"하다"},{"k":"doctor","v":"의사"},{"k":"dog","v":"개"},{"k":"doll","v":"인형"},{"k":"dolphin","v":"돌고래"},{"k":"door","v":"문"},{"k":"double","v":"2배의"},{"k":"down","v":"아래로"},{"k":"draw","v":"그리다,당기다"},
{"k":"dream","v":"꿈"},{"k":"drink","v":"마시다"},{"k":"drive","v":"운전하다"},{"k":"drop","v":"방울"},{"k":"dry","v":"마른"},{"k":"duck","v":"오리"},{"k":"during","v":"-동안에"},{"k":"ear","v":"귀"},{"k":"early","v":"이른"},
{"k":"earth","v":"지구"},{"k":"east","v":"동쪽"},{"k":"easy","v":"쉬운"},{"k":"eat","v":"먹다"},{"k":"egg","v":"알"},{"k":"elementary","v":"기본의"},{"k":"elephant","v":"코끼리"},{"k":"end","v":"끝"},{"k":"engine","v":"엔진"},
{"k":"engineer","v":"기사"},{"k":"enjoy","v":"즐기다"},{"k":"enough","v":"충분한"},{"k":"enter","v":"들어가다"},{"k":"eraser","v":"지우개"},{"k":"error","v":"잘못"},{"k":"evening","v":"저녁"},{"k":"every","v":"모든"},
{"k":"exam","v":"시험"},{"k":"example","v":"보기"},{"k":"exercise","v":"운동"},{"k":"exit","v":"출구"},{"k":"eye","v":"눈"},{"k":"face","v":"얼굴"},{"k":"fact","v":"사실"},{"k":"factory","v":"공장"},{"k":"fail","v":"실패하다"},
{"k":"fall","v":"떨어지다"},{"k":"family","v":"가족"},{"k":"famous","v":"유명한"},{"k":"fan","v":"(영화 등의)팬"},{"k":"fantastic","v":"환상적인"},{"k":"far","v":"멀리"},{"k":"farm","v":"농장"},{"k":"fast","v":"빠른"},{"k":"fat","v":"살찐"},
{"k":"father","v":"아버지"},{"k":"favorite","v":"마음에 드는"},{"k":"feel","v":"느끼다"},{"k":"fever","v":"열"},{"k":"field","v":"들"},{"k":"fight","v":"싸움"},{"k":"file","v":"파일,서류철"},{"k":"fill","v":"가득 채우다"},{"k":"find","v":"발견하다"},
{"k":"fine","v":"훌륭한"},{"k":"finger","v":"손가락, 손가락을 대다"},{"k":"finish","v":"끝내다"},{"k":"fire","v":"불"},{"k":"fish","v":"물고기"},{"k":"fix","v":"고치다"},{"k":"flag","v":"깃발"},{"k":"floor","v":"마룻바닥"},{"k":"flower","v":"꽃"},
{"k":"fly","v":"날다"},{"k":"focus","v":"초점"},{"k":"fog","v":"안개"},{"k":"food","v":"음식"},{"k":"fool","v":"바보"},{"k":"foot","v":"발"},{"k":"football","v":"축구"},{"k":"for","v":"위하여"},{"k":"forest","v":"숲"},{"k":"forever","v":"영원히"},
{"k":"forget","v":"잊다"},{"k":"form","v":"모양"},{"k":"fox","v":"여우"},{"k":"free","v":"자유로운"},{"k":"fresh","v":"새로운"},{"k":"friend","v":"친구"},{"k":"frog","v":"개구리"},{"k":"from","v":"부터"},{"k":"front","v":"정면"},
{"k":"fruit","v":"과일"},{"k":"fry","v":"기름으로 튀기다"},{"k":"full","v":"가득찬"},{"k":"fun","v":"재미"},{"k":"future","v":"미래"},{"k":"garden","v":"뜰"},{"k":"gate","v":"문,입구"},{"k":"gentleman","v":"신사"},{"k":"gesture","v":"몸짓"},
{"k":"get","v":"얻다"},{"k":"ghost","v":"유령"},{"k":"giant","v":"거인"},{"k":"gift","v":"선물"},{"k":"giraffe","v":"기린"},{"k":"girl","v":"소녀"},{"k":"give","v":"주다"},{"k":"glad","v":"기쁜"},{"k":"glass","v":"유리"},{"k":"glove","v":"장갑"},
{"k":"glue","v":"아교"},{"k":"go","v":"가다"},{"k":"goal","v":"목표,골"},{"k":"god","v":"신"},{"k":"gold","v":"금"},{"k":"good","v":"좋은"},{"k":"goodbye","v":"안녕히 가세요"},{"k":"grandfather","v":"할아버지"},{"k":"grape","v":"포도"},
{"k":"grass","v":"풀밭"},{"k":"great","v":"커다란"},{"k":"green","v":"초록색"},{"k":"grey","v":"회색의"},{"k":"ground","v":"땅"},{"k":"group","v":"집단"},{"k":"grow","v":"성장하다"},{"k":"guess","v":"예측하다"},{"k":"guide","v":"이끌다"},
{"k":"guy","v":"남자,녀석,놈"},{"k":"habit","v":"습관"},{"k":"hair","v":"머리털"},{"k":"hand","v":"손"},{"k":"handsome","v":"잘생긴"},{"k":"hang","v":"걸다"},{"k":"happy","v":"행복한"},{"k":"hard","v":"어려운"},{"k":"hat","v":"모자"},
{"k":"hate","v":"미워하다"},{"k":"have","v":"가지다"},{"k":"he","v":"그"},{"k":"head","v":"머리"},{"k":"headache","v":"두통"},{"k":"heart","v":"마음"},{"k":"heat","v":"열,열을 가하다"},{"k":"heaven","v":"하늘"},
{"k":"heavy","v":"무거운,엄청난"},{"k":"helicopter","v":"헬리콥터"},{"k":"hello","v":"안녕"},{"k":"help","v":"돕다"},{"k":"here","v":"여기에"},{"k":"hero","v":"영웅"},{"k":"high","v":"높은"},{"k":"hill","v":"언덕"},{"k":"history","v":"역사"},
{"k":"hit","v":"치다"},{"k":"hobby","v":"취미"},{"k":"hold","v":"갖고 있다"},{"k":"holiday","v":"휴일"},{"k":"home","v":"가정"},{"k":"homework","v":"숙제"},{"k":"honest","v":"정직한"},{"k":"honey","v":"꿀"},{"k":"hope","v":"희망"},
{"k":"horse","v":"말"},{"k":"hospital","v":"병원"},{"k":"hot","v":"뜨거운"},{"k":"hour","v":"시간"},{"k":"house","v":"집"},{"k":"how","v":"어떻게"},{"k":"however","v":"아무리,그러나"},{"k":"human","v":"인간의"},
{"k":"humor","v":"유우머"},{"k":"hundred","v":"100"},{"k":"hungry","v":"배고픈"},{"k":"hunt","v":"사냥하다"},{"k":"hurry","v":"서두르다.바쁨"},{"k":"husband","v":"남편"},{"k":"I","v":"나는, 내가"},{"k":"ice","v":"얼음"},
{"k":"idea","v":"생각"},{"k":"if","v":"만일 -이라면"},{"k":"important","v":"중요한"},{"k":"in","v":"-속에"},{"k":"inside","v":"안쪽"},{"k":"into","v":"-안으로"},{"k":"introduce","v":"안으로 "},{"k":"invite","v":"초대하다"},
{"k":"it","v":"그것은"},{"k":"jeans","v":"청바지"},{"k":"job","v":"일"},{"k":"join","v":"같이하다"},{"k":"joy","v":"즐거움"},{"k":"just","v":"이제 막,단지"},{"k":"keep","v":"계속하다"},{"k":"key","v":"열쇠"},{"k":"kick","v":"걷어차다"},
{"k":"kid","v":"아이"},{"k":"kill","v":"죽이다"},{"k":"kind","v":"친절한"},{"k":"king","v":"왕"},{"k":"kitchen","v":"부엌"},{"k":"knife","v":"나이프"},{"k":"know","v":"알다"},{"k":"lady","v":"숙녀"},{"k":"lake","v":"호수"},{"k":"land","v":"땅"},
{"k":"large","v":"큰"},{"k":"last","v":"마지막의"},{"k":"late","v":"늦은"},{"k":"lazy","v":"게으른"},{"k":"leaf","v":"잎"},{"k":"learn","v":"배우다"},{"k":"left","v":"왼쪽의"},{"k":"leg","v":"다리"},{"k":"lesson","v":"수업"},{"k":"letter","v":"편지"},
{"k":"library","v":"도서관"},{"k":"lie","v":"눕다"},{"k":"light","v":"빛"},{"k":"like","v":"좋아하다"},{"k":"line","v":"선,줄"},{"k":"lion","v":"사자"},{"k":"lip","v":"입술"},{"k":"listen","v":"듣다"},{"k":"little","v":"작은"},{"k":"live","v":"살다"},
{"k":"livingroom","v":"거실"},{"k":"long","v":"긴"},{"k":"look","v":"보다"},{"k":"love","v":"사랑"},{"k":"low","v":"낮은"},{"k":"luck","v":"행운"},{"k":"lunch","v":"점심"},{"k":"mad","v":"미친"},{"k":"mail","v":"우편물"},
{"k":"make","v":"만들다"},{"k":"man","v":"남자"},{"k":"many","v":"많은"},{"k":"map","v":"지도"},{"k":"marry","v":"결혼하다"},{"k":"mathematics","v":"수학"},{"k":"may","v":"아마도 ~이다"},{"k":"meat","v":"고기"},
{"k":"meet","v":"-을 만나다"},{"k":"memory","v":"기억"},{"k":"middle","v":"한복판의"},{"k":"might","v":"아마도 ~이다"},{"k":"milk","v":"우유"},{"k":"mind","v":"마음"},{"k":"mirror","v":"거울"},{"k":"miss","v":"실수하다"},
{"k":"money","v":"돈"},{"k":"monkey","v":"원숭이"},{"k":"month","v":"월"},{"k":"moon","v":"달"},{"k":"morning","v":"아침"},{"k":"mother","v":"어머니"},{"k":"mountain","v":"산"},{"k":"mouse","v":"쥐"},{"k":"mouth","v":"입"},
{"k":"move","v":"움직이다"},{"k":"movie","v":"영화"},{"k":"much","v":"많은"},{"k":"museum","v":"박물관"},{"k":"music","v":"음악"},{"k":"must","v":"-해야 한다"},{"k":"name","v":"이름"},{"k":"nation","v":"국가"},
{"k":"nature","v":"자연"},{"k":"near","v":"근처의"},{"k":"neck","v":"목"},{"k":"need","v":"필요하다"},{"k":"never","v":"결코 -아니다"},{"k":"new","v":"새로운"},{"k":"newspaper","v":"신문"},{"k":"next","v":"다음의"},
{"k":"nice","v":"좋은"},{"k":"night","v":"밤"},{"k":"no","v":"하나도 없는"},{"k":"noon","v":"정오"},{"k":"north","v":"북"},{"k":"nose","v":"코"},{"k":"not","v":"아니다"},{"k":"note","v":"공책"},{"k":"nothing","v":"아무것도 …없다"},
{"k":"now","v":"지금"},{"k":"number","v":"숫자"},{"k":"nurse","v":"간호사"},{"k":"ocean","v":"바다"},{"k":"of","v":"~의"},{"k":"off","v":"떨어져"},{"k":"office","v":"사무실"},{"k":"often","v":"자주"},{"k":"oil","v":"기름"},
{"k":"old","v":"늙은"},{"k":"on","v":"위에"},{"k":"one","v":"하나"},{"k":"only","v":"유일한"},{"k":"open","v":"열다"},{"k":"or","v":"혹은"},{"k":"out","v":"밖으로"},{"k":"over","v":"위쪽,끝난"},{"k":"paint","v":"도료,색칠하다"},
{"k":"palace","v":"궁전"},{"k":"pants","v":"바지"},{"k":"paper","v":"종이"},{"k":"parent","v":"부모"},{"k":"park","v":"공원"},{"k":"part","v":"부분"},{"k":"pass","v":"지나가다"},{"k":"pay","v":"지불하다"},{"k":"peace","v":"평화"},
{"k":"pear","v":"배"},{"k":"pencil","v":"연필"},{"k":"people","v":"사람들"},{"k":"pick","v":"줍다,고르다"},{"k":"picnic","v":"소풍"},{"k":"picture","v":"그림"},{"k":"pig","v":"돼지"},{"k":"pink","v":"연분홍색"},{"k":"place","v":"장소"},
{"k":"plan","v":"계획"},{"k":"play","v":"놀다"},{"k":"please","v":"제발 부탁합니다"},{"k":"P.M.","v":"오후"},{"k":"pocket","v":"포켓"},{"k":"point","v":"점"},{"k":"police","v":"경찰, 경비하다"},{"k":"poor","v":"가난한"},
{"k":"potato","v":"감자"},{"k":"power","v":"힘"},{"k":"present","v":"현재"},{"k":"pretty","v":"예쁜"},{"k":"prince","v":"왕자"},{"k":"print","v":"인쇄하다, 프린트하다"},{"k":"prize","v":"상"},{"k":"problem","v":"문제"},
{"k":"puppy","v":"강아지"},{"k":"push","v":"밀다"},{"k":"put","v":"놓다, 두다"},{"k":"puzzle","v":"퍼즐"},{"k":"queen","v":"여왕"},{"k":"question","v":"질문"},{"k":"quick","v":"빠른"},{"k":"quiet","v":"조용한"},
{"k":"rabbit","v":"토끼"},{"k":"race","v":"경주"},{"k":"rain","v":"비"},{"k":"rainbow","v":"무지개"},{"k":"read","v":"읽다"},{"k":"ready","v":"준비된"},{"k":"red","v":"붉은"},{"k":"remember","v":"기억하다"},{"k":"restaurant","v":"식당"},
{"k":"restroom","v":"화장실"},{"k":"return","v":"돌아가다"},{"k":"rich","v":"부유한"},{"k":"right","v":"올바른"},{"k":"ring","v":"반지"},{"k":"river","v":"강"},{"k":"road","v":"길"},{"k":"rock","v":"바위"},{"k":"roof","v":"지붕"},
{"k":"room","v":"방"},{"k":"run","v":"달리다"},{"k":"sad","v":"슬픈"},{"k":"safe","v":"안전한"},{"k":"sale","v":"판매"},{"k":"salt","v":"소금"},{"k":"same","v":"같은"},{"k":"sand","v":"모래"},{"k":"save","v":"구하다"},
{"k":"say","v":"말하다"},{"k":"school","v":"학교"},{"k":"science","v":"과학"},{"k":"scissors","v":"가위"},{"k":"score","v":"점수"},{"k":"sea","v":"바다"},{"k":"season","v":"계절"},{"k":"see","v":"보다"},{"k":"sell","v":"팔다"},
{"k":"send","v":"보내다"},{"k":"she","v":"그녀"},{"k":"ship","v":"배"},{"k":"shock","v":"충격"},{"k":"shoe","v":"구두"},{"k":"shop","v":"상점"},{"k":"short","v":"짧은"},{"k":"should","v":"해야한다"},{"k":"show","v":"보이다"},
{"k":"shy","v":"수줍은"},{"k":"sick","v":"병난"},{"k":"side","v":"쪽"},{"k":"sing","v":"노래하다"},{"k":"sister","v":"자매"},{"k":"sit","v":"앉다"},{"k":"size","v":"크기"},{"k":"skin","v":"피부"},{"k":"skirt","v":"치마"},{"k":"sky","v":"하늘"},
{"k":"sleep","v":"잠,잠자다"},{"k":"slow","v":"느린"},{"k":"small","v":"작은 "},{"k":"smart","v":"재치있는"},{"k":"smell","v":"냄새맡다"},{"k":"smile","v":"미소"},{"k":"snow","v":"눈"},{"k":"so","v":"그와 같이"},{"k":"soccer","v":"축구"},
{"k":"sock","v":"짧은 양말"},{"k":"soft","v":"부드러운"},{"k":"some","v":"조금"},{"k":"son","v":"아들"},{"k":"song","v":"노래"},{"k":"sorry","v":"미안한"},{"k":"sound","v":"소리"},{"k":"sour","v":"시큼한,상하다"},
{"k":"south","v":"남쪽 "},{"k":"space","v":"공간"},{"k":"speak","v":"이야기하다"},{"k":"speed","v":"속도"},{"k":"spoon","v":"숟가락"},{"k":"stand","v":"서다"},{"k":"start","v":"시작하다"},{"k":"stay","v":"머무르다"},
{"k":"stone","v":"돌"},{"k":"stop","v":"멈추다"},{"k":"store","v":"가게"},{"k":"story","v":"이야기"},{"k":"strawberry","v":"딸기"},{"k":"street","v":"거리"},{"k":"stress","v":"압박"},{"k":"strong","v":"강한"},{"k":"student","v":"학생"},
{"k":"study","v":"공부,공부하다"},{"k":"subway","v":"지하철"},{"k":"sugar","v":"설탕"},{"k":"sun","v":"태양"},{"k":"supper","v":"저녁식사"},{"k":"swim","v":"헤엄치다"},{"k":"table","v":"테이블"},{"k":"tail","v":"꼬리"},
{"k":"take","v":"잡다"},{"k":"talk","v":"말하다"},{"k":"tall","v":"키큰"},{"k":"tape","v":"테이프"},{"k":"taste","v":"맛"},{"k":"teach","v":"가르치다"},{"k":"teen","v":"10대"},{"k":"telephone","v":"전화"},{"k":"tell","v":"말하다"},
{"k":"test","v":"시험"},{"k":"textbook","v":"교과서"},{"k":"than","v":"-보다도"},{"k":"thank","v":"감사하다"},{"k":"that","v":"저것"},{"k":"the","v":"그"},{"k":"there","v":"거기에"},{"k":"they","v":"그들"},{"k":"thing","v":"물건"},
{"k":"think","v":"생각하다"},{"k":"thirst","v":"갈증"},{"k":"this","v":"이것"},{"k":"tiger","v":"호랑이"},{"k":"time","v":"시간"},{"k":"to","v":"-로"},{"k":"today","v":"오늘"},{"k":"together","v":"같이"},{"k":"tomorrow","v":"내일"},
{"k":"tonight","v":"오늘밤"},{"k":"too","v":"너무"},{"k":"tooth","v":"이"},{"k":"top","v":"꼭대기"},{"k":"touch","v":"닿다"},{"k":"tour","v":"여행"},{"k":"tower","v":"탑"},{"k":"town","v":"도시"},{"k":"toy","v":"장난감"},
{"k":"train","v":"기차"},{"k":"travel","v":"여행하다,여행"},{"k":"tree","v":"나무"},{"k":"triangle","v":"삼각형"},{"k":"trip","v":"여행"},{"k":"true","v":"진실"},{"k":"try","v":"노력하다"},{"k":"turn","v":"돌리다"},{"k":"twice","v":"두 번"},
{"k":"type","v":"형태"},{"k":"ugly","v":"추한"},{"k":"umbrella","v":"우산"},{"k":"uncle","v":"아저씨"},{"k":"under","v":"-아래에"},{"k":"understand","v":"이해하다"},{"k":"up","v":"위로"},{"k":"use","v":"쓰다"},
{"k":"vegetable","v":"채소"},{"k":"very","v":"매우"},{"k":"visit","v":"방문하다"},{"k":"voice","v":"목소리"},{"k":"wait","v":"기다리다"},{"k":"wake","v":"잠깨다"},{"k":"walk","v":"걷다"},{"k":"wall","v":"벽"},{"k":"want","v":"원하다"},
{"k":"war","v":"전쟁"},{"k":"warm","v":"따뜻한"},{"k":"wash","v":"씻다"},{"k":"watch","v":"보다"},{"k":"water","v":"물"},{"k":"watermelon","v":"수박"},{"k":"way","v":"길"},{"k":"we","v":"우리"},{"k":"wear","v":"입다"},
{"k":"weather","v":"날씨"},{"k":"wedding","v":"결혼"},{"k":"week","v":"일주일"},{"k":"weekend","v":"주말"},{"k":"weight","v":"무게"},{"k":"welcome","v":"환영하다"},{"k":"well","v":"잘"},{"k":"west","v":"서쪽"},
{"k":"wet","v":"축축한"},{"k":"what","v":"무엇"},{"k":"when","v":"언제"},{"k":"where","v":"어디에"},{"k":"white","v":"하얀색"},{"k":"who","v":"누구"},{"k":"why","v":"왜"},{"k":"wife","v":"아내"},{"k":"will","v":"~하다"},
{"k":"win","v":"이기다"},{"k":"wind","v":"바람"},{"k":"window","v":"창"},{"k":"wish","v":"바라다"},{"k":"with","v":"함께"},{"k":"woman","v":"여성"},{"k":"wood","v":"나무"},{"k":"word","v":"단어"},{"k":"work","v":"일"},
{"k":"world","v":"세계"},{"k":"worry","v":"걱정하다"},{"k":"write","v":"쓰다"},{"k":"wrong","v":"나쁜"},{"k":"year","v":"년"},{"k":"yellow","v":"노란색"},{"k":"yes","v":"예"},{"k":"yesterday","v":"어제"},{"k":"you","v":"너"},
{"k":"young","v":"젊은"},{"k":"zebra","v":"얼룩말"},{"k":"zoo","v":"동물원"}]

let point = 0
let item = null

let isFinish = false
let timeout = 0
let intv = 0

let level = 1
let step = 0
let down = 10 
const limit = [20,10,5]

let cnt = 0

let count = 0
let initTime = 0
let unfocusTime = 0

const state = [
  { level : -1, scores : []}, // [1/0,time, concent]
  { level : -1, scores : []},
  { level : -1, scores : []}
]

const chart = new Donutty( document.getElementById( "WORD_D" ),{ 
  color: "#2870b3",
  max : 20,
  value : 20,
  text: function(state) {
    return state.value
  }
})

/*
const pass = new Audio('/app/COLOR/sound/pass.mp3')
const fail = new Audio('/app/COLOR/sound/fail.mp3')
const complete = new Audio('/app/COLOR/sound/complete.mp3')
*/

const music = new Audio('/music/train.mp3')
music.volume = 0.5

export function create(){
  music.play()

  document.querySelectorAll(`#${_.id} ul > li`).forEach(elem=>{elem.className = ''})
  document.querySelectorAll(`#${_.id} ul > li`).forEach(elem=>{elem.textContent = ''})
  
  step = 0
  count = 0

  setLevel()
  
  isFinish = false

  const videoElement = $.query('video')
  canvasElement = $.query('canvas')
  canvasCtx = canvasElement.getContext('2d')

  $.faceMesh.onResults(onResults);

  $.camera = new Camera(videoElement, {
    onFrame: async () => {
      await $.faceMesh.send({image: videoElement});
    },
    width: 460,
    height: 250
  });
  $.camera.start()

  start()
}

export function destroy(){
  clearInterval(intv)
  music.pause()
  music.currentTime = 0
}

let target = 0
let startTime = 0

let lastTime = Date.now()

function start(isStep){
  startTime = Date.now()

  document.querySelector("tr[name=word]").innerHTML = ""
  
  step = 0
  point = 0
  unfocusTime = 0

  clearInterval(intv)

  if(isStep)
    setLevel()

  down = limit[level] 
  chart.set("value", down)   
  
  item = items.random()

  const eng = new Audio(`http://stg-tapi.circul.us/tts?text=${item.k}&lang=en`)
  eng.play()

  for(let i = 0 ; i < item.k.length ; i++){
    const td  = document.createElement('td')
    td.innerText = item.k.charAt(i).toUpperCase()

    let key = item.k.charAt(i).toUpperCase()
    if(item.k.charAt(i) == " ")
      key = "_"
    td.setAttribute('name',`_${i}_${key}`)
    document.querySelector("#WORD tr[name=word]").appendChild(td)
  }

  intv = setInterval(()=>{
    chart.set( "value", --down )

    if(down == 0){
      calc()
    }
  },1000) 

}

export function event(){

  document.querySelectorAll('#WORD table.bottom td').forEach(e=>{

    e.addEventListener('click',elem=>{
      console.log('keyclick',elem.target.textContent)
      let key = elem.target.textContent
   
      if(key == " ")
        key = "_"

      calc(elem,key)
    })
  
    e.addEventListener('mouseover',elem=>{
      console.log(elem.target.attributes.name.textContent, elem.target.textContent)
      const value = elem.target.textContent
    })
  })

  document.addEventListener('keypress',e=>{
    console.log(e)

    let key = e.key
   
    if(key == " ")
      key = "_"

    calc(elem,key)

    /*
    if(item.k[point] == e.key){
      const doc = document.querySelector(`#WORD td[name=_${point++}_${key}]`)
      const pass = new Audio('/app/COLOR/sound/pass.mp3')
      doc.classList.add('pass')
      pass.play()

      ++stat.key_pass

      if(point == item.k.length){
        const ko = new Audio(`https://s-tapi.circul.us/v1/tts?text=${item.v}`)
        ko.play()
        ++stat.pass
        complete.play()
        setTimeout(start,1000)
      }

    } else {
      ++stat.key_fail
      const fail = new Audio('/app/COLOR/sound/fail.mp3')
      fail.play()    
    }
    */

  })
}

pibo.ready = ()=>{

  //let serial = localStorage.getItem('robotId')

  pibo.init('c1546094','ops')

  pibo.receive('pibo',(data)=>{
    if(data.alive)
      document.querySelector(`#WORD button[name=robot]`).classList.add('alive')
    else
      document.querySelector(`#WORD button[name=robot]`).classList.remove('alive')
  }) 

  
  pibo.receive('editor', data=>{
    const point = data.value.split('_')[1]
    document.querySelectorAll("#WORD td.alive").forEach(obj=>obj.classList.remove("alive"));
    document.querySelector(`#WORD td[name="t_time|${point}"]`).className = 'active alive'
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

function onResults(results) {
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);
  if (results.multiFaceLandmarks) {
    //console.log(results.multiFaceLandmarks)
    //console.log('right,',FACEMESH_RIGHT_EYE)
    //console.log('left,',FACEMESH_LEFT_EYE)

    for (const landmarks of results.multiFaceLandmarks) {
      //console.log(landmarks)
      drawConnectors(canvasCtx, landmarks, FACEMESH_TESSELATION, {color: '#C0C0C070', lineWidth: 1});
      drawConnectors(canvasCtx, landmarks, FACEMESH_RIGHT_EYE, {color: '#30FF30'});
      drawConnectors(canvasCtx, landmarks, FACEMESH_RIGHT_EYEBROW, {color: '#30FF30'});
      drawConnectors(canvasCtx, landmarks, FACEMESH_RIGHT_IRIS, {color: '#30FF30'});
      drawConnectors(canvasCtx, landmarks, FACEMESH_LEFT_EYE, {color: '#3030FF'});
      drawConnectors(canvasCtx, landmarks, FACEMESH_LEFT_EYEBROW, {color: '#3030FF'});
      drawConnectors(canvasCtx, landmarks, FACEMESH_LEFT_IRIS, {color: '#3030FF'});
      drawConnectors(canvasCtx, landmarks, FACEMESH_FACE_OVAL, {color: '#E0E0E0'});
      drawConnectors(canvasCtx, landmarks, FACEMESH_LIPS, {color: '#FF3030'});
    }
  }
  canvasCtx.restore();
}

function setLevel(){
  let lv = 1
  let type = '중급'
  let passed = 0

  if(step != 0){
   
    for(const score of state[step - 1].scores){
      if(score[0] == true)
        passed += 1
    }

    if(passed == 10){
      lv = 2
      type = '상급'
    } else if(passed > 5){
      lv = 1
    } else { 
      type = '초급'
      lv = 0
    }
  }
  
  pibo.tell(`${type} 레벨로 게임을 시작해 볼게.`)

  $.query(`li[name=s${step}`).className = `lv${lv}`
  $.query(`li[name=s${step}`).textContent = type

  state[step].level = lv

  level = lv 
}

function calc(elem, key){
  const spendTime = Date.now() - startTime
  console.log(item.k[point],key)
  
  if(item.k[point].toUpperCase() == key){
    const doc = document.querySelector(`#WORD td[name=_${point++}_${key}]`)
    doc.classList.add('pass')

    const pass = new Audio('/app/COLOR/sound/pass.mp3')
    pass.play()

    if(point == item.k.length){
      clearInterval(intv)
      $.query(`li[name=t${count % 10}]`).className = 'pass'
      state[step].scores.push([true, spendTime,unfocusTime])

      const ko = new Audio(`https://s-tapi.circul.us/v1/tts?text=${item.v}`)
      ko.play()

      complete.play()
      setTimeout(next,1000)
    }


  } else if(elem != undefined){
    const fail = new Audio('/app/COLOR/sound/fail.mp3')
    fail.play()
    elem.target.className = 'animate__animated animate__flip fail'

    setTimeout(()=>{
        elem.target.className = ''
    },2000)
  } else {
    clearInterval(intv)
    $.query(`li[name=t${count % 10}]`).className = 'fail'
    state[step].scores.push([false, spendTime,unfocusTime])
    
    const fail = new Audio('/app/COLOR/sound/fail.mp3')
    fail.play()    
    setTimeout(next,1000)
  }
}

function next(){

  if(++count % 10 == 0){ // 단계 올림
    if(count == 30){
      const totalTime = Date.now() - initTime
      clearInterval(intv)
      console.log(totalTime, state)

      let pass_cnt = 0
      let fail_cnt = 0

      let pass_time = 0
      let fail_time = 0

      let stage = 0
      let advise = 0

      for(const step of state){
        stage += step.level
        for(const score of step.scores)
          if(score[0]){
            pass_cnt += 1
            pass_time += score[1]
          } else {
            fail_cnt += 1
            fail_time += score[1]
          }
      }

      let medal_img = ''
      let pass_img = ''
      let speed_img = ''
      let concent_img = 'step3'

      if(stage == 5){ // 훌륭
        advise = '금메달'
        medal_img = 'gold'
      } else if(stage == 4){ // 우수
        advise = '은메달'
        medal_img = 'silver'
      } else if(stage == 3){ // 보통
        advise = '동메달'
        medal_img = 'bronze'
      } else if(stage == 2){ // 미흡 
        advise = '노메달'
        medal_img = 'no'
      } else { 
        advise = '시합포기'
        medal_img = 'diagnosis'
      }

      const percent = pass_cnt * 100 / (pass_cnt + fail_cnt)

      if(percent > 80)
        pass_img = 'step3'
      if(percent > 60)
        pass_img = 'step2'
      else
        pass_img = 'step1'

      const time = pass_time / pass_cnt

      if(time < 5)
        speed_img = 'step3'
      else if(time < 10)
        speed_img = 'step2'
      else
        speed_img = 'step1'

      console.log(percent,time)

      document.querySelector('footer').style.visibility = 'visible' 
      document.querySelector('footer img.medal').src = `/image/${medal_img}.png`
      document.querySelector('footer span.score').src = advise

      document.querySelector('footer img.acc').src = `/image/${pass_img}.png`
      document.querySelector('footer img.spd').src = `/image/${speed_img}.png`
      document.querySelector('footer img.cct').src = `/image/${concent_img}.png`

      pibo.tell(`고생했어! ${Math.round(totalTime/1000)}초 동안, ${advise} 등급으로 게임을 마무리 했어. 총 30회 중에 평균 ${Math.round(pass_time / (30 * 1000))}초로 ${pass_cnt}회 성공했어. ${fail_cnt}회 실패했는데 다음번에 좀더 잘해보자!`)
      
      setTimeout($.exit,10000)

    } else {
      // 카운트
      document.querySelectorAll(`#${_.id} ul.check > li`).forEach(elem=>{elem.className = ''})

      ++step
      start(true) // 단계 소개
    }
  } else 
    start()
}