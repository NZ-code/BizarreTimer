let last_start;
let elapsed_ms = 0;

let is_paused = false;
let is_stop_button = false;
let interval;


window.onload = function(){
    hide_mark();
    let play_button = document.getElementById("play_stop");
    play_button.onclick = function(){
        if(is_paused == false){
            last_start = Date.now();
            is_paused = true;
            if(is_stop_button == false){
                is_stop_button = true;
                addStopButton();
            }
            interval = setInterval(increment_time,10);
            play_button.src = "./images/pause.svg";
            
        }
        else{
            elapsed_ms = elapsed_ms + (Date.now() - last_start);
            is_paused = false;
            play_button.src = "./images/play.svg";
            clearInterval(interval);
        }
    }
    let input = document.getElementById("input_label");
    input.addEventListener(
        'input', ()=>{
            if(input.value.trim().length == 0){
                //hide_mark();
                console.log("hide");
            }
            else{
                //show_mark();
                console.log("show");
            }
        }
    )
   
}

function increment_time(){
    setTime();
}
// function to set <p> to time str.
function setTime(){
    const time = document.getElementById("stop_watch_time");
    let delta_time = Date.now() - last_start;
    delta_time += elapsed_ms;
    let sh_date = new Date();
    sh_date.setHours(0,0,0,0);
    sh_date.setMilliseconds(delta_time);
    
    let hoursStr = String(sh_date.getHours());
    if(hoursStr.length == 1){
        hoursStr = "0" + hoursStr
    }
    let minStr =  String(sh_date.getMinutes());
    if(minStr.length == 1){
        minStr = "0" + minStr
    }
    let secStr =  String(sh_date.getSeconds());
    if(secStr.length == 1){
        secStr = "0" + secStr
    }
    let millStr =  String(sh_date.getMilliseconds()).slice(0,2);   
    if(millStr.length == 1){
        millStr = "0" + millStr
    }
    if( hoursStr != "00"){
        time.innerText = hoursStr + ":" + minStr + ":" + secStr + ":" + millStr;
    }
    else{
        time.innerText =  minStr + ":" + secStr + ":" + millStr;
    }
   
}
function addStopButton(){
    let buttons_div = document.getElementById("buttons_section");
    let img_btn = document.createElement("img")
    img_btn.id = "stop_button";
    img_btn.src="./images/stop.svg";
    
    img_btn.onclick = function(){
        
        setDefault();
        
    }
    buttons_div.append(img_btn);
}
function setDefault(){
    elapsed_ms = 0;
    last_start = Date.now();
    is_paused = false;
    is_stop_button = false;
    time_mill = null;
    let play_button = document.getElementById("play_stop");
    play_button.src = "./images/play.svg";
    clearInterval(interval);
    removeStopButton();
    setTime(0);

}
function removeStopButton(){
    is_stop_button = false;
    let stop_btn = document.getElementById("stop_button")
    if(stop_btn != null){
        stop_btn.remove();
    }
    
    
}
// function show_mark(){
//     let img_check = document.getElementById("check_mark");
//     if(img_check!=null){
//         img_check.style.visibility = 'visible';
//     }
//     img_check.onclick = function(){
//         let input = document.getElementById("input_label");
//         input.blur();
//         hide_mark();
//     }
// }
// function hide_mark(){
//     let img_check = document.getElementById("check_mark");
//     if(img_check != null){
//         img_check.style.visibility = 'hidden';
//     }

   
// }