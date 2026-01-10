/* 
 * NEUROFLOW APP CONTROLLER 
 * Versão Estável - Compatibilidade Total
 */

const App = {
    state: {
        user: null,
        sosInterval: null
    },

    // --- INICIALIZAÇÃO ---
    init: function() {
        try {
            const savedUser = localStorage.getItem('neuroflow_user');
            
            if (savedUser) {
                this.state.user = JSON.parse(savedUser);
                this.checkStreak();
                this.showScreen('main-interface');
                this.renderSidebar();
                this.router('dashboard');
            } else {
                this.showScreen('auth-screen');
            }

            this.bindEvents();
        } catch (e) {
            console.error("Erro ao iniciar:", e);
            // Fallback em caso de erro crítico (limpa dados corrompidos)
            localStorage.removeItem('neuroflow_user');
            this.showScreen('auth-screen');
        }
    },

    // --- GERENCIAMENTO DE DADOS ---
    saveUser: function() {
        localStorage.setItem('neuroflow_user', JSON.stringify(this.state.user));
        this.renderSidebar();
    },

    createUser: function(name) {
        this.state.user = {
            name: name,
            level: 1,
            xp: 0,
            streak: 1,
            lastLogin: new Date().toDateString(),
            completedMissions: [],
            unlockedModules: ["mod_01"],
            journal: []
        };
        this.saveUser();
        this.showScreen('main-interface');
        this.renderSidebar();
        this.router('dashboard');
    },

    addXP: function(amount) {
        if (!this.state.user) return;
        
        const oldLevel = this.state.user.level;
        this.state.user.xp += amount;
        
        // Verifica Level Up
        const levels = neuroData.config.levels;
        // Encontra o próximo nível
        const nextLevel = levels.find(function(l) { 
            return l.level === oldLevel + 1 
        });
        
        if (nextLevel && this.state.user.xp >= nextLevel.min) {
            this.state.user.level++;
            UI.showToast("Neuroplasticidade! Você subiu para: " + nextLevel.title, 'success');
            
            // Desbloqueia próximo módulo
            const nextMod = neuroData.modules[this.state.user.level - 1];
            if (nextMod) {
                this.state.user.unlockedModules.push(nextMod.id);
            }
        }
        
        this.saveUser();
    },

    checkStreak: function() {
        const today = new Date().toDateString();
        if (this.state.user.lastLogin !== today) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            
            if (this.state.user.lastLogin === yesterday.toDateString()) {
                this.state.user.streak++;
            } else {
                this.state.user.streak = 1;
            }
            this.state.user.lastLogin = today;
            this.saveUser();
        }
        document.getElementById('streak-count').innerText = this.state.user.streak;
    },

    // --- UI E NAVEGAÇÃO ---
    showScreen: function(screenId) {
        const screens = document.querySelectorAll('.screen');
        for (let i = 0; i < screens.length; i++) {
            screens[i].classList.add('hidden');
        }
        document.getElementById(screenId).classList.remove('hidden');
    },

    renderSidebar: function() {
        const u = this.state.user;
        if (!u) return;

        const levels = neuroData.config.levels;
        const currLevel = levels.find(function(l) { return l.level === u.level; });
        const nextLevel = levels.find(function(l) { return l.level === u.level + 1; }) || currLevel;

        document.getElementById('display-name').innerText = u.name;
        document.getElementById('user-avatar').innerText = u.name.charAt(0).toUpperCase();
        document.getElementById('user-level-display').innerText = currLevel ? currLevel.title : "Nível " + u.level;
        document.getElementById('xp-counter').innerText = u.xp + " / " + nextLevel.max;
        
        // Cálculo da barra
        let percent = 100;
        if(nextLevel.max > 0) {
             percent = Math.min(100, (u.xp / nextLevel.max) * 100);
        }
        document.getElementById('xp-bar').style.width = percent + "%";
    },

    router: function(view) {
        const container = document.getElementById('dynamic-content');
        const title = document.getElementById('section-title');
        const subtitle = document.getElementById('section-subtitle');
        
        // Atualiza menu
        const navItems = document.querySelectorAll('.nav-item');
        for (let i = 0; i < navItems.length; i++) {
            navItems[i].classList.remove('active');
            if(navItems[i].dataset.view === view) {
                navItems[i].classList.add('active');
            }
        }

        container.innerHTML = '';

        if (view === 'dashboard') {
            title.innerText = "Dashboard";
            subtitle.innerText = "Visão geral do seu progresso neural.";
            Views.dashboard(container);
        } 
        else if (view === 'modules') {
            title.innerText = "Módulos";
            subtitle.innerText = "Treinamento cognitivo e emocional.";
            Views.modules(container);
        }
        else if (view === 'journal') {
            title.innerText = "Diário do Límbico";
            subtitle.innerText = "Registre e processe suas emoções.";
            Views.journal(container);
        }
        else if (view === 'library') {
            title.innerText = "Biblioteca";
            subtitle.innerText = "Conceitos da neurociência.";
            Views.library(container);
        }
    },

    // --- LÓGICA DE NEGÓCIO ---
    bindEvents: function() {
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.onsubmit = function(e) {
                e.preventDefault();
                const nameInput = document.getElementById('username');
                if(nameInput && nameInput.value) {
                    App.createUser(nameInput.value);
                }
            };
        }
        
        // Navegação
        const navItems = document.querySelectorAll('.nav-item');
        for(let i=0; i<navItems.length; i++) {
            navItems[i].onclick = function() {
                App.router(this.dataset.view);
            };
        }

        // Funções globais para botões HTML
        window.App = App; 
    }
};

// --- RENDERIZADORES (VIEWS) ---
const Views = {
    dashboard: function(container) {
        const u = App.state.user;
        
        // Conta missões totais e feitas
        let totalMissions = 0;
        neuroData.modules.forEach(function(m) {
            totalMissions += m.missions.length;
        });
        const done = u.completedMissions.length;
        const percent = totalMissions > 0 ? Math.round((done / totalMissions) * 100) : 0;

        let nextMissionHtml = '<p>Todas as missões concluídas!</p>';
        
        // Lógica para encontrar próxima missão
        let found = false;
        for (let i = 0; i < neuroData.modules.length; i++) {
            const mod = neuroData.modules[i];
            if (u.unlockedModules.includes(mod.id)) {
                for (let j = 0; j < mod.missions.length; j++) {
                    const mission = mod.missions[j];
                    if (!u.completedMissions.includes(mission.id)) {
                        nextMissionHtml = `
                            <div class="mission-highlight">
                                <div class="mh-content">
                                    <h4>${mission.title}</h4>
                                    <p>${mission.desc}</p>
                                </div>
                                <button class="btn-primary" onclick="App.router('modules')">Ir para Módulo</button>
                            </div>
                        `;
                        found = true;
                        break;
                    }
                }
            }
            if(found) break;
        }

        const html = `
            <div class="grid-2">
                <div class="welcome-banner glass-panel full-width">
                    <div class="banner-content">
                        <h2>Olá, ${u.name.split(' ')[0]}</h2>
                        <p>Seu córtex pré-frontal está no comando hoje.</p>
                        <div class="stats-row">
                            <span><i class="fa-solid fa-trophy"></i> ${done}/${totalMissions} Missões</span>
                        </div>
                    </div>
                    <div class="banner-chart">
                        <div class="chart-circle">
                            <span>${percent}%</span>
                        </div>
                    </div>
                </div>

                <div class="glass-card full-width">
                    <div class="card-header">
                        <h3><i class="fa-solid fa-bullseye"></i> Próximo Passo</h3>
                    </div>
                    ${nextMissionHtml}
                </div>
            </div>
        `;
        container.innerHTML = html;
    },

    modules: function(container) {
        const u = App.state.user;
        const grid = document.createElement('div');
        grid.className = 'module-grid';

        neuroData.modules.forEach(function(mod) {
            const isLocked = !u.unlockedModules.includes(mod.id);
            // Verifica se todas as missões foram feitas
            let isCompleted = true;
            for(let i=0; i<mod.missions.length; i++) {
                if(!u.completedMissions.includes(mod.missions[i].id)) {
                    isCompleted = false;
                    break;
                }
            }
            
            const card = document.createElement('div');
            let classes = 'glass-card module-card';
            if(isLocked) classes += ' locked';
            if(isCompleted) classes += ' finished';
            
            card.className = classes;
            
            card.innerHTML = `
                <div class="mod-icon">
                    <i class="fa-solid ${isLocked ? 'fa-lock' : mod.icon}"></i>
                </div>
                <div class="mod-body">
                    <h4>${mod.title}</h4>
                    <p>${mod.subtitle}</p>
                    <div class="mod-meta">
                        <span>${mod.chapters.length} Caps</span>
                        <span>${mod.missions.length} Missões</span>
                    </div>
                    <button class="btn-action" ${isLocked ? 'disabled' : ''}>
                        ${isLocked ? 'Bloqueado' : 'Acessar'}
                    </button>
                </div>
            `;
            
            if (!isLocked) {
                card.onclick = function() { Reader.open(mod); };
            }
            
            grid.appendChild(card);
        });
        container.appendChild(grid);
    },

    journal: function(container) {
        const u = App.state.user;
        
        let history = '';
        if (u.journal.length === 0) {
            history = `<div class="empty-state"><p>Diário vazio.</p></div>`;
        } else {
            history = u.journal.map(function(entry) {
                return `
                <div class="journal-item glass-panel" style="border-left: 3px solid ${entry.color}">
                    <div class="j-header">
                        <strong style="color:${entry.color}">${entry.emotion}</strong>
                        <small>${entry.date}</small>
                    </div>
                    <p><strong>Gatilho:</strong> ${entry.trigger}</p>
                    <div class="j-feedback"><i class="fa-solid fa-brain"></i> ${entry.msg}</div>
                </div>`;
            }).join('');
        }

        const emotionsHTML = neuroData.journalEmotions.map(function(e) {
            return `<button class="emotion-btn" style="border-left: 3px solid ${e.color}" 
                onclick="Views.selectEmotion('${e.name}', '${e.color}', '${e.msg}')">${e.name}</button>`;
        }).join('');

        container.innerHTML = `
            <div class="journal-layout grid-2">
                <div class="journal-writer glass-panel">
                    <h3>O que você está sentindo?</h3>
                    <div class="emotions-grid">${emotionsHTML}</div>
                    
                    <div id="journal-inputs" class="hidden">
                        <label>O que causou isso?</label>
                        <input type="text" id="j-trigger" placeholder="Ex: Trânsito, Discussão...">
                        <button class="btn-primary w-100" onclick="Views.saveEntry()">Salvar</button>
                    </div>
                </div>
                <div class="journal-history">
                    <h3>Histórico</h3>
                    ${history}
                </div>
            </div>
        `;
    },

    library: function(container) {
        container.innerHTML = `
            <div class="glass-card full-width">
                <h3>Conceitos Fundamentais</h3>
                <ul>
                    <li style="margin-bottom:10px"><strong>Neuroplasticidade:</strong> Capacidade do cérebro mudar.</li>
                    <li style="margin-bottom:10px"><strong>Amígdala:</strong> Radar de perigo e emoção.</li>
                    <li style="margin-bottom:10px"><strong>Córtex Pré-Frontal:</strong> CEO do cérebro (razão).</li>
                </ul>
            </div>`;
    },

    // --- Helpers de View ---
    tempEmotion: null,
    
    selectEmotion: function(name, color, msg) {
        this.tempEmotion = { name: name, color: color, msg: msg };
        document.getElementById('journal-inputs').classList.remove('hidden');
    },

    saveEntry: function() {
        const trigger = document.getElementById('j-trigger').value;
        if(!trigger) {
            alert("Escreva o gatilho.");
            return;
        }
        
        const entry = {
            date: new Date().toLocaleDateString(),
            emotion: this.tempEmotion.name,
            color: this.tempEmotion.color,
            msg: this.tempEmotion.msg,
            trigger: trigger
        };
        
        App.state.user.journal.unshift(entry);
        App.addXP(neuroData.config.rewards.journal);
        UI.showToast("Emoção processada!", "success");
        App.router('journal');
    }
};

// --- READER SYSTEM ---
const Reader = {
    open: function(module) {
        const reader = document.getElementById('reader-interface');
        const title = document.getElementById('reader-title');
        const content = document.getElementById('reader-text');
        
        title.innerText = module.title;
        
        let html = `<div class="reader-intro">${module.summary}</div>`;
        
        module.chapters.forEach(function(chap, idx) {
            html += `<div class="chapter"><h3>${idx+1}. ${chap.title}</h3><div class="text">${chap.text}</div></div>`;
        });
        
        html += `<h3>Missões</h3>`;
        
        const u = App.state.user;
        module.missions.forEach(function(miss) {
            const isDone = u.completedMissions.includes(miss.id);
            html += `
                <div class="mission-row ${isDone ? 'done' : ''}">
                    <div><strong>${miss.title}</strong><br><small>${miss.desc}</small></div>
                    <button class="btn-check" ${isDone ? 'disabled' : ''} 
                    onclick="Reader.finish('${miss.id}', ${miss.xp}, '${module.id}')">
                        ${isDone ? 'Feito' : 'Concluir'}
                    </button>
                </div>
            `;
        });
        
        content.innerHTML = html;
        App.showScreen('reader-interface');
    },
    
    finish: function(missId, xp, modId) {
        const u = App.state.user;
        if(!u.completedMissions.includes(missId)) {
            u.completedMissions.push(missId);
            App.addXP(xp);
            
            // Re-render
            const mod = neuroData.modules.find(function(m) { return m.id === modId; });
            Reader.open(mod);
        }
    }
};

// --- UI HELPER: TOAST ---
const UI = {
    showToast: function(msg, type) {
        const div = document.createElement('div');
        div.className = 'toast';
        div.style.backgroundColor = type === 'success' ? '#10b981' : '#3b82f6';
        div.innerHTML = `<i class="fa-solid fa-info-circle"></i> ${msg}`;
        document.body.appendChild(div);
        setTimeout(function() { div.remove(); }, 3000);
    }
};

// --- SOS SYSTEM ---
const SOS = {
    timer: null,
    open: function(mode) {
        const modal = document.getElementById('sos-modal');
        if(mode) {
            modal.classList.remove('hidden');
            this.start();
        } else {
            modal.classList.add('hidden');
            if(this.timer) clearInterval(this.timer);
            App.addXP(neuroData.config.rewards.sos);
        }
    },
    start: function() {
        const red = document.getElementById('light-red');
        const yel = document.getElementById('light-yellow');
        const grn = document.getElementById('light-green');
        const txt = document.getElementById('breath-text');
        
        // Reset
        red.classList.add('active'); yel.classList.remove('active'); grn.classList.remove('active');
        txt.innerText = "PARE. Respire Fundo.";
        
        let s = 0;
        if(this.timer) clearInterval(this.timer);
        
        this.timer = setInterval(function() {
            s++;
            if(s === 5) {
                red.classList.remove('active'); yel.classList.add('active');
                txt.innerText = "PENSE. O que você sente?";
            }
            if(s === 10) {
                yel.classList.remove('active'); grn.classList.add('active');
                txt.innerText = "AJA com calma.";
            }
        }, 1000);
    }
};

// Global Bindings para HTML onclick
App.toggleSOS = function(mode) { SOS.open(mode); };
App.closeReader = function() { App.showScreen('main-interface'); App.renderSidebar(); };

// Start
document.addEventListener('DOMContentLoaded', function() {
    App.init();
});
