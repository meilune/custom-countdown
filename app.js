const newTitle = document.getElementById("countdown-title");
const newDate = document.getElementById("date-picker");
const countdownForm = document.getElementById("countdownForm");
const setDateContainer = document.getElementById("input-container");
const showCountdownContainer = document.getElementById("countdown");
const completeContainer = document.getElementById("complete");
const countdownBtn = document.getElementById("countdown-button");
const timeElements = document.querySelectorAll("span");
const completeBtn = document.getElementById("complete-button");

//Set the global variables
let countdownTitle = "";
let endDate = "";
let countdownValue = Date;

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
    if(distance === 0 || distance < 0) {
        showCountdownContainer.style.display = "none";
        completeContainer.style.display = "block";
        timeElements[4].textContent = endDate;
    }
}

//Take Values from the Input
function updateCountdown(e) {
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    endDate = e.srcElement[1].value;
    countdownValue = new Date(endDate).getTime();

    //Setting the interval so that the countdown works:
    const myInterval = setInterval(updateDOM, 1000);
    function myStopFunction() {
    clearInterval(myInterval);
    }
}

//Refresh page when resetting the countdown
function refreshPage(){
    window.location.reload();
} 


//Event Listeners
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', refreshPage);
completeBtn.addEventListener('click', refreshPage);

