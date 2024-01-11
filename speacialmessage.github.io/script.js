const nameInput = document.getElementById('nameplaceholder');
const submitButton = document.getElementById('submitButton');
const shareableLink = document.getElementById('shareableLink');

// Remove the event listener that initially disabled the button:
// nameInput.addEventListener('input', () => {
//   submitButton.disabled = !nameInput.value.trim();
// });

submitButton.addEventListener('click', () => {
  const enteredName = nameInput.value;

  if (!enteredName.trim()) {
    alert("Please enter your name first."); // Prompt user for name if empty
    return;
  }

  const encodedName = encodeURIComponent(enteredName);
  const link = `message/${encodedName}`;
  shareableLink.textContent = `Share this link: ${link}`;
  shareableLink.style.display = 'block';
});
