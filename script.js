//set default theme
if(localStorage.getItem('theme') == null ){
    localStorage.setItem('theme', '--default');
}
// console.log(localStorage.getItem('theme'))
// 

var items = document.querySelectorAll(".dropdown-item"),
    tab = [], index;

// add values to the array
for(var i = 0; i < items.length; i++){
    tab.push(items[i].innerHTML);
}

// get selected element index
for(var i = 0; i < items.length; i++){
    items[i].onclick = function(){
        setTheme(this.id)
    };
}

//set theme
const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

setTheme(localStorage.getItem('theme'))


let circularProgress = document.querySelector(".circular-progress"),
    progressValue = document.querySelector(".progress-value"),
    seconds = document.querySelector(".seconds"),
    minutes = document.querySelector(".minutes"),
    controls = document.querySelector(".controls"),
    btnStart = document.querySelector(".button"),
    state = document.querySelector(".state"),

    speed = 1000,
    isPaused = false,
    isBreakTime = false,
    isUltimateBreakTime = false,
    cicle = 1,
    
    min = 25, sec = 0;

var soundStart = new Audio();
soundStart.src = "sounds/notification-start.mp3";
var soundEnd = new Audio();
soundEnd.src = "sounds/notification-end.mp3";
var soundFinish = new Audio();
soundFinish.src = "sounds/notification-finish.mp3";


function preStarter(){
    const btnPause = document.createElement('button');
    btnPause.className = 'button btnPause';
    btnPause.innerHTML = 'Pausa';
    btnPause.setAttribute("onclick", "pause()")

    const btnRestart = document.createElement('button');
    btnRestart.className = 'button btnRestart';
    btnRestart.innerHTML = 'Reiniciar';
    btnRestart.setAttribute("onclick", "restart()")

    btnStart.style.display = "none";
    controls.appendChild(btnPause);
    controls.appendChild(btnRestart);

    start();
}
    
function start(){
    isBreakTime = false
    updateState('En Ejecución');
    soundStart.play();
    run(0, 1500, 25, false, "progres", 0.24, 2);
}

function pause(){
    isPaused=true;
    
    const btnResume = document.querySelector(".btnPause");
    btnResume.innerHTML = 'Reanudar';
    btnResume.setAttribute("onclick", "resume()");

    updateState('En Pausa');

}

function resume(){
    if(isUltimateBreakTime){
        updateState('Último Descanso')
    }else{
        isBreakTime ? updateState('Descanso'): updateState('En Ejecución');
    }

    isPaused=false;

    const btnPause = document.querySelector(".btnPause");
    btnPause.innerHTML = 'Pausa';
    btnPause.setAttribute("onclick", "pause()")
}

function restart(){
    location.reload();
}

function breakTime(){

    if(cicle < 4){
        isBreakTime = true;
        updateState('Descanso');
        soundEnd.play()
        run(0, 300, 5, false, "breakTime", 1.2, 1);
        cicle++;
    }else{
        isUltimateBreakTime = true;
        updateState('Último Descanso');
        soundEnd.play()
        run(0, 900, 15, false, "breakTime", 0.4, 3);
    }
}

function run(startValue, endValue, minTotal, paused, color, degrees, nextFunction){

    // isBreakTime ? soundEnd.play() : soundStart.play();


    let progressStartValue = startValue,
        progressEndValue = endValue;
    
    min = minTotal

    isPaused = paused
    let progress = setInterval(() => {

        if(!isPaused){
            progressStartValue++;

            if (sec === 0) {
                min--;
                sec = 60;
            }
            sec--;

            seconds.textContent = sec < 10 ? `0${sec}` : sec;
            minutes.textContent = min < 10 ? `0${min}` : min;

            //360°/60=6 por segundo aumenta 6° - 360°/(25*60)=0.24
            circularProgress.style.background = `conic-gradient(var(--${color}) ${progressStartValue * degrees}deg, transparent 0deg)`

            if(progressStartValue == progressEndValue){
                clearInterval(progress);

                switch(nextFunction){
                    case 1:
                        start();
                        break;
                    case 2:
                        breakTime();
                        break;
                    case 3:
                        updateState('Ciclo completado');
                        soundFinish.play();
                        const btnPause = document.querySelector(".btnPause");
                        btnPause.style.display = 'none';
                        break;
                }
            }    
        }
    }, speed);
}

function updateState(text){
    state.innerHTML = text;
    state.animate([
        { opacity: '0' },
        { opacity: '.5' }
      ], {
        duration: 1000,
    });
}

const toastTrigger = document.getElementById('liveToastBtn')
const toastLiveExample = document.getElementById('liveToast')
if (toastTrigger) {
  toastTrigger.addEventListener('click', () => {
    const toast = new bootstrap.Toast(toastLiveExample)

    toast.show()
  })
}