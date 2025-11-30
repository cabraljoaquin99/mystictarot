// Datos de las cartas del tarot
const tarotCards = [
    { name: "El Loco", icon: "🃏", description: "Nuevos comienzos, espontaneidad, aventura" },
    { name: "El Mago", icon: "🧙", description: "Manifestación, recursos, poder personal" },
    { name: "La Sacerdotisa", icon: "🌙", description: "Intuición, misterio, sabiduría interior" },
    { name: "La Emperatriz", icon: "👑", description: "Abundancia, creatividad, naturaleza" },
    { name: "El Emperador", icon: "🏛️", description: "Autoridad, estructura, control" },
    { name: "El Hierofante", icon: "⛪", description: "Tradición, espiritualidad, creencias" },
    { name: "Los Enamorados", icon: "💑", description: "Amor, unión, decisiones" },
    { name: "El Carro", icon: "🛡️", description: "Determinación, control, progreso" },
    { name: "La Fuerza", icon: "🦁", description: "Coraje, paciencia, control interno" },
    { name: "El Ermitaño", icon: "🧓", description: "Introspección, soledad, guía" },
    { name: "La Rueda de la Fortuna", icon: "🔄", description: "Ciclos, destino, cambio" },
    { name: "La Justicia", icon: "⚖️", description: "Equilibrio, verdad, justicia" },
    { name: "El Colgado", icon: "🙃", description: "Sacrificio, perspectiva, rendición" },
    { name: "La Muerte", icon: "💀", description: "Transformación, finales, nuevos comienzos" },
    { name: "La Templanza", icon: "⚗️", description: "Moderación, equilibrio, paciencia" },
    { name: "El Diablo", icon: "😈", description: "Ataduras, tentación, materialismo" },
    { name: "La Torre", icon: "🏰", description: "Cambio repentino, revelación, caos" },
    { name: "La Estrella", icon: "⭐", description: "Esperanza, inspiración, serenidad" },
    { name: "La Luna", icon: "🌕", description: "Ilusión, miedo, subconsciente" },
    { name: "El Sol", icon: "☀️", description: "Alegría, éxito, vitalidad" },
    { name: "El Juicio", icon: "📯", description: "Renacimiento, llamado interno, absolución" },
    { name: "El Mundo", icon: "🌍", description: "Completitud, logro, viaje" }
];

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Generar cartas en la sección de exploración
    generateTarotCards();
    
    // Configurar eventos
    setupEventListeners();
});

// Generar las cartas del tarot en la sección correspondiente
function generateTarotCards() {
    const cardsGrid = document.querySelector('.cards-grid');
    
    tarotCards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'tarot-card';
        cardElement.innerHTML = `
            <div class="tarot-card-icon">${card.icon}</div>
            <h3>${card.name}</h3>
        `;
        
        cardElement.addEventListener('click', () => {
            showCardMeaning(card);
        });
        
        cardsGrid.appendChild(cardElement);
    });
}

// Mostrar el significado de una carta
function showCardMeaning(card) {
    const modal = document.getElementById('reading-modal');
    const resultDiv = document.getElementById('reading-result');
    
    resultDiv.innerHTML = `
        <div class="card-meaning">
            <div class="card-icon-large">${card.icon}</div>
            <h3>${card.name}</h3>
            <p>${card.description}</p>
        </div>
    `;
    
    modal.style.display = 'block';
}

// Configurar event listeners
function setupEventListeners() {
    // Botón de tirada gratuita
    const btnTirada = document.getElementById('btn-tirada');
    btnTirada.addEventListener('click', performReading);
    
    // Botón de nueva tirada en el modal
    const newReadingBtn = document.getElementById('new-reading');
    newReadingBtn.addEventListener('click', performReading);
    
    // Cerrar modal
    const closeBtn = document.querySelector('.close');
    closeBtn.addEventListener('click', () => {
        document.getElementById('reading-modal').style.display = 'none';
    });
    
    // Cerrar modal al hacer clic fuera
    window.addEventListener('click', (event) => {
        const modal = document.getElementById('reading-modal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Animación de las cartas en el hero
    animateHeroCards();
}

// Realizar una tirada de tarot
function performReading() {
    const modal = document.getElementById('reading-modal');
    const resultDiv = document.getElementById('reading-result');
    
    // Seleccionar 3 cartas aleatorias
    const selectedCards = [];
    const usedIndexes = new Set();
    
    while (selectedCards.length < 3 && usedIndexes.size < tarotCards.length) {
        const randomIndex = Math.floor(Math.random() * tarotCards.length);
        if (!usedIndexes.has(randomIndex)) {
            selectedCards.push(tarotCards[randomIndex]);
            usedIndexes.add(randomIndex);
        }
    }
    
    // Mostrar resultado
    resultDiv.innerHTML = `
        <div class="reading-cards">
            <div class="reading-card-item">
                <div class="card-icon">${selectedCards[0].icon}</div>
                <h4>Pasado</h4>
                <h3>${selectedCards[0].name}</h3>
                <p>${selectedCards[0].description}</p>
            </div>
            <div class="reading-card-item">
                <div class="card-icon">${selectedCards[1].icon}</div>
                <h4>Presente</h4>
                <h3>${selectedCards[1].name}</h3>
                <p>${selectedCards[1].description}</p>
            </div>
            <div class="reading-card-item">
                <div class="card-icon">${selectedCards[2].icon}</div>
                <h4>Futuro</h4>
                <h3>${selectedCards[2].name}</h3>
                <p>${selectedCards[2].description}</p>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

// Animación de las cartas en la sección hero
function animateHeroCards() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach((card, index) => {
        // Animación inicial escalonada
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 300);
        
        // Animación de flotación continua
        setInterval(() => {
            card.style.transform = `translateY(${Math.sin(Date.now() / 1000 + index) * 10}px)`;
        }, 50);
    });
}

// Efecto de partículas místicas (opcional)
function createMysticParticles() {
    const particlesContainer = document.querySelector('.floating-symbols');
    
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('span');
        const symbols = ['☾', '☽', '✧', '✦', '✶', '♡', '☆'];
        const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        
        particle.textContent = randomSymbol;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 20}s`;
        particle.style.fontSize = `${Math.random() * 20 + 10}px`;
        particle.style.opacity = `${Math.random() * 0.2 + 0.05}`;
        
        particlesContainer.appendChild(particle);
    }
}

// Inicializar partículas
createMysticParticles();