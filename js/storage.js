// js/storage.js

const STORAGE_KEY = 'neuroflow_user_data_v1';

// Estado inicial padrão
const defaultState = {
    username: null,
    startDate: null, // Timestamp do início
    lastLoginDate: null,
    currentDay: 1,   // Dia do protocolo (1 a 30)
    xp: 0,
    dopamineLevel: 50, // 0 a 100
    cortisolLevel: 20, // 0 a 100
    completedChallenges: [] // Array de IDs
};

export const Storage = {
    // Carregar dados do localStorage
    get() {
        const data = localStorage.getItem(STORAGE_KEY);
        if (!data) return null;
        return JSON.parse(data);
    },

    // Criar novo usuário
    initUser(username) {
        const newState = {
            ...defaultState,
            username: username,
            startDate: Date.now(),
            lastLoginDate: Date.now()
        };
        this.save(newState);
        return newState;
    },

    // Salvar estado atual
    save(data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    },

    // Verificar e atualizar progresso diário
    updateProgress(userData) {
        if (!userData) return null;

        const now = new Date();
        const start = new Date(userData.startDate);
        
        // Calcular diferença de dias reais desde o início
        // Um dia = 1000 * 60 * 60 * 24 milissegundos
        const diffTime = Math.abs(now - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        
        // Se passou dias reais, atualiza o dia do protocolo (até o limite de dias disponíveis)
        // Lógica: O dia do protocolo é igual aos dias corridos desde o início.
        // O usuário não pode "pular" para o dia 5 se só passou 1 dia.
        if (diffDays > userData.currentDay) {
            userData.currentDay = diffDays;
            // Resetar ou ajustar níveis químicos baseados no novo dia
            userData.cortisolLevel = Math.max(0, userData.cortisolLevel - 10); // Descanso reduz cortisol
        }

        userData.lastLoginDate = Date.now();
        this.save(userData);
        return userData;
    },

    // Completar um desafio
    completeChallenge(challengeId, xpReward) {
        const data = this.get();
        if (!data.completedChallenges.includes(challengeId)) {
            data.completedChallenges.push(challengeId);
            data.xp += xpReward;
            
            // Gamificação simples: completar desafio aumenta dopamina e baixa cortisol
            data.dopamineLevel = Math.min(100, data.dopamineLevel + 15);
            data.cortisolLevel = Math.max(0, data.cortisolLevel - 5);
            
            this.save(data);
            return true; // Sucesso
        }
        return false; // Já completado
    },
    
    // Resetar tudo (para testes)
    reset() {
        localStorage.removeItem(STORAGE_KEY);
        location.reload();
    }
};
