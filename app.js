/* Balık Veri Seti */
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
        desc: "Balon balıkları istilacı ve zehirli bir türdür.",
        size: "25 cm",
        habitat: "Akdeniz"
    },
    kopek: {
        image: "./assets/images/kopekbaligi.jpg",
        name: "Köpek Balığı",
        desc: "Köpek balıkları okyanusların en eski yırtıcılarıdır.",
        size: "3 metre",
        habitat: "Okyanuslar"
    },
    yunus: {
        image: "./assets/images/yunusbaligi.jpg",
        name: "Yunus Balığı",
        desc: "Yunuslar oldukça zeki ve sosyal memelilerdir.",
        size: "2 metre",
        habitat: "Açık Denizler"
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const sceneEl = document.querySelector('a-scene');
    const startScreen = document.getElementById("startScreen");
    const startBtn = document.getElementById("startBtn");
    const popup = document.getElementById("fishPopup");
    const closeBtn = document.getElementById("closeBtn");

    /* Popup Elemanları */
    const fishImage = document.getElementById("fishImage");
    const fishName = document.getElementById("fishName");
    const fishDesc = document.getElementById("fishDesc");
    const fishSize = document.getElementById("fishSize");
    const fishHabitat = document.getElementById("fishHabitat");

    // 1. AR ve Kamerayı Başlat
    startBtn.addEventListener("click", () => {
        startScreen.style.display = "none";
        const arSystem = sceneEl.systems["mindar-image-system"];
        arSystem.start(); 
        console.log("AR Sistemi Başlatıldı");
    });

    // 2. Popup Gösterme Fonksiyonu
    const showFish = (data) => {
        fishImage.src = data.image;
        fishName.innerText = data.name;
        fishDesc.innerText = data.desc;
        fishSize.innerText = data.size;
        fishHabitat.innerText = data.habitat;
        popup.classList.remove("hidden");
    };

    // 3. Popup Kapatma
    closeBtn.addEventListener("click", () => {
        popup.classList.add("hidden");
    });

    // 4. Hedefleri Dinle (TargetFound)
    document.getElementById("levrekTarget").addEventListener("targetFound", () => showFish(fishData.levrek));
    document.getElementById("balonTarget").addEventListener("targetFound", () => showFish(fishData.balon));
    document.getElementById("kopekTarget").addEventListener("targetFound", () => showFish(fishData.kopek));
    document.getElementById("yunusTarget").addEventListener("targetFound", () => showFish(fishData.yunus));
});