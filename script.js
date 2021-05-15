if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}


let intervals = [];
let times = 1;
let counter = 0;
let stop = false;

function changeWorkout(){
  document.getElementById("home").style.display = "none";
  document.getElementById("edit").style.display = "block";
  document.getElementById("currentWorkout").innerHTML = displayWorkout();
}

function startWorkout(){
  document.getElementById("home").style.display = "none";
  document.getElementById("timer").style.display = "block";
  stop = false;
  //if(intervals.length > 0){
    doWorkout();
  //}
}

function back(page){
  document.getElementById(page).style.display = "none";
  document.getElementById("home").style.display = "block";
  document.getElementById("prompt").style.display = "none";
  document.getElementById("workout").innerHTML = displayWorkout();
  stop = true;
}

function addInterval(){
  let prompt = document.getElementById("prompt");
  prompt.style.display = "block";
  let output = "Workout<br>";
  output += "<input id='wname' type='text' placeholder='Name..'><br>";
  output += "<input id='wtime' type='text' placeholder='Time (seconds)'><br>";
  output += "<button class='bruhton' onclick='addWorkout()'>Add Workout</button><br><br>";
  output += "Break<br>";
  output += "<input id='btime' type='text' placeholder='Time (seconds)'><br>";
  output += "<button class='bruhton' onclick='addBreak()'>Add Break</button><br><br>";
  prompt.innerHTML = output;

}

function addWorkout(){
  let prompt = document.getElementById("prompt");
  var w = {name: document.getElementById("wname").value, time: document.getElementById("wtime").value};
  intervals.push(w);
  console.log(intervals);
  prompt.style.display = "none";
  document.getElementById("currentWorkout").innerHTML = displayWorkout();
}

function addBreak(){
  let prompt = document.getElementById("prompt");
  var b = {name: "Break", time: document.getElementById("btime").value};
  intervals.push(b);
  console.log(intervals);
  prompt.style.display = "none";
  document.getElementById("currentWorkout").innerHTML = displayWorkout();
}

function repeat(){
  times++;
  document.getElementById("currentWorkout").innerHTML = displayWorkout();
}

function nopeat(){
  if(times > 1){
    times--;
    document.getElementById("currentWorkout").innerHTML = displayWorkout();
  }
}

function remove(){
  intervals = [];
  document.getElementById("currentWorkout").innerHTML = displayWorkout();
}

async function doWorkout(){
  console.log("do workout");
  let work = document.getElementById("currentInterval");
  let time = document.getElementById("currentTime");
  
  
  
  for(let t = 0; t < times; t++){
    
    
    for(let i = 0; i < intervals.length; i++){
      let ctime = parseInt(intervals[i].time);
      work.innerHTML = "<br><br>" + intervals[i].name + "<br><br>";
      time.innerHTML = ctime;
      
      
      
      for(let j = 0; j <= ctime; j++){
        if(stop){
          break;
        }
        time.innerHTML = ctime - j;
        console.log(ctime-j);
        await sleep(1000);
      }
      if(stop){
        break;
      }
      
    }//for intervals
    if(stop){
      break;
    }
    
  }//for times
  
  work.innerHTML = "Done!";
  
}



function countdown(div, num){
  div.innerHTML = (num-1);
}

function displayWorkout(){
  let output = "<br><br><br><u>Current Workout</u><br><br><br>";
  
  if(intervals.length == 0){
    output += "...<br>";
  }
  
  for(let i = 0; i < intervals.length; i++){
    output += intervals[i].name + " for " + intervals[i].time + " seconds<br><br>";
  }
  
  output += "<br>" + times + " Time(s)";
  
  return output;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
