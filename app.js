const popup = document.getElementById("fishPopup");

const fishImage = document.getElementById("fishImage");
const fishName = document.getElementById("fishName");
const fishDesc = document.getElementById("fishDesc");
const fishSize = document.getElementById("fishSize");
const fishHabitat = document.getElementById("fishHabitat");

const closeBtn = document.getElementById("closeBtn");

const startBtn = document.getElementById("startBtn");
const startScreen = document.getElementById("startScreen");

/* Başlangıç */

startBtn.addEventListener("click", () => {

  startScreen.style.display = "none";

});

/* Popup kapatma */

closeBtn.addEventListener("click", () => {

  popup.classList.add("hidden");

});

/* Balık verileri */

const fishData = {

  levrek: {
    image: "./assets/images/levrek.jpg",
    name: "Levrek",
    desc: "Levrek Ege Denizi’nde yaşayan etçil bir balıktır.",
    size: "40 cm",
    habitat: "Ege Denizi"
  },

  balon: {
    image: "./assets/images/balonbaligi.jpg",
    name: "Balon Balığı",
    desc: "Balon balığı zehirli yapısıyla bilinir.",
    size: "25 cm",
    habitat: "Akdeniz"
  },

  kopek: {
    image: "./assets/images/kopekbaligi.jpg",
    name: "Köpek Balığı",
    desc: "Köpek balıkları büyük yırtıcı deniz canlılarıdır.",
    size: "3 metre",
    habitat: "Okyanuslar"
  },

  yunus: {
    image: "./assets/images/yunusbaligi.jpg",
    name: "Yunus Balığı",
    desc: "Yunuslar oldukça zeki deniz canlılarıdır.",
    size: "2 metre",
    habitat: "Açık Deniz"
  }

};

/* Popup göster */

function showFish(fish) {

  fishImage.src = fish.image;

  fishName.innerText = fish.name;

  fishDesc.innerText = fish.desc;

  fishSize.innerText = fish.size;

  fishHabitat.innerText = fish.habitat;

  popup.classList.remove("hidden");

}

/* MindAR */

document.addEventListener("DOMContentLoaded", () => {

  const levrekTarget = document.getElementById("levrekTarget");

  const balonTarget = document.getElementById("balonTarget");

  const kopekTarget = document.getElementById("kopekTarget");

  const yunusTarget = document.getElementById("yunusTarget");

  levrekTarget.addEventListener("targetFound", () => {

    console.log("LEVREK BULUNDU");

    showFish(fishData.levrek);

  });

  balonTarget.addEventListener("targetFound", () => {

    console.log("BALON BULUNDU");

    showFish(fishData.balon);

  });

  kopekTarget.addEventListener("targetFound", () => {

    console.log("KOPEK BULUNDU");

    showFish(fishData.kopek);

  });

  yunusTarget.addEventListener("targetFound", () => {

    console.log("YUNUS BULUNDU");

    showFish(fishData.yunus);

  });

});