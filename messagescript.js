const personNameInput = document.querySelector('.person-name-input');
const questionTextInput = document.querySelector('.question-text-input');
const submitButton = document.querySelector('.submit-button');
const infoText = document.querySelector('.info-text');
const imageSection = document.querySelector('.image-section');
const editSection = document.querySelector('.edit-section');
const buttonGroup = document.querySelector('.button-group');

submitButton.addEventListener('click', () => {
  const personName = personNameInput.value;
  const questionText = questionTextInput.value;
  infoText.innerHTML = ' ';
  editSection.innerHTML = '<p>Share this link to '+personName+'</p> ';
  if (questionText) {
    imageSection.innerHTML = '<div class="link-box">' + '<textarea class="link" id="link" type="text">' + 'd4te00.github.io/personalized.html?name=' + personName + '&que=' + questionText + '</textarea>' + '</div>';
  } else {
    imageSection.innerHTML = '<div class="link-box">' + '<textarea class="link" id="link" type="text">' + 'd4te00.github.io/personalized.html?name=' + personName + '</textarea>' + '</div>';
  }
  buttonGroup.innerHTML = '<button onclick="myfunc()" class="copbtn" style="margin-left: 0px;">Copy link</button> ';
});

function myfunc() {
  const copyText = document.querySelector('.link');

  if (copyText) { // Ensure the element exists
    copyText.select();
    copyText.setSelectionRange(0,99999);
    navigator.clipboard.writeText(copyText.value)
      .then(() => {
        alert("Link Copied");
      })
      .catch((error) => {
        console.error("Error copying link:", error);
      });
  }
}
