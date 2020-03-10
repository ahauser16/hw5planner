document.addEventListener("DOMContentLoaded", init);
/*
//runs once on page load
function init(){
	//add click listener to each button
	document.querySelectorAll("button").forEach(function(button) {
		button.addEventListener("click", handleClick));
	});
	//start time loop
	getTime();
}

function getTime(){
	let now = Date.now();
	let dayOfWeek = Moment.getDayFromDate(now);
	getData(dayOfWeek);
}

function getData(date){
	let data = localStorage.getItem(date);
	displayData(data);
}

function displayData(data){
	//render data to DOM...
}

function handleClick(e){
	//get text from textarea
	let text = "";
	//get day of week
	let dayOfWeek = "";
	//get time
	let time = "am10";
	//update data
	setData(dayOfWeek, time, text);
}
*/

function init(){
	setupListeners();
	controller();
}

function setupListeners(){
	//add click listener to each button
	document.querySelectorAll("button").forEach(function(button) {
		button.addEventListener("click", handleClick));
	});
}

function controller(){
	let date = getTime();
	let data = getData(date);
	displayData(data);
}

function getTime(){
	let timeToTopOfHour = 1000;
	setTimeout(controller, timeToTopOfHour);
	return Date.now();
}

function getData(date){
	return localStorage.getItem(date);
}
















