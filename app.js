document.addEventListener('DOMContentLoaded', () => {
    
    // Elementos DOM
    const loginScreen = document.getElementById('login-screen');
    const dashboardScreen = document.getElementById('dashboard-screen');
    const usernameInput = document.getElementById('username-input');
    const startBtn = document.getElementById('start-btn');
    const displayName = document.getElementById('display-name');

    // Inicialização
    if (UserSystem.load()) {
        // Usuário já existe, vai direto pro Dashboard
        showDashboard();
    } else {
        // Usuário novo, fica na tela de login
        // Foca no input
        setTimeout(() => usernameInput.focus(), 500);
    }

    // Event Listeners
    startBtn.addEventListener('click', handleLogin);
    usernameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleLogin();
    });

    // Função de Login
    function handleLogin() {
        const name = usernameInput.value.trim();
        if (name.length > 0) {
            // Efeito visual de carregamento
            startBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Processando...';
            
            setTimeout(() => {
                UserSystem.create(name);
                showDashboard();
            }, 800); // Pequeno delay artificial para sensação de "processamento"
        } else {
            usernameInput.style.border = "1px solid #ff7675";
            usernameInput.classList.add('shake');
            setTimeout(() => usernameInput.classList.remove('shake'), 500);
        }
    }

    // Transição para Dashboard
    function showDashboard() {
        displayName.textContent = UserSystem.getName();
        
        // Fade out login
        loginScreen.style.opacity = '0';
        loginScreen.style.transform = 'scale(1.1)';
        
        setTimeout(() => {
            loginScreen.classList.add('hidden');
            loginScreen.classList.remove('active');
            
            dashboardScreen.classList.remove('hidden');
            // Pequeno delay para permitir que o DOM renderize antes de adicionar a classe active para a transição
            requestAnimationFrame(() => {
                dashboardScreen.classList.add('active');
            });
        }, 500);
    }
});
