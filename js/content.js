// js/content.js

export const protocolData = {
    weeks: [
        {
            id: 1,
            title: "Semana 1: A Arquitetura Neural",
            theme: "Consciência e Hardware",
            color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", // Gradiente Elegante
            days: [
                {
                    day: 1,
                    title: "O Observador",
                    source: "Neurociência Básica",
                    reading: `
                        <h3>Bem-vindo ao Lab</h3>
                        <p>A neuroplasticidade não acontece por acaso; ela acontece por <strong>atenção dirigida</strong>. Para mudar seu cérebro, você precisa primeiro observar como ele funciona sem julgamentos.</p>
                        <p>Hoje, seu objetivo não é mudar nada drasticamente, mas instalar o "software de monitoramento". Você vai observar seus impulsos como um cientista observa um rato de laboratório.</p>
                    `,
                    challenges: [
                        {
                            id: "w1d1_1",
                            time: "Manhã",
                            title: "Sem Celular ao Acordar",
                            description: "Não toque no celular nos primeiros 20 minutos. Permita que seu cérebro acorde quimicamente sem dopamina digital.",
                            xp: 50
                        },
                        {
                            id: "w1d1_2",
                            time: "Tarde",
                            title: "Auditoria de Energia",
                            description: "Identifique 3 momentos onde você sentiu uma queda brusca de energia mental. Anote o que causou isso (comida? tédio? estresse?).",
                            xp: 50
                        },
                        {
                            id: "w1d1_3",
                            time: "Noite",
                            title: "Visualização do Amanhã",
                            description: "Antes de dormir, visualize por 2 minutos como será sua manhã ideal amanhã. Isso pré-ativa o córtex motor.",
                            xp: 50
                        }
                    ]
                },
                {
                    day: 2,
                    title: "O Sequestro da Amígdala",
                    source: "Daniel Goleman",
                    reading: `
                        <h3>Anatomia da Raiva</h3>
                        <p>A amígdala é seu alarme de incêndio. Ela é rápida, mas imprecisa. Quando você reage com raiva instantânea, você sofreu um <strong>sequestro neural</strong>. O sangue sai do córtex (razão) e vai para os membros (luta).</p>
                    `,
                    challenges: [
                        {
                            id: "w1d2_1",
                            time: "Manhã",
                            title: "Respiração Fisiológica",
                            description: "Faça 10 respirações profundas (inspire pelo nariz, solte pela boca) antes de começar o trabalho.",
                            xp: 40
                        },
                        {
                            id: "w1d2_2",
                            time: "Dia Todo",
                            title: "O Gap de 6 Segundos",
                            description: "Ao sentir irritação, conte até 6 antes de responder. É o tempo que os químicos do sequestro levam para dissipar.",
                            xp: 100
                        },
                        {
                            id: "w1d2_3",
                            time: "Noite",
                            title: "Diário de Gatilhos",
                            description: "Escreva uma situação que quase te tirou do sério hoje. O que disparou o alarme?",
                            xp: 60
                        }
                    ]
                },
                // ... Adicione mais dias seguindo esta estrutura de múltiplos desafios ...
            ]
        },
        // ... Adicione as outras semanas aqui ...
    ]
};

export function getContentByDay(globalDay) {
    let currentDayCount = 0;
    for (const week of protocolData.weeks) {
        for (const dayData of week.days) {
            currentDayCount++;
            if (currentDayCount === globalDay) {
                return { week: week, data: dayData };
            }
        }
    }
    return null;
}
