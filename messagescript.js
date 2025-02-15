const personNameInput = document.querySelector('.person-name-input');
const questionTextInput = document.querySelector('.question-text-input');
const submitButton = document.querySelector('.submit-button');
const infoText = document.querySelector('.info-text');
const imageSection = document.querySelector('.image-section');
const editSection = document.querySelector('.edit-section');
const buttonGroup = document.querySelector('.button-group');



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
    const shortenedUrl = shortenUrl(longUrl); // Use async/await for cleaner handling
    imageSection.innerHTML = `<div class="link-box"><textarea class="link" id="link" type="text">${shortenedUrl}</textarea></div>`;
  } catch (error) {
    console.error('Error shortening URL:', error);
    imageSection.innerHTML = `<div class="link-box"><textarea class="link" id="link" type="text">${longUrl}</textarea></div>`; // Fallback to long URL
  }

  buttonGroup.innerHTML = '<button onclick="myfunc()" class="copbtn" style="margin-left: 0px;">Copy link</button>';
});

function shortenUrl(longUrl) {
  const data = JSON.stringify({
    url: longUrl
  });
  
  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  
  xhr.addEventListener('readystatechange', function () {
    if (this.readyState === this.DONE) {
      console.log(this.responseText);
    }
  });
  
  xhr.open('POST', 'https://url-shortner10.p.rapidapi.com/lits.rocks/');
  xhr.setRequestHeader('x-rapidapi-key', '15b02a0080mshee03d283ef944c4p1cab0ejsn0522fd9c855c');
  xhr.setRequestHeader('x-rapidapi-host', 'url-shortner10.p.rapidapi.com');
  xhr.setRequestHeader('Content-Type', 'application/json');
  
  xhr.send(data);
  
}

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