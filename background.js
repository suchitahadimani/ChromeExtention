let countdown;
let time = 0; 
let storedTime = 0;

//message listener which redirects each message to the appropriate function call
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.command === 'start') {
        startTimer(message.customTime);
    } else if (message.command === 'stop') {
        stopTimer();
    } else if (message.command === 'reset') {
        resetTimer();
    }
});

function startTimer(customTime) {
    if (customTime > 0) {
        time = customTime * 60; // Convert custom time from minutes to seconds
        clearInterval(countdown); // Clear any existing intervals

        if (storedTime > 0) {
            time = storedTime; // Resume the timer from the stored time
            storedTime = 0; // Reset the stored time
        }

        countdown = setInterval(() => {
            if (time > 0) {
                time--;
                updatePopup();
            } else {
                completeTimer(); // Handle the completion of the timer
            }
        }, 1000);
    }
}

function stopTimer() {
    clearInterval(countdown);
    storedTime = time;
    // Do not reset the time variable here to allow the timer to resume from where it was paused
}

function resetTimer() {
    clearInterval(countdown);
    time = 0; 
    storedTime = 0;
    storedTime = 0;
    updatePopup(); // Update the popup with the new time   

}

function completeTimer() {
    clearInterval(countdown); 
}

function updatePopup() {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    chrome.runtime.sendMessage({ timer: `${minutes}:${seconds}` });
}
