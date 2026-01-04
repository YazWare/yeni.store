const container = document.getElementById("vhs-container");
setInterval(() => {
  container.style.transform = `translate(${Math.random()*2-1}px, ${Math.random()*2-1}px)`;
}, 100);
