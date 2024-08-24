async function dadJoke(){
    //free api to get a dad joke, async function
    const resp = await fetch('https://icanhazdadjoke.com/slack')
    //get it in json format
    const result = await resp.json()
    //innerhtml is used to modify the content that lies between the tag
    document.getElementById("jokes").innerHTML = result.attachments[0].text;
}



const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const customTimeInput = document.getElementById('custom-time-input');
const timerText = document.getElementById('timer-text');

//if the start button is clicked
startButton.addEventListener('click', () => {
    dadJoke();
    // Enable the "Reset" button
    document.getElementById('reset').disabled = false; 
    const customTime = parseInt(customTimeInput.value, 10);
    
    if (customTime > 0 && !isNaN(customTime)) {
        // Replace input with non-editable span
        timerText.innerHTML = `<span id="timer-text">${formatTime(customTime * 60)}</span>`;
        
        // Hide input
        customTimeInput.style.display = 'none'; 
        
        // Send message to background script to start timer -->background has the actual logic
        chrome.runtime.sendMessage({ command: 'start', customTime: customTime });
    } else {
        alert('Please enter a valid number for the timer duration.');
    }
});

//stop button clicked
stopButton.addEventListener('click', () => {
    chrome.runtime.sendMessage({ command: 'stop' });
});

//reset button clicked
resetButton.addEventListener('click', () => {
    //FOR SOME REASON THIS IS NOT REAPPEARING
    customTimeInput.style.display = 'inline';
    timerText.innerHTML = `<span id="timer-text">HELOOOO</span>`; 
    chrome.runtime.sendMessage({ command: 'reset' });
});

//messages from the background script to update the timer display
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.timer) {
        document.getElementById('timer').textContent = message.timer;
    }
});

function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds}`;
}


