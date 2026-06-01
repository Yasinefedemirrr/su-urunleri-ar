const fishData = {
    levrek: {
        image: "./assets/images/levrek.jpg",
        name: "Levrek",
        desc: "Levrek Ege Denizi’nde yaşayan etçil bir balıktır.",
        size: "40 cm",
        habitat: "Ege Denizi",
        has3D: false
    },
    balon: {
        image: "./assets/images/balonbaligi.jpg",
        name: "Balon Balığı",
        desc: "Balon balıkları istilacı ve zehirli bir türdür.",
        size: "25 cm",
        habitat: "Akdeniz",
        has3D: false
    },
    kopek: {
        image: "./assets/images/kopekbaligi.jpg",
        name: "Köpek Balığı",
        desc: "Köpek balıkları okyanusların en eski yırtıcılarıdır.",
        size: "3 metre",
        habitat: "Okyanuslar",
        has3D: false
    },
    yunus: {
        image: "./assets/images/yunusbaligi.jpg",
        name: "Yunus Balığı",
        desc: "Yunuslar oldukça zeki ve sosyal memelilerdir.",
        size: "2 metre",
        habitat: "Açık Denizler",
        has3D: true
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const sceneEl = document.querySelector('a-scene');
    const startScreen = document.getElementById("startScreen");
    const startBtn = document.getElementById("startBtn");
    const popup = document.getElementById("fishPopup");
    const closeBtn = document.getElementById("closeBtn");
    
    // Yeni eklenen elemanlar
    const exit3DBtn = document.getElementById("exit3DBtn");
    const waterSurface = document.getElementById("waterSurface");

    const fishImage = document.getElementById("fishImage");
    const fishName = document.getElementById("fishName");
    const fishDesc = document.getElementById("fishDesc");
    const fishSize = document.getElementById("fishSize");
    const fishHabitat = document.getElementById("fishHabitat");

    let activeModelId = null;

    // Kamerayı başlat
    startBtn.addEventListener("click", () => {
        startScreen.style.display = "none";
        const arSystem = sceneEl.systems["mindar-image-system"];
        arSystem.start(); 
    });

    // Popup Göster
    const showFish = (data) => {
        // Eğer ekranda halihazırda bir 3D model açıksa (kullanıcı X'e basmamışsa) yeni popup açma
        if (!exit3DBtn.classList.contains("hidden")) return;

        fishImage.src = data.image;
        fishName.innerText = data.name;
        fishDesc.innerText = data.desc;
        fishSize.innerText = data.size;
        fishHabitat.innerText = data.habitat;
        
        if(data.has3D) {
            closeBtn.innerText = "Kapat ve 3D İzle";
        } else {
            closeBtn.innerText = "Kapat";
            activeModelId = null; 
        }
        popup.classList.remove("hidden");
    };

    // Popup Kapat ve 3D'ye Geç
    closeBtn.addEventListener("click", () => {
        popup.classList.add("hidden");
        
        if (activeModelId) {
            document.getElementById(activeModelId).setAttribute("visible", "true");
            waterSurface.setAttribute("visible", "true"); // Suyu göster
            exit3DBtn.classList.remove("hidden"); // X butonunu göster
        }
    });

    // 3D Moddan Çıkış (X Butonu)
    exit3DBtn.addEventListener("click", () => {
        if (activeModelId) {
            document.getElementById(activeModelId).setAttribute("visible", "false");
        }
        waterSurface.setAttribute("visible", "false"); // Suyu gizle
        exit3DBtn.classList.add("hidden"); // X butonunu gizle
        activeModelId = null; // Hafızayı sıfırla ki yeni balık taranabilsin
    });

    // Hedef Bulunduğunda (targetLost sildik, resim kadrajdan çıksa da ekran kapanmayacak)
    document.getElementById("levrekTarget").addEventListener("targetFound", () => {
        activeModelId = "3d-levrek";
        showFish(fishData.levrek);
    });

    document.getElementById("balonTarget").addEventListener("targetFound", () => {
        activeModelId = "3d-balon";
        showFish(fishData.balon);
    });

    document.getElementById("kopekTarget").addEventListener("targetFound", () => {
        activeModelId = "3d-kopek";
        showFish(fishData.kopek);
    });

    document.getElementById("yunusTarget").addEventListener("targetFound", () => {
        activeModelId = "3d-yunus";
        showFish(fishData.yunus);
    });
});