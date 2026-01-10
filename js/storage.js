// js/storage.js

const STORAGE_KEY = 'neuroflow_user_data_v2'; // Mudamos a chave para v2 para evitar conflitos antigos

const defaultState = {
    username: null,
    startDate: null,
    lastLoginDate: null,
    currentDay: 1,
    xp: 0,
    dopamineLevel: 50,
    cortisolLevel: 20,
    completedChallenges: [],
    isDev: false // Novo flag
};

export const Storage = {
    get() {
        const data = localStorage.getItem(STORAGE_KEY);
        if (!data) return null;
        return JSON.parse(data);
    },

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

    save(data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    },

    updateProgress(userData) {
        if (!userData) return null;
        
        // Se estiver em Dev Mode, não limita os dias pelo tempo
        if(!userData.isDev) {
            const now = new Date();
            const start = new Date(userData.startDate);
            const diffTime = Math.abs(now - start);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
            
            // Travar no dia 28 (fim do conteúdo)
            const maxDays = 28; 
            
            if (diffDays > userData.currentDay) {
                userData.currentDay = Math.min(diffDays, maxDays);
                userData.cortisolLevel = Math.max(0, userData.cortisolLevel - 10);
            }
        }

        userData.lastLoginDate = Date.now();
        this.save(userData);
        return userData;
    },

    completeChallenge(challengeId, xpReward) {
        const data = this.get();
        if (!data.completedChallenges.includes(challengeId)) {
            data.completedChallenges.push(challengeId);
            data.xp += xpReward;
            data.dopamineLevel = Math.min(100, data.dopamineLevel + 15);
            data.cortisolLevel = Math.max(0, data.cortisolLevel - 5);
            this.save(data);
            return true;
        }
        return false;
    },
    
    reset() {
        localStorage.removeItem(STORAGE_KEY);
        location.reload();
    }
};
