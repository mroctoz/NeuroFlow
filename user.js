const UserSystem = {
    // Chave para o localStorage
    STORAGE_KEY: 'neuroflow_user_v1',

    // Estado inicial
    state: {
        name: null,
        currentPhase: 1,
        completedModules: [], // IDs dos módulos completados
        journal: [], // Entradas de diário
        points: 0
    },

    // Carregar dados
    load: function() {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        if (stored) {
            this.state = JSON.parse(stored);
            return true; // Usuário existe
        }
        return false; // Novo usuário
    },

    // Salvar dados
    save: function() {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.state));
    },

    // Criar novo usuário
    create: function(name) {
        this.state.name = name;
        this.save();
    },

    // Getters
    getName: function() { return this.state.name; },
    getPhase: function() { return this.state.currentPhase; }
};
