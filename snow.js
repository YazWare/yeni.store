// snow.js
const snowContainer = document.createElement("div");
snowContainer.style.position = "fixed";
snowContainer.style.top = "0";
snowContainer.style.left = "0";
snowContainer.style.width = "100%";
snowContainer.style.height = "100%";
snowContainer.style.pointerEvents = "none";
snowContainer.style.zIndex = "9999";
document.body.appendChild(snowContainer);

function createSnowflake() {
  const snow = document.createElement("div");
  snow.textContent = "❄";
  snow.style.position = "absolute";
  snow.style.top = "-2em";
  snow.style.left = Math.random() * window.innerWidth + "px";
  snow.style.fontSize = Math.random() * 24 + 12 + "px";
  snow.style.opacity = Math.random();
  snowContainer.appendChild(snow);

  let y = -30;
  const speed = Math.random() * 2 + 1;

  function fall() {
    y += speed;
    snow.style.top = y + "px";
    if (y < window.innerHeight) requestAnimationFrame(fall);
    else snow.remove();
  }
  fall();
}

setInterval(createSnowflake, 211);
