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

//Setting variable for the countdown object to be saved in the LocalServer
let savedCountdown = {};

//Set the calendar min date so that the earlier date can not be chosen
let today = new Date().toISOString().split("T")[0];
newDate.setAttribute('min', today);

//Function that clears the interval so it can be restarted again
function myStopFunction() {
    clearInterval();
    }

//Function that updates the DOM with information for countdown or complete templates
function updateDOM() {
    //get the time value of the current date
    const now = new Date().getTime();
    //Calculate the amount of time between due date and current date
    const distance = countdownValue - now;

    //Display Complete template if the countdown finished
    if(distance <= 0) {
        showCountdownContainer.style.display = "none";
        completeContainer.style.display = "block";
        completeInfo.textContent = `${countdownTitle} finished on ${endDate}`;
    } else {
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
    }
}

//Take Values from the Input
function updateCountdown(e) {
    //Prevent page from refreshing when the button is clicked
    e.preventDefault();
    //Source the values from the event
    countdownTitle = e.srcElement[0].value;
    endDate = e.srcElement[1].value;

    //Saving in Local Storage the object of countdown
    savedCountdown = {
        title: countdownTitle,
        date: endDate
    }
    //Saving the items in object format
    localStorage.setItem("countdown", JSON.stringify(savedCountdown));

    //Check if the date is selected, else get the number of the date
    if (endDate === ""){
        alert("Please select your due date in the calendar.")
    } else {
        countdownValue = new Date(endDate).getTime();

        //Setting the interval so that the countdown moves backwards:
        const myInterval = setInterval(updateDOM, 1000);
        myStopFunction(myInterval);
    } 
}

//Refresh page when resetting the countdown
function refreshPage(){
    window.location.reload();
    localStorage.clear();
} 

function restorePrevCount() {
    //Get countdown from Local Storage if available
    if(localStorage.getItem("countdown")) {
        //If there is an existing countdown, show the respective template
        countdownForm.style.display = "none";
        //Getting items from the storage
        savedCountdown = JSON.parse(localStorage.getItem("countdown"));
        //Assigning values from the stored object
        countdownTitle = savedCountdown.title;
        endDate = savedCountdown.date;
        showCountdownContainer.style.display = "block";
        //Loading the function so that countdown works
        countdownValue = new Date(endDate).getTime();
        const myInterval = setInterval(updateDOM, 1000);
        myStopFunction(myInterval);
    }
}

//Event Listeners
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', refreshPage);
completeBtn.addEventListener('click', refreshPage);

//On load check local storage
restorePrevCount()