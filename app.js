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
    
    const exit3DBtn = document.getElementById("exit3DBtn");
    const waterSurface = document.getElementById("waterSurface");

    const fishImage = document.getElementById("fishImage");
    const fishName = document.getElementById("fishName");
    const fishDesc = document.getElementById("fishDesc");
    const fishSize = document.getElementById("fishSize");
    const fishHabitat = document.getElementById("fishHabitat");

    let activeModelId = null;

    // Dokunmatik ileri geri hareketi takip etmek için değişkenler
    let touchStartY = 0;
    let currentZPosition = 0; // Başlangıç Z pozisyonu

    // Kamerayı başlat
    startBtn.addEventListener("click", () => {
        startScreen.style.display = "none";
        const arSystem = sceneEl.systems["mindar-image-system"];
        arSystem.start(); 
    });

    // Popup Göster
    const showFish = (data) => {
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
            const modelEl = document.getElementById(activeModelId);
            if (modelEl) {
                modelEl.setAttribute("visible", "true");
                currentZPosition = 0; // Pozisyonu sıfırla
                modelEl.setAttribute("position", `0 0 ${currentZPosition}`);
                waterSurface.setAttribute("visible", "true"); 
                exit3DBtn.classList.remove("hidden"); 
            }
        }
    });

    // Dokunmatik Sürükleme ile İleri-Geri Mantığı
    window.addEventListener("touchstart", (e) => {
        if (!activeModelId) return;
        touchStartY = e.touches[0].clientY;
    });

    window.addEventListener("touchmove", (e) => {
        if (!activeModelId) return;
        
        const modelEl = document.getElementById(activeModelId);
        if (!modelEl) return;

        const touchCurrentY = e.touches[0].clientY;
        const deltaY = touchStartY - touchCurrentY; // Yukarı kaydırma pozitif, aşağı negatif

        // Hassasiyet çarpanı (0.005) hızı ayarlar. Sınırlandırma (-1 ile 1 metre arası)
        currentZPosition += deltaY * 0.005;
        currentZPosition = Math.max(-1, Math.min(1, currentZPosition)); 

        // Modeli yeni Z eksenine taşı
        modelEl.setAttribute("position", `0 0 ${currentZPosition}`);
        
        // Bir sonraki hareket hesaplaması için mevcut konumu güncelle
        touchStartY = touchCurrentY;
    });

    // 3D Moddan Çıkış (X Butonu)
    exit3DBtn.addEventListener("click", () => {
        const models = ["3d-levrek", "3d-balon", "3d-kopek", "3d-yunus"];
        models.forEach(mId => {
            const el = document.getElementById(mId);
            if (el) el.setAttribute("visible", "false");
        });
        
        waterSurface.setAttribute("visible", "false"); 
        exit3DBtn.classList.add("hidden"); 
        activeModelId = null; 
    });

    // Hedef Dinleyicileri
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