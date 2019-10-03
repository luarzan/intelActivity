

var app = document.querySelector('.app');
let timerContainer = document.querySelector('.timer');
let timerActividad = document.querySelector('.timer-actividad');
let twittea = document.querySelector('.twittea');
let tweetsCounterDisplay = document.querySelector('.tweets-counter__text');
let tweetsCounterContainer = document.querySelector('.tweets-counter');
let tweetsCounterDisplayFinal = document.querySelector('.tweets-counter__text-final');
let overlay = document.querySelector('.overlay');
let textMain = document.querySelector('.text-container');
let firstText = `<p class="text-main">JUNTAS HACEMOS LA <br /> DIFERENCIA UTILIZA EL <br /> HASHTAG <span>#VOYSINMIEDO</span> Y DESCUBRE EL RESULTADO.</p>`
let secondText = `<p class="text-main" >ESTAS MUY CERCA DE LLEGAR A LA META, SIGUE UTILIZANDO  EL HASHTAG  <span>#VOYSINMIEDO</span></p>`
let finalText = `<p class="text-final" >UNIDAS SOMOS MÁS FUERTES, SÉ EL TIPO DE MUJER QUE HACE QUE OTRAS MUJERES QUIERAN TRIUNFAR </p>`
let tweetsCounter = 0;
let maxTweetsDisplay = 0;
let initTweet;
    
console.log(app.offsetWidth);
console.log(app.offsetHeight);
let currentDate;
let timer;
let timerTweeting;
let x;
let y;
let cards = [];
let tweetsShown = [];
let idShown = [];
let row = 0;
let column = 0;
let count = 0;
let output;
let rndPos;
let newID = [];
let isPlaying = true;
let tweets;
let arrayIDs = [];
let arrayDate = [];
let arryPos = [
    {
        x:1,
        y:1,
        posicionOcupada:false
    },
    {
        x:1,
        y:2,
        posicionOcupada:false
    },
    {
        x:1,
        y:3,
        posicionOcupada:false
    },
    {
        x:2,
        y:1,
        posicionOcupada:false
    },
    {
        x:2,
        y:2,
        posicionOcupada:false
    },
    {
        x:2,
        y:3,
        posicionOcupada:false
    },
    {
        x:3,
        y:1,
        posicionOcupada:false
    },
    {
        x:3,
        y:2,
        posicionOcupada:false
    },
    {
        x:3,
        y:3,
        posicionOcupada:false
    },
    {
        x:4,
        y:1,
        posicionOcupada:false
    },
    {
        x:4,
        y:2,
        posicionOcupada:false
    },
    {
        x:4,
        y:3,
        posicionOcupada:false
    }
]
var config = {
    headers:{
        'Authorization': 'token__here'
    }
}
const API = 'https://api.twitter.com/1.1/search/tweets.json?q=%23Meteorito';
window.onload = localStorage.clear();
const getData = api => {



if(isPlaying && window.navigator.onLine){
    fetch(api,config)
    .then(response => response.json())
    .then(response => {
      tweets = response.statuses;

      tweets.forEach((data) =>{
          arrayIDs.push({
              id:data.id_str,
              date:data.created_at 
            }
        )

      })

      output = tweets.map(tweet => { 
        return `
        <article class="Card">
        <h2>${tweet.text}</h2>
        <p class="Card-text">@${tweet.user.screen_name}</p>
        </article>
        `
      });
    
        checkId();
        getDate(currentDate);
    
    })
    .catch(error => console.log(error));

}
}
 const checkId = () =>{
     for(let i = 0;i<arrayIDs.length;i++){
         count = 0
         for(let j = 0;j<idShown.length;j++){
             if(arrayIDs[i].id === idShown[j]){
                count++
             }
         }
         if(count === 0 && newID.length < 12){
                 newID.push({
                     id:arrayIDs[i].id,
                     date:arrayIDs[i].date
                 }
                 )
             
         }
     }
      idShown = []
  }

const getDate = (currentDate) =>{
    for(let j = 0;j<arrayIDs.length;j++){
        idShown.push(arrayIDs[j].id)
    }
    for(let i = 0;i<newID.length;i++){
        console.log(currentDate)
        console.log(moment(arrayIDs[i].date))
         if(moment(arrayIDs[i].date).isAfter(currentDate)){
            app.insertAdjacentHTML('beforeend',output[i])
                tweetsCounter++
                tweetsCounterDisplay.innerHTML = tweetsCounter
                if(tweetsCounter >=6 && tweetsCounter <=9 ){
                    textMain.children[1].remove();
                    textMain.insertAdjacentHTML("beforeend",secondText)
                }
                rndPos = Math.floor(Math.random() * 12)
                while(arryPos[rndPos].posicionOcupada === true){
                      rndPos = Math.floor(Math.random() * 12)
                }
                app.children[i].style.gridRowStart = arryPos[rndPos].x
                app.children[i].style.gridColumnStart = arryPos[rndPos].y
                arryPos[rndPos].posicionOcupada = true;
             setTimeout(()=>{
                 app.children[0].remove() 
             },7000);

            console.log("ESTOY DESPUES");
         }else{
             console.log("ESTOY ANTES O SUPERE EL LIMITE");
         }
    }
    tweetsCounterDisplay.classList.add('animateCounter')
    freeSpace();
    arrayIDs = [];
    output = [];
    newID = [];
    tweetsCounterDisplay.classList.remove('animateCounter')
}

const freeSpace = () =>{
    for(let i = 0;i<12;i++){
        arryPos[i].posicionOcupada = false; 
    }
}

const temporizadorDinamica = () =>{
    overlay.style.transform = "translateY(0)";
    timerActividad.style.left = "-50rem";
    tweetsCounterContainer.style.left = "-50rem";
    tweetsCounterContainer.style.visibility = "hidden";  
    timerActividad.style.visibility = "hidden";
    if(tweetsCounter >= 15){
        textMain.children[1].remove();
        textMain.insertAdjacentHTML("beforeend",finalText)
    }else{

    }
    tweetsCounterDisplayFinal.innerHTML = tweetsCounter
    console.log("Termino El tiempo")
    isPlaying = false;
    arrayIDs = [];
    output = [];
    newID = [];
    freeSpace();
    clearInterval(initTweet)
    setTimeout(()=>{
        tweetsCounter = 0;
        overlay.style.transform = "translateY(-100rem)";
    },5000);
    
}

const temporizadorInicial = () =>{
    currentDate = moment();
    tempActivity.start();
    cronometroActividad(180)
    initTweeting();
}


var tempInit = new moment.duration(1000).timer({start:false},temporizadorInicial)

var tempActivity = new moment.duration(183000).timer({start:false},temporizadorDinamica)


const loadData = async() => {
     return await getData(API);
}


const initTweeting = () =>{
      initTweet = setInterval(loadData,5000);
  }
      
const startActivity = () =>{
    isPlaying = true;
    tempInit.start()
}

const stopApp = () =>{
    tempInit.stop()
}



const resetTemporizador = ()=>{
    clearInterval(timer)
}
const resetcronometroActividad = ()=>{
    clearInterval(timerTweeting)
}

const cronometroInicial = (time) =>{
    timerContainer.style.display = 'flex';
    let segundosTotales = time
    let s = document.getElementById('segundos');
    let m = document.getElementById('minutos');
     timer = setInterval(() => {
        segundosTotales--
        let mins = 0;
        let secs = segundosTotales;
        while(secs >= 60){
            mins++;
            secs -= 60;
        }
        if(mins<10){
            m.innerHTML = '0' + mins;
        }else{
            m.innerHTML = mins;
        }
        if(secs<10){
            s.innerHTML = '0' + secs;
        }else{
            s.innerHTML = secs;
        }

        if(secs === 0 && mins === 0){
            timerContainer.style.display = 'none';
            twittea.style.display = "block"
            resetTemporizador()
            startActivity();
          }
    },1000)
}

const cronometroActividad = (time) =>{
  timerActividad.style.visibility = "visible";
  tweetsCounterContainer.style.visibility = "visible";
  timerActividad.style.left = "5%";
  tweetsCounterContainer.style.left = "60%";
  setTimeout(()=>{
      twittea.style.display = "none"
  },5000)
  let segundosTotalesActividad = time
  let s = document.getElementById('segundos-actividad');
  let m = document.getElementById('minutos-actividad');
  timerTweeting = setInterval(() => {
    segundosTotalesActividad--
      let mins = 0;
      let secs = segundosTotalesActividad;
      while(secs >= 60){
          mins++;
          secs -= 60;
      }
      if(mins<10){
          m.innerHTML = '0' + mins;
      }else{
          m.innerHTML = mins;
      }
      if(secs<10){
          s.innerHTML = '0' + secs;
      }else{
          s.innerHTML = secs;
      }

      if(secs === 0 && mins === 0){
          resetcronometroActividad()
        }
  },1000)
}


const initApp = () =>{
    tweetsCounterDisplay.innerHTML = tweetsCounter
    textMain.children[1].remove();
    textMain.insertAdjacentHTML("beforeend",firstText)
    cronometroInicial(60);
} 


       initApp();
       setInterval(initApp,300000)
