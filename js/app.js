// js/app.js

import { Storage } from './storage.js';
import { getContentByDay, protocolData } from './content.js';

// Elementos do DOM
const views = {
    login: document.getElementById('login-screen'),
    dashboard: document.getElementById('dashboard-screen'),
    contentArea: document.getElementById('dynamic-content'),
    usernameInput: document.getElementById('username'),
    btnStart: document.getElementById('btn-start'),
    
    // Header Info
    displayName: document.getElementById('user-display-name'),
    dayNumber: document.getElementById('day-number'),
    
    // Navegação
    menuItems: document.querySelectorAll('.sidebar nav li'),
    
    // Stats
    // Nota: Adicionamos IDs no CSS/HTML virtualmente para facilitar, mas aqui usamos seletores robustos
    dopamineBar: document.querySelector('.status-bar:nth-child(2) .fill'),
    cortisolBar: document.querySelector('.status-bar:nth-child(3) .fill')
};

// Estado da Aplicação
let currentUser = null;
let viewMode = 'current'; // 'current' ou 'library'

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    initApp();
    initInteractions();
});

function initApp() {
    const storedUser = Storage.get();

    if (storedUser) {
        currentUser = Storage.updateProgress(storedUser);
        loadDashboard();
    } else {
        showScreen('login');
    }
}

function initInteractions() {
    views.btnStart.addEventListener('click', handleLogin);
    
    views.usernameInput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') handleLogin();
    });

    // Menu Navigation
    views.menuItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            // Remove active class from all
            views.menuItems.forEach(i => i.classList.remove('active'));
            // Add to clicked
            item.classList.add('active');

            // Logic for menu items
            if (index === 0) { // Módulo Atual
                renderDayContent(currentUser.currentDay);
            } else if (index === 1) { // Biblioteca
                renderLibrary();
            } else if (index === 3) { // Neuroplasticidade (Reset)
                if(confirm("Reiniciar todo o protocolo neural? Isso apagará seu progresso.")) {
                    Storage.reset();
                }
            }
        });
    });
}

function handleLogin() {
    const name = views.usernameInput.value.trim();
    if (name.length > 0) {
        currentUser = Storage.initUser(name);
        views.login.style.opacity = '0';
        setTimeout(() => {
            loadDashboard();
        }, 500);
    } else {
        views.usernameInput.style.borderColor = 'var(--danger)';
        setTimeout(() => views.usernameInput.style.borderColor = 'rgba(255,255,255,0.1)', 1000);
    }
}

function showScreen(screenName) {
    document.querySelectorAll('.screen').forEach(s => {
        s.classList.add('hidden');
        s.classList.remove('active');
    });

    const target = screenName === 'login' ? views.login : views.dashboard;
    target.classList.remove('hidden');
    setTimeout(() => target.classList.add('active'), 50);
}

function loadDashboard() {
    updateUIHeader();
    renderDayContent(currentUser.currentDay);
    showScreen('dashboard');
}

function updateUIHeader() {
    views.displayName.innerText = currentUser.username;
    views.dayNumber.innerText = currentUser.currentDay.toString().padStart(2, '0');
    
    // Atualização visual das barras de status
    const bars = document.querySelectorAll('.progress .fill');
    if(bars.length >= 2) {
        bars[0].style.width = `${currentUser.dopamineLevel}%`;
        bars[1].style.width = `${currentUser.cortisolLevel}%`;
    }
}

// Renderiza a Lista de Dias (Biblioteca)
function renderLibrary() {
    let html = `
        <div class="fade-in-up">
            <h2 style="font-family: var(--font-heading); margin-bottom: 2rem;">Biblioteca Neural</h2>
            <div class="library-grid">
    `;

    let globalDayCount = 0;

    protocolData.phases.forEach(phase => {
        html += `<h3 class="phase-title" style="color:${phase.color}; grid-column: 1/-1; margin-top: 1rem;">Fase ${phase.id}: ${phase.title}</h3>`;
        
        phase.days.forEach(day => {
            globalDayCount++;
            const isLocked = globalDayCount > currentUser.currentDay;
            const isCompleted = currentUser.completedChallenges.includes(day.challenge.id);
            
            let cardClass = "library-card glass-panel";
            if (isLocked) cardClass += " locked";
            if (isCompleted) cardClass += " completed";

            html += `
                <div class="${cardClass}" onclick="${!isLocked ? `window.loadDay(${globalDayCount})` : ''}">
                    <div class="card-top">
                        <span class="day-badge">Dia ${globalDayCount}</span>
                        ${isCompleted ? '<i class="fa-solid fa-check-circle" style="color:#2ecc71"></i>' : ''}
                        ${isLocked ? '<i class="fa-solid fa-lock"></i>' : ''}
                    </div>
                    <h4>${day.title}</h4>
                </div>
            `;
        });
    });

    html += `</div></div>`;
    views.contentArea.innerHTML = html;
}

// Renderiza o conteúdo de um dia específico
function renderDayContent(day) {
    const content = getContentByDay(day);
    
    if (!content) {
        views.contentArea.innerHTML = `<div class="placeholder-content"><h2>Conteúdo não sincronizado.</h2></div>`;
        return;
    }

    const isChallengeDone = currentUser.completedChallenges.includes(content.data.challenge.id);

    const html = `
        <div class="fade-in-up">
            <div class="content-header">
                <span class="status-badge" style="border-color: ${content.phase.color}; color: ${content.phase.color}">
                    Fase ${content.phase.id}: ${content.phase.title}
                </span>
                <span class="day-indicator">Dia ${day}</span>
            </div>
            
            <h1 class="lesson-title">${content.data.title}</h1>
            
            <p class="subtitle">
                <i class="fa-solid fa-quote-left"></i> Fonte: ${content.data.source}
            </p>

            <div class="reading-content glass-panel-light">
                ${content.data.reading}
            </div>

            <div class="challenge-section">
                <div class="challenge-card ${isChallengeDone ? 'done' : ''}">
                    <div class="challenge-header">
                        <i class="fa-solid ${isChallengeDone ? 'fa-check-circle' : 'fa-brain'}"></i>
                        <div>
                            <h3>Neuro-Desafio: ${content.data.challenge.title}</h3>
                            <span class="xp-badge">+${content.data.challenge.xp} NeuroPlasticidade</span>
                        </div>
                    </div>
                    <p>${content.data.challenge.description}</p>
                    
                    ${!isChallengeDone ? `
                        <button onclick="window.completeCurrentChallenge('${content.data.challenge.id}', ${content.data.challenge.xp}, ${day})" class="btn-neon">
                            Executar Protocolo
                        </button>
                    ` : `
                        <div class="completion-badge">Conexão Sináptica Estabelecida</div>
                    `}
                </div>
            </div>
        </div>
    `;

    views.contentArea.innerHTML = html;
}

// Funções Globais para interação via HTML
window.loadDay = (day) => {
    renderDayContent(day);
    // Reset visual menu selection if needed
};

window.completeCurrentChallenge = (id, xp, day) => {
    const success = Storage.completeChallenge(id, xp);
    if(success) {
        currentUser = Storage.get();
        updateUIHeader();
        renderDayContent(day); // Reload to show checkmark
    }
};
