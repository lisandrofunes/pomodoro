// function selectTheme(){
//     var selectedValue = document.getElementById("theme-list").value;
    
//     const container = document.getElementById("background")
//     container.setAttribute('style', 'background: var(' + selectedValue + ');');
// }


const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

function selectTheme(){
    var selectedValue = document.getElementById("theme-list").value;
    setTheme(selectedValue);
}

setTheme(localStorage.getItem('theme'))


let circularProgress = document.querySelector(".circular-progress"),
    progressValue = document.querySelector(".progress-value"),
    // dot = document.querySelector(".dot"),
    seconds = document.querySelector(".seconds"),
    minutes = document.querySelector(".minutes"),

    controls = document.querySelector(".controls"),
    btnStart = document.querySelector(".button");

let speed = 1,
    isPaused = false,
    cicle = 1;


let min = 25, sec = 0;

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
    run(0, 1500, 25, false, "progres", 0.24, 2);
}

function pause(){
    isPaused=true;
    
    const btnResume = document.querySelector(".btnPause");
    btnResume.innerHTML = 'Reanudar';
    btnResume.setAttribute("onclick", "resume()");
}

function resume(){
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
        run(0, 300, 5, false, "breakTime", 1.2, 1);
        cicle++;
    }else{
        run(0, 900, 15, false, "breakTime", 0.4, 3);
    }
}

function run(startValue, endValue, minTotal, paused, color, degrees, nextFunction){

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
                        break;
                }
            }    
        }
    }, speed);
}