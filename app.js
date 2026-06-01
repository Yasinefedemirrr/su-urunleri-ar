const fishData = {
    levrek: { image: "./assets/images/levrek.jpg", name: "Levrek", desc: "Levrek Ege Denizi’nde yaşayan etçil bir balıktır.", size: "40 cm", habitat: "Ege Denizi", has3D: false },
    balon: { image: "./assets/images/balonbaligi.jpg", name: "Balon Balığı", desc: "Balon balıkları istilacı ve zehirli bir türdür.", size: "25 cm", habitat: "Akdeniz", has3D: false },
    kopek: { image: "./assets/images/kopekbaligi.jpg", name: "Köpek Balığı", desc: "Köpek balıkları okyanusların en eski yırtıcılarıdır.", size: "3 metre", habitat: "Okyanuslar", has3D: false },
    yunus: { image: "./assets/images/yunusbaligi.jpg", name: "Yunus Balığı", desc: "Yunuslar oldukça zeki ve sosyal memelilerdir.", size: "2 metre", habitat: "Açık Denizler", has3D: true }
};

document.addEventListener("DOMContentLoaded", () => {
    const sceneEl = document.querySelector('a-scene');
    const cameraEl = document.getElementById("mainCamera");
    const startScreen = document.getElementById("startScreen");
    const startBtn = document.getElementById("startBtn");
    const popup = document.getElementById("fishPopup");
    const closeBtn = document.getElementById("closeBtn");
    const exit3DBtn = document.getElementById("exit3DBtn");

    const fishImage = document.getElementById("fishImage");
    const fishName = document.getElementById("fishName");
    const fishDesc = document.getElementById("fishDesc");
    const fishSize = document.getElementById("fishSize");
    const fishHabitat = document.getElementById("fishHabitat");

    let activeModelId = null;
    let currentTargetId = null;

    // Dokunmatik İleri-Geri Değişkenleri
    let touchStartY = 0;
    let currentZPosition = -3; // Kamera içinde başlangıç uzaklığı (3 metre ileri)

    // Kamerayı başlat
    startBtn.addEventListener("click", () => {
        startScreen.style.display = "none";
        sceneEl.systems["mindar-image-system"].start(); 
    });

    const showFish = (data) => {
        // Eğer 3D ekran zaten aktifse yeni popup açılmasın
        if (!exit3DBtn.classList.contains("hidden")) return;

        fishImage.src = data.image;
        fishName.innerText = data.name;
        fishDesc.innerText = data.desc;
        fishSize.innerText = data.size;
        fishHabitat.innerText = data.habitat;
        
        closeBtn.innerText = data.has3D ? "Kapat ve 3D İzle" : "Kapat";
        popup.classList.remove("hidden");
    };

    // Popup Kapat ve Kilitleme Moduna Geç
    closeBtn.addEventListener("click", () => {
        popup.classList.add("hidden");
        
        if (activeModelId) {
            let elToMove;
            
            // Yunus için su efektiyle beraber tüm grubu taşıyoruz, diğerleri için sadece modeli
            if (activeModelId === "3d-yunus") {
                elToMove = document.getElementById("yunusGroup");
                document.getElementById("waterSurface").setAttribute("visible", "true");
            } else {
                elToMove = document.getElementById(activeModelId);
            }

            if (elToMove) {
                // KRİTİK NOKTA: Modeli hedef resmin içinden söküp kameranın içine taşıyoruz!
                cameraEl.appendChild(elToMove);
                
                // Kameranın önünde düzgün durması için pozisyonunu sabitliyoruz
                currentZPosition = -3; 
                elToMove.setAttribute("position", `0 -0.3 ${currentZPosition}`);
                elToMove.setAttribute("rotation", "0 0 0"); // Karşıya bakması için
                
                // Model elemanının kendisini görünür yapıyoruz
                document.getElementById(activeModelId).setAttribute("visible", "true");
                exit3DBtn.classList.remove("hidden"); 
            }
        }
    });

    // Dokunmatik İleri-Geri Kaydırma Kontrolü
    window.addEventListener("touchstart", (e) => {
        if (!activeModelId || exit3DBtn.classList.contains("hidden")) return;
        touchStartY = e.touches[0].clientY;
    });

    window.addEventListener("touchmove", (e) => {
        if (!activeModelId || exit3DBtn.classList.contains("hidden")) return;
        
        let elToMove = (activeModelId === "3d-yunus") ? document.getElementById("yunusGroup") : document.getElementById(activeModelId);
        if (!elToMove) return;

        const touchCurrentY = e.touches[0].clientY;
        const deltaY = touchStartY - touchCurrentY;

        // Kameranın önündeki Z eksenini hareket ettirir (-1.5m ile -6m arası sınır)
        currentZPosition += deltaY * 0.01;
        currentZPosition = Math.max(-6, Math.min(-1.5, currentZPosition)); 

        elToMove.setAttribute("position", `0 -0.3 ${currentZPosition}`);
        touchStartY = touchCurrentY;
    });

    // 3D Moddan Çıkış (X Butonu) - Modelleri kameradan söküp eski evine (resim hedefine) geri koyar
    exit3DBtn.addEventListener("click", () => {
        exit3DBtn.classList.add("hidden");

        // Yunus Sıfırlama
        const yunusGroup = document.getElementById("yunusGroup");
        if (yunusGroup && yunusGroup.parentNode === cameraEl) {
            document.getElementById("3d-yunus").setAttribute("visible", "false");
            document.getElementById("waterSurface").setAttribute("visible", "false");
            document.getElementById("yunusTarget").appendChild(yunusGroup); // Orijinal resim hedefine geri koy
            yunusGroup.setAttribute("position", "0 0 0");
            yunusGroup.setAttribute("rotation", "0 0 0");
        }

        // Standart Balıkları Sıfırlama (İlerisi için önlem)
        const rest = [
            { m: "3d-levrek", t: "levrekTarget" },
            { m: "3d-balon", t: "balonTarget" },
            { m: "3d-kopek", t: "kopekTarget" }
        ];
        rest.forEach(obj => {
            const el = document.getElementById(obj.m);
            if (el && el.parentNode === cameraEl) {
                el.setAttribute("visible", "false");
                document.getElementById(obj.t).appendChild(el);
                el.setAttribute("position", "0 0 0");
            }
        });

        activeModelId = null;
        currentTargetId = null;
    });

    // Hedef Bulma Olayları
    document.getElementById("levrekTarget").addEventListener("targetFound", () => { currentTargetId = "levrekTarget"; activeModelId = "3d-levrek"; showFish(fishData.levrek); });
    document.getElementById("balonTarget").addEventListener("targetFound", () => { currentTargetId = "balonTarget"; activeModelId = "3d-balon"; showFish(fishData.balon); });
    document.getElementById("kopekTarget").addEventListener("targetFound", () => { currentTargetId = "kopekTarget"; activeModelId = "3d-kopek"; showFish(fishData.kopek); });
    document.getElementById("yunusTarget").addEventListener("targetFound", () => { currentTargetId = "yunusTarget"; activeModelId = "3d-yunus"; showFish(fishData.yunus); });
});