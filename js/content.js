// js/content.js

export const protocolData = {
    phases: [
        {
            id: 1,
            title: "O Despertar Neuroanatômico",
            description: "Compreendendo o hardware biológico e saindo do piloto automático.",
            color: "var(--primary-cyan)",
            days: [
                {
                    day: 1,
                    title: "Prazer, sou o Cérebro",
                    source: "Oliveira & Santos - Cap 1",
                    reading: `
                        <h3>O Maestro da Orquestra</h3>
                        <p>Você não é seus pensamentos. Você é a consciência que observa a atividade de 86 bilhões de neurônios. O cérebro consome 20% de toda sua energia diária, embora represente apenas 2% do seu peso. Ele é uma máquina de sobrevivência, não de felicidade.</p>
                        
                        <h3>O Córtex e a Besta</h3>
                        <p>A diferença entre você e outros mamíferos é o <strong>Córtex Pré-Frontal</strong>. Enquanto o sistema límbico (a besta) grita por impulsos, medo e prazer imediato, o córtex (o piloto) planeja, pondera e freia. O problema? A besta é mais rápida.</p>
                        
                        <div class="highlight-box">
                            <i class="fa-solid fa-lightbulb"></i>
                            <strong>Conceito Chave:</strong> "O animal satisfeito dorme" (Guimarães Rosa). Seu cérebro quer economizar energia. Sair da zona de conforto é, biologicamente, um ato de rebeldia contra sua própria economia de energia.
                        </div>
                    `,
                    challenge: {
                        id: "chal_d1",
                        title: "Mapeamento da Zona de Conforto",
                        description: "Identifique 3 momentos hoje onde seu cérebro escolheu o caminho mais fácil (ex: não arrumar a cama, comer fast-food, adiar uma tarefa). Anote-os mentalmente ou em um papel.",
                        xp: 100
                    }
                },
                {
                    day: 2,
                    title: "O Sequestro da Amígdala",
                    source: "Daniel Goleman - Cap 2",
                    reading: `
                        <h3>Anatomia de um Sequestro</h3>
                        <p>A amígdala cortical é o alarme de incêndio do cérebro. Ela escaneia tudo em busca de perigo. O problema é que ela é imprecisa. Ela confunde um e-mail ríspido do chefe com um tigre dentes-de-sabre.</p>
                        
                        <h3>A Via Expressa vs. A Via Lenta</h3>
                        <p>A informação chega à amígdala milissegundos antes de chegar ao córtex racional. Quando você explode de raiva e se arrepende depois, foi um <strong>Sequestro Neural</strong>. Sua amígdala agiu antes que seu córtex pudesse dizer "isso não é uma boa ideia".</p>
                        
                        <div class="highlight-box">
                            <i class="fa-solid fa-triangle-exclamation"></i>
                            <strong>Fato:</strong> Um sequestro emocional inunda seu corpo de hormônios que podem levar até 20 minutos para se dissipar.
                        </div>
                    `,
                    challenge: {
                        id: "chal_d2",
                        title: "O Observador do Sequestro",
                        description: "Hoje, quando sentir uma emoção forte (raiva ou medo), não reaja imediatamente. Conte até 10. Sinta o pulso acelerar. Nomeie a emoção: 'Isto é a minha amígdala disparando'.",
                        xp: 150
                    }
                },
                {
                    day: 3,
                    title: "Neuroplasticidade e Vício",
                    source: "Oliveira & Santos - Cap 3",
                    reading: `
                        <h3>O Cérebro se Adapta à Desonestidade</h3>
                        <p>Toda vez que você repete um comportamento, você fortalece uma sinapse. Se você mente, seu cérebro se torna melhor em mentir. Se você procrastina, você treina seu cérebro para ser um especialista em adiar.</p>
                        
                        <p>A neuroplasticidade é neutra. Ela reforça o que você faz, não o que você quer fazer. Pequenos deslizes éticos ou de disciplina dessensibilizam a amígdala, tornando o comportamento errado cada vez mais fácil e sem culpa.</p>
                    `,
                    challenge: {
                        id: "chal_d3",
                        title: "Quebra de Padrão Sináptico",
                        description: "Escolha um pequeno hábito automático (ex: olhar o celular ao acordar) e conscientemente NÃO o faça hoje. Sinta o desconforto. Isso é seu cérebro reclamando a falta da dopamina habitual.",
                        xp: 200
                    }
                }
                // ... Dias 4 a 7 seriam adicionados aqui seguindo a mesma estrutura ...
            ]
        },
        {
            id: 2,
            title: "A Desintoxicação Límbica",
            description: "Recalibrando o sistema de recompensa e controlando impulsos.",
            color: "var(--secondary-purple)",
            days: [
                {
                    day: 8,
                    title: "O Teste do Marshmallow Adulto",
                    source: "Goleman - Cap 6",
                    reading: `
                        <h3>Controle de Impulso</h3>
                        <p>A capacidade de adiar a gratificação é o maior preditor de sucesso na vida, mais que o QI. É a batalha entre o 'Quero Agora' (Límbico) e o 'Melhor Esperar' (Pré-frontal).</p>
                        <p>No mundo moderno, o 'marshmallow' é a notificação do Instagram, o açúcar, a compra por impulso.</p>
                    `,
                    challenge: {
                        id: "chal_d8",
                        title: "O Jejum de Dopamina",
                        description: "Passe 1 hora hoje sem telas, sem música, sem comida. Apenas tédio ou trabalho focado. Recalibre seu limiar de tédio.",
                        xp: 300
                    }
                }
                // ... Mais dias da Fase 2 ...
            ]
        }
        // ... Fases 3 e 4 ...
    ]
};

// Função auxiliar para buscar conteúdo por dia global
export function getContentByDay(globalDay) {
    let currentDayCount = 0;
    
    for (const phase of protocolData.phases) {
        for (const dayData of phase.days) {
            currentDayCount++;
            if (currentDayCount === globalDay) {
                return {
                    phase: phase,
                    data: dayData
                };
            }
        }
    }
    return null; // Dia não encontrado ou protocolo acabou
}
