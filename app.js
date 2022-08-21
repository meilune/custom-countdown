const newTitle = document.getElementById("countdown-title");
const newDate = document.getElementById("date-picker");
const countdownForm = document.getElementById("countdownForm");
const setDateContainer = document.getElementById("input-container");
const showCountdownContainer = document.getElementById("countdown");
const completeContainer = document.getElementById("complete");
const countdownBtn = document.getElementById("countdown-button");
const timeElements = document.querySelectorAll("span");
const completeBtn = document.getElementById("complete-button");
const completeInfo = document.getElementById("complete-info");

//Set the global variables
let countdownTitle = "";
let endDate = "";
let countdownValue = Date;

let savedCountdown = {};

//Set the calendar min date so that the earlier date can not be chosen
let today = new Date().toISOString().split("T")[0];
newDate.setAttribute('min', today);

function updateDOM() {
    const now = new Date().getTime();
    const distance = countdownValue - now;
    //Setting variables for countdown times
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    //Adding values to the existing template
    timeElements[0].textContent = days;
    timeElements[1].textContent = hours;
    timeElements[2].textContent = minutes;
    timeElements[3].textContent = seconds;
    newTitle.textContent = countdownTitle;
    //Displaying the template
    setDateContainer.style.display = "none";
    showCountdownContainer.style.display = "block";
    //Display Complete template if the countdown finished
    if(distance <= 0) {
        showCountdownContainer.style.display = "none";
        completeContainer.style.display = "block";
        completeInfo.textContent = `${countdownTitle} finished on ${endDate}`;
    }
}

//Take Values from the Input
function updateCountdown(e) {
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    endDate = e.srcElement[1].value;

    //Saving in Local Storage the object of countdown
    savedCountdown = {
        title: countdownTitle,
        date: endDate
    }
    localStorage.setItem("countdown", JSON.stringify(savedCountdown));

    //Check if the date is selected, else get the number of the date
    if (endDate === ""){
        alert("Please select your due date in the calendar.")
    } else {
        countdownValue = new Date(endDate).getTime();

        //Setting the interval so that the countdown works:
        const myInterval = setInterval(updateDOM, 1000);
        function myStopFunction() {
        clearInterval(myInterval);
        }
    } 
}

//Refresh page when resetting the countdown
function refreshPage(){
    window.location.reload();
} 

function restorePrevCount() {
    //Get countdown from Local Storage if available
    if(localStorage.getItem("countdown")) {
        countdownForm.style.display = "none";
        savedCountdown = JSON.parse(localStorage.getItem("countdown"));
        countdownTitle = savedCountdown.title;
        endDate = savedCountdown.date;
        showCountdownContainer.style.display = "block";
        countdownValue = new Date(endDate).getTime();
        const myInterval = setInterval(updateDOM, 1000);
        function myStopFunction() {
        clearInterval(myInterval);
        } 
    }
}

//Event Listeners
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', refreshPage);
completeBtn.addEventListener('click', refreshPage);

//On load check local storage
restorePrevCount()