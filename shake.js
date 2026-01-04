// Shake overlay VHS uniquement
document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("vhs-overlay");

  if (!overlay) return; // sécurité si l'overlay n'existe pas

  setInterval(() => {
    overlay.style.transform = `translate(${Math.random()*2-1}px, ${Math.random()*2-1}px)`;
  }, 100);
});
