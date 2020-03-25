/* WHEN I open the planner, these are called "lifecycle functions" */
document.addEventListener("DOMContentLoaded", init);

/* runs once when page is loaded ***************************************/
function init(){
  	//save button UI
	setupListeners();
  	/* THEN the saved events persist ... retrieve from localStorage */
	let schedule = getData(); //schedule is an object with ten key-value pairs
	displayData(schedule);
  	//update background colors for timeblocks
	controller();
}

function setupListeners(){
	//add click listener to each button
	document.querySelectorAll("button").forEach(function(button) {
		button.addEventListener("click", handleClick);
	});
}

/* runs once when page is loaded AND at the top of every hour *****************************/

function controller(){
  	let date = getTime();
  	/* THEN the current day is displayed at the top of the calendar */
  	displayCalendarDay(date.current);
  	/* THEN each timeblock is color coded to indicate whether it is in the past, present, or future */
  	updateTimeblockColors(date.timeblock);
  	/* call controller again at the top of the next hour */
  	setTimeout(controller, date.msToTopOfHour);
}

/* runs when user clicks a save button **********************************/
//AJH EDITS BELOW THIS LINE
function handleClick(event){
	/* THEN the text for that event is saved in local storage */

	  //get the button that was clicked
	  //Q: how is target being used and what does it refer to here?
  	let thisButton = event.target;
  	//get the textarea for that row
	  
	  /*
        <div id="hour-9" class="row time-block">
          <div class="col-md-1 hour">
            1AM
          </div>
          <textarea class="col-md-10 description"></textarea>
          <button class="btn saveBtn col-md-1"><i class="fas fa-save"></i> </button>
        </div>
    */

	  //let thisTextarea = thisButton.previousElementSibling;
	  //Q: what's the logic behind this below?   
	  
  	let thisParent = thisButton.parentElement;
  	let thisTextarea = thisParent.querySelector("textarea");
  	//get the text in that textarea
  	let thisText = thisTextarea.value;
  	//get the timeblock value (e.g., "hour-9" or "hour-11")
  	let thisTimeblock = thisParent.id;
  	//save the text to localstorage
  	saveData(thisTimeblock, thisText);
}


/* view functions *************************************/

function displayCalendarDay(dateString){
  	/*
      <header class="jumbotron">w
          <h1 class="display-3">Work Day Scheduler</h1>
          <p class="lead">A simple calendar app for scheduling your work day</p>
          <p id="currentDay" class="lead"></p>
      </header>
    */
  	document.querySelector("#currentDay").textContent = dateString;
}

function updateTimeblockColors(currentTimeblock){ //currentTimeblock is "hour-11" for example
  	var inFuture = false;
  	for (let i=9; i<=17; i++){
      	let key = "hour-" + i;
      	let textarea = document.querySelector("#" + key + " textarea");
      	if (key === currentTimeblock){
          	textarea.classList.remove("past", "future");
          	textarea.classList.add("present");
          	inFuture = true;
        }
      	else {
          	//does not match currentTimeblock, so are we before it (past) or after it (future)?
          	if (inFuture){
              	textarea.classList.remove("past", "current");
              	textarea.classList.add("future");
            }
          	else {
              	textarea.classList.remove("current", "future");
              	textarea.classList.add("past");
            }
        }
    }
}

function displayData(schedule){ 
	console.log(schedule);
  	//schedule is an object with ten key-value pairs
  	//loop through schedule
  	for (let key in schedule){
      	let hourlyAppointments = schedule[key];
      	//assign value to textarea of each timeblock
      	//document.querySelector("#" + key + " textarea").value = hourlyAppointments;
      	let div = document.querySelector("#" + key);
      	let textarea = div.querySelector("textarea");
      	textarea.value = hourlyAppointments;
    }
}
/*
function getTime(){  DEPENDENCY: moment.js 
  	
    	return data structure with:w
        -- current date (e.g., "Thursday, December 5th")
        -- current timeblock (e.g., e.g., "hour-9" or "hour-11")
        -- milliseconds until top of the hour
    
   let current = moment().format("dddd, MMMM Do, YYYY"); //e.g., "Monday, December 5th, 2019"
   let timeblock = "hour-" + moment().format("H"); //military time hour, e.g. "hour-13"
   let minutesLeft = 60 - Number(moment().format("mm"));
   let secondsLeft = 60 - Number(moment().format("ss"));
   let msToTopOfHour = minutesLeft * 1000 * 60 + secondsLeft * 1000;
   
   return {
	 current, timeblock,
	   msToTopOfHour: 3000
 };
}
*/

/* system functions (time and memory) ***********************************/

function getTime(){
  	/*
    	return data structure with:
        -- current date (e.g., "Thursday, December 5th")
        -- current timeblock (e.g., e.g., "hour-9" or "hour-11")
        -- milliseconds until top of the hour
    */
  	return {
    	current: "Friday, November 2020",
      	timeblock: "hour-14",
      	msToTopOfHour: 9000
    };
}

function saveData(key, value){
  	//what if there's no localstorage???
	localStorage.setItem(key, value);
}

function getData(){
  	//runs once on page load; return schedule for entire day (all 8 code blocks)
  	//what if there's no localstorage???
  	let schedule = {};
  	for (let i=9; i<=17; i++){
      	let key = "hour-" + i;
        let timeblock = localStorage.getItem(key) || ""; //OR part: what if no data have been stored yet???
      	//if (!timeblock) timeblock = "";
      	schedule[key] = timeblock;
    }
	//return localStorage.getItem(key);
  	return schedule; //schedule is an object with ten key-value pairs
}

