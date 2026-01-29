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

// TAHYS - Gestion des résultats avec image et graphique ChartJS
let chartInstance = null;

// Données pour les graphiques - uniquement pour Visage 1 et Visage 2 avec Total trackés sur Écran
const chartDataExample = {
    face1_screen_total: {
        labels: ['DT', 'TSA'],
        data: [3.98403571428571, 3.95082352941176],
        unit: 'ms',
        title: 'Visage 1 - Temps Total Trackés - Écran'
    },
    face2_screen_total: {
        labels: ['DT', 'TSA'],
        data: [3.92283333333333, 3.97505555555556],
        unit: 'ms',
        title: 'Visage 2 - Temps Total Trackés - Écran'
    },
    face3_screen_total: {
        labels: ['DT', 'TSA'],
        data: [3.9340625, 3.9623125],
        unit: 'ms',
        title: 'Visage 3 - Temps Total Trackés - Écran'
    },
    face4_screen_total: {
        labels: ['DT', 'TSA'],
        data: [3.98925, 3.84905882352941],
        unit: 'ms',
        title: 'Visage 4 - Temps Total Trackés - Écran'
    }
};

function createChart(selectedFace, selectedZone, parameterType) {
    const chartCanvas = document.getElementById('result-chart');
    if (!chartCanvas) return;

    // Le graphique ne s'affiche que pour les cas spécifiques
    const key = `${selectedFace}_${selectedZone}_${parameterType}`;
    
    // Si ce n'est pas une des combinaisons autorisées, masquer le canvas
    if (!chartDataExample[key]) {
        chartCanvas.style.display = 'none';
        if (chartInstance) {
            chartInstance.destroy();
            chartInstance = null;
        }
        return;
    }
    
    // Afficher le canvas
    chartCanvas.style.display = 'block';

    const data = chartDataExample[key];
    
    // Détruire le graphique précédent s'il existe
    if (chartInstance) {
        chartInstance.destroy();
    }

    // Définir le type de graphique selon le visage
    let chartType = 'bar'; // Par défaut
    if (selectedFace === 'face1') {
        chartType = 'bar'; // Graphique en barres
    } else if (selectedFace === 'face2') {
        chartType = 'line'; // Graphique en ligne
    } else if (selectedFace === 'face3') {
        chartType = 'radar'; // Graphique radar
    } else if (selectedFace === 'face4') {
        chartType = 'doughnut'; // Graphique donut
    }

    // Créer un nouveau graphique avec le type approprié
    chartInstance = new Chart(chartCanvas, {
        type: chartType,
        data: {
            labels: data.labels,
            datasets: [{
                label: 'Temps suivi (ms)',
                data: data.data,
                backgroundColor: [
                    'rgba(37, 99, 235, 0.8)',
                    'rgba(220, 38, 38, 0.8)'
                ],
                borderColor: [
                    'rgba(37, 99, 235, 1)',
                    'rgba(220, 38, 38, 1)'
                ],
                borderWidth: 2,
                borderRadius: 5,
                fill: chartType === 'line' || chartType === 'radar',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                title: {
                    display: true,
                    text: data.title,
                    font: {
                        size: 14,
                        weight: 'bold'
                    }
                }
            },
            scales: chartType === 'doughnut' || chartType === 'pie' ? {} : {
                y: {
                    beginAtZero: true,
                    max: Math.max(...data.data) * 1.2,
                    ticks: {
                        callback: function(value) {
                            return value.toFixed(2) + ' s';
                        }
                    }
                }
            }
        }
    });
}

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
                updateResults();
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
                updateResults();
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
                updateResults();
            });
        });

        paramCards[0].classList.add('param-card-selected');
        selectedParameter = paramCards[0].getAttribute('data-param');
    }

    const resultImage = document.getElementById('result-image');

    function updateResults() {
        if (!selectedFace || !selectedZone || !selectedParameter) {
            return;
        }
        
        // Afficher l'image
        const faceName = selectedFace.replace('face', 'visage');
        const imagePath = `img/graphs/${faceName}_${selectedZone}_${selectedParameter}.jpg`;
        resultImage.src = imagePath;
        resultImage.classList.remove('d-none');
        
        // Afficher le graphique seulement pour les cas spécifiques
        createChart(selectedFace, selectedZone, selectedParameter);
    }

    // Met à jour une première fois au chargement
    updateResults();
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