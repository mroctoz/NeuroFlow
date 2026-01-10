document.addEventListener('DOMContentLoaded', () => {
    
    // --- DOM ELEMENTS ---
    const loginScreen = document.getElementById('login-screen');
    const dashboardScreen = document.getElementById('dashboard-screen');
    const usernameInput = document.getElementById('username-input');
    const startBtn = document.getElementById('start-btn');
    const displayName = document.getElementById('display-name');
    const modulesGrid = document.getElementById('modules-grid');
    
    // Modal Elements
    const readerModal = document.getElementById('reader-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalType = document.getElementById('modal-type');
    const modalBody = document.getElementById('modal-body');
    const closeModalBtn = document.getElementById('close-modal');
    const completeBtn = document.getElementById('complete-btn');

    let currentModuleId = null;

    // --- INITIALIZATION ---
    if (UserSystem.load()) {
        showDashboard();
    } else {
        setTimeout(() => usernameInput.focus(), 500);
    }

    // --- EVENT LISTENERS ---
    startBtn.addEventListener('click', handleLogin);
    usernameInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleLogin(); });
    
    closeModalBtn.addEventListener('click', closeReader);
    completeBtn.addEventListener('click', () => finishModule(currentModuleId));

    // Fechar modal ao clicar fora
    readerModal.addEventListener('click', (e) => {
        if (e.target === readerModal) closeReader();
    });

    // --- FUNCTIONS ---

    function handleLogin() {
        const name = usernameInput.value.trim();
        if (name.length > 0) {
            startBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Processando...';
            setTimeout(() => {
                UserSystem.create(name);
                showDashboard();
            }, 800);
        } else {
            usernameInput.style.border = "1px solid #ff7675";
            usernameInput.classList.add('shake');
            setTimeout(() => usernameInput.classList.remove('shake'), 500);
        }
    }

    function showDashboard() {
        displayName.textContent = UserSystem.getName();
        
        loginScreen.style.opacity = '0';
        loginScreen.style.transform = 'scale(1.1)';
        
        setTimeout(() => {
            loginScreen.classList.add('hidden');
            loginScreen.classList.remove('active');
            
            dashboardScreen.classList.remove('hidden');
            renderModules(); // Renderizar os cards
            
            requestAnimationFrame(() => {
                dashboardScreen.classList.add('active');
            });
        }, 500);
    }

    function renderModules() {
        modulesGrid.innerHTML = ''; // Limpar
        const completed = UserSystem.state.completedModules;

        ModulesData.forEach((mod, index) => {
            // Lógica de Bloqueio:
            // O módulo está bloqueado se a propriedade locked for true
            // E o módulo anterior não tiver sido completado.
            // O primeiro módulo (index 0) nunca depende do anterior.
            
            let isLocked = mod.locked;
            let isCompleted = completed.includes(mod.id);

            // Se o módulo anterior foi feito, destrava este
            if (index > 0) {
                const prevModId = ModulesData[index - 1].id;
                if (completed.includes(prevModId)) {
                    isLocked = false;
                }
            } else {
                isLocked = false; // Primeiro sempre aberto
            }

            // Criar Elemento HTML
            const card = document.createElement('div');
            card.className = `module-card ${isLocked ? 'locked' : ''} ${isCompleted ? 'completed' : ''}`;
            card.onclick = () => {
                if (!isLocked) openModule(mod);
            };

            const iconType = mod.type === 'theory' ? 'fa-book-open' : 'fa-dumbbell';
            const typeLabel = mod.type === 'theory' ? 'Teoria' : 'Desafio';
            const typeClass = mod.type === 'theory' ? 'type-theory' : 'type-challenge';

            card.innerHTML = `
                <div class="card-header">
                    <span class="type-badge ${typeClass}">${typeLabel}</span>
                    ${isLocked ? '<i class="fa-solid fa-lock"></i>' : ''}
                </div>
                <div class="module-title">${mod.title}</div>
                <div class="module-subtitle">${mod.subtitle}</div>
                <div class="card-footer">
                    <i class="fa-solid ${iconType}"></i> ${mod.duration}
                </div>
            `;

            modulesGrid.appendChild(card);
        });
    }

    function openModule(module) {
        currentModuleId = module.id;
        modalTitle.textContent = module.title;
        modalType.textContent = module.type === 'theory' ? 'TEORIA' : 'DESAFIO';
        modalBody.innerHTML = module.content;
        
        // Configurar botão de conclusão
        if (UserSystem.state.completedModules.includes(module.id)) {
            completeBtn.textContent = "Revisado";
            completeBtn.style.background = "#2d3436";
        } else {
            completeBtn.textContent = "Concluir Módulo";
            completeBtn.style.background = "var(--accent)";
        }

        readerModal.classList.add('active');
        readerModal.classList.remove('hidden');
    }

    function closeReader() {
        readerModal.classList.remove('active');
        setTimeout(() => {
            // readerModal.classList.add('hidden');
            currentModuleId = null;
        }, 300);
    }

    function finishModule(id) {
        if (!UserSystem.state.completedModules.includes(id)) {
            UserSystem.state.completedModules.push(id);
            UserSystem.save(); // Salvar no localStorage
            
            // Feedback Visual
            completeBtn.innerHTML = '<i class="fa-solid fa-check"></i> Concluído!';
            completeBtn.style.background = "#00b894";
            
            // Re-renderizar o dashboard atrás do modal
            renderModules();
            
            setTimeout(() => {
                closeReader();
            }, 1000);
        } else {
            closeReader();
        }
    }
});
