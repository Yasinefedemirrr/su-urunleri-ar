const popup =
  document.getElementById("fishPopup");

const fishImage =
  document.getElementById("fishImage");

const fishName =
  document.getElementById("fishName");

const fishDesc =
  document.getElementById("fishDesc");

const fishSize =
  document.getElementById("fishSize");

const fishHabitat =
  document.getElementById("fishHabitat");

const closeBtn =
  document.getElementById("closeBtn");

const startBtn =
  document.getElementById("startBtn");

const startScreen =
  document.getElementById("startScreen");

/* Popup kapat */

closeBtn.addEventListener("click", () => {

  popup.classList.add("hidden");

});

/* Balık Verileri */

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

    desc: "Balon balıkları istilacı türdür.",

    size: "25 cm",

    habitat: "Akdeniz"
  },

  kopek: {

    image: "./assets/images/kopekbaligi.jpg",

    name: "Köpek Balığı",

    desc: "Köpek balıkları yırtıcı canlılardır.",

    size: "3 metre",

    habitat: "Okyanus"
  },

  yunus: {

    image: "./assets/images/yunusbaligi.jpg",

    name: "Yunus Balığı",

    desc: "Yunuslar oldukça zeki canlılardır.",

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

/* Başlat Butonu */

startBtn.addEventListener("click", () => {

  startScreen.style.display = "none";

});

/* MindAR */

document.addEventListener("DOMContentLoaded", () => {

  const levrekTarget =
    document.getElementById("levrekTarget");

  const balonTarget =
    document.getElementById("balonTarget");

  const kopekTarget =
    document.getElementById("kopekTarget");

  const yunusTarget =
    document.getElementById("yunusTarget");

  /* LEVREK */

  levrekTarget.addEventListener(
    "targetFound",
    () => {

      console.log("LEVREK BULUNDU");

      showFish(fishData.levrek);

    }
  );

  /* BALON */

  balonTarget.addEventListener(
    "targetFound",
    () => {

      console.log("BALON BULUNDU");

      showFish(fishData.balon);

    }
  );

  /* KOPEK */

  kopekTarget.addEventListener(
    "targetFound",
    () => {

      console.log("KOPEK BULUNDU");

      showFish(fishData.kopek);

    }
  );

  /* YUNUS */

  yunusTarget.addEventListener(
    "targetFound",
    () => {

      console.log("YUNUS BULUNDU");

      showFish(fishData.yunus);

    }
  );

});