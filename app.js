/* ELEMENTS */

const popup = document.getElementById("fishPopup");

const fishImage = document.getElementById("fishImage");

const fishName = document.getElementById("fishName");

const fishDesc = document.getElementById("fishDesc");

const fishSize = document.getElementById("fishSize");

const fishHabitat = document.getElementById("fishHabitat");

const closeBtn = document.getElementById("closeBtn");

const startBtn = document.getElementById("startBtn");

const startScreen = document.getElementById("startScreen");

/* FISH DATA */

const fishData = {

  0: {

    name: "Levrek",

    desc: "Levrek Ege Denizi’nde yaşayan etçil bir balıktır.",

    habitat: "Ege Denizi",

    size: "40 cm",

    image: "./assets/images/levrek.jpg"
  },

  1: {

    name: "Somon",

    desc: "Somon göç eden güçlü bir balık türüdür.",

    habitat: "Kuzey Atlantik",

    size: "70 cm",

    image: "./assets/images/somon.jpg"
  },

  2: {

    name: "Palyaço Balığı",

    desc: "Mercan resiflerinde yaşayan tropikal balıktır.",

    habitat: "Pasifik Okyanusu",

    size: "15 cm",

    image: "./assets/images/clownfish.jpg"
  }

};

/* SCENE */

const sceneEl = document.querySelector("a-scene");

/* MINDAR SYSTEM */

const mindarSystem = sceneEl.systems["mindar-image-system"];

/* START BUTTON */

startBtn.addEventListener("click", async () => {

  startScreen.style.display = "none";

  await mindarSystem.start();

});

/* CLOSE POPUP */

closeBtn.addEventListener("click", () => {

  popup.classList.add("hidden");

});

/* DOM LOADED */

document.addEventListener("DOMContentLoaded", () => {

  const targets = document.querySelectorAll("[mindar-image-target]");

  targets.forEach((target, index) => {

    /* TARGET FOUND */

    target.addEventListener("targetFound", () => {

      console.log("TARGET FOUND:", index);

      const fish = fishData[index];

      if (!fish) return;

      fishImage.src = fish.image;

      fishName.innerText = fish.name;

      fishDesc.innerText = fish.desc;

      fishSize.innerText = fish.size;

      fishHabitat.innerText = fish.habitat;

      popup.classList.remove("hidden");

    });

    /* TARGET LOST */

    target.addEventListener("targetLost", () => {

      console.log("TARGET LOST:", index);

      setTimeout(() => {

        popup.classList.add("hidden");

      }, 500);

    });

  });

});