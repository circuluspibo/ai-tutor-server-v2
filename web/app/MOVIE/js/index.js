let isFinish = false

export function create(){
  isFinish = false
  pibo.talk('영화순위 알려줘')
}

export function talk(recv){
 // console.log('talk',data)
  isFinish = true
  //$.query('section[name=text]').textContent = data.text.replace(/(<([^>]+)>)/ig,"")
  console.log('talk',recv)
  isFinish = true
  //$.query('section[name=text]').textContent = data.text.replace(/(<([^>]+)>)/ig,"")

  const text = recv.text.replace(/(<([^>]+)>)/ig,"")
  const data = recv.data

  $.query('h1[name=movie0]').textContent = data.list[0].name
  $.query('i[name=date0]').textContent = data.list[0].date
  $.query('i[name=count0]').textContent = data.list[0].audience

  $.query('h1[name=movie1]').textContent = data.list[1].name
  $.query('i[name=date1]').textContent = data.list[1].date
  $.query('i[name=count1]').textContent = data.list[1].audience

  $.query('h1[name=movie2]').textContent = data.list[2].name
  $.query('i[name=date2]').textContent = data.list[2].date
  $.query('i[name=count2]').textContent = data.list[2].audience
  
  fetch(`/v1/content/image?q=${data.list[0].name} 포스터`).then((response) => response.json()).then(resp => {
    let hasItem = false
    for(const item of resp.data){
      if(item.width < 900 && item.height < 1200 && item.width > 600 && item.height > 800){
        hasItem = true
        $.query('img[name=movie0]').src = item.url
        //setImage($.query('img[name=movie0]'),item.url)
        return
      }
    }

    if(!hasItem)
      $.query('img[name=movie0]').src = resp.data[1].url    
  })

  fetch(`/v1/content/image?q=${data.list[1].name} 포스터`).then((response) => response.json()).then(resp => {
    let hasItem = false
    for(const item of resp.data){
      if(item.width < 900 && item.height < 1200 && item.width > 600 && item.height > 800){
        hasItem = true
        $.query('img[name=movie1]').src = item.url
        //setImage($.query('img[name=movie1]'),item.url)
        return
      }
    }

    if(!hasItem)
        $.query('img[name=movie1]').src = resp.data[1].url
  })

  fetch(`/v1/content/image?q=${data.list[2].name} 포스터`).then((response) => response.json()).then(resp => {
    let hasItem = false
    for(const item of resp.data){
      if(item.width < 900 && item.height < 1200 && item.width > 600 && item.height > 800){
        hasItem = true
        $.query('img[name=movie2]').src = item.url
        //setImage($.query('img[name=movie2]'),item.url)
        return
      }
    }

    if(!hasItem)
      $.query('img[name=movie2]').src = resp.data[1].url

  })    
}

export function finish(data){
  console.log('finish',data)
  if(isFinish)
    setTimeout($.exit,1500)
}

/*
function setImage(image, url){
//const image = document.getElementById('my-image');

    // Get the remote image as a Blob with the fetch API
    fetch(url)// {mode: 'no-cors'}
        .then((res) => res.blob())
        .then((blob) => {
            // Read the Blob as DataURL using the FileReader API
            const reader = new FileReader();
            reader.onloadend = () => {
                console.log(reader.result);
                // Logs data:image/jpeg;base64,wL2dvYWwgbW9yZ...

                //image.src = reader.result
                // Convert to Base64 string
                //const base64 = getBase64StringFromDataURL(reader.result);
                image.src=`image/jpeg;base64,${reader.result}`
                //console.log(base64);
                // Logs wL2dvYWwgbW9yZ...
            };
            reader.readAsDataURL(blob);
        });  
}


function startDownload(url) {
  let imageURL = url //"https://cdn.glitch.com/4c9ebeb9-8b9a-4adc-ad0a-238d9ae00bb5%2Fmdn_logo-only_color.svg?1535749917189";

  downloadedImg = new Image();
  downloadedImg.crossOrigin = "Anonymous";
  downloadedImg.addEventListener("load", imageReceived, false);
  downloadedImg.src = imageURL;
}

function imageReceived() {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  canvas.width = downloadedImg.width;
  canvas.height = downloadedImg.height;

  const dataURL =canvas.toDataURL("image/jpeg")
  const base64 = getBase64StringFromDataURL(dataURL);

  //context.drawImage(downloadedImg, 0, 0);
  //imageBox.appendChild(canvas);

  try {
    //localStorage.setItem("saved-image-example", canvas.toDataURL("image/jpeg"));
  } catch (err) {
    console.error(`Error: ${err}`);
  }
}
*/