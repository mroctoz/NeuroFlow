const neuroData = {
    config: {
        levels: [
            { level: 1, title: "Iniciante Límbico", min: 0, max: 500 },
            { level: 2, title: "Explorador Sináptico", min: 501, max: 1200 },
            { level: 3, title: "Arquiteto Neural", min: 1201, max: 2500 },
            { level: 4, title: "Mestre Pré-Frontal", min: 2501, max: 5000 },
            { level: 5, title: "Sábio da Neuroplasticidade", min: 5001, max: 10000 }
        ],
        rewards: { 
            login: 50, 
            mission: 300, 
            journal: 100, 
            sos: 150 
        }
    },
    modules: [
        {
            id: "mod_01",
            title: "Módulo 1: Anatomia do Eu",
            subtitle: "Entendendo o Hardware Biológico",
            icon: "fa-fingerprint",
            summary: "O conflito eterno entre seu Córtex (razão) e o Sistema Límbico (emoção).",
            chapters: [
                {
                    title: "O Maestro e a Orquestra",
                    text: "<p>Imagine seu cérebro como uma orquestra. O <strong>Córtex Pré-Frontal</strong> (atrás da testa) é o Maestro: responsável pelo planejamento e razão. O <strong>Sistema Límbico</strong> (profundo) é a percussão: emoção, instinto e impulsos. A vida desanda quando a percussão toca tão alto que o maestro não consegue ser ouvido.</p>"
                },
                {
                    title: "Neurônios e Hábitos",
                    text: "<p>Temos 86 bilhões de neurônios. Aprender é criar caminhos (sinapses) entre eles. Hábitos ruins são estradas asfaltadas; hábitos novos são trilhas na mata fechada. Este app ajuda você a abrir novas trilhas através da repetição.</p>"
                }
            ],
            missions: [
                { id: "m1_1", title: "Mapeamento", desc: "Identifique onde você sente a raiva no corpo hoje.", xp: 300 },
                { id: "m1_2", title: "O Maestro", desc: "Anote uma vez que você segurou um impulso.", xp: 300 }
            ]
        },
        {
            id: "mod_02",
            title: "Módulo 2: Sequestro da Amígdala",
            subtitle: "Dominando a Resposta de Luta ou Fuga",
            icon: "fa-triangle-exclamation",
            summary: "Por que perdemos a cabeça e a técnica do Sinal de Trânsito para recuperar o controle.",
            chapters: [
                {
                    title: "O Alarme de Incêndio",
                    text: "<p>Daniel Goleman chama de <strong>Sequestro da Amígdala</strong> quando a emoção anula a razão. A amígdala é nosso radar de perigo. Quando ela dispara, o sangue sai do córtex (razão) e vai para os músculos. Você fica literalmente menos inteligente temporariamente.</p>"
                },
                {
                    title: "Técnica do Sinal",
                    text: "<p>A química da raiva dura cerca de 90 segundos. Se você não alimentar com pensamentos, ela passa. Use o método do Sinal: <strong>Vermelho</strong> (Pare/Respire), <strong>Amarelo</strong> (Pense/Analise), <strong>Verde</strong> (Aja/Responda).</p>"
                }
            ],
            missions: [
                { id: "m2_1", title: "Pausa Tática", desc: "Use o botão SOS deste app em um momento de tensão.", xp: 400 },
                { id: "m2_2", title: "Reenquadramento", desc: "Mude a interpretação de um fato negativo hoje.", xp: 300 }
            ]
        },
        {
            id: "mod_03",
            title: "Módulo 3: Química do Bem-Estar",
            subtitle: "Hackeando seus Neurotransmissores",
            icon: "fa-flask",
            summary: "Como modular Dopamina, Serotonina e Ocitocina através do comportamento.",
            chapters: [
                {
                    title: "O Sistema de Recompensa",
                    text: "<p>O <strong>Núcleo Accumbens</strong> ama Dopamina. O mundo moderno oferece 'dopamina barata' (açúcar, redes sociais). Isso vicia o cérebro. Precisamos re-treinar o cérebro para gostar de 'dopamina lenta' (conquistas reais).</p>"
                },
                {
                    title: "Ocitocina e Conexão",
                    text: "<p>A Ocitocina é o antídoto do Cortisol (estresse). Ela é liberada no toque físico e na confiança. Pessoas com níveis saudáveis de ocitocina recuperam-se mais rápido de traumas.</p>"
                }
            ],
            missions: [
                { id: "m3_1", title: "Jejum de Dopamina", desc: "Fique 1h sem telas ou açúcar hoje.", xp: 500 },
                { id: "m3_2", title: "Abraço Real", desc: "Dê um abraço de 20 segundos em alguém.", xp: 350 }
            ]
        },
        {
            id: "mod_04",
            title: "Módulo 4: Empatia Radical",
            subtitle: "Neurônios-Espelho e Socialização",
            icon: "fa-hands-holding-circle",
            summary: "Você não é uma ilha. Como seu cérebro se conecta fisicamente ao cérebro dos outros.",
            chapters: [
                {
                    title: "Neurônios-Espelho",
                    text: "<p>Quando você vê alguém chorar, seu cérebro simula o choro. São os <strong>Neurônios-Espelho</strong>. Pratique a Escuta Ativa: não ouça para responder, ouça para entender.</p>"
                }
            ],
            missions: [
                { id: "m4_1", title: "Escuta Sherlock", desc: "Descubra a emoção oculta na fala de alguém.", xp: 400 }
            ]
        }
    ],
    journalEmotions: [
        { name: "Raiva", color: "#ef4444", msg: "A raiva sinaliza limites invadidos. O que foi violado?" },
        { name: "Medo", color: "#6366f1", msg: "O medo prepara para ação. A ameaça é real ou imaginária?" },
        { name: "Tristeza", color: "#3b82f6", msg: "A tristeza pede recolhimento e processamento de perda." },
        { name: "Alegria", color: "#10b981", msg: "Guarde essa sensação. Crie uma âncora mental." },
        { name: "Ansiedade", color: "#f59e0b", msg: "Excesso de futuro. Volte para a respiração agora." },
        { name: "Nojo", color: "#a855f7", msg: "Algo tóxico (físico ou moral) está perto. Afaste-se." }
    ]
};
