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
                        description: "Identifique 3 momentos hoje onde seu cérebro escolheu o caminho mais fácil (ex: não arrumar a cama, comer fast-food, adiar uma tarefa). Anote-os.",
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
                    title: "A Química da Paixão",
                    source: "Oliveira & Santos - Cap 5",
                    reading: `
                        <h3>Demência Temporária?</h3>
                        <p>A paixão não é apenas um sentimento poético; é um estado neuroquímico alterado. Envolve uma tempestade de <strong>Dopamina</strong> (motivação/vício) e uma queda de <strong>Serotonina</strong> (obsessão).</p>
                        <p>Durante a paixão, o córtex pré-frontal (julgamento crítico) é temporariamente inibido. É por isso que 'o amor é cego'. Biologicamente, você está drogado para garantir a reprodução da espécie.</p>
                        <div class="highlight-box">
                            <i class="fa-solid fa-vial"></i>
                            <strong>Neuroquímica:</strong> A paixão tem prazo de validade biológico (18 a 30 meses). O amor maduro requer a transição para Ocitocina e Vasopressina (apego).
                        </div>
                    `,
                    challenge: {
                        id: "chal_d3",
                        title: "Análise Racional de Vínculos",
                        description: "Escreva o nome de 3 pessoas próximas. Liste uma qualidade e um defeito de cada uma. Se você não consegue ver defeitos, seu pré-frontal pode estar inibido.",
                        xp: 150
                    }
                },
                {
                    day: 4,
                    title: "Neuroplasticidade e Hábito",
                    source: "Oliveira & Santos - Cap 3",
                    reading: `
                        <h3>O Cérebro se Adapta</h3>
                        <p>Toda vez que você repete um comportamento, você fortalece uma sinapse. Se você mente, seu cérebro se torna melhor em mentir. Se você procrastina, você treina seu cérebro para ser um especialista em adiar.</p>
                        <p>A neuroplasticidade é neutra. Ela reforça o que você faz, não o que você quer fazer. Pequenos deslizes éticos ou de disciplina dessensibilizam a amígdala, tornando o comportamento errado cada vez mais fácil e sem culpa.</p>
                    `,
                    challenge: {
                        id: "chal_d4",
                        title: "Quebra de Padrão Sináptico",
                        description: "Escolha um pequeno hábito automático (ex: olhar o celular ao acordar, sentar no mesmo lugar) e conscientemente mude-o hoje. Sinta o atrito.",
                        xp: 200
                    }
                }
            ]
        },
        {
            id: 2,
            title: "A Desintoxicação Límbica",
            description: "Recalibrando o sistema de recompensa e controlando impulsos.",
            color: "var(--secondary-purple)",
            days: [
                {
                    day: 5,
                    title: "O Teste do Marshmallow Adulto",
                    source: "Goleman - Cap 6",
                    reading: `
                        <h3>Controle de Impulso</h3>
                        <p>A capacidade de adiar a gratificação é o maior preditor de sucesso na vida, mais que o QI. É a batalha entre o 'Quero Agora' (Límbico) e o 'Melhor Esperar' (Pré-frontal).</p>
                        <p>No mundo moderno, o 'marshmallow' é a notificação do Instagram, o açúcar, a compra por impulso. Sua capacidade de dizer não ao prazer imediato fortalece diretamente seu córtex pré-frontal.</p>
                    `,
                    challenge: {
                        id: "chal_d5",
                        title: "Resistência Ativa",
                        description: "Quando sentir vontade de comer um doce ou checar redes sociais fora de hora, espere 10 minutos. Use o cronômetro. Se a vontade passar, você venceu.",
                        xp: 300
                    }
                },
                {
                    day: 6,
                    title: "A Habênula e a Frustração",
                    source: "Oliveira & Santos - Cap 6",
                    reading: `
                        <h3>O Anti-Prazer</h3>
                        <p>Quando suas expectativas não são atendidas, uma pequena estrutura chamada <strong>Habênula Lateral</strong> é ativada. Ela inibe a dopamina. É a sensação química de decepção.</p>
                        <p>Pessoas que não sabem lidar com a frustração têm uma habênula hiperativa. O segredo não é evitar a frustração, mas reinterpretar o erro não como falha, mas como dados para aprendizado.</p>
                    `,
                    challenge: {
                        id: "chal_d6",
                        title: "Ressignificação do Erro",
                        description: "Lembre de algo que deu errado recentemente. Em vez de se culpar, escreva: 'O que eu aprendi com isso para não repetir?'.",
                        xp: 250
                    }
                },
                {
                    day: 7,
                    title: "O Cérebro dos Procrastinadores",
                    source: "Oliveira & Santos - Cap 13",
                    reading: `
                        <h3>A Luta Interna</h3>
                        <p>A procrastinação não é preguiça, é uma falha na regulação emocional. É o Sistema Límbico querendo evitar a 'dor' (tédio/ansiedade) de uma tarefa difícil agora.</p>
                        <p>Procrastinadores crônicos tendem a ter uma amígdala maior (mais medo/ansiedade). A cura é reduzir o tamanho da tarefa até que ela não assuste mais sua amígdala.</p>
                    `,
                    challenge: {
                        id: "chal_d7",
                        title: "Regra dos 5 Minutos",
                        description: "Pegue aquela tarefa que você está adiando. Comprometa-se a fazê-la por apenas 5 minutos. Geralmente, começar é a parte difícil.",
                        xp: 350
                    }
                }
            ]
        },
        {
            id: 3,
            title: "A Conexão Social",
            description: "Inteligência social, empatia e a gestão do ego.",
            color: "#2ecc71",
            days: [
                {
                    day: 8,
                    title: "O Cérebro Empático",
                    source: "Oliveira & Santos - Cap 10",
                    reading: `
                        <h3>Neurônios Espelho</h3>
                        <p>Seu cérebro possui células especializadas em simular o que o outro sente. Quando você vê alguém chorar, áreas de dor no seu cérebro acendem. Isso é biológico.</p>
                        <p>A falta de empatia não é apenas maldade, é muitas vezes uma atrofia dessas vias neurais por falta de uso. O narcisismo nos isola em nossa própria cabeça.</p>
                    `,
                    challenge: {
                        id: "chal_d8",
                        title: "Escuta Ativa",
                        description: "Em uma conversa hoje, tente não formular sua resposta enquanto o outro fala. Apenas ouça. Tente sentir o que a pessoa sente.",
                        xp: 400
                    }
                },
                {
                    day: 9,
                    title: "A Inveja e a Dor Física",
                    source: "Oliveira & Santos - Cap 7",
                    reading: `
                        <h3>A Dor da Comparação</h3>
                        <p>Estudos de ressonância magnética mostram que a inveja ativa o <strong>Córtex Cingulado Anterior</strong>, a mesma área que processa a dor física. Sentir inveja dói, literalmente.</p>
                        <p>Pior: quando a pessoa invejada falha, o cérebro do invejoso ativa o estriado ventral (prazer). É o 'Schadenfreude'. Combater isso exige esforço consciente de admiração.</p>
                    `,
                    challenge: {
                        id: "chal_d9",
                        title: "Transmutação da Inveja",
                        description: "Identifique alguém que você inveja. Em vez de ressentir, mande uma mensagem genuína parabenizando essa pessoa por uma conquista.",
                        xp: 500
                    }
                }
            ]
        },
        {
            id: 4,
            title: "Neuro-Otimização",
            description: "Flow, espiritualidade e alto desempenho.",
            color: "#f1c40f",
            days: [
                {
                    day: 10,
                    title: "O Estado de Flow",
                    source: "Daniel Goleman - Cap 6",
                    reading: `
                        <h3>A Neurobiologia da Excelência</h3>
                        <p>O Flow é o estado onde a habilidade encontra o desafio. O cérebro se cala (hipofrontalidade transitória), o tempo distorce e o desempenho dispara.</p>
                        <p>Para entrar em Flow, você precisa de: 1. Metas claras. 2. Feedback imediato. 3. Foco total (sem interrupções).</p>
                    `,
                    challenge: {
                        id: "chal_d10",
                        title: "Bloco de Trabalho Profundo",
                        description: "Elimine todas as notificações. Trabalhe em uma única tarefa importante por 90 minutos ininterruptos.",
                        xp: 600
                    }
                },
                {
                    day: 11,
                    title: "O Cérebro Espiritual",
                    source: "Oliveira & Santos - Cap 8",
                    reading: `
                        <h3>Além do Eu</h3>
                        <p>A neuroteologia mostra que práticas espirituais ou meditativas profundas diminuem a atividade no <strong>Lobo Parietal</strong>, a área responsável pela noção de espaço e distinção entre 'eu' e o 'mundo'.</p>
                        <p>Isso explica a sensação de 'unidade com o todo'. Não é alucinação, é uma mudança funcional na percepção da realidade.</p>
                    `,
                    challenge: {
                        id: "chal_d11",
                        title: "Silêncio Neural",
                        description: "Pratique 10 minutos de meditação focada na respiração. Tente 'desligar' o lobo parietal focando apenas no ar entrando e saindo.",
                        xp: 700
                    }
                },
                {
                    day: 12,
                    title: "Protocolo Final: O Novo Eu",
                    source: "Síntese do Protocolo",
                    reading: `
                        <h3>Você é o Arquiteto</h3>
                        <p>Você completou o ciclo básico. Mas a neuroplasticidade é vitalícia. Se você parar agora, as sinapses que criou vão enfraquecer (poda neural).</p>
                        <p>O segredo não é a intensidade, é a constância. Mantenha a vigilância sobre sua Amígdala e fortaleça seu Pré-frontal diariamente.</p>
                    `,
                    challenge: {
                        id: "chal_d12",
                        title: "O Contrato de Continuidade",
                        description: "Escreva uma carta para você mesmo daqui a 6 meses. O que você promete manter? O que você promete não tolerar mais?",
                        xp: 1000
                    }
                }
            ]
        }
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
