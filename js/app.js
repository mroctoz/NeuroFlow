import { Storage } from './storage.js';
import { getContentByDay } from './content.js';

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
    
    // Stats
    dopamineBar: document.querySelector('.status-bar:nth-child(2) .fill'), // Ajustar seletor conforme HTML
    cortisolBar: document.querySelector('.status-bar:nth-child(3) .fill')  // Ajustar seletor conforme HTML
};

// Estado da Aplicação
let currentUser = null;

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    // 1. Verificar se existe usuário
    const storedUser = Storage.get();

    if (storedUser) {
        // Usuário existe: Atualizar progresso e mostrar Dashboard
        currentUser = Storage.updateProgress(storedUser);
        loadDashboard();
    } else {
        // Usuário novo: Mostrar Login
        showScreen('login');
    }

    // Event Listeners
    views.btnStart.addEventListener('click', handleLogin);
    
    // Atalho para Enter no input
    views.usernameInput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') handleLogin();
    });
}

function handleLogin() {
    const name = views.usernameInput.value.trim();
    if (name.length > 0) {
        // Criar usuário e salvar
        currentUser = Storage.initUser(name);
        
        // Animação de saída
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
    // Ocultar todas
    document.querySelectorAll('.screen').forEach(s => {
        s.classList.add('hidden');
        s.classList.remove('active');
    });

    // Mostrar alvo
    const target = screenName === 'login' ? views.login : views.dashboard;
    target.classList.remove('hidden');
    // Pequeno delay para permitir a transição CSS de opacidade
    setTimeout(() => target.classList.add('active'), 50);
}

function loadDashboard() {
    // 1. Atualizar Interface com dados do usuário
    updateUIHeader();
    
    // 2. Carregar conteúdo do dia atual
    renderDayContent(currentUser.currentDay);
    
    // 3. Mostrar tela
    showScreen('dashboard');
}

function updateUIHeader() {
    views.displayName.innerText = currentUser.username;
    views.dayNumber.innerText = currentUser.currentDay.toString().padStart(2, '0');
    
    // Atualizar barras de status (precisamos selecionar corretamente no DOM)
    // Nota: No HTML da etapa 1, não coloquei IDs nas barras, faremos via querySelector relativo por enquanto
    // Idealmente adicionaríamos IDs no HTML na próxima etapa para ser mais seguro.
    const bars = document.querySelectorAll('.progress .fill');
    if(bars.length >= 2) {
        bars[0].style.width = `${currentUser.dopamineLevel}%`; // Dopamina
        bars[1].style.width = `${currentUser.cortisolLevel}%`; // Cortisol
    }
}

function renderDayContent(day) {
    const content = getContentByDay(day);
    
    if (!content) {
        views.contentArea.innerHTML = `
            <div class="placeholder-content">
                <h2>Protocolo Finalizado</h2>
                <p>Você atingiu o limite do conhecimento atual.</p>
            </div>
        `;
        return;
    }

    const isChallengeDone = currentUser.completedChallenges.includes(content.data.challenge.id);

    // Template String do Conteúdo
    const html = `
        <div class="fade-in-up">
            <span class="status-badge" style="border-color: ${content.phase.color}; color: ${content.phase.color}">
                Fase ${content.phase.id}: ${content.phase.title}
            </span>
            
            <h1 style="margin-top: 1rem; font-size: 2.5rem; font-family: var(--font-heading)">
                ${content.data.title}
            </h1>
            
            <p class="subtitle" style="color: var(--text-muted); margin-bottom: 2rem">
                <i class="fa-solid fa-quote-left"></i> Fonte: ${content.data.source}
            </p>

            <div class="reading-content">
                ${content.data.reading}
            </div>

            <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.1); margin: 3rem 0;">

            <div class="challenge-card ${isChallengeDone ? 'done' : ''}">
                <div class="challenge-header">
                    <i class="fa-solid ${isChallengeDone ? 'fa-check-circle' : 'fa-triangle-exclamation'}"></i>
                    <h3>Protocolo Prático: ${content.data.challenge.title}</h3>
                </div>
                <p>${content.data.challenge.description}</p>
                
                ${!isChallengeDone ? `
                    <button onclick="window.completeCurrentChallenge('${content.data.challenge.id}', ${content.data.challenge.xp})" class="btn-neon" style="margin-top: 1rem; font-size: 0.9rem;">
                        Marcar como Concluído (+${content.data.challenge.xp} XP)
                    </button>
                ` : `
                    <div class="completion-badge">Protocolo Executado</div>
                `}
            </div>
        </div>
    `;

    views.contentArea.innerHTML = html;
}

// Expor função globalmente para o botão onclick funcionar (solução simples para este estágio)
window.completeCurrentChallenge = (id, xp) => {
    const success = Storage.completeChallenge(id, xp);
    if(success) {
        currentUser = Storage.get(); // Recarregar dados atualizados
        updateUIHeader(); // Atualizar barras
        renderDayContent(currentUser.currentDay); // Re-renderizar para mostrar estado concluído
    }
};
