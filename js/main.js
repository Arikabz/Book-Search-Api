//Example fetch using pokemonapi.co
document.querySelector('button').addEventListener('click', getFetch);
var bknm = Number(localStorage.getItem('number'))
const image = document.querySelector('img');
if(bknm ==undefined||bknm == 0){
  bknm = 1;
  localStorage.setItem('number',bknm)
}
for(i=1;i<bknm;i++){
  const li = document.createElement('li')
        li.textContent = localStorage.getItem(`book n${i}`)
        document.querySelector('ul').appendChild(li)
}
function getFetch(){
  const choice = document.querySelector('input').value
  console.log(choice)
  const url = `https://openlibrary.org/isbn/${choice}.json`
  fetch(url)
      .then(res => {
      console.log(res)
      if(res.status=='404'){
        document.querySelector('#err').innerText = '404 - Not Found'
        image.src = ''
      }
      else{
        document.querySelector('#err').innerText = ''
        return res.json()
      }
      
      }) // parse response as JSON
      .then(data => {
        console.log(data)
        
        if(data.full_title!== undefined){
          checkRepeat(data,choice);
        }
        else if (data.full_title==undefined){
          checkRepeat(data,choice,true)
        }
        if(data.covers){
          image.src = `https://covers.openlibrary.org/b/id/${data.covers[0]}.jpg`
        }
        else{
          image.alt = 'No Picture';
          image.src = '';
        
        }

      })
      
      .catch(err => {
          console.log(`error ${err}`)
      });
}


function checkRepeat(data,isbn,noSubtitle=false){
  var repeated = false
  var title = `ISBN:${isbn}; ${data.full_title}`;
  if(noSubtitle==true){
    title = `ISBN:${isbn}; ${noFullTitle(data)}`;
  }
  //check if it's been queried by ISBN
for (i=0;i<bknm;i++){
  var currentIsbn = localStorage.getItem(`book n${i}`)
  if(title == currentIsbn){
    repeated = true
    }
  }
  if(!repeated){
    localStorage.setItem(`book n${bknm}`,title)
    const li = document.createElement('li')
        li.textContent = title
        document.querySelector('ul').appendChild(li)
      bknm += 1;
      localStorage.setItem('number',bknm)


  }
}

function noFullTitle(data){
  return data.title+checkSubtitle(data);
}
function checkSubtitle(data){
  if(data.subtitle!==undefined){
    return `: ${data.subtitle}`
  }
  else{
    return ''
  }
}

//add image of cover 

//display error 404

//not found isbn 0528023748

//display stored books in alphabetical order