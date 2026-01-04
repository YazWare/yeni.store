const body = document.body;
setInterval(() => {
  body.style.transform = `translate(${Math.random()*2-1}px, ${Math.random()*2-1}px)`;
}, 100);
