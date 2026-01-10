import { Storage } from './storage.js';
import { getContentByDay, protocolData } from './content.js';

const views = {
    login: document.getElementById('login-screen'),
    dashboard: document.getElementById('dashboard-screen'),
    contentArea: document.getElementById('dynamic-content'),
    usernameInput: document.getElementById('username'),
    btnStart: document.getElementById('btn-start'),
    displayName: document.getElementById('user-display-name'),
    menuItems: document.querySelectorAll('.nav-links li'),
    progressBar: document.getElementById('global-progress')
};

let currentUser = null;
let devModeKeys = [];

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

function initInteractions() {
    views.btnStart.addEventListener('click', handleLogin);
    views.usernameInput.addEventListener('keypress', (e) => { if(e.key === 'Enter') handleLogin(); });

    views.menuItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            views.menuItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            if (index === 0) renderDayContent(currentUser.currentDay); // Hoje
            if (index === 1) renderLibrary(); // Biblioteca
            if (index === 2) renderAllChallenges(); // Desafios Globais
            if (index === 3) renderSettings(); // Config
        });
    });
}

function handleLogin() {
    const name = views.usernameInput.value.trim();
    if (name.length > 0) {
        currentUser = Storage.initUser(name);
        views.login.style.opacity = '0';
        setTimeout(() => loadDashboard(), 600);
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
    views.displayName.innerText = currentUser.username;
    renderDayContent(currentUser.currentDay);
    showScreen('dashboard');
}

// --- RENDERERS (A Nova UI) ---

function renderDayContent(day) {
    const content = getContentByDay(day);
    if (!content) return views.contentArea.innerHTML = `<div class="reading-content"><h2>Fim do Protocolo</h2></div>`;

    // Calcular progresso do dia
    const totalDayChallenges = content.data.challenges.length;
    const completedDayChallenges = content.data.challenges.filter(c => currentUser.completedChallenges.includes(c.id)).length;
    const progressPercent = (completedDayChallenges / totalDayChallenges) * 100;

    let challengesHtml = content.data.challenges.map(c => {
        const isDone = currentUser.completedChallenges.includes(c.id);
        return `
            <div class="challenge-item ${isDone ? 'done' : ''}">
                <div class="challenge-info">
                    <span class="challenge-time">${c.time} • +${c.xp} XP</span>
                    <h4>${c.title}</h4>
                    <p style="font-size: 0.9rem; color: var(--text-muted); margin-top: 5px">${c.description}</p>
                </div>
                <button class="challenge-btn" onclick="window.toggleChallenge('${c.id}', ${c.xp}, ${day})">
                    <i class="fa-solid fa-check"></i>
                </button>
            </div>
        `;
    }).join('');

    views.contentArea.innerHTML = `
        <div style="animation: fadeInUp 0.6s ease">
            <div class="day-header">
                <div>
                    <span class="badge" style="background:${content.week.color}20; color:${content.week.color}">
                        ${content.week.title}
                    </span>
                    <h1 style="font-size: 2.5rem; margin-top: 0.5rem">${content.data.title}</h1>
                </div>
                <div style="text-align:right">
                    <span style="font-size:3rem; font-weight:700; color:rgba(0,0,0,0.1)">${day.toString().padStart(2, '0')}</span>
                </div>
            </div>

            <div class="reading-content">
                ${content.data.reading}
            </div>

            <div style="margin-bottom: 1rem; display: flex; justify-content:space-between; align-items:center">
                <h3>Protocolo do Dia</h3>
                <span style="font-size:0.9rem; font-weight:600; color:var(--primary-color)">${Math.round(progressPercent)}% Concluído</span>
            </div>
            
            <div class="challenges-grid">
                ${challengesHtml}
            </div>
        </div>
    `;
}

function renderLibrary() {
    let html = `<h2 style="margin-bottom:2rem">Jornada Neural</h2><div class="library-grid">`;
    let globalDay = 0;

    protocolData.weeks.forEach(week => {
        week.days.forEach(day => {
            globalDay++;
            const isLocked = !currentUser.isDev && (globalDay > currentUser.currentDay);
            // Verifica se todos os desafios do dia foram feitos
            const allDone = day.challenges.every(c => currentUser.completedChallenges.includes(c.id));
            
            html += `
                <div class="day-card ${isLocked ? 'locked' : ''}" onclick="${!isLocked ? `window.loadDay(${globalDay})` : ''}">
                    <div style="display:flex; justify-content:space-between; margin-bottom:1rem">
                        <span style="font-weight:600; color:${isLocked ? '#999' : week.color}">DIA ${globalDay}</span>
                        ${allDone ? '<i class="fa-solid fa-check-circle" style="color:var(--success)"></i>' : ''}
                        ${isLocked ? '<i class="fa-solid fa-lock"></i>' : ''}
                    </div>
                    <h4 style="color:${isLocked ? '#999' : '#333'}">${day.title}</h4>
                </div>
            `;
        });
    });
    html += `</div>`;
    views.contentArea.innerHTML = html;
}

function renderAllChallenges() {
    let html = `<h2 style="margin-bottom:2rem">Central de Desafios</h2><div class="challenges-grid">`;
    let globalDay = 0;

    protocolData.weeks.forEach(week => {
        week.days.forEach(day => {
            globalDay++;
            if (currentUser.isDev || globalDay <= currentUser.currentDay) {
                day.challenges.forEach(c => {
                    const isDone = currentUser.completedChallenges.includes(c.id);
                    html += `
                        <div class="challenge-item ${isDone ? 'done' : ''}">
                            <div class="challenge-info">
                                <span class="challenge-time">DIA ${globalDay} • ${c.time}</span>
                                <h4>${c.title}</h4>
                            </div>
                            ${isDone ? '<i class="fa-solid fa-check" style="color:var(--success)"></i>' : '<i class="fa-regular fa-circle" style="color:#ccc"></i>'}
                        </div>
                    `;
                });
            }
        });
    });
    html += `</div>`;
    views.contentArea.innerHTML = html;
}

function renderSettings() {
    views.contentArea.innerHTML = `
        <h2>Configurações & Reset</h2>
        <div class="reading-content" style="margin-top:2rem">
            <h3>Estatísticas do Usuário</h3>
            <p><strong>XP Total:</strong> ${currentUser.xp}</p>
            <p><strong>Desafios Vencidos:</strong> ${currentUser.completedChallenges.length}</p>
            <hr style="margin: 2rem 0; border:0; border-top:1px solid #eee">
            <h3 style="color:var(--danger)">Zona de Perigo</h3>
            <p>Apagar todo o progresso e reiniciar a jornada.</p>
            <button onclick="window.resetData()" class="btn-primary" style="background:var(--danger); margin-top:1rem">Resetar Tudo</button>
        </div>
    `;
}

// --- FUNÇÕES GLOBAIS ---
window.toggleChallenge = (id, xp, day) => {
    const isDone = currentUser.completedChallenges.includes(id);
    if (!isDone) {
        Storage.completeChallenge(id, xp);
    } 
    // Nota: Por design, não permitimos "descompletar" para evitar farming de XP, mas podemos adicionar se quiser.
    
    currentUser = Storage.get();
    renderDayContent(day); // Re-renderiza para atualizar visual
};

window.loadDay = (day) => { renderDayContent(day); };
window.resetData = () => { if(confirm("Certeza?")) Storage.reset(); };

// --- DEV MODE (Shift + Z + X) ---
function initDevMode() {
    document.addEventListener('keydown', (e) => {
        devModeKeys.push(e.key.toLowerCase());
        if (devModeKeys.length > 3) devModeKeys.shift();
        if (e.shiftKey && e.key.toLowerCase() === 'x' && devModeKeys[devModeKeys.length-2] === 'z') {
            currentUser.isDev = !currentUser.isDev;
            Storage.save(currentUser);
            alert("Modo Dev: " + (currentUser.isDev ? "ATIVADO" : "DESATIVADO"));
            loadDashboard();
        }
    });
}
