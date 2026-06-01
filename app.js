const fishData = {
    levrek: {
        image: "./assets/images/levrek.jpg",
        name: "Levrek",
        desc: "Levrek Ege Denizi’nde yaşayan etçil bir balıktır.",
        size: "40 cm",
        habitat: "Ege Denizi",
        has3D: false // Henüz modeli yok
    },
    balon: {
        image: "./assets/images/balonbaligi.jpg",
        name: "Balon Balığı",
        desc: "Balon balıkları istilacı ve zehirli bir türdür.",
        size: "25 cm",
        habitat: "Akdeniz",
        has3D: false // Henüz modeli yok
    },
    kopek: {
        image: "./assets/images/kopekbaligi.jpg",
        name: "Köpek Balığı",
        desc: "Köpek balıkları okyanusların en eski yırtıcılarıdır.",
        size: "3 metre",
        habitat: "Okyanuslar",
        has3D: false // Henüz modeli yok
    },
    yunus: {
        image: "./assets/images/yunusbaligi.jpg",
        name: "Yunus Balığı",
        desc: "Yunuslar oldukça zeki ve sosyal memelilerdir.",
        size: "2 metre",
        habitat: "Açık Denizler",
        has3D: true // Modeli var!
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const sceneEl = document.querySelector('a-scene');
    const startScreen = document.getElementById("startScreen");
    const startBtn = document.getElementById("startBtn");
    const popup = document.getElementById("fishPopup");
    const closeBtn = document.getElementById("closeBtn");

    const fishImage = document.getElementById("fishImage");
    const fishName = document.getElementById("fishName");
    const fishDesc = document.getElementById("fishDesc");
    const fishSize = document.getElementById("fishSize");
    const fishHabitat = document.getElementById("fishHabitat");

    // Hangi 3D modelin aktif olduğunu takip etmek için
    let activeModelId = null;

    // 1. Kamerayı başlat
    startBtn.addEventListener("click", () => {
        startScreen.style.display = "none";
        const arSystem = sceneEl.systems["mindar-image-system"];
        arSystem.start(); 
    });

    // 2. Popup'ı göster (Akıllı Buton Mantığıyla)
    const showFish = (data) => {
        fishImage.src = data.image;
        fishName.innerText = data.name;
        fishDesc.innerText = data.desc;
        fishSize.innerText = data.size;
        fishHabitat.innerText = data.habitat;
        
        // 3D modeli varsa butonu güncelle, yoksa standart bırak
        if(data.has3D) {
            closeBtn.innerText = "Kapat ve 3D İzle";
        } else {
            closeBtn.innerText = "Kapat";
            activeModelId = null; // Model olmadığı için hafızayı boşalt
        }

        popup.classList.remove("hidden");
    };

    // 3. Popup'ı kapat ve 3D Modeli görünür yap
    closeBtn.addEventListener("click", () => {
        popup.classList.add("hidden");
        // Sadece hafızada aktif bir model varsa (has3D true ise) modeli göster
        if (activeModelId) {
            document.getElementById(activeModelId).setAttribute("visible", "true");
        }
    });

    // 4. Hedef Bulunduğunda (targetFound) çalışacaklar
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

    // 5. Hedef Kaybedildiğinde (targetLost) her şeyi sıfırla ve gizle
    const targets = [
        { id: "levrekTarget", model: "3d-levrek" },
        { id: "balonTarget", model: "3d-balon" },
        { id: "kopekTarget", model: "3d-kopek" },
        { id: "yunusTarget", model: "3d-yunus" }
    ];

    targets.forEach(targetObj => {
        document.getElementById(targetObj.id).addEventListener("targetLost", () => {
            popup.classList.add("hidden"); 
            document.getElementById(targetObj.model).setAttribute("visible", "false"); 
            
            if (activeModelId === targetObj.model) {
                activeModelId = null;
            }
        });
    });
});