// Dados simulados baseados nos PDFs
const db = {
    protocols: [
        {
            id: 1,
            title: "Reestruturação Cognitiva",
            desc: "Baseado em Aaron Beck e Seligman. Identifique pensamentos automáticos negativos.",
            icon: "fa-brain",
            time: "15 min"
        },
        {
            id: 2,
            title: "Desacelerando o Límbico",
            desc: "Técnicas para reduzir a atividade da amígdala e ativar o nervo vago.",
            icon: "fa-wind",
            time: "5 min"
        },
        {
            id: 3,
            title: "Espelhamento Empático",
            desc: "Treino de escuta ativa para melhorar relacionamentos e reduzir conflitos.",
            icon: "fa-users-viewfinder",
            time: "Dia todo"
        }
    ],
    journalEntries: [
        { date: "Hoje", emotion: "Ansiedade", trigger: "Apresentação no trabalho", note: "Senti meu coração acelerar (norepinefrina). Usei a respiração para acalmar." }
    ]
};

// State Management
let currentState = {
    view: 'dashboard',
    sosStep: 0
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    updateDate();
    renderView('dashboard');
    setupNavigation();
});

function updateDate() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('current-date').innerText = new Date().toLocaleDateString('pt-BR', options);
}

function setupNavigation() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            // Remove active class
            document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
            // Add active class
            item.classList.add('active');
            // Render View
            renderView(item.dataset.target);
        });
    });
}

// Renderizador de Views
function renderView(viewName) {
    const container = document.getElementById('content-container');
    const title = document.getElementById('page-title');
    
    container.style.opacity = 0;
    
    setTimeout(() => {
        container.innerHTML = ''; // Limpar
        
        switch(viewName) {
            case 'dashboard':
                title.innerText = "Visão Geral";
                renderDashboard(container);
                break;
            case 'protocols':
                title.innerText = "Protocolos Neurais";
                renderProtocols(container);
                break;
            case 'journal':
                title.innerText = "Diário do Córtex";
                renderJournal(container);
                break;
            case 'library':
                title.innerText = "Biblioteca da Mente";
                renderLibrary(container);
                break;
        }
        
        container.style.opacity = 1;
    }, 200);
}

// Componentes da UI
function renderDashboard(container) {
    container.innerHTML = `
        <div class="welcome-banner">
            <div>
                <h2>Olá, Alexandre</h2>
                <p>Seu córtex pré-frontal está em ótima forma hoje. Continue a prática para consolidar a neuroplasticidade.</p>
            </div>
            <i class="fa-solid fa-microchip" style="font-size: 3rem; opacity: 0.5;"></i>
        </div>
        
        <div class="grid-2">
            <div class="section-left">
                <h3 style="margin-bottom: 1rem;">Protocolos Sugeridos</h3>
                <div class="grid-2">
                    ${db.protocols.map(p => `
                        <div class="glass-card protocol-card">
                            <i class="fa-solid ${p.icon} protocol-icon"></i>
                            <h4>${p.title}</h4>
                            <p style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 5px;">${p.desc}</p>
                            <div style="margin-top: 15px; display: flex; justify-content: space-between; align-items: center;">
                                <span style="font-size: 0.7rem; background: rgba(255,255,255,0.1); padding: 2px 8px; border-radius: 4px;">${p.time}</span>
                                <i class="fa-solid fa-arrow-right" style="font-size: 0.8rem; color: var(--primary);"></i>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="section-right">
                <h3 style="margin-bottom: 1rem;">Neuroquímica Diária</h3>
                <div class="glass-card">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                        <span>Dopamina (Motivação)</span>
                        <span style="color: var(--success);">Estável</span>
                    </div>
                    <div style="width: 100%; height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; margin-bottom: 20px;">
                        <div style="width: 70%; height: 100%; background: var(--secondary); border-radius: 3px;"></div>
                    </div>

                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                        <span>Cortisol (Estresse)</span>
                        <span style="color: var(--accent);">Alto</span>
                    </div>
                    <div style="width: 100%; height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; margin-bottom: 20px;">
                        <div style="width: 85%; height: 100%; background: var(--accent); border-radius: 3px;"></div>
                    </div>
                    
                    <p style="font-size: 0.8rem; color: var(--text-secondary);">
                        <i class="fa-solid fa-circle-info"></i> Seus níveis de estresse estão elevados. Recomendamos o protocolo de respiração diafragmática.
                    </p>
                </div>
            </div>
        </div>
    `;
}

function renderProtocols(container) {
    container.innerHTML = `<div class="glass-card"><h3>Módulo em Desenvolvimento</h3><p>Acesse o Dashboard para ver os destaques.</p></div>`;
}

function renderJournal(container) {
    let entriesHtml = db.journalEntries.map(entry => `
        <div class="glass-card" style="margin-bottom: 1rem; border-left: 4px solid var(--primary);">
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <span style="font-weight: 600; color: var(--primary);">${entry.emotion}</span>
                <span style="font-size: 0.8rem; color: var(--text-secondary);">${entry.date}</span>
            </div>
            <p style="margin-bottom: 0.5rem;"><strong>Gatilho:</strong> ${entry.trigger}</p>
            <p style="color: var(--text-secondary); font-size: 0.9rem;">${entry.note}</p>
        </div>
    `).join('');

    container.innerHTML = `
        <div class="grid-2">
            <div>
                <div class="glass-card" style="margin-bottom: 2rem;">
                    <h3 style="margin-bottom: 1rem;">Nova Entrada</h3>
                    <input type="text" placeholder="Qual a emoção predominante?" style="width: 100%; padding: 12px; background: rgba(0,0,0,0.2); border: 1px solid var(--glass-border); color: white; border-radius: 8px; margin-bottom: 10px;">
                    <textarea placeholder="Descreva o gatilho e sua reação (seja honesto, seu córtex precisa disso)..." style="width: 100%; padding: 12px; background: rgba(0,0,0,0.2); border: 1px solid var(--glass-border); color: white; border-radius: 8px; height: 100px; margin-bottom: 10px;"></textarea>
                    <button class="btn-sos" style="background: var(--primary); width: auto;">Salvar Registro</button>
                </div>
                <h3>Histórico</h3>
                ${entriesHtml}
            </div>
            <div>
                <div class="glass-card">
                    <h3>Análise de Padrões</h3>
                    <p style="color: var(--text-secondary); margin-top: 10px;">O registro escrito ativa o córtex pré-frontal, ajudando a modular a resposta da amígdala. Você tende a sentir mais ansiedade nas segundas-feiras.</p>
                </div>
            </div>
        </div>
    `;
}

function renderLibrary(container) {
    container.innerHTML = `
        <div class="grid-3">
            <div class="glass-card">
                <h4>Inteligência Emocional</h4>
                <p style="font-size: 0.8rem; color: var(--text-secondary); margin: 10px 0;">Daniel Goleman</p>
                <p style="font-size: 0.9rem;">Conceitos sobre o sequestro da amígdala, autoconsciência e a importância das habilidades sociais.</p>
            </div>
            <div class="glass-card">
                <h4>O Cérebro e as Emoções</h4>
                <p style="font-size: 0.8rem; color: var(--text-secondary); margin: 10px 0;">Oliveira & Santos</p>
                <p style="font-size: 0.9rem;">Exploração neuroanatômica dos sentimentos, sistema límbico e o papel dos neurotransmissores.</p>
            </div>
        </div>
    `;
}

// Lógica SOS (Baseado no Método do Sinal de Trânsito de Goleman)
let sosInterval;

function triggerSOS() {
    const overlay = document.getElementById('sos-overlay');
    const lights = ['light-red', 'light-yellow', 'light-green'];
    const instructions = [
        "PARE! Sua amígdala detectou uma ameaça. Não aja por impulso. Respire.",
        "PENSE. Analise: É uma ameaça real ou simbólica? Qual a melhor resposta?",
        "AJA. Escolha a resposta mais construtiva e execute."
    ];
    
    overlay.classList.remove('hidden');
    let step = 0;

    // Reset
    lights.forEach(l => document.getElementById(l).classList.remove('active'));
    document.getElementById('sos-instruction').innerText = instructions[0];
    document.getElementById(lights[0]).classList.add('active');

    // Sequência do semáforo (Simulação de tempo para acalmar)
    let counter = 0;
    sosInterval = setInterval(() => {
        counter++;
        if(counter === 5) { // Após 5 segundos, vai para o amarelo
            document.getElementById(lights[0]).classList.remove('active');
            document.getElementById(lights[1]).classList.add('active');
            document.getElementById('sos-instruction').innerText = instructions[1];
        }
        if(counter === 15) { // Após 15 segundos, vai para o verde (tempo mínimo para o córtex voltar)
            document.getElementById(lights[1]).classList.remove('active');
            document.getElementById(lights[2]).classList.add('active');
            document.getElementById('sos-instruction').innerText = instructions[2];
            clearInterval(sosInterval);
        }
    }, 1000);
}

function closeSOS() {
    document.getElementById('sos-overlay').classList.add('hidden');
    clearInterval(sosInterval);
}
