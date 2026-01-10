/* 
 * NEUROFLOW APP CONTROLLER
 * Responsável pela manipulação do DOM, Eventos e Interatividade Visual.
 */

// --- 1. SERVIÇOS DO SISTEMA (SIMULAÇÃO DE BACKEND) ---
const System = {
    // Gerenciamento de Usuário Local
    getUser: () => {
        const user = localStorage.getItem('neuroflow_user');
        return user ? JSON.parse(user) : null;
    },

    createUser: (name) => {
        const newUser = {
            name: name,
            level: 1,
            xp: 0,
            streak: 1,
            lastLogin: new Date().toDateString(),
            completedMissions: [],
            unlockedModules: ["mod_01"],
            journalHistory: []
        };
        localStorage.setItem('neuroflow_user', JSON.stringify(newUser));
        return newUser;
    },

    updateUser: (userData) => {
        localStorage.setItem('neuroflow_user', JSON.stringify(userData));
    },

    // Lógica de Gamificação
    addXP: (amount) => {
        const user = System.getUser();
        user.xp += amount;
        
        // Verifica Level Up
        const nextLevel = neuroData.config.levels.find(l => l.level === user.level + 1);
        if (nextLevel && user.xp >= nextLevel.minXp) {
            user.level++;
            UI.showToast(`🧠 Neuroplasticidade! Você evoluiu para: ${nextLevel.title}`, 'success');
            
            // Desbloquear módulo correspondente ao nível
            const nextMod = neuroData.modules[user.level - 1];
            if (nextMod && !user.unlockedModules.includes(nextMod.id)) {
                user.unlockedModules.push(nextMod.id);
                UI.showToast(`Novo Módulo Desbloqueado: ${nextMod.title}`, 'info');
            }
        }
        
        System.updateUser(user);
        UI.updateSidebar(user);
    }
};

// --- 2. INTERFACE DO USUÁRIO (UI MANAGER) ---
const UI = {
    // Inicialização
    init: () => {
        const user = System.getUser();
        if (user) {
            UI.checkStreak(user);
            UI.switchScreen('main-interface');
            UI.updateSidebar(user);
            Router.load('dashboard');
        } else {
            UI.switchScreen('auth-screen');
        }
        
        // Atualiza data
        const options = { weekday: 'long', day: 'numeric', month: 'long' };
        document.getElementById('current-date').textContent = new Date().toLocaleDateString('pt-BR', options);
    },

    // Sistema de Notificações (Toast) Customizado
    showToast: (message, type = 'info') => {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <i class="fa-solid ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Estilo inline para garantir funcionamento sem CSS extra complexo
        Object.assign(toast.style, {
            position: 'fixed', bottom: '20px', right: '20px',
            background: type === 'success' ? 'var(--success)' : 'var(--primary)',
            color: '#fff', padding: '12px 24px', borderRadius: '12px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.3)', zIndex: '9999',
            display: 'flex', alignItems: 'center', gap: '10px',
            fontFamily: 'var(--font-main)', animation: 'slideIn 0.3s ease-out'
        });

        document.body.appendChild(toast);
        setTimeout(() => {
            toast.style.animation = 'fadeOut 0.5s ease-in';
            setTimeout(() => toast.remove(), 450);
        }, 3000);
    },

    // Troca de Telas (Login -> App)
    switchScreen: (screenId) => {
        document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
        document.getElementById(screenId).classList.remove('hidden');
    },

    // Atualiza Sidebar
    updateSidebar: (user) => {
        const currentLevel = neuroData.config.levels.find(l => l.level === user.level);
        const nextLevel = neuroData.config.levels.find(l => l.level === user.level + 1);
        
        document.getElementById('display-name').textContent = user.name;
        document.getElementById('user-avatar').textContent = user.name.charAt(0).toUpperCase();
        document.getElementById('user-level-display').textContent = currentLevel.title;
        document.getElementById('xp-points').textContent = `${user.xp} XP`;
        
        // Barra de Progresso XP
        const xpSpan = document.getElementById('xp-counter');
        const xpBar = document.getElementById('xp-bar');
        
        if (nextLevel) {
            const progress = ((user.xp - currentLevel.minXp) / (nextLevel.maxXp - currentLevel.minXp)) * 100;
            xpBar.style.width = `${Math.min(progress, 100)}%`;
            xpSpan.textContent = `${user.xp} / ${nextLevel.minXp}`;
        } else {
            xpBar.style.width = '100%';
            xpSpan.textContent = 'MÁXIMO';
        }
    },

    // Verifica ofensiva (dias seguidos)
    checkStreak: (user) => {
        const today = new Date().toDateString();
        if (user.lastLogin !== today) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            
            if (user.lastLogin === yesterday.toDateString()) {
                user.streak++;
            } else {
                user.streak = 1; // Reset se perdeu um dia
            }
            user.lastLogin = today;
            System.updateUser(user);
        }
        document.getElementById('streak-count').textContent = user.streak;
    }
};

// --- 3. ROTEADOR DE CONTEÚDO (VIEWS) ---
const Router = {
    load: (viewName) => {
        const container = document.getElementById('dynamic-content');
        const title = document.getElementById('section-title');
        const subtitle = document.getElementById('section-subtitle');
        
        // Feedback visual de carregamento
        container.style.opacity = '0';
        container.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            container.innerHTML = ''; // Limpa container

            switch(viewName) {
                case 'dashboard':
                    title.textContent = 'Neuro-Dashboard';
                    subtitle.textContent = 'Monitoramento da sua atividade cerebral e progresso.';
                    Views.dashboard(container);
                    break;
                case 'modules':
                    title.textContent = 'Protocolos Synapse';
                    subtitle.textContent = 'Treinamento progressivo para reconfiguração neural.';
                    Views.modules(container);
                    break;
                case 'journal':
                    title.textContent = 'Diário do Límbico';
                    subtitle.textContent = 'Externalize para processar. A escrita ativa o córtex pré-frontal.';
                    Views.journal(container);
                    break;
                case 'library':
                    title.textContent = 'Base de Conhecimento';
                    subtitle.textContent = 'Conceitos fundamentais da neurociência aplicada.';
                    Views.library(container);
                    break;
            }

            // Animação de entrada
            container.style.opacity = '1';
            container.style.transform = 'translateY(0)';
        }, 200);

        // Atualiza navegação
        document.querySelectorAll('.nav-item').forEach(n => {
            n.classList.remove('active');
            if (n.dataset.target === viewName) n.classList.add('active');
        });
    }
};

// --- 4. VIEWS (RENDERIZAÇÃO DO CONTEÚDO) ---
const Views = {
    
    dashboard: (container) => {
        const user = System.getUser();
        
        // Cálculo de progresso geral
        const totalMissions = neuroData.modules.flatMap(m => m.content.missions).length;
        const doneMissions = user.completedMissions.length;
        const percent = Math.round((doneMissions / totalMissions) * 100);

        // Gráfico SVG Simples (Donut Chart)
        const dashHTML = `
            <div class="grid-2">
                <div class="welcome-banner glass-panel full-width">
                    <div class="banner-content">
                        <h2>Foco no agora, ${user.name.split(' ')[0]}.</h2>
                        <p>Você completou <strong>${percent}%</strong> do treinamento total.</p>
                        <div class="mini-stats">
                            <span><i class="fa-solid fa-brain"></i> Nível ${user.level}</span>
                            <span><i class="fa-solid fa-trophy"></i> ${doneMissions} Missões</span>
                        </div>
                    </div>
                    <div class="banner-chart">
                        <svg viewBox="0 0 36 36" class="circular-chart">
                            <path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                            <path class="circle" stroke-dasharray="${percent}, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                            <text x="18" y="20.35" class="percentage">${percent}%</text>
                        </svg>
                    </div>
                </div>

                <div class="glass-card full-width">
                    <div class="card-header">
                        <h3><i class="fa-solid fa-bullseye"></i> Próximo Passo</h3>
                    </div>
                    ${Views.getNextMissionHTML(user)}
                </div>
            </div>
        `;
        container.innerHTML = dashHTML;
    },

    getNextMissionHTML: (user) => {
        // Encontra a primeira missão não completada do módulo desbloqueado mais alto
        for (let mod of neuroData.modules) {
            if (user.unlockedModules.includes(mod.id)) {
                for (let mission of mod.content.missions) {
                    if (!user.completedMissions.includes(mission.id)) {
                        return `
                            <div class="mission-highlight">
                                <div class="mh-icon"><i class="fa-solid fa-play"></i></div>
                                <div class="mh-content">
                                    <h4>${mission.title}</h4>
                                    <p>${mission.desc}</p>
                                </div>
                                <button class="btn-primary" onclick="Router.load('modules')">Ir para Módulo</button>
                            </div>
                        `;
                    }
                }
            }
        }
        return `<p>Você completou todas as missões disponíveis! Aguarde atualizações.</p>`;
    },

    modules: (container) => {
        const user = System.getUser();
        const grid = document.createElement('div');
        grid.className = 'module-grid'; // Ajuste no CSS necessário

        neuroData.modules.forEach(mod => {
            const isLocked = !user.unlockedModules.includes(mod.id);
            const isCompleted = mod.content.missions.every(m => user.completedMissions.includes(m.id));
            
            const card = document.createElement('div');
            card.className = `glass-card module-card ${isLocked ? 'locked' : ''} ${isCompleted ? 'finished' : ''}`;
            card.innerHTML = `
                <div class="mod-icon">
                    <i class="fa-solid ${isLocked ? 'fa-lock' : mod.icon}"></i>
                </div>
                <div class="mod-body">
                    <h4>${mod.title}</h4>
                    <p>${mod.subtitle}</p>
                    <div class="mod-meta">
                        <span>${mod.content.chapters.length} Capítulos</span>
                        <span>${mod.content.missions.length} Missões</span>
                    </div>
                    <button class="btn-action" ${isLocked ? 'disabled' : ''}>
                        ${isLocked ? 'Bloqueado' : 'Acessar'}
                    </button>
                </div>
            `;
            
            if (!isLocked) {
                card.onclick = () => Reader.open(mod);
            }
            
            grid.appendChild(card);
        });
        container.appendChild(grid);
    },

    journal: (container) => {
        const user = System.getUser();
        
        let history = '';
        if (user.journalHistory.length === 0) {
            history = `<div class="empty-journal"><i class="fa-solid fa-pen-nib"></i><p>Seu diário está em branco. Escreva algo para processar suas emoções.</p></div>`;
        } else {
            history = user.journalHistory.map(entry => `
                <div class="journal-item glass-panel" style="border-left: 3px solid ${entry.color}">
                    <div class="j-header">
                        <span class="j-emotion" style="color:${entry.color}">${entry.emotion}</span>
                        <small>${entry.date}</small>
                    </div>
                    <p class="j-trigger"><strong>Gatilho:</strong> ${entry.trigger}</p>
                    <div class="j-feedback">
                        <i class="fa-solid fa-brain"></i>
                        <p>${entry.advice}</p>
                    </div>
                </div>
            `).join('');
        }

        const emotionsHTML = neuroData.journalLogic.emotions.map(e => `
            <button class="emotion-btn" style="--e-color: ${e.color}" onclick="Views.selectEmotion(this, '${e.name}', '${e.color}', '${e.advice}')">
                ${e.name}
            </button>
        `).join('');

        container.innerHTML = `
            <div class="journal-layout grid-2">
                <div class="journal-writer glass-panel">
                    <h3>O que você está sentindo?</h3>
                    <div class="emotions-cloud">${emotionsHTML}</div>
                    
                    <div id="journal-inputs" class="hidden">
                        <label>O que causou isso? (Fato objetivo)</label>
                        <input type="text" id="j-trigger" placeholder="Ex: Trânsito, Reunião, Discussão...">
                        
                        <label>Desabafo (Opcional)</label>
                        <textarea id="j-text" placeholder="Escreva livremente..."></textarea>
                        
                        <button class="btn-primary w-100" onclick="Views.saveJournalEntry()">
                            <i class="fa-solid fa-save"></i> Processar Emoção
                        </button>
                    </div>
                </div>
                <div class="journal-history">
                    <h3>Histórico</h3>
                    ${history}
                </div>
            </div>
        `;
    },

    // Helpers do Diário
    currentEmotion: null,
    selectEmotion: (btn, name, color, advice) => {
        document.querySelectorAll('.emotion-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        document.getElementById('journal-inputs').classList.remove('hidden');
        Views.currentEmotion = { name, color, advice };
    },

    saveJournalEntry: () => {
        const trigger = document.getElementById('j-trigger').value;
        if (!trigger) return UI.showToast("Identifique o gatilho primeiro.", "warning");

        const entry = {
            id: Date.now(),
            date: new Date().toLocaleString(),
            emotion: Views.currentEmotion.name,
            color: Views.currentEmotion.color,
            trigger: trigger,
            advice: Views.currentEmotion.advice
        };

        const user = System.getUser();
        user.journalHistory.unshift(entry);
        System.updateUser(user);
        System.addXP(neuroData.config.xpRewards.journalEntry);
        
        UI.showToast("Emoção processada com sucesso!", "success");
        Router.load('journal'); // Recarrega
    },

    library: (container) => {
        // Renderização simples dos conceitos
        let html = '<div class="library-grid">';
        // Aqui poderíamos ter um array de conceitos no data.js, vou simular um
        const concepts = [
            {t: "Sequestro da Amígdala", d: "Quando uma emergência emocional assume o controle do resto do cérebro antes que o neocórtex possa analisar a situação."},
            {t: "Neuroplasticidade", d: "A capacidade do cérebro de se reorganizar, formando novas conexões neurais ao longo da vida."},
            {t: "Fluxo (Flow)", d: "Um estado mental de operação em que a pessoa está totalmente imersa no que está fazendo."}
        ];

        concepts.forEach(c => {
            html += `
                <div class="glass-card">
                    <h4>${c.t}</h4>
                    <p>${c.d}</p>
                </div>
            `;
        });
        html += '</div>';
        container.innerHTML = html;
    }
};

// --- 5. LEITOR DE MÓDULOS (READER) ---
const Reader = {
    open: (moduleData) => {
        const readerSection = document.getElementById('reader-interface');
        const textArea = document.getElementById('reader-text-area');
        
        document.getElementById('reader-chapter-title').textContent = moduleData.title;
        
        let contentHTML = `<div class="reader-intro">${moduleData.content.summary}</div>`;
        
        // Renderiza Capítulos
        moduleData.content.chapters.forEach((chap, idx) => {
            contentHTML += `
                <div class="chapter-block">
                    <h2>${idx + 1}. ${chap.title}</h2>
                    <div class="chapter-text">${chap.text}</div>
                </div>
            `;
        });

        // Renderiza Missões
        const user = System.getUser();
        contentHTML += `<div class="mission-section"><h3><i class="fa-solid fa-flag"></i> Missões do Módulo</h3>`;
        
        moduleData.content.missions.forEach(miss => {
            const isDone = user.completedMissions.includes(miss.id);
            contentHTML += `
                <div class="mission-row ${isDone ? 'done' : ''}">
                    <div>
                        <strong>${miss.title}</strong>
                        <p>${miss.desc}</p>
                    </div>
                    <button class="btn-check" ${isDone ? 'disabled' : ''} onclick="Reader.completeMission('${miss.id}', this)">
                        ${isDone ? 'Concluído' : `Concluir (+${miss.xp} XP)`}
                    </button>
                </div>
            `;
        });
        contentHTML += `</div>`;

        textArea.innerHTML = contentHTML;
        
        // Abre o leitor
        document.getElementById('main-interface').classList.add('hidden');
        readerSection.classList.remove('hidden');
    },

    completeMission: (id, btn) => {
        const user = System.getUser();
        if (!user.completedMissions.includes(id)) {
            user.completedMissions.push(id);
            
            // Acha XP
            let xp = 0;
            neuroData.modules.forEach(m => {
                const mission = m.content.missions.find(mi => mi.id === id);
                if(mission) xp = mission.xp;
            });

            System.updateUser(user);
            System.addXP(xp);
            
            btn.textContent = "Concluído";
            btn.disabled = true;
            btn.parentElement.classList.add('done');
            UI.showToast("Missão Realizada! Sinapse fortalecida.", "success");
        }
    },

    close: () => {
        document.getElementById('reader-interface').classList.add('hidden');
        document.getElementById('main-interface').classList.remove('hidden');
        UI.updateSidebar(System.getUser()); // Atualiza XP visualmente
        Router.load('modules'); // Recarrega lista
    }
};

// --- 6. SISTEMA SOS (SINAL DE TRÂNSITO) ---
const SOS = {
    timer: null,
    
    open: () => {
        const modal = document.getElementById('sos-modal');
        modal.classList.remove('hidden');
        SOS.startSequence();
    },

    close: () => {
        document.getElementById('sos-modal').classList.add('hidden');
        clearInterval(SOS.timer);
        System.addXP(neuroData.config.xpRewards.sosUsage);
        UI.showToast("Parabéns por retomar o controle.", "success");
    },

    startSequence: () => {
        const lights = document.querySelectorAll('.light');
        const text = document.getElementById('breath-instruction');
        
        // Reset
        lights.forEach(l => l.classList.remove('active'));
        lights[0].classList.add('active'); // Vermelho
        
        // Animação de texto
        let seconds = 0;
        SOS.timer = setInterval(() => {
            seconds++;
            
            if (seconds < 5) {
                text.textContent = `Inspire... Segure... (${5 - seconds})`;
            } else if (seconds === 5) {
                lights[0].classList.remove('active');
                lights[1].classList.add('active'); // Amarelo
                text.textContent = "Analise: O que você está sentindo?";
            } else if (seconds === 10) {
                lights[1].classList.remove('active');
                lights[2].classList.add('active'); // Verde
                text.textContent = "Agora você pode agir com sabedoria.";
            }
        }, 1000);
    }
};

// --- 7. EVENT LISTENERS GLOBAIS ---
document.addEventListener('DOMContentLoaded', () => {
    // Login Form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('username').value;
            if (name) {
                System.createUser(name);
                System.addXP(50); // Bônus inicial
                UI.init();
            }
        });
    }

    // Navegação Sidebar
    window.navigate = Router.load;
    
    // Funções Globais (para o HTML acessar)
    window.openSOS = SOS.open;
    window.closeSOS = SOS.close;
    window.closeReader = Reader.close;
    window.triggerSOS = SOS.open; // Alias

    // Inicializa
    UI.init();
});
