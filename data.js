/* 
 * NEUROFLOW DATABASE (LOCAL STORAGE)
 * Baseado nas obras: "Inteligência Emocional" (Goleman) & "O Cérebro e as Emoções" (Oliveira & Santos)
 */

const neuroData = {
    // --- SISTEMA DE GAMIFICAÇÃO ---
    config: {
        levels: [
            { level: 1, title: "Iniciante Límbico", minXp: 0, maxXp: 500 },
            { level: 2, title: "Explorador Sináptico", minXp: 501, maxXp: 1200 },
            { level: 3, title: "Arquiteto Neural", minXp: 1201, maxXp: 2500 },
            { level: 4, title: "Mestre Pré-Frontal", minXp: 2501, maxXp: 5000 },
            { level: 5, title: "Sábio da Neuroplasticidade", minXp: 5001, maxXp: 10000 }
        ],
        xpRewards: {
            login: 50,
            reading: 150,
            missionComplete: 300,
            journalEntry: 100,
            sosUsage: 200 // Premiar o uso do SOS reforça o hábito de parar antes de reagir
        }
    },

    // --- CURRÍCULO EDUCACIONAL (BASEADO NOS LIVROS) ---
    modules: [
        {
            id: "mod_01",
            title: "Módulo 1: Anatomia do Eu",
            subtitle: "Entendendo o Hardware Biológico",
            icon: "fa-fingerprint",
            locked: false,
            content: {
                summary: "Antes de controlar suas emoções, você precisa saber onde elas nascem. Descubra a batalha entre o Córtex e o Sistema Límbico.",
                chapters: [
                    {
                        title: "O Maestro e a Orquestra",
                        text: `
                            <p>Imagine seu cérebro como uma grande orquestra. Para que a música (sua vida) seja harmoniosa, todos os instrumentos precisam tocar no ritmo certo. Na neurociência, identificamos dois grandes protagonistas nesta orquestra:</p>
                            
                            <h4>1. O Maestro (Córtex Pré-Frontal)</h4>
                            <p>Localizado logo atrás da sua testa, é a parte mais evoluída do cérebro. É responsável pelo planejamento, tomada de decisão, controle de impulsos e raciocínio lógico. Quando você decide "não comer aquele doce" ou "estudar em vez de ver TV", é o Maestro agindo. Ele consome muita energia e se cansa fácil.</p>
                            
                            <h4>2. A Seção de Percussão (Sistema Límbico)</h4>
                            <p>Nas profundezas do cérebro, temos estruturas primitivas como a <strong>Amígdala</strong> e o <strong>Hipocampo</strong>. Elas são rápidas, instintivas e emocionais. Elas reagem antes de você pensar. São responsáveis pelo medo, prazer, raiva e desejo.</p>
                            
                            <p class="highlight"><strong>O Grande Conflito:</strong> A maioria dos nossos problemas ocorre quando a Percussão toca tão alto que abafa o Maestro. Isso é biológico. Mas a boa notícia é a <strong>Neuroplasticidade</strong>: a capacidade de treinar o Maestro para reger melhor a orquestra.</p>
                        `
                    },
                    {
                        title: "Neurônios e Sinapses",
                        text: `
                            <p>Você tem cerca de 86 bilhões de neurônios. Eles conversam entre si através de <strong>Sinapses</strong>. Imagine as sinapses como "caminhos na floresta".</p>
                            <ul>
                                <li>Se você sempre reage com raiva, esse caminho na floresta vira uma estrada larga e asfaltada. É fácil e rápido passar por lá.</li>
                                <li>Se você tenta ter paciência, no início é como abrir uma trilha no mato com um facão. É difícil, lento e cansativo.</li>
                            </ul>
                            <p>Porém, quanto mais você usa a trilha da paciência, mais limpa ela fica. Isso é o aprendizado emocional. O objetivo deste app é asfaltar as estradas certas e deixar o mato crescer nas estradas velhas de comportamento destrutivo.</p>
                        `
                    }
                ],
                missions: [
                    {
                        id: "miss_01_01",
                        title: "Mapeamento Somático",
                        desc: "Durante o dia, pare 3 vezes e identifique ONDE você sente uma emoção no corpo (ex: aperto no peito, calor no rosto).",
                        xp: 300,
                        completed: false
                    },
                    {
                        id: "miss_01_02",
                        title: "Identificando o Maestro",
                        desc: "Anote uma situação hoje onde você teve vontade de fazer algo (impulso límbico) mas decidiu não fazer (controle pré-frontal).",
                        xp: 300,
                        completed: false
                    }
                ]
            }
        },
        {
            id: "mod_02",
            title: "Módulo 2: O Sequestro da Amígdala",
            subtitle: "Dominando a Resposta de Luta ou Fuga",
            icon: "fa-triangle-exclamation",
            locked: true,
            content: {
                summary: "Por que perdemos a cabeça? A anatomia da raiva e como impedir que a Amígdala tome o controle.",
                chapters: [
                    {
                        title: "O Alarme de Incêndio",
                        text: `
                            <p>Daniel Goleman descreve o <strong>Sequestro da Amígdala</strong> (Amygdala Hijack) como o momento em que a emoção cega a razão. A amígdala funciona como um radar de perigo. Na pré-história, isso salvava vidas (ver um leão = correr).</p>
                            <p>Hoje, a amígdala confunde "leão" com "chefe gritando" ou "trânsito parado".</p>
                            <p>Quando ela dispara, ela "sequestra" os recursos do cérebro. O sangue sai do Córtex Pré-Frontal (razão) e vai para os músculos. Resultado: <strong>Você fica temporariamente mais burro.</strong> Literalmente, você não consegue raciocinar bem.</p>
                        `
                    },
                    {
                        title: "A Técnica do Sinal de Trânsito",
                        text: `
                            <p>Para recuperar o controle, precisamos ganhar tempo. O sinal químico da raiva dura cerca de 90 segundos na corrente sanguínea. Se você não alimentar a raiva com pensamentos ("ele fez de propósito!", "que idiota!"), ela passa.</p>
                            <div class="box-technique">
                                <h5>Protocolo SOCS (Situação, Opções, Consequências, Soluções)</h5>
                                <p>Uma adaptação para adultos:</p>
                                <ol>
                                    <li><strong>Sinal Vermelho (PARE):</strong> Sentiu o calor subir? Cale-se. Respire. Não aja.</li>
                                    <li><strong>Sinal Amarelo (PENSE):</strong> O que estou sentindo? É raiva ou medo? Qual o problema real?</li>
                                    <li><strong>Sinal Verde (AJA):</strong> Qual a melhor resposta construtiva agora?</li>
                                </ol>
                            </div>
                        `
                    }
                ],
                missions: [
                    {
                        id: "miss_02_01",
                        title: "O Poder da Pausa",
                        desc: "Use o botão SOS deste app na próxima vez que sentir irritação nível 5 ou superior.",
                        xp: 400,
                        completed: false
                    },
                    {
                        id: "miss_02_02",
                        title: "Reenquadramento",
                        desc: "Pegue um pensamento que te dá raiva (ex: 'Ele me ignorou') e crie 2 explicações alternativas não-maliciosas.",
                        xp: 300,
                        completed: false
                    }
                ]
            }
        },
        {
            id: "mod_03",
            title: "Módulo 3: Química do Bem-Estar",
            subtitle: "Hackeando seus Neurotransmissores",
            icon: "fa-flask",
            locked: true,
            content: {
                summary: "Dopamina, Serotonina, Ocitocina. Como modular sua química cerebral através de comportamento.",
                chapters: [
                    {
                        title: "O Sistema de Recompensa",
                        text: `
                            <p>O <strong>Núcleo Accumbens</strong> é o centro do prazer. Ele ama <strong>Dopamina</strong>. O problema é que o mundo moderno oferece "dopamina barata" (açúcar, redes sociais, pornografia, jogos). Isso vicia o cérebro e ele para de se esforçar por recompensas reais (aprender, trabalhar, exercitar).</p>
                            <p>A procrastinação muitas vezes é uma falha na regulação da dopamina. Buscamos alívio imediato em vez de recompensa tardia.</p>
                        `
                    },
                    {
                        title: "Ocitocina e Conexão",
                        text: `
                            <p>A Ocitocina é o antídoto do Cortisol (hormônio do estresse). Ela é liberada no toque físico, no abraço, no contato visual e na confiança. Pessoas com níveis saudáveis de ocitocina recuperam-se mais rápido de traumas e estresse.</p>
                        `
                    }
                ],
                missions: [
                    {
                        id: "miss_03_01",
                        title: "Jejum de Dopamina",
                        desc: "Fique 1 hora longe de telas (celular/PC) e açúcar. Apenas tédio ou leitura física.",
                        xp: 500,
                        completed: false
                    },
                    {
                        id: "miss_03_02",
                        title: "Boost de Ocitocina",
                        desc: "Dê um abraço de pelo menos 20 segundos em alguém importante para você hoje.",
                        xp: 350,
                        completed: false
                    }
                ]
            }
        },
        {
            id: "mod_04",
            title: "Módulo 4: Empatia Radical",
            subtitle: "Neurônios-Espelho e Inteligência Social",
            icon: "fa-hands-holding-circle",
            locked: true,
            content: {
                summary: "Você não é uma ilha. Como seu cérebro se conecta fisicamente ao cérebro dos outros.",
                chapters: [
                    {
                        title: "Neurônios-Espelho",
                        text: `
                            <p>Quando você vê alguém chorar, uma parte do seu cérebro simula o choro. São os <strong>Neurônios-Espelho</strong>. Eles são a base biológica da empatia.</p>
                            <p>Pessoas com alta inteligência emocional usam isso conscientemente. Elas praticam a <strong>Escuta Ativa</strong>. Elas não ouvem para responder, ouvem para entender.</p>
                        `
                    },
                    {
                        title: "Contágio Emocional",
                        text: `
                            <p>Emoções são contagiosas como vírus. Se um líder entra na sala irritado, a equipe toda sente (o cortisol sobe em todos). Você é responsável pela energia que traz para uma sala.</p>
                            <p>A técnica do <strong>Espelhamento</strong> (repetir sutilmente a postura ou palavras do outro) cria uma ponte subconsciente de confiança (Rapport).</p>
                        `
                    }
                ],
                missions: [
                    {
                        id: "miss_04_01",
                        title: "Escuta Sherlock",
                        desc: "Em uma conversa, tente descobrir qual a emoção oculta por trás das palavras da pessoa. Pergunte sobre isso.",
                        xp: 400,
                        completed: false
                    },
                    {
                        id: "miss_04_02",
                        title: "Feedback Sanduíche",
                        desc: "Dê um feedback difícil usando a estrutura: Elogio sincero + Ponto a melhorar + Encorajamento.",
                        xp: 450,
                        completed: false
                    }
                ]
            }
        }
    ],

    // --- SISTEMA DE DIÁRIO (LÓGICA DO BACKEND SIMULADA) ---
    journalLogic: {
        emotions: [
            { name: "Raiva", color: "#ef4444", advice: "A raiva geralmente surge de uma regra quebrada ou limite invadido. Pergunte-se: O que eu esperava que não aconteceu?" },
            { name: "Ansiedade", color: "#f59e0b", advice: "A ansiedade é excesso de futuro. Seu cérebro está tentando prever ameaças. Traga a atenção para a respiração agora." },
            { name: "Tristeza", color: "#3b82f6", advice: "A tristeza sinaliza perda e necessidade de recolhimento. Respeite seu tempo, mas evite a ruminação excessiva." },
            { name: "Alegria", color: "#10b981", advice: "Aproveite para criar âncoras mentais. Lembre-se de como seu corpo se sente agora para acessar depois." },
            { name: "Nojo", color: "#8b5cf6", advice: "O nojo nos afasta do que é tóxico (fisicamente ou moralmente). O que você precisa rejeitar na sua vida hoje?" },
            { name: "Medo", color: "#6366f1", advice: "O medo prepara para ação. Se não há perigo de vida iminente, é apenas um alarme falso da amígdala." }
        ]
    }
};

// Inicializador do Banco de Dados Local
function initDB() {
    if (!localStorage.getItem('neuroflow_user')) {
        const initialState = {
            name: "Visitante",
            level: 1,
            xp: 0,
            streak: 0,
            lastLogin: null,
            completedMissions: [], // Array de IDs
            journalHistory: [],
            unlockedModules: ["mod_01"]
        };
        localStorage.setItem('neuroflow_user', JSON.stringify(initialState));
    }
    
    // Atualizar dados estáticos se necessário (conteúdo das aulas)
    // Em um app real, isso viria do servidor, aqui usamos a const neuroData diretamente
}

// Funções de Acesso aos Dados (Simulando API)
const API = {
    getUser: () => JSON.parse(localStorage.getItem('neuroflow_user')),
    
    saveUser: (user) => localStorage.setItem('neuroflow_user', JSON.stringify(user)),
    
    addXP: (amount) => {
        const user = API.getUser();
        user.xp += amount;
        
        // Lógica de Level Up
        const nextLevel = neuroData.config.levels.find(l => l.level === user.level + 1);
        if (nextLevel && user.xp >= nextLevel.minXp) {
            user.level++;
            alert(`🎉 PARABÉNS! Seu córtex evoluiu para: ${nextLevel.title}`);
            // Desbloquear próximo módulo
            const nextModIndex = user.level - 1; // Nível 2 desbloqueia index 1 (mod_02)
            if (neuroData.modules[nextModIndex]) {
                user.unlockedModules.push(neuroData.modules[nextModIndex].id);
            }
        }
        
        API.saveUser(user);
        return user;
    },

    completeMission: (missionId) => {
        const user = API.getUser();
        if (!user.completedMissions.includes(missionId)) {
            user.completedMissions.push(missionId);
            
            // Encontrar XP da missão
            let xpReward = 0;
            neuroData.modules.forEach(m => {
                const mission = m.content.missions.find(miss => miss.id === missionId);
                if (mission) xpReward = mission.xp;
            });
            
            API.saveUser(user);
            API.addXP(xpReward);
            return true;
        }
        return false;
    },

    saveJournal: (entry) => {
        const user = API.getUser();
        user.journalHistory.unshift(entry); // Adiciona no início
        API.saveUser(user);
        API.addXP(neuroData.config.xpRewards.journalEntry);
    },

    getModules: () => {
        const user = API.getUser();
        return neuroData.modules.map(mod => ({
            ...mod,
            locked: !user.unlockedModules.includes(mod.id),
            completed: mod.content.missions.every(m => user.completedMissions.includes(m.id))
        }));
    }
};

// Auto-execução para garantir que o DB exista ao carregar
initDB();
