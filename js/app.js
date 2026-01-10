// js/app.js

import { Storage } from './storage.js';
import { getContentByDay, protocolData } from './content.js';

// --- CONFIGURAÇÃO DE DOM ---
const views = {
    login: document.getElementById('login-screen'),
    dashboard: document.getElementById('dashboard-screen'),
    contentArea: document.getElementById('dynamic-content'),
    usernameInput: document.getElementById('username'),
    btnStart: document.getElementById('btn-start'),
    displayName: document.getElementById('user-display-name'),
    dayNumber: document.getElementById('day-number'),
    menuItems: document.querySelectorAll('.sidebar nav li'),
};

// --- ESTADO ---
let currentUser = null;
let devModeKeys = []; // Para rastrear o combo Shift+Z+X

// --- INICIALIZAÇÃO ---
document.addEventListener('DOMContentLoaded', () => {
    initApp();
    initInteractions();
    initDevMode();
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

// --- INTERAÇÕES ---
function initInteractions() {
    views.btnStart.addEventListener('click', handleLogin);
    views.usernameInput.addEventListener('keypress', (e) => { if(e.key === 'Enter') handleLogin(); });

    // Menu de Navegação
    views.menuItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            views.menuItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            // Lógica das Abas
            switch(index) {
                case 0: // Módulo Atual
                    renderDayContent(currentUser.currentDay);
                    break;
                case 1: // Biblioteca
                    renderLibrary();
                    break;
                case 2: // Desafios (Consertado)
                    renderChallengesPage();
                    break;
                case 3: // Configurações (Antigo Neuroplasticidade)
                    renderSettingsPage();
                    break;
            }
        });
    });
}

// --- DEV MODE (GOD MODE) ---
function initDevMode() {
    document.addEventListener('keydown', (e) => {
        // Adiciona tecla ao buffer
        devModeKeys.push(e.key.toLowerCase());
        if (devModeKeys.length > 3) devModeKeys.shift(); // Manter apenas as últimas 3

        // Verificar combo: shift (segurado ou pressionado) + z + x
        // Nota: e.shiftKey é true se shift estiver segurado
        if (e.shiftKey && e.key.toLowerCase() === 'x' && devModeKeys[devModeKeys.length-2] === 'z') {
            toggleDevMode();
        }
    });
}

function toggleDevMode() {
    const isDev = !currentUser.isDev;
    currentUser.isDev = isDev;
    
    // Se ativado, desbloqueia todos os dias virtualmente
    if (isDev) {
        alert("⚡ DEV MODE ATIVADO: Acesso total liberado.");
        document.body.classList.add('dev-mode-active');
    } else {
        alert("Dev Mode Desativado.");
        document.body.classList.remove('dev-mode-active');
    }
    
    Storage.save(currentUser);
    // Recarregar a tela atual para aplicar desbloqueios
    renderLibrary(); 
}

// --- LÓGICA DE LOGIN/NAVEGAÇÃO ---
function handleLogin() {
    const name = views.usernameInput.value.trim();
    if (name.length > 0) {
        currentUser = Storage.initUser(name);
        views.login.style.opacity = '0';
        setTimeout(() => loadDashboard(), 500);
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
    
    const bars = document.querySelectorAll('.progress .fill');
    if(bars.length >= 2) {
        bars[0].style.width = `${currentUser.dopamineLevel}%`;
        bars[1].style.width = `${currentUser.cortisolLevel}%`;
    }
}

// --- RENDERIZADORES ---

// 1. Conteúdo do Dia
function renderDayContent(day) {
    const content = getContentByDay(day);
    
    if (!content) {
        views.contentArea.innerHTML = `<div class="placeholder-content"><h2>Protocolo Finalizado.</h2><p>Você é um mestre neural.</p></div>`;
        return;
    }

    const isChallengeDone = currentUser.completedChallenges.includes(content.data.challenge.id);

    views.contentArea.innerHTML = `
        <div class="fade-in-up">
            <div class="content-header">
                <span class="status-badge" style="border-color: ${content.week.color}; color: ${content.week.color}">
                    ${content.week.title}
                </span>
                <span class="day-indicator">Dia ${day}</span>
            </div>
            
            <h1 class="lesson-title">${content.data.title}</h1>
            <p class="subtitle"><i class="fa-solid fa-quote-left"></i> Fonte: ${content.data.source}</p>

            <div class="reading-content glass-panel-light">
                ${content.data.reading}
            </div>

            <div class="challenge-section">
                ${renderChallengeCard(content.data.challenge, isChallengeDone, day)}
            </div>
        </div>
    `;
}

// Helper para Card de Desafio
function renderChallengeCard(challenge, isDone, day) {
    return `
        <div class="challenge-card ${isDone ? 'done' : ''}">
            <div class="challenge-header">
                <i class="fa-solid ${isDone ? 'fa-check-circle' : 'fa-brain'}"></i>
                <div>
                    <h3>Desafio: ${challenge.title}</h3>
                    <span class="xp-badge">+${challenge.xp} XP</span>
                </div>
            </div>
            <p>${challenge.description}</p>
            ${!isDone ? `
                <button onclick="window.completeCurrentChallenge('${challenge.id}', ${challenge.xp}, ${day})" class="btn-neon">
                    Completar Protocolo
                </button>
            ` : `<div class="completion-badge">Concluído</div>`}
        </div>
    `;
}

// 2. Biblioteca
function renderLibrary() {
    let html = `<div class="fade-in-up"><h2 class="section-title">Biblioteca Neural</h2><div class="library-grid">`;
    let globalDayCount = 0;

    protocolData.weeks.forEach(week => {
        html += `<h3 class="phase-title" style="color:${week.color}; grid-column: 1/-1;">${week.title}</h3>`;
        week.days.forEach(day => {
            globalDayCount++;
            // Lógica de Bloqueio: Se DevMode está on, tudo desbloqueado. Se não, segue o dia atual.
            const isLocked = !currentUser.isDev && (globalDayCount > currentUser.currentDay);
            const isCompleted = currentUser.completedChallenges.includes(day.challenge.id);
            
            html += `
                <div class="library-card glass-panel ${isLocked ? 'locked' : ''} ${isCompleted ? 'completed' : ''}" 
                     onclick="${!isLocked ? `window.loadDay(${globalDayCount})` : ''}">
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

// 3. Página de Desafios (NOVO)
function renderChallengesPage() {
    let html = `<div class="fade-in-up"><h2 class="section-title">Central de Desafios</h2>`;
    let globalDayCount = 0;
    
    // Filtra desafios desbloqueados
    let unlockedChallenges = [];
    
    protocolData.weeks.forEach(week => {
        week.days.forEach(day => {
            globalDayCount++;
            if (currentUser.isDev || globalDayCount <= currentUser.currentDay) {
                unlockedChallenges.push({ ...day.challenge, dayIdx: globalDayCount });
            }
        });
    });

    // Separar em Pendentes e Concluídos
    const pending = unlockedChallenges.filter(c => !currentUser.completedChallenges.includes(c.id));
    const done = unlockedChallenges.filter(c => currentUser.completedChallenges.includes(c.id));

    if (pending.length > 0) {
        html += `<h3 class="phase-title" style="color: var(--danger)">Pendentes</h3><div class="challenges-list">`;
        pending.forEach(c => {
            html += renderChallengeCard(c, false, c.dayIdx);
        });
        html += `</div>`;
    } else {
        html += `<div class="empty-state"><i class="fa-solid fa-medal"></i><p>Todos os desafios disponíveis foram concluídos.</p></div>`;
    }

    if (done.length > 0) {
        html += `<h3 class="phase-title" style="color: #2ecc71; margin-top: 2rem;">Concluídos</h3><div class="challenges-list">`;
        done.forEach(c => {
            html += renderChallengeCard(c, true, c.dayIdx);
        });
        html += `</div>`;
    }

    html += `</div>`;
    views.contentArea.innerHTML = html;
}

// 4. Página de Configurações / Neuroplasticidade (NOVO)
function renderSettingsPage() {
    views.contentArea.innerHTML = `
        <div class="fade-in-up">
            <h2 class="section-title">Configurações Neurais</h2>
            
            <div class="glass-panel" style="padding: 2rem; margin-top: 1rem;">
                <div class="user-stats-grid">
                    <div class="stat-box">
                        <h3>${currentUser.xp}</h3>
                        <span>Total XP</span>
                    </div>
                    <div class="stat-box">
                        <h3>${currentUser.currentDay}</h3>
                        <span>Dias Corridos</span>
                    </div>
                    <div class="stat-box">
                        <h3>${currentUser.completedChallenges.length}</h3>
                        <span>Desafios Vencidos</span>
                    </div>
                </div>

                <div style="margin-top: 3rem; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 2rem;">
                    <h3 style="color: var(--danger); margin-bottom: 1rem;">Zona de Perigo</h3>
                    <p style="margin-bottom: 1rem;">Reiniciar apagará todo o progresso neural adquirido. Esta ação é irreversível.</p>
                    <button onclick="window.resetProtocol()" class="btn-neon" style="border-color: var(--danger); color: var(--danger);">
                        <i class="fa-solid fa-triangle-exclamation"></i> Resetar Protocolo
                    </button>
                </div>
            </div>
        </div>
    `;
}

// --- FUNÇÕES GLOBAIS ---
window.loadDay = (day) => {
    // Resetar visual do menu para o primeiro item
    views.menuItems.forEach(i => i.classList.remove('active'));
    views.menuItems[0].classList.add('active');
    renderDayContent(day);
};

window.completeCurrentChallenge = (id, xp, day) => {
    const success = Storage.completeChallenge(id, xp);
    if(success) {
        currentUser = Storage.get();
        updateUIHeader();
        // Recarregar a página certa dependendo de onde o clique veio
        // Se estamos na pagina de desafios, recarrega ela
        if(document.querySelector('.challenges-list')) {
            renderChallengesPage();
        } else {
            renderDayContent(day);
        }
    }
};

window.resetProtocol = () => {
    if(confirm("Tem certeza absoluta? Sua neuroplasticidade voltará à estaca zero.")) {
        Storage.reset();
    }
};
