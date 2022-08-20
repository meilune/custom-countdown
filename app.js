const newTitle = document.getElementById("title");
const newDate = document.getElementById("date-picker");
const countdownForm = document.getElementById("countdownForm");
const setDateContainer = document.getElementById("input-container");
const showCountdownContainer = document.getElementById("countdown");
const completeContainer = document.getElementById("complete");

let today = new Date().toISOString().split("T")[0];
newDate.setAttribute('min', today);

let endDate = "";

function newDateChoice() {
    endDate = this.value; // Update newSelectedDate value.
    console.log(endDate); // Now has a string.
}

newDate.addEventListener('change', newDateChoice);

