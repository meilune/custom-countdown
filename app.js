const newTitle = document.getElementById("title");
const newDate = document.getElementById("date-picker");
const countdownForm = document.getElementById("countdownForm");
const setDateContainer = document.getElementById("input-container");
const showCountdownContainer = document.getElementById("countdown");
const completeContainer = document.getElementById("complete");
const countdownBtn = document.getElementById("countdown-button");
const timeElements = document.querySelectorAll("span");

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
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    timeElements[0].textContent = days;
    timeElements[1].textContent = hours;
    timeElements[2].textContent = minutes;
    timeElements[3].textContent = seconds;
}

//Take Values from the Input
function updateCountdown(e) {
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    endDate = e.srcElement[1].value;
    console.log(countdownTitle, endDate);
    //Get number version of current date, update DOM
    countdownValue = new Date(endDate).getTime();
    console.log(countdownValue); 
    updateDOM();
}

//Event Listeners
countdownForm.addEventListener('submit', updateCountdown);

