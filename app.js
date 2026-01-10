/* 
 * NEUROFLOW APP CONTROLLER 
 * Versão Final Blindada
 */

const App = {
    state: {
        user: null,
        sosInterval: null
    },

    // 1. Inicialização
    init: function() {
        console.log("Sistema Iniciado.");
        
        // Verifica suporte a localStorage
        if (typeof(Storage) === "undefined") {
            alert("Seu navegador não suporta armazenamento local.");
            return;
        }

        const savedUser = localStorage.getItem('neuroflow_user');
        
        if (savedUser) {
            console.log("Usuário carregado.");
            try {
                this.state.user = JSON.parse(savedUser);
                this.loadInterface();
            } catch(e) {
                console.error("Dados corrompidos, resetando.");
                localStorage.removeItem('neuroflow_user');
                this.showLogin();
            }
        } else {
            console.log("Novo acesso.");
            this.showLogin();
        }

        this.bindEvents();
    },

    // 2. Controle de Telas
    showLogin: function() {
        document.getElementById('auth-screen').classList.remove('hidden');
        document.getElementById('main-interface').classList.add('hidden');
        document.getElementById('reader-interface').classList.add('hidden');
    },

    loadInterface: function() {
        document.getElementById('auth-screen').classList.add('hidden');
        document.getElementById('main-interface').classList.remove('hidden');
        this.updateUI();
        this.router('dashboard');
        this.checkStreak();
    },

    // 3. Lógica de Usuário
    handleLogin: function() {
        const input = document.getElementById('username');
        const name = input.value.trim();
        
        if (name.length < 2) {
            alert("Por favor, digite um nome válido.");
            return;
        }

        this.state.user = {
            name: name,
            level: 1,
            xp: 50,
            streak: 1,
            lastLogin: new Date().toDateString(),
            completedMissions: [],
            unlockedModules: ["mod_01"],
            journal: []
        };
        
        this.saveUser();
        this.loadInterface();
    },

    saveUser: function() {
        localStorage.setItem('neuroflow_user', JSON.stringify(this.state.user));
        this.updateUI();
    },

    addXP: function(amount) {
        if (!this.state.user) return;
        this.state.user.xp += amount;
        
        // Level Up
        const levels = neuroData.config.levels;
        const currentLevelObj = levels.find(l => l.level === this.state.user.level);
        const nextLevelObj = levels.find(l => l.level === this.state.user.level + 1);
        
        if (nextLevelObj && this.state.user.xp >= nextLevelObj.min) {
            this.state.user.level++;
            alert(`🎉 PARABÉNS! Você evoluiu para: ${nextLevelObj.title}`);
            
            // Desbloqueia próximo módulo se existir
            const nextMod = neuroData.modules[this.state.user.level - 1];
            if (nextMod) {
                this.state.user.unlockedModules.push(nextMod.id);
                alert(`Novo módulo desbloqueado: ${nextMod.title}`);
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
        // Atualiza UI do streak
        const el = document.getElementById('streak-count');
        if(el) el.innerText = this.state.user.streak;
    },

    // 4. UI e Router
    updateUI: function() {
        const u = this.state.user;
        if (!u) return;

        // Elementos de UI seguros
        const setText = (id, text) => {
            const el = document.getElementById(id);
            if (el) el.innerText = text;
        };

        const levels = neuroData.config.levels;
        const currLvl = levels.find(l => l.level === u.level) || levels[0];
        const nextLvl = levels.find(l => l.level === u.level + 1) || currLvl;

        setText('display-name', u.name);
        setText('user-avatar', u.name.charAt(0).toUpperCase());
        setText('user-level-display', currLvl.title);
        setText('xp-counter', `${u.xp} / ${nextLvl.max}`);
        setText('xp-points', `${u.xp} XP`);

        const bar = document.getElementById('xp-bar');
        if (bar) {
            let pct = Math.min(100, (u.xp / nextLvl.max) * 100);
            bar.style.width = `${pct}%`;
        }
    },

    router: function(view, clickedElement) {
        // Atualiza menu
        if (clickedElement) {
            document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
            clickedElement.classList.add('active');
        }

        const container = document.getElementById('dynamic-content');
        const title = document.getElementById('section-title');
        const sub = document.getElementById('section-subtitle');

        if (!container) return;

        // Limpa e prepara
        container.innerHTML = '';
        
        // Títulos
        const contentMap = {
            'dashboard': { t: 'Dashboard', s: 'Visão geral do seu progresso.' },
            'modules': { t: 'Protocolos Synapse', s: 'Treinamento cognitivo e emocional.' },
            'journal': { t: 'Diário do Límbico', s: 'Processe suas emoções.' },
            'library': { t: 'Biblioteca', s: 'Conceitos fundamentais.' }
        };

        if (contentMap[view]) {
            title.innerText = contentMap[view].t;
            sub.innerText = contentMap[view].s;
        }

        // Renderiza
        if (view === 'dashboard') Views.dashboard(container);
        if (view === 'modules') Views.modules(container);
        if (view === 'journal') Views.journal(container);
        if (view === 'library') Views.library(container);
    },

    // 5. Eventos
    bindEvents: function() {
        // Botão de Login
        const btnLogin = document.getElementById('btn-login');
        if (btnLogin) {
            btnLogin.onclick = () => this.handleLogin();
        }

        // Input Enter
        const inputLogin = document.getElementById('username');
        if (inputLogin) {
            inputLogin.onkeydown = (e) => {
                if (e.key === 'Enter') this.handleLogin();
            };
        }
    },

    // 6. SOS e Leitor
    toggleSOS: function(show) {
        const modal = document.getElementById('sos-modal');
        if (show) {
            modal.classList.remove('hidden');
            SOS.start();
        } else {
            modal.classList.add('hidden');
            SOS.stop();
            this.addXP(50);
        }
    },

    openReader: function(modId) {
        const mod = neuroData.modules.find(m => m.id === modId);
        if (!mod) return;

        const reader = document.getElementById('reader-interface');
        document.getElementById('reader-title').innerText = mod.title;
        
        let html = `<div class="reader-pad">
            <div class="reader-intro">${mod.summary}</div>
            <hr style="border:0; border-top:1px solid rgba(255,255,255,0.1); margin: 20px 0;">`;
        
        mod.chapters.forEach((c, i) => {
            html += `<div class="chapter"><h3>${i+1}. ${c.title}</h3>${c.text}</div>`;
        });

        html += `<h3>Missões</h3>`;
        mod.missions.forEach(m => {
            const done = this.state.user.completedMissions.includes(m.id);
            html += `
                <div class="glass-card mission-card ${done ? 'done' : ''}">
                    <div><strong>${m.title}</strong><br><small>${m.desc}</small></div>
                    <button class="btn-check" ${done ? 'disabled' : ''} 
                    onclick="App.finishMission('${m.id}', ${m.xp}, '${mod.id}')">
                        ${done ? 'Feito' : 'Concluir'}
                    </button>
                </div>
            `;
        });
        html += `</div>`;

        document.getElementById('reader-text').innerHTML = html;
        document.getElementById('main-interface').classList.add('hidden');
        reader.classList.remove('hidden');
    },

    closeReader: function() {
        document.getElementById('reader-interface').classList.add('hidden');
        document.getElementById('main-interface').classList.remove('hidden');
        this.router('modules'); // Atualiza status
    },

    finishMission: function(mId, xp, modId) {
        if (!this.state.user.completedMissions.includes(mId)) {
            this.state.user.completedMissions.push(mId);
            this.addXP(xp);
            this.openReader(modId); // Re-renderiza para atualizar botão
        }
    }
};

// --- VIEWS ---
const Views = {
    dashboard: function(c) {
        const u = App.state.user;
        const total = neuroData.modules.flatMap(m => m.missions).length;
        const done = u.completedMissions.length;
        const percent = Math.round((done / total) * 100) || 0;

        c.innerHTML = `
            <div class="grid-2">
                <div class="glass-panel full-width">
                    <h2>Olá, ${u.name}!</h2>
                    <p>Status: Córtex Ativo. Progresso Total: ${percent}%</p>
                    <div style="margin-top:10px; font-size:1.5rem; font-weight:bold; color:var(--primary-light)">
                        <i class="fa-solid fa-brain"></i> ${u.xp} XP
                    </div>
                </div>
                <div class="glass-card full-width" style="cursor:pointer; border-left:4px solid var(--secondary)" onclick="App.router('modules')">
                    <h3><i class="fa-solid fa-play"></i> Continuar Treinamento</h3>
                    <p>Clique para acessar seus protocolos.</p>
                </div>
            </div>
        `;
    },

    modules: function(c) {
        const u = App.state.user;
        let html = `<div class="module-grid">`;
        
        neuroData.modules.forEach(mod => {
            const locked = !u.unlockedModules.includes(mod.id);
            html += `
                <div class="glass-card module-card ${locked ? 'locked' : ''}" 
                     onclick="${!locked ? `App.openReader('${mod.id}')` : ''}">
                    <div class="mod-icon"><i class="fa-solid ${locked ? 'fa-lock' : mod.icon}"></i></div>
                    <h4>${mod.title}</h4>
                    <p>${mod.subtitle}</p>
                </div>
            `;
        });
        html += `</div>`;
        c.innerHTML = html;
    },

    journal: function(c) {
        const u = App.state.user;
        let html = `
            <div class="glass-panel">
                <h3>Novo Registro</h3>
                <div class="emotions-grid">
                    ${neuroData.journalEmotions.map(e => 
                        `<button class="emotion-btn" style="border-color:${e.color}" 
                        onclick="Views.saveEntry('${e.name}', '${e.msg}', '${e.color}')">${e.name}</button>`
                    ).join('')}
                </div>
            </div>
            <div class="history-list">
                <h3>Histórico</h3>
                ${u.journal.length === 0 ? '<p>Nenhum registro ainda.</p>' : ''}
                ${u.journal.map(j => `
                    <div class="glass-card" style="border-left: 4px solid ${j.color}">
                        <strong>${j.emotion}</strong> <small>${j.date}</small>
                        <p>${j.msg}</p>
                        <small style="color:#aaa; display:block; margin-top:5px;">Gatilho: ${j.trigger}</small>
                    </div>
                `).join('')}
            </div>`;
        c.innerHTML = html;
    },

    saveEntry: function(emotion, msg, color) {
        const trigger = prompt("O que causou essa emoção? (Opcional)");
        const entry = {
            date: new Date().toLocaleDateString(),
            emotion, msg, color, 
            trigger: trigger || "Não especificado"
        };
        App.state.user.journal.unshift(entry);
        App.addXP(100);
        alert(`Emoção registrada.\nConselho: ${msg}`);
        App.router('journal');
    },

    library: function(c) {
        c.innerHTML = `
            <div class="glass-card">
                <h3>Conceitos Fundamentais</h3>
                <ul style="margin-left:20px; margin-top:10px;">
                    <li><strong>Sequestro da Amígdala:</strong> Reação emocional imediata que anula a razão.</li>
                    <li><strong>Neuroplasticidade:</strong> Capacidade de criar novos caminhos no cérebro.</li>
                    <li><strong>Córtex Pré-Frontal:</strong> Área responsável pelo planejamento e freio de impulsos.</li>
                    <li><strong>Flow:</strong> Estado de foco total e satisfação.</li>
                </ul>
            </div>`;
    }
};

// --- SOS Logic ---
const SOS = {
    timer: null,
    start: function() {
        const red = document.getElementById('light-red');
        const yel = document.getElementById('light-yellow');
        const grn = document.getElementById('light-green');
        const txt = document.getElementById('breath-text');
        
        red.classList.add('active'); yel.classList.remove('active'); grn.classList.remove('active');
        txt.innerText = "PARE. Respire fundo.";

        if(this.timer) clearInterval(this.timer);
        let s = 0;
        this.timer = setInterval(() => {
            s++;
            if(s === 5) {
                red.classList.remove('active'); yel.classList.add('active');
                txt.innerText = "PENSE. Analise a emoção.";
            }
            if(s === 10) {
                yel.classList.remove('active'); grn.classList.add('active');
                txt.innerText = "AJA com calma.";
            }
        }, 1000);
    },
    stop: function() {
        if(this.timer) clearInterval(this.timer);
    }
};

// Iniciar
document.addEventListener('DOMContentLoaded', () => App.init());
