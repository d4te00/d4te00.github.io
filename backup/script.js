const wrapper = document.querySelector('.wrapper');
const question = document.querySelector('.question');
const fade = document.querySelector('.fade');
const bgvid = document.querySelector('.bgvid');
const sbg = document.querySelector('.sbg');
const image = document.querySelector('.image');
const rmbtn = document.querySelector('.btn-group')
const yesBtn = document.querySelector('.yes-btn');
const noBtn = document.querySelector('.no-btn');
const wrapperRect = wrapper.getBoundingClientRect();
const noBtnRect = noBtn.getBoundingClientRect();
const edi = document.querySelector('.edi');
const urlpara = new URLSearchParams(window.location.search);
const name = urlpara.get('name');
const que = urlpara.get('que'); // Retrieve the 'que' value

if (que) {
  edi.innerHTML = '<h1 class="question">Hey ' + name + '</h1>' + '<p class="fade">' + que + '</p>'; // Include 'que' in the output
} 
else {
  edi.innerHTML = '<h1 class="question">Hey</h1>' + '<p class="fade">Do you wanna go out with me?</p>';
}

yesBtn.addEventListener('click', () => {
    question.innerHTML = ' ';
    question.style.zIndex =  10;
    question.style.color = 'red';
    wrapper.style.background = '#ffffff00';
    bgvid.style.opacity = '1';
    sbg.style.opacity = '1';
    fade.innerHTML = ' ';
    image.innerHTML = ' ';
    rmbtn.innerHTML = ' ';
    edi.innerHTML = ' ';
});
noBtn.addEventListener('mouseover', () => {
    const i = Math.floor(Math.random() * (wrapperRect.width - noBtnRect.width)) + 1;
    const j = Math.floor(Math.random() * (wrapperRect.height - noBtnRect.height)) + 1;
    noBtn.style.left = i + 'px';
    noBtn.style.top = j + 'px';
});