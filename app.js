/* 
 * NEUROFLOW APP CONTROLLER 
 * Versão Corrigida - Safe DOM Manipulation
 */

const App = {
    state: {
        user: null,
        sosInterval: null
    },

    // --- Inicialização ---
    init: function() {
        console.log("NeuroFlow: Iniciando...");
        try {
            const savedUser = localStorage.getItem('neuroflow_user');
            if (savedUser) {
                this.state.user = JSON.parse(savedUser);
                this.loadInterface();
            } else {
                this.showScreen('auth-screen');
            }
            this.bindEvents();
        } catch (e) {
            console.error("Erro no init:", e);
            localStorage.clear();
            this.showScreen('auth-screen');
        }
    },

    // --- Helpers de Segurança do DOM (A CORREÇÃO PRINCIPAL) ---
    setText: function(id, text) {
        const el = document.getElementById(id);
        if (el) el.innerText = text;
        else console.warn(`Elemento não encontrado: ${id}`);
    },

    setStyle: function(id, property, value) {
        const el = document.getElementById(id);
        if (el) el.style[property] = value;
    },

    // --- Gerenciamento de Usuário ---
    createUser: function(name) {
        if (!name) return;
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
        this.updateUI(); // Atualiza toda a UI ao salvar
    },

    addXP: function(amount) {
        const u = this.state.user;
        const oldLevel = u.level;
        u.xp += amount;

        // Level Up Logic
        const levels = neuroData.config.levels;
        const nextLevel = levels.find(l => l.level === oldLevel + 1);

        if (nextLevel && u.xp >= nextLevel.min) {
            u.level++;
            alert(`🎉 Level Up! Você agora é: ${nextLevel.title}`);
            const nextMod = neuroData.modules[u.level - 1];
            if (nextMod && !u.unlockedModules.includes(nextMod.id)) {
                u.unlockedModules.push(nextMod.id);
            }
        }
        this.saveUser();
    },

    // --- Controle de Interface ---
    showScreen: function(screenId) {
        document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
        const target = document.getElementById(screenId);
        if (target) target.classList.remove('hidden');
    },

    loadInterface: function() {
        this.showScreen('main-interface');
        this.updateUI();
        this.router('dashboard');
    },

    updateUI: function() {
        if (!this.state.user) return;
        const u = this.state.user;
        
        // Dados de Nível
        const levels = neuroData.config.levels;
        const currLevel = levels.find(l => l.level === u.level) || levels[0];
        const nextLevel = levels.find(l => l.level === u.level + 1) || currLevel;

        // Atualização Segura dos Elementos
        this.setText('display-name', u.name);
        this.setText('user-avatar', u.name.charAt(0).toUpperCase());
        this.setText('user-level-display', currLevel.title);
        
        // XP Sidebar
        this.setText('xp-counter', `${u.xp} / ${nextLevel.max}`);
        const percent = Math.min(100, (u.xp / nextLevel.max) * 100);
        this.setStyle('xp-bar', 'width', `${percent}%`);

        // XP Header & Streak
        this.setText('xp-points', `${u.xp} XP`);
        this.setText('streak-count', u.streak);
    },

    router: function(view) {
        const container = document.getElementById('dynamic-content');
        if (!container) return;

        // Menu Ativo
        document.querySelectorAll('.nav-item').forEach(n => {
            n.classList.remove('active');
            if (n.dataset.view === view) n.classList.add('active');
        });

        // Títulos
        const titles = {
            'dashboard': ['Dashboard', 'Visão geral do seu progresso neural.'],
            'modules': ['Módulos', 'Treinamento cognitivo e emocional.'],
            'journal': ['Diário', 'Registre e processe suas emoções.'],
            'library': ['Biblioteca', 'Conceitos da neurociência.']
        };

        this.setText('section-title', titles[view][0]);
        this.setText('section-subtitle', titles[view][1]);

        // Renderização
        container.innerHTML = '';
        if (view === 'dashboard') Views.dashboard(container);
        if (view === 'modules') Views.modules(container);
        if (view === 'journal') Views.journal(container);
        if (view === 'library') Views.library(container);
    },

    // --- SOS ---
    toggleSOS: function(show) {
        const modal = document.getElementById('sos-modal');
        if (show) {
            modal.classList.remove('hidden');
            this.runTrafficLight();
        } else {
            modal.classList.add('hidden');
            if (this.state.sosInterval) clearInterval(this.state.sosInterval);
            this.addXP(50);
        }
    },

    runTrafficLight: function() {
        const els = {
            red: document.getElementById('light-red'),
            yel: document.getElementById('light-yellow'),
            grn: document.getElementById('light-green'),
            txt: document.getElementById('breath-text')
        };

        // Reset
        els.red.classList.add('active');
        els.yel.classList.remove('active');
        els.grn.classList.remove('active');
        els.txt.innerText = "PARE. Respire fundo.";

        let s = 0;
        if (this.state.sosInterval) clearInterval(this.state.sosInterval);

        this.state.sosInterval = setInterval(() => {
            s++;
            if (s === 5) {
                els.red.classList.remove('active');
                els.yel.classList.add('active');
                els.txt.innerText = "PENSE. O que você sente?";
            }
            if (s === 10) {
                els.yel.classList.remove('active');
                els.grn.classList.add('active');
                els.txt.innerText = "AJA com calma.";
            }
        }, 1000);
    },

    // --- Leitor ---
    openReader: function(mod) {
        this.setText('reader-title', mod.title);
        
        let html = `<div class="reader-pad">`;
        html += `<div class="reader-intro">${mod.summary}</div>`;
        
        mod.chapters.forEach((c, i) => {
            html += `<div class="chapter"><h3>${i+1}. ${c.title}</h3>${c.text}</div>`;
        });

        html += `<h3>Missões</h3>`;
        mod.missions.forEach(m => {
            const done = this.state.user.completedMissions.includes(m.id);
            html += `
                <div class="mission-row ${done ? 'done' : ''}">
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
        this.showScreen('reader-interface');
    },

    closeReader: function() {
        this.showScreen('main-interface');
    },

    finishMission: function(mId, xp, modId) {
        if (!this.state.user.completedMissions.includes(mId)) {
            this.state.user.completedMissions.push(mId);
            this.addXP(xp);
            // Reabre para atualizar UI
            const mod = neuroData.modules.find(m => m.id === modId);
            this.openReader(mod);
        }
    },

    // --- Eventos ---
    bindEvents: function() {
        const form = document.getElementById('login-form');
        if (form) {
            form.onsubmit = (e) => {
                e.preventDefault();
                const name = document.getElementById('username').value;
                this.createUser(name);
            };
        }

        document.querySelectorAll('.nav-item').forEach(el => {
            el.onclick = () => this.router(el.dataset.view);
        });
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
                    <p>Status do Córtex: Ativo. Progresso: ${percent}%</p>
                </div>
                <div class="glass-card full-width cursor-pointer" onclick="App.router('modules')">
                    <h3><i class="fa-solid fa-play"></i> Continuar Treinamento</h3>
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
                     onclick="${!locked ? `App.openReader(neuroData.modules.find(m=>m.id=='${mod.id}'))` : ''}">
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
                        `<button class="emotion-btn" style="border-color:${e.color}" onclick="Views.saveJournal('${e.name}', '${e.msg}', '${e.color}')">${e.name}</button>`
                    ).join('')}
                </div>
            </div>
            <div class="history-list">
                <h3>Histórico</h3>
                ${u.journal.map(j => `
                    <div class="glass-card" style="border-left: 4px solid ${j.color}">
                        <strong>${j.emotion}</strong> <small>${j.date}</small>
                        <p>${j.msg}</p>
                    </div>
                `).join('')}
            </div>
        `;
        c.innerHTML = html;
    },

    saveJournal: function(emotion, msg, color) {
        const entry = {
            date: new Date().toLocaleString(),
            emotion, msg, color, trigger: "Registro Rápido"
        };
        App.state.user.journal.unshift(entry);
        App.addXP(100);
        alert(msg);
        App.router('journal');
    },

    library: function(c) {
        c.innerHTML = `<div class="glass-card"><h3>Biblioteca</h3><p>Conceitos em breve.</p></div>`;
    }
};

// Iniciar
document.addEventListener('DOMContentLoaded', () => App.init());
