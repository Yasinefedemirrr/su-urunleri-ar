const fishData = {
    levrek: { image: "./assets/images/levrek.jpg", name: "Levrek", desc: "Levrek Ege Denizi’nde yaşayan etçil bir balıktır.", size: "40 cm", habitat: "Ege Denizi", has3D: false },
    balon: { image: "./assets/images/balonbaligi.jpg", name: "Balon Balığı", desc: "Balon balıkları istilacı ve zehirli bir türdür.", size: "25 cm", habitat: "Akdeniz", has3D: false },
    kopek: { image: "./assets/images/kopekbaligi.jpg", name: "Köpek Balığı", desc: "Köpek balıkları okyanusların en eski yırtıcılarıdır.", size: "3 metre", habitat: "Okyanuslar", has3D: false },
    yunus: { image: "./assets/images/yunusbaligi.jpg", name: "Yunus Balığı", desc: "Yunuslar oldukça zeki ve sosyal memelilerdir.", size: "2 metre", habitat: "Açık Denizler", has3D: true }
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
    let arSystem = null;

    // Dokunmatik Sürükleme (İleri-Geri) Değişkenleri
    let touchStartY = 0;
    let currentZPosition = -3; 

    // Kamerayı başlat
    startBtn.addEventListener("click", () => {
        startScreen.style.display = "none";
        arSystem = sceneEl.systems["mindar-image-system"];
        arSystem.start(); 
    });

    const showFish = (data) => {
        // Eğer 3D mod şu an aktifse yeni tarama popup'ı açma
        if (!exit3DBtn.classList.contains("hidden")) return;

        fishImage.src = data.image;
        fishName.innerText = data.name;
        fishDesc.innerText = data.desc;
        fishSize.innerText = data.size;
        fishHabitat.innerText = data.habitat;
        
        closeBtn.innerText = data.has3D ? "Kapat ve 3D İzle" : "Kapat";
        popup.classList.remove("hidden");
    };

    // Popup Kapat ve 3D Modu Aktif Et
    closeBtn.addEventListener("click", () => {
        popup.classList.add("hidden");
        
        if (activeModelId) {
            const modelEl = document.getElementById(activeModelId);
            if (modelEl) {
                // 1. Modeli ve Suyu Görünür Yap
                modelEl.setAttribute("visible", "true");
                waterSurface.setAttribute("visible", "true");
                exit3DBtn.classList.remove("hidden");
                
                // Pozisyonu varsayılana sıfırla
                currentZPosition = -3;
                modelEl.setAttribute("position", `0 -0.2 ${currentZPosition}`);

                // 2. EN ÖNEMLİ KISIM: Resmi kaybetsek bile gitmemesi için MindAR takibini durduruyoruz
                if (arSystem) {
                    arSystem.pause(true); // Kamerayı açık bırak ama resim takibini dondur
                }
            }
        }
    });

    // Dokunmatik İleri-Geri Mantığı
    window.addEventListener("touchstart", (e) => {
        if (!activeModelId || exit3DBtn.classList.contains("hidden")) return;
        touchStartY = e.touches[0].clientY;
    });

    window.addEventListener("touchmove", (e) => {
        if (!activeModelId || exit3DBtn.classList.contains("hidden")) return;
        
        const modelEl = document.getElementById(activeModelId);
        if (!modelEl) return;

        const touchCurrentY = e.touches[0].clientY;
        const deltaY = touchStartY - touchCurrentY;

        // Yukarı/Aşağı sürüklemeye göre Z eksenini günceller (-1.5m ile -5m arası sınır)
        currentZPosition += deltaY * 0.01;
        currentZPosition = Math.max(-5, Math.min(-1.5, currentZPosition)); 

        modelEl.setAttribute("position", `0 -0.2 ${currentZPosition}`);
        touchStartY = touchCurrentY;
    });

    // 3D Moddan Çıkış (X Butonu)
    exit3DBtn.addEventListener("click", () => {
        exit3DBtn.classList.add("hidden");
        waterSurface.setAttribute("visible", "false");

        // Tüm modelleri gizle
        const models = ["3d-levrek", "3d-balon", "3d-kopek", "3d-yunus"];
        models.forEach(mId => {
            const el = document.getElementById(mId);
            if (el) el.setAttribute("visible", "false");
        });

        // MindAR takibini yeniden başlat (Yeni balık tarayabilmek için)
        if (arSystem) {
            arSystem.unpause();
        }

        activeModelId = null;
    });

    // Hedef Dinleyicileri
    document.getElementById("levrekTarget").addEventListener("targetFound", () => { activeModelId = "3d-levrek"; showFish(fishData.levrek); });
    document.getElementById("balonTarget").addEventListener("targetFound", () => { activeModelId = "3d-balon"; showFish(fishData.balon); });
    document.getElementById("kopekTarget").addEventListener("targetFound", () => { activeModelId = "3d-kopek"; showFish(fishData.kopek); });
    document.getElementById("yunusTarget").addEventListener("targetFound", () => { activeModelId = "3d-yunus"; showFish(fishData.yunus); });
});