//THIS INTERACTS WITH ALL THE TABS AND ALL

//i dont think we actually set blocktime anywhere???
//also how does this check if the webpage is instagram??
chrome.storage.sync.get(['blockTime'], data => {
    //if it is still blocked
    if (data.blockTime) {
      alert(`Instagram is blocked for ${data.blockTime} minutes. Please come back later.`);
      document.body.style.backgroundColor = 'lightblue';
      window.location.href = 'https://google.com/'; // Redirect to a different page
    }
  });
  

//newer version from chatgpt
// Add an event listener to detect when a new page is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Check if the current page URL contains 'instagram.com'
  if (window.location.href.includes('instagram.com')) {
      // Fetch the 'blockTime' value from Chrome sync storage
      chrome.storage.sync.get(['blockTime'], data => {
          // Check if 'blockTime' is set (i.e., Instagram is blocked)
          if (data.blockTime) {
              // Show an alert indicating Instagram is blocked for 'blockTime' minutes
              alert(`Instagram is blocked for ${data.blockTime} minutes. Please come back later.`);
              // Redirect the user to google.com or another page of your choice
              window.location.href = 'https://google.com/'; 
          }
      });
  }
});
