// O arquivo principal de controle.
// Por enquanto, apenas para testar a carga.
document.addEventListener('DOMContentLoaded', () => {
    console.log("NeuroFlow System Initialized.");
    
    // Lógica temporária de login para teste visual
    const btnStart = document.getElementById('btn-start');
    const inputUser = document.getElementById('username');
    const loginScreen = document.getElementById('login-screen');
    const dashboardScreen = document.getElementById('dashboard-screen');
    const userNameDisplay = document.getElementById('user-display-name');

    btnStart.addEventListener('click', () => {
        const name = inputUser.value;
        if(name.trim() !== "") {
            // Simular transição
            loginScreen.style.opacity = '0';
            setTimeout(() => {
                loginScreen.classList.add('hidden');
                loginScreen.classList.remove('active');
                
                dashboardScreen.classList.remove('hidden');
                setTimeout(() => dashboardScreen.classList.add('active'), 50);
                
                userNameDisplay.innerText = name;
            }, 500);
        } else {
            inputUser.style.borderColor = '#ff4757';
            setTimeout(() => inputUser.style.borderColor = 'rgba(255,255,255,0.1)', 1000);
        }
    });
});
