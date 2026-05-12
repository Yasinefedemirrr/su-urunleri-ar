const popup = document.getElementById("fishPopup");
const closeBtn = document.getElementById("closeBtn");

const startBtn = document.getElementById("startBtn");
const startScreen = document.getElementById("startScreen");

/* Başlat butonu */

startBtn.addEventListener("click", () => {
  startScreen.style.display = "none";
});

/* Popup kapatma */

closeBtn.addEventListener("click", () => {
  popup.classList.add("hidden");
});

/* MindAR target eventleri */

document.addEventListener("DOMContentLoaded", () => {

  const target = document.querySelector("[mindar-image-target]");

  /* Görsel algılanınca */

  target.addEventListener("targetFound", () => {

    console.log("BALIK ALGILANDI");

    popup.classList.remove("hidden");

  });

  /* Görsel kaybolunca */

  target.addEventListener("targetLost", () => {

    console.log("BALIK KAYBOLDU");

  });

});