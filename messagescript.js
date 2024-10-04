const personNameInput = document.querySelector('.person-name-input');
const questionTextInput = document.querySelector('.question-text-input');
const submitButton = document.querySelector('.submit-button');
const infoText = document.querySelector('.info-text');
const imageSection = document.querySelector('.image-section');
const editSection = document.querySelector('.edit-section');
const buttonGroup = document.querySelector('.button-group');

// Function to handle URL shortening using a suitable URL shortener API (replace with your preferred API)
function shortenUrl(longUrl) {
  // Replace with your chosen API endpoint and parameters
  const apiUrl = 'https://api-ssl.bitly.com/v4/Boa34Q1uf8I/shorten'; // Replace with actual API URL
  const apiKey = 'c752661b2c964bc0e6965a910defee99e984b53b'; // Replace with your actual API key

  return fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ long_url: longUrl, api_key: apiKey }),
  })
    .then(response => response.json())
    .then(data => data.short_url) // Extract the shortened URL from the response
    .catch(error => {
      console.error('Error shortening URL:', error);
      return longUrl; // Return long URL if shortening fails
    });
}

submitButton.addEventListener('click', async () => {
  const personName = personNameInput.value;
  const personNameReplace = personName.replace(/\s/g, '%20'); // Encode spaces for URL
  const questionText = questionTextInput.value;
  const questionTextReplace = questionText.replace(/\s/g, '%20');

  infoText.innerHTML = ' ';
  editSection.innerHTML = `<p>Share this link to ${personName}</p>`;

  let longUrl;
  if (questionText) {
    longUrl = `d4te00.github.io/personalized.html?name=${personNameReplace}&que=${questionTextReplace}`;
  } else {
    longUrl = `d4te00.github.io/personalized.html?name=${personNameReplace}`;
  }

  try {
    const shortenedUrl = await shortenUrl(longUrl); // Use async/await for cleaner handling
    imageSection.innerHTML = `<div class="link-box"><textarea class="link" id="link" type="text">${shortenedUrl}</textarea></div>`;
  } catch (error) {
    console.error('Error shortening URL:', error);
    imageSection.innerHTML = `<div class="link-box"><textarea class="link" id="link" type="text">${longUrl}</textarea></div>`; // Fallback to long URL
  }

  buttonGroup.innerHTML = '<button onclick="myfunc()" class="copbtn" style="margin-left: 0px;">Copy link</button>';
});

function myfunc() {
  const copyText = document.querySelector('.link');

  if (copyText) { // Ensure the element exists
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value)
      .then(() => {
        alert("Link Copied");
      })
      .catch((error) => {
        console.error("Error copying link:", error);
      });
  }
}