/*
 * NEUROFLOW ENGINE
 * Controla a lógica de aplicação, renderização de UI e gamificação.
 */

const App = {
    // Estado da aplicação em tempo de execução
    state: {
        currentUser: null,
        currentView: 'dashboard',
        activeModuleId: null
    },

    // --- INICIALIZAÇÃO ---
    init: () => {
        // Verifica se há usuário salvo via "API" local
        const user = API.getUser();
        
        if (user && user.name !== "Visitante") {
            App.state.currentUser = user;
            App.loadMainInterface();
        } else {
            App.loadAuthScreen();
        }

        App.setupEventListeners();
    },

    // --- GESTÃO DE TELAS E ROTEAMENTO ---
    loadAuthScreen: () => {
        document.getElementById('auth-screen').classList.remove('hidden');
        document.getElementById('main-interface').classList.add('hidden');
    },

    loadMainInterface: () => {
        document.getElementById('auth-screen').classList.add('hidden');
        document.getElementById('main-interface').classList.remove('hidden');
        
        // Carrega dados iniciais
        App.updateSidebar();
        App.renderDashboard();
    },

    navigate: (viewName) => {
        App.state.currentView = viewName;
        
        // Atualiza Menu
        document.querySelectorAll('.nav-item').forEach(el => {
            el.classList.remove('active');
            if(el.dataset.target === viewName) el.classList.add('active');
        });

        // Efeito de Fade no conteúdo
        const container = document.getElementById('dynamic-content');
        container.style.opacity = 0;
        
        setTimeout(() => {
            container.innerHTML = ''; // Limpa view anterior
            
            switch(viewName) {
                case 'dashboard': App.renderDashboard(); break;
                case 'modules': App.renderModules(); break;
                case 'journal': App.renderJournal(); break;
                case 'profile': App.renderProfile(); break;
                case 'library': App.renderLibrary(); break;
            }
            
            container.style.opacity = 1;
        }, 200);
    },

    // --- RENDERIZADORES (VIEWS) ---

    // 1. Dashboard: Visão Geral
    renderDashboard: () => {
        const user = API.getUser();
        const container = document.getElementById('dynamic-content');
        
        // Saudação baseada no horário
        const hour = new Date().getHours();
        let greeting = "Olá";
        if (hour < 12) greeting = "Bom dia";
        else if (hour < 18) greeting = "Boa tarde";
        else greeting = "Boa noite";

        // Próximo módulo disponível
        const modules = API.getModules();
        const currentMod = modules.find(m => !m.locked && !m.completed) || modules[modules.length -1];

        const html = `
            <div class="welcome-banner glass-panel">
                <div class="banner-text">
                    <h1>${greeting}, ${user.name}</h1>
                    <p>Seu sistema límbico está calmo hoje? Vamos exercitar o córtex.</p>
                    <button class="btn-primary" onclick="App.openModule('${currentMod.id}')">
                        Continuar Jornada <i class="fa-solid fa-arrow-right"></i>
                    </button>
                </div>
                <div class="banner-decoration">
                    <i class="fa-solid fa-dna"></i>
                </div>
            </div>

            <div class="dashboard-grid grid-3">
                <div class="glass-card stat-card">
                    <div class="icon-box primary"><i class="fa-solid fa-bolt"></i></div>
                    <div>
                        <h3>${user.xp} XP</h3>
                        <p>Total Acumulado</p>
                    </div>
                </div>
                <div class="glass-card stat-card">
                    <div class="icon-box secondary"><i class="fa-solid fa-layer-group"></i></div>
                    <div>
                        <h3>${user.level}</h3>
                        <p>Nível Neural</p>
                    </div>
                </div>
                <div class="glass-card stat-card">
                    <div class="icon-box accent"><i class="fa-solid fa-check-double"></i></div>
                    <div>
                        <h3>${user.completedMissions.length}</h3>
                        <p>Missões Feitas</p>
                    </div>
                </div>
            </div>

            <h3 class="section-header">Atividade Recente</h3>
            <div class="recent-activity glass-panel">
                ${user.journalHistory.length > 0 
                    ? `<p><i class="fa-solid fa-pen-nib"></i> Último registro no diário: <strong>${user.journalHistory[0].emotion}</strong> - "${user.journalHistory[0].date}"</p>`
                    : `<p>Nenhuma atividade recente. Comece um módulo!</p>`
                }
            </div>
        `;
        container.innerHTML = html;
    },

    // 2. Módulos: A "Netflix" da Neurociência
    renderModules: () => {
        const modules = API.getModules();
        const container = document.getElementById('dynamic-content');
        
        let html = `<div class="modules-grid grid-2">`;
        
        modules.forEach(mod => {
            const statusClass = mod.locked ? 'locked' : (mod.completed ? 'completed' : 'available');
            const icon = mod.locked ? 'fa-lock' : (mod.completed ? 'fa-check' : mod.icon);
            const btnText = mod.locked ? 'Bloqueado' : (mod.completed ? 'Revisar' : 'Iniciar');
            
            html += `
                <div class="glass-card module-card ${statusClass}" onclick="${!mod.locked ? `App.openModule('${mod.id}')` : ''}">
                    <div class="module-icon">
                        <i class="fa-solid ${icon}"></i>
                    </div>
                    <div class="module-info">
                        <h4>${mod.title}</h4>
                        <p>${mod.subtitle}</p>
                        <div class="module-footer">
                            <span class="status-tag ${statusClass}">${mod.locked ? 'Nível Necessário' : 'Disponível'}</span>
                        </div>
                    </div>
                </div>
            `;
        });
        
        html += `</div>`;
        container.innerHTML = html;
    },

    // 3. Leitor Imersivo (O "Mini-Livro")
    openModule: (moduleId) => {
        const modules = API.getModules();
        const moduleData = modules.find(m => m.id === moduleId);
        if(!moduleData) return;

        App.state.activeModuleId = moduleId;
        
        const reader = document.getElementById('reader-interface');
        const contentArea = document.getElementById('reader-text-area');
        const title = document.getElementById('reader-chapter-title');
        
        title.innerText = moduleData.title;
        
        // Constrói o HTML do conteúdo
        let htmlContent = `<div class="chapter-content">`;
        
        // 1. Introdução
        htmlContent += `<div class="intro-box"><p>${moduleData.content.summary}</p></div>`;
        
        // 2. Capítulos (Texto)
        moduleData.content.chapters.forEach((chap, index) => {
            htmlContent += `
                <article class="chapter">
                    <h3>${index + 1}. ${chap.title}</h3>
                    <div class="text-body">${chap.text}</div>
                </article>
                <hr class="divider">
            `;
        });

        // 3. Missões Práticas
        htmlContent += `<h3><i class="fa-solid fa-gamepad"></i> Missões Práticas</h3>`;
        htmlContent += `<div class="missions-list">`;
        
        const user = API.getUser();
        
        moduleData.content.missions.forEach(mission => {
            const isDone = user.completedMissions.includes(mission.id);
            htmlContent += `
                <div class="mission-card ${isDone ? 'done' : ''}">
                    <div class="mission-info">
                        <h5>${mission.title} <span class="xp-badge">+${mission.xp} XP</span></h5>
                        <p>${mission.desc}</p>
                    </div>
                    <button class="btn-check ${isDone ? 'checked' : ''}" 
                        onclick="App.completeMission('${mission.id}', this)" ${isDone ? 'disabled' : ''}>
                        ${isDone ? '<i class="fa-solid fa-check"></i> Feito' : 'Concluir'}
                    </button>
                </div>
            `;
        });
        
        htmlContent += `</div></div>`; // Fecha chapter-content
        
        contentArea.innerHTML = htmlContent;
        
        // Transição de tela
        document.getElementById('main-interface').classList.add('hidden');
        reader.classList.remove('hidden');
        reader.classList.add('active');
    },

    closeReader: () => {
        document.getElementById('reader-interface').classList.add('hidden');
        document.getElementById('reader-interface').classList.remove('active');
        document.getElementById('main-interface').classList.remove('hidden');
        App.renderModules(); // Atualiza estado
        App.updateSidebar(); // Atualiza XP
    },

    // 4. Diário Neuro-Emocional
    renderJournal: () => {
        const container = document.getElementById('dynamic-content');
        const user = API.getUser();
        const emotions = neuroData.journalLogic.emotions;

        let emotionsHtml = emotions.map(e => `
            <div class="emotion-chip" onclick="App.selectEmotion(this, '${e.name}', '${e.color}')" style="border-color: ${e.color}">
                <span class="dot" style="background-color: ${e.color}"></span> ${e.name}
            </div>
        `).join('');

        let historyHtml = user.journalHistory.map(entry => `
            <div class="journal-entry glass-panel" style="border-left: 4px solid ${entry.color || '#fff'}">
                <div class="entry-header">
                    <span class="emotion-tag" style="background:${entry.color}20; color:${entry.color}">${entry.emotion}</span>
                    <span class="date">${entry.date}</span>
                </div>
                <p class="trigger"><strong>Gatilho:</strong> ${entry.trigger}</p>
                <div class="neuro-feedback">
                    <i class="fa-solid fa-brain"></i>
                    <p>${entry.advice}</p>
                </div>
            </div>
        `).join('');

        container.innerHTML = `
            <div class="journal-wrapper grid-2">
                <div class="journal-form glass-panel">
                    <h3>Novo Registro</h3>
                    <p class="form-desc">Nomeie a emoção para que seu córtex pré-frontal retome o controle.</p>
                    
                    <div class="form-group">
                        <label>O que você está sentindo?</label>
                        <div class="emotions-grid">${emotionsHtml}</div>
                        <input type="hidden" id="selected-emotion">
                        <input type="hidden" id="selected-color">
                    </div>

                    <div class="form-group">
                        <label>O que disparou isso? (Gatilho)</label>
                        <input type="text" id="journal-trigger" placeholder="Ex: Reunião, trânsito, pensamento...">
                    </div>

                    <button class="btn-primary w-100" onclick="App.submitJournal()">
                        <i class="fa-solid fa-save"></i> Processar no Córtex
                    </button>
                </div>

                <div class="journal-feed">
                    <h3>Memória Límbica</h3>
                    ${historyHtml || '<p class="empty-state">Seu diário está vazio.</p>'}
                </div>
            </div>
        `;
    },

    selectEmotion: (el, name, color) => {
        document.querySelectorAll('.emotion-chip').forEach(c => c.classList.remove('selected'));
        el.classList.add('selected');
        document.getElementById('selected-emotion').value = name;
        document.getElementById('selected-color').value = color;
    },

    submitJournal: () => {
        const emotion = document.getElementById('selected-emotion').value;
        const color = document.getElementById('selected-color').value;
        const trigger = document.getElementById('journal-trigger').value;

        if (!emotion || !trigger) return alert("Por favor, preencha a emoção e o gatilho.");

        // Busca o conselho da "Neurociência"
        const emotionData = neuroData.journalLogic.emotions.find(e => e.name === emotion);
        
        const entry = {
            date: new Date().toLocaleString('pt-BR'),
            emotion,
            color,
            trigger,
            advice: emotionData ? emotionData.advice : "Observe sem julgar."
        };

        API.saveJournal(entry);
        App.renderJournal(); // Recarrega para mostrar
        App.updateSidebar(); // Atualiza XP
        
        // Feedback visual
        alert(`Registro salvo! +${neuroData.config.xpRewards.journalEntry} XP.\n\nDica do Cérebro: ${entry.advice}`);
    },

    // 5. Biblioteca (Apenas Placeholder visual para completar)
    renderLibrary: () => {
        document.getElementById('dynamic-content').innerHTML = `
            <div class="glass-panel" style="text-align: center; padding: 4rem;">
                <i class="fa-solid fa-book-open-reader" style="font-size: 4rem; color: var(--primary); margin-bottom: 1rem;"></i>
                <h2>Biblioteca da Mente</h2>
                <p>Aqui ficarão os resumos completos dos livros de Goleman e Oliveira.</p>
                <p style="color: var(--text-secondary);">(Disponível em atualizações futuras)</p>
            </div>
        `;
    },

    // --- LÓGICA DE NEGÓCIOS ---
    completeMission: (missionId, btnElement) => {
        const success = API.completeMission(missionId);
        if (success) {
            btnElement.innerHTML = `<i class="fa-solid fa-check"></i> Feito`;
            btnElement.classList.add('checked');
            btnElement.disabled = true;
            
            // Confete ou feedback visual
            const xp = neuroData.modules.flatMap(m => m.content.missions).find(m => m.id === missionId).xp;
            alert(`Missão Cumprida! +${xp} XP\nNeuroplasticidade em ação!`);
            
            App.updateSidebar();
        }
    },

    updateSidebar: () => {
        const user = API.getUser();
        
        document.getElementById('display-name').innerText = user.name;
        document.getElementById('xp-counter').innerText = `${user.xp} XP`;
        
        // Lógica de Nível
        const currentLevelData = neuroData.config.levels.find(l => l.level === user.level);
        const nextLevelData = neuroData.config.levels.find(l => l.level === user.level + 1);
        
        document.getElementById('user-level-display').innerText = currentLevelData.title;
        
        // Barra de progresso
        if (nextLevelData) {
            const range = nextLevelData.minXp - currentLevelData.minXp;
            const progress = user.xp - currentLevelData.minXp;
            const percentage = Math.min(100, Math.max(0, (progress / range) * 100));
            document.getElementById('xp-bar').style.width = `${percentage}%`;
        } else {
            document.getElementById('xp-bar').style.width = `100%`; // Nível máximo
        }
    },

    setupEventListeners: () => {
        // Login
        document.getElementById('login-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('username').value;
            if(name.length > 0) {
                const user = API.getUser();
                user.name = name;
                API.saveUser(user);
                API.addXP(neuroData.config.xpRewards.login); // XP inicial
                App.state.currentUser = user;
                App.loadMainInterface();
            }
        });
    }
};

// --- SISTEMA SOS AMÍGDALA (Sinal de Trânsito) ---
// Baseado no Capítulo 6 do livro de Oliveira & Goleman
let sosTimer = null;

function openSOS() {
    const modal = document.getElementById('sos-modal');
    modal.classList.remove('hidden');
    
    // Iniciar sequência do sinal
    runTrafficLightSequence();
}

function closeSOS() {
    const modal = document.getElementById('sos-modal');
    modal.classList.add('hidden');
    if(sosTimer) clearInterval(sosTimer);
    API.addXP(neuroData.config.xpRewards.sosUsage); // Recompensa por se acalmar
    App.updateSidebar();
}

function runTrafficLightSequence() {
    const lights = document.querySelectorAll('.light');
    const instruction = document.getElementById('breath-instruction');
    
    // Reset
    lights.forEach(l => l.classList.remove('active'));
    lights[0].classList.add('active'); // Vermelho
    instruction.innerText = "PARE! Respire fundo... Sua amígdala disparou.";
    
    let step = 0;
    
    // Simula o tempo necessário para o córtex retomar (simplificado para UX)
    // Na vida real são 90 segundos para a química baixar, aqui faremos uma versão guiada de 15s
    
    if(sosTimer) clearInterval(sosTimer);
    
    sosTimer = setInterval(() => {
        step++;
        
        if (step === 5) {
            // Amarelo
            lights.forEach(l => l.classList.remove('active'));
            lights[1].classList.add('active');
            instruction.innerText = "PENSE. O que você está sentindo? Identifique a emoção.";
        }
        
        if (step === 12) {
            // Verde
            lights.forEach(l => l.classList.remove('active'));
            lights[2].classList.add('active');
            instruction.innerText = "AJA. Escolha a melhor resposta racional agora.";
        }
        
        if (step === 15) {
            clearInterval(sosTimer);
        }
    }, 1000);
}

// Funções globais para acesso do HTML
window.navigate = App.navigate;
window.openSOS = openSOS;
window.closeSOS = closeSOS;
window.closeReader = App.closeReader;

// Inicializa
App.init();
