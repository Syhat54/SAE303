// THOMAS
// --- FONCTIONNALITÉ 1 : STICKY HEADER (SCROLL) ---
const header = document.getElementById('main-header');

window.addEventListener('scroll', () => {
    // Si on descend de plus de 20 pixels
    if (window.scrollY > 20) {
        header.classList.add('effet');
    } else {
        header.classList.remove('effet');
    }
});

// --- FONCTIONNALITÉ 2 : HOVER INTERACTIF EN JS ---

const links = document.querySelectorAll('.nav-links a');

links.forEach(link => {

    link.addEventListener('mouseenter', () => {
        link.style.color = '#2563eb';
    });

    link.addEventListener('mouseleave', () => {
        link.style.color = '#64748b'; 
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Visages
    const faceCards = document.querySelectorAll('.face-card');
    let selectedFace = null;

    if (faceCards.length > 0) {
        faceCards.forEach(card => {
            card.addEventListener('click', () => {
                faceCards.forEach(c => c.classList.remove('face-selected'));
                card.classList.add('face-selected');
                selectedFace = card.getAttribute('data-face'); // face1, face2...
                updateResultImage();
            });
        });

        faceCards[0].classList.add('face-selected');
        selectedFace = faceCards[0].getAttribute('data-face');
    }

    // Zones
    const zoneCards = document.querySelectorAll('.zone-card');
    let selectedZone = null;

    if (zoneCards.length > 0) {
        zoneCards.forEach(card => {
            card.addEventListener('click', () => {
                zoneCards.forEach(c => c.classList.remove('zone-card-selected'));
                card.classList.add('zone-card-selected');
                selectedZone = card.getAttribute('data-zone'); // screen, face, eye, mouth
                updateResultImage();
            });
        });

        zoneCards[0].classList.add('zone-card-selected');
        selectedZone = zoneCards[0].getAttribute('data-zone');
    }

    // Paramètres
    const paramCards = document.querySelectorAll('.param-card');
    let selectedParameter = null;

    if (paramCards.length > 0) {
        paramCards.forEach(card => {
            card.addEventListener('click', () => {
                paramCards.forEach(c => c.classList.remove('param-card-selected'));
                card.classList.add('param-card-selected');
                selectedParameter = card.getAttribute('data-param'); // latence, temps_fixation...
                updateResultImage();
            });
        });

        paramCards[0].classList.add('param-card-selected');
        selectedParameter = paramCards[0].getAttribute('data-param');
    }

    const resultImage = document.getElementById('result-image');

    function updateResultImage() {
        if (!selectedFace || !selectedZone || !selectedParameter) {
            return;
        }
        const faceName = selectedFace.replace('face', 'visage');
        const imagePath = `img/graphs/${faceName}_${selectedZone}_${selectedParameter}.jpg`;
        resultImage.src = imagePath;
        resultImage.classList.remove('d-none');
    }

    // Met à jour une première fois au chargement si tu as des images prêtes
    updateResultImage();
});
function showSection(sectionId, element) {
       const sections = document.querySelectorAll('.content-card');
       sections.forEach(section => {
           section.classList.remove('active');
       });


       const buttons = document.querySelectorAll('.nav-btn');
       buttons.forEach(btn => {
           btn.classList.remove('active');
       });


       const targetSection = document.getElementById(sectionId);
       targetSection.classList.add('active');


       element.classList.add('active');
   }
function toggleBlob() {
        const blobImg = document.getElementById('blob-toggle');
        const currentSrc = blobImg.src;
        
        if (currentSrc.includes('Blob1.svg')) {
            blobImg.src = 'img/Pictos/Blob2.svg';
        } else {
            blobImg.src = 'img/Pictos/Blob1.svg';
        }
    }