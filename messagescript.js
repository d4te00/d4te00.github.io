document.addEventListener('DOMContentLoaded', function () {
    const personNameInput = document.querySelector('.person-name-input');
    const questionTextInput = document.querySelector('.question-text-input');
    const submitButton = document.querySelector('.submit-button');
    const imageSection = document.querySelector('.image-section');
    const buttonGroup = document.querySelector('.button-group');

    submitButton.addEventListener('click', async () => {
        const personName = personNameInput.value;
        const personNameReplace = personName.replace(/\s/g, '%20');
        const questionText = questionTextInput.value;
        const questionTextReplace = questionText.replace(/\s/g, '%20');

        let longUrl;
        if (questionText) {
            longUrl = `d4te00.github.io/personalized.html?name=${personNameReplace}&que=${questionTextReplace}`;
        } else {
            longUrl = `d4te00.github.io/personalized.html?name=${personNameReplace}`;
        }

        try {
            const response = await fetch('/shorten', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url: longUrl }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            imageSection.innerHTML = `<div class="link-box"><textarea class="link" id="link" type="text">${data.shortUrl}</textarea></div>`;
            buttonGroup.innerHTML = '<button onclick="copyLink()" class="copbtn" style="margin-left: 0px;">Copy link</button>';
        } catch (error) {
            console.error('Error shortening URL:', error);
            imageSection.innerHTML = `<div class="link-box"><textarea class="link" id="link" type="text">${longUrl}</textarea></div>`; // Fallback to long URL
        }
    });

    window.copyLink = function () {
        const copyText = document.querySelector('.link');
        if (copyText) {
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
    };
});