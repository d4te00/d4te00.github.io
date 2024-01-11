const msg = document.querySelector('.msg');
const urlpara = new URLSearchParams(window.location.search);
const name = urlpara.get('name');

msg.innerHTML = '<h1> Hey'+name+'</h1>';