// Shake léger sur l'overlay uniquement, pas sur le body
const overlay = document.getElementById("vhs-overlay");
setInterval(() => {
  overlay.style.transform = `translate(${Math.random()*2-1}px, ${Math.random()*2-1}px)`;
}, 100);


