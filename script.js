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

let speed = 1;

let min = 25, sec = 0;
    
function start(){

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
    
    let progressStartValue = 0,
    progressEndValue = 1500, //25min = 1500seg
    isPaused = false;

    let progress = setInterval(() => {

        if(!isPaused){
            progressStartValue++;

            // dot.setAttribute('style', 'animation: rotate ' + 10 + 's linear;')
            // dot.setAttribute('style', `transform: rotate(${progressStartValue * 3.6}deg);`)

            if (sec === 0) {
                min--;
                sec = 60;
            }
            sec--;
            if (min === 0) {
                
                // hourValue--;
            }

            seconds.textContent = sec < 10 ? `0${sec}` : sec;
            minutes.textContent = min < 10 ? `0${min}` : min;

            // progressValue.textContent = `${progressStartValue}%`

            //360°/60=6 por segundo aumenta 6° - 360°/(25*60)=0.24
            circularProgress.style.background = `conic-gradient(var(--progres) ${progressStartValue * 0.24}deg, transparent 0deg)`

            if(progressStartValue == progressEndValue){
                clearInterval(progress);
                breakTime();
            }    

        }
        
    }, speed);

}

function pause(){
    isPaused=true
    
    const btnResume = document.querySelector(".btnPause");
    btnResume.innerHTML = 'Reanudar';
    btnResume.setAttribute("onclick", "resume()")
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
    var cicle = 1;
    
    if(cicle < 5){
        min = 5
        progressStartValue = 0;
        progressEndValue = 300;
        let progress = setInterval(() => {

            if(!isPaused){
                progressStartValue++;

                if (sec === 0) {
                    min--;
                    sec = 60;
                }
                sec--;
                if (min === 0) {
                    // hourValue--;
                }

                seconds.textContent = sec < 10 ? `0${sec}` : sec;
                minutes.textContent = min < 10 ? `0${min}` : min;

                // progressValue.textContent = `${progressStartValue}%`

                //360°/60=6 por segundo aumenta 6° - 360°/(5*60)=1.2
                circularProgress.style.background = `conic-gradient(var(--breakTime) ${progressStartValue * 1.2}deg, transparent 0deg)`

                if(progressStartValue == progressEndValue){
                    clearInterval(progress);
                }    
            }
        }, speed);

        cicle++;
        start();
    }
}