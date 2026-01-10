/* 
 * NEUROFLOW APP CONTROLLER 
 * Versão Corrigida - Foco em Login e Renderização
 */

const App = {
    state: {
        user: null,
        sosInterval: null
    },

    // --- 1. INICIALIZAÇÃO ---
    init: function() {
        console.log("NeuroFlow: Iniciando sistema...");
        
        try {
            // Tenta recuperar usuário
            const savedUser = localStorage.getItem('neuroflow_user');
            
            if (savedUser) {
                console.log("Usuário encontrado:", savedUser);
                this.state.user = JSON.parse(savedUser);
                this.loadInterface();
            } else {
                console.log("Nenhum usuário. Carregando tela de login.");
                this.loadLogin();
            }

            // Ativa os listeners globais
            this.bindEvents();

        } catch (e) {
            console.error("Erro crítico na inicialização:", e);
            localStorage.clear(); // Limpa dados corrompidos
            this.loadLogin();
        }
    },

    // --- 2. GERENCIAMENTO DE TELAS ---
    loadLogin: function() {
        document.getElementById('auth-screen').classList.remove('hidden');
        document.getElementById('main-interface').classList.add('hidden');
        document.getElementById('reader-interface').classList.add('hidden');
    },

    loadInterface: function() {
        // Esconde login, mostra app
        document.getElementById('auth-screen').classList.add('hidden');
        document.getElementById('main-interface').classList.remove('hidden');
        
        // Atualiza dados na tela
        this.renderSidebar();
        this.router('dashboard');
        this.checkStreak();
    },

    // --- 3. AÇÕES DE USUÁRIO ---
    createUser: function(name) {
        if (!name || name.trim() === "") {
            alert("Por favor, digite seu nome.");
            return;
        }

        console.log("Criando usuário:", name);

        this.state.user = {
            name: name,
            level: 1,
            xp: 50, // XP inicial de bônus
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
        this.renderSidebar(); // Atualiza sidebar sempre que salvar
    },

    addXP: function(amount) {
        this.state.user.xp += amount;
        
        // Checa Level Up (baseado no neuroData do data.js)
        const levels = neuroData.config.levels;
        const currentLevel = this.state.user.level;
        const nextLevelObj = levels.find(l => l.level === currentLevel + 1);

        if (nextLevelObj && this.state.user.xp >= nextLevelObj.min) {
            this.state.user.level++;
            alert(`🎉 Neuroplasticidade! Você subiu para o Nível ${this.state.user.level}: ${nextLevelObj.title}`);
            
            // Libera próximo módulo
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
                this.state.user.streak = 1; // Quebrou a sequência
            }
            this.state.user.lastLogin = today;
            this.saveUser();
        }
        document.getElementById('streak-count').innerText = this.state.user.streak;
    },

    // --- 4. ROTEADOR (Troca de abas) ---
    router: function(viewName) {
        console.log("Navegando para:", viewName);
        
        // Atualiza Menu
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.view === viewName) item.classList.add('active');
        });

        const container = document.getElementById('dynamic-content');
        container.innerHTML = ''; // Limpa conteúdo

        const title = document.getElementById('section-title');
        const sub = document.getElementById('section-subtitle');

        // Renderiza conteúdo baseado na view
        if (viewName === 'dashboard') {
            title.innerText = "Dashboard";
            sub.innerText = "Visão geral do seu córtex.";
            Views.dashboard(container);
        } 
        else if (viewName === 'modules') {
            title.innerText = "Protocolos";
            sub.innerText = "Treinamento neural.";
            Views.modules(container);
        }
        else if (viewName === 'journal') {
            title.innerText = "Diário";
            sub.innerText = "Autoconsciência emocional.";
            Views.journal(container);
        }
        else if (viewName === 'library') {
            title.innerText = "Biblioteca";
            sub.innerText = "Conceitos fundamentais.";
            Views.library(container);
        }
    },

    // --- 5. RENDERIZADORES DE TELA (Views) ---
    renderSidebar: function() {
        if (!this.state.user) return;
        const u = this.state.user;
        const levelConfig = neuroData.config.levels.find(l => l.level === u.level);
        const nextLevelConfig = neuroData.config.levels.find(l => l.level === u.level + 1) || levelConfig;

        document.getElementById('display-name').innerText = u.name;
        document.getElementById('user-avatar').innerText = u.name.charAt(0).toUpperCase();
        document.getElementById('user-level-display').innerText = levelConfig.title;
        document.getElementById('xp-counter').innerText = `${u.xp} / ${nextLevelConfig.max}`;
        
        // Barra de XP
        let percent = Math.min(100, (u.xp / nextLevelConfig.max) * 100);
        document.getElementById('xp-bar').style.width = `${percent}%`;
    },

    // --- 6. EVENTOS GLOBAIS ---
    bindEvents: function() {
        // Evento de Login
        const loginBtn = document.querySelector('#login-form button');
        const loginInput = document.querySelector('#login-form input');
        const loginForm = document.getElementById('login-form');

        if (loginForm) {
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault(); // Impede recarregar página
                const name = loginInput.value;
                App.createUser(name);
            });
        }

        // Navegação Lateral
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', function() {
                const view = this.dataset.view;
                App.router(view);
            });
        });
    }
};

// --- VIEWS COMPONENTS ---
const Views = {
    dashboard: function(container) {
        const u = App.state.user;
        const totalMissions = neuroData.modules.flatMap(m => m.missions).length;
        const done = u.completedMissions.length;

        container.innerHTML = `
            <div class="grid-2">
                <div class="glass-panel full-width">
                    <h2>Olá, ${u.name}!</h2>
                    <p>Seu progresso atual é de ${done} missões completadas de ${totalMissions}.</p>
                    <div style="margin-top: 15px; font-size: 2rem; color: var(--primary-light);">
                        <i class="fa-solid fa-brain"></i> ${u.xp} XP
                    </div>
                </div>
                <div class="glass-card full-width" style="cursor: pointer;" onclick="App.router('modules')">
                    <h3><i class="fa-solid fa-play"></i> Continuar Treinamento</h3>
                    <p>Clique aqui para acessar os módulos e missões.</p>
                </div>
            </div>
        `;
    },

    modules: function(container) {
        const u = App.state.user;
        
        neuroData.modules.forEach(mod => {
            const isLocked = !u.unlockedModules.includes(mod.id);
            const div = document.createElement('div');
            div.className = `glass-card ${isLocked ? 'locked' : ''}`;
            div.style.opacity = isLocked ? '0.6' : '1';
            
            div.innerHTML = `
                <div style="display:flex; justify-content:space-between;">
                    <h3><i class="fa-solid ${isLocked ? 'fa-lock' : mod.icon}"></i> ${mod.title}</h3>
                    ${isLocked ? '<span style="background:rgba(255,255,255,0.1); padding:4px 8px; border-radius:4px; font-size:0.8rem">BLOQUEADO</span>' : ''}
                </div>
                <p>${mod.summary}</p>
                <div style="margin-top: 10px; font-size: 0.9rem; color: var(--text-secondary);">
                    ${mod.chapters.length} Lições | ${mod.missions.length} Missões
                </div>
            `;
            
            if (!isLocked) {
                div.style.cursor = 'pointer';
                div.style.borderLeft = '4px solid var(--success)';
                div.onclick = () => Reader.open(mod);
            }
            
            container.appendChild(div);
        });
    },

    journal: function(container) {
        const u = App.state.user;
        let html = `<div class="glass-panel">
            <h3>Novo Registro</h3>
            <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin: 15px 0;">
                ${neuroData.journalEmotions.map(e => 
                    `<button class="btn-primary" style="background:transparent; border:1px solid ${e.color}; color: white;" 
                    onclick="Views.saveEntry('${e.name}', '${e.msg}', '${e.color}')">${e.name}</button>`
                ).join('')}
            </div>
            <p id="journal-feedback" style="font-style: italic; color: var(--text-secondary);"></p>
        </div>
        <div class="history-list">
            <h3>Seu Histórico</h3>
            ${u.journal.map(j => `
                <div class="glass-card" style="border-left: 4px solid ${j.color}">
                    <strong>${j.emotion}</strong> - ${j.date}
                    <p>${j.msg}</p>
                </div>
            `).join('')}
        </div>`;
        container.innerHTML = html;
    },

    saveEntry: function(emotion, msg, color) {
        const entry = {
            date: new Date().toLocaleString(),
            emotion, msg, color
        };
        App.state.user.journal.unshift(entry);
        App.addXP(100);
        alert(msg);
        App.router('journal');
    },
    
    library: function(container) {
        container.innerHTML = `
            <div class="glass-panel">
                <h3>Conceitos-Chave</h3>
                <ul style="margin-left: 20px; line-height: 1.8;">
                    <li><strong>Sequestro da Amígdala:</strong> Quando a emoção domina a razão instantaneamente.</li>
                    <li><strong>Neuroplasticidade:</strong> Capacidade do cérebro de mudar fisicamente através de novos hábitos.</li>
                    <li><strong>Córtex Pré-Frontal:</strong> O "CEO" do cérebro, responsável pelo autocontrole.</li>
                    <li><strong>Fluxo (Flow):</strong> Estado de imersão total e foco, onde a emoção é positiva e canalizada.</li>
                </ul>
            </div>
        `;
    }
};

// --- LEITOR DE CONTEÚDO ---
const Reader = {
    open: function(mod) {
        const reader = document.getElementById('reader-interface');
        const text = document.getElementById('reader-text');
        document.getElementById('reader-title').innerText = mod.title;
        
        let html = `<div style="padding: 2rem;">`;
        mod.chapters.forEach(c => {
            html += `<h3>${c.title}</h3>${c.text}<hr style="border:0; border-top:1px solid rgba(255,255,255,0.1); margin: 20px 0;">`;
        });
        
        html += `<h3>Missões Práticas</h3>`;
        const u = App.state.user;
        
        mod.missions.forEach(m => {
            const isDone = u.completedMissions.includes(m.id);
            html += `
                <div class="glass-card" style="border: 1px solid ${isDone ? 'var(--success)' : 'white'}">
                    <h4>${m.title} (+${m.xp} XP)</h4>
                    <p>${m.desc}</p>
                    <button class="btn-primary" style="margin-top:10px; background: ${isDone ? 'gray' : 'var(--success)'}" 
                    ${isDone ? 'disabled' : ''} onclick="Reader.complete('${m.id}', ${m.xp}, '${mod.id}')">
                        ${isDone ? 'Concluído' : 'Marcar como Feito'}
                    </button>
                </div>
            `;
        });
        html += `</div>`;
        
        text.innerHTML = html;
        
        document.getElementById('main-interface').classList.add('hidden');
        reader.classList.remove('hidden');
    },

    complete: function(mId, xp, modId) {
        const u = App.state.user;
        if(!u.completedMissions.includes(mId)) {
            u.completedMissions.push(mId);
            App.addXP(xp);
            // Reabre para atualizar botões
            const mod = neuroData.modules.find(m => m.id === modId);
            this.open(mod);
        }
    },
    
    close: function() {
        document.getElementById('reader-interface').classList.add('hidden');
        document.getElementById('main-interface').classList.remove('hidden');
        App.router('modules');
    }
};

// --- SISTEMA SOS ---
const SOS = {
    timer: null,
    open: function(mode) {
        const modal = document.getElementById('sos-modal');
        if(mode) {
            modal.classList.remove('hidden');
            this.run();
        } else {
            modal.classList.add('hidden');
            if(this.timer) clearInterval(this.timer);
            App.addXP(50);
        }
    },
    run: function() {
        const red = document.getElementById('light-red');
        const yellow = document.getElementById('light-yellow');
        const green = document.getElementById('light-green');
        const text = document.getElementById('breath-text');
        
        // Reset
        red.classList.add('active'); yellow.classList.remove('active'); green.classList.remove('active');
        text.innerText = "PARE. Respire fundo.";
        
        let s = 0;
        if(this.timer) clearInterval(this.timer);
        this.timer = setInterval(() => {
            s++;
            if(s === 5) {
                red.classList.remove('active'); yellow.classList.add('active');
                text.innerText = "PENSE. Analise a emoção.";
            }
            if(s === 10) {
                yellow.classList.remove('active'); green.classList.add('active');
                text.innerText = "AJA. Escolha a melhor resposta.";
            }
        }, 1000);
    }
};

// Bindings Globais
App.toggleSOS = (mode) => SOS.open(mode);
App.closeReader = Reader.close;
window.App = App;
window.Reader = Reader;
window.Views = Views;

// Inicia
document.addEventListener('DOMContentLoaded', () => App.init());
