// js/content.js

export const protocolData = {
    weeks: [
        {
            id: 1,
            title: "Semana 1: A Arquitetura Neural",
            theme: "Reconhecimento de Hardware",
            color: "#00fff2", // Cyan
            days: [
                {
                    day: 1,
                    title: "O Maestro da Orquestra",
                    source: "Oliveira & Santos - Cap 1",
                    reading: `
                        <h3>Você não é sua mente</h3>
                        <p>Imagine seu corpo como uma orquestra. O coração, os pulmões, os músculos são os músicos. Mas quem rege? O cérebro. Ele consome 500kcal/dia (25% de tudo que você come), embora pese apenas 2% do corpo.</p>
                        <p>O problema é que, muitas vezes, a orquestra toca sozinha. As estruturas subcorticais (como a respiração e os batimentos) funcionam no automático. O desafio da neurociência aplicada é trazer o inconsciente para o consciente.</p>
                        <h3>Córtex vs. Subcórtex</h3>
                        <p>A "consciência" reside na casca do cérebro: o Córtex. Tudo abaixo dele é instinto, regulação e emoção bruta. Sua missão esta semana é identificar quando você está agindo pelo Córtex (Razão) e quando está agindo pelo Subcórtex (Instinto).</p>
                    `,
                    challenge: {
                        id: "chal_w1_d1",
                        title: "Auditoria de Energia",
                        description: "O cérebro gasta muita energia. Identifique 3 momentos do dia onde você sentiu 'preguiça mental' de tomar uma decisão difícil. Anote-os.",
                        xp: 100
                    }
                },
                {
                    day: 2,
                    title: "Sinapses: O Caminho da Água",
                    source: "Oliveira & Santos - Cap 2",
                    reading: `
                        <h3>86 Bilhões de Caminhos</h3>
                        <p>Você é um conjunto de sinapses. Cada pensamento, cada memória, cada vício é apenas uma conexão elétrica e química entre neurônios reforçada pelo tempo.</p>
                        <p>Imagine a água descendo uma montanha. Ela sempre procura o caminho mais fácil (o sulco já cavado). Seu cérebro faz o mesmo. Mudar um hábito é como tentar desviar o curso de um rio usando uma colher: exige esforço constante e repetitivo até que um novo sulco se forme.</p>
                    `,
                    challenge: {
                        id: "chal_w1_d2",
                        title: "A Mão Não-Dominante",
                        description: "Durante as refeições de hoje, use a mão não-dominante (esquerda se for destro) para segurar o talher. Sinta o desconforto. Isso é seu cérebro sendo forçado a criar novas sinapses.",
                        xp: 150
                    }
                },
                {
                    day: 3,
                    title: "A Zona de Conforto Biológica",
                    source: "Oliveira & Santos - Cap 3",
                    reading: `
                        <h3>O Animal Satisfeito Dorme</h3>
                        <p>O cérebro odeia mudanças radicais. Ele evoluiu para poupar energia (glicose e oxigênio). Quando você tenta mudar tudo de uma vez (dieta, treino, estudo), o cérebro entra em choque e te boicota.</p>
                        <p>A 'Zona de Conforto' não é preguiça moral, é eficiência biológica. Para sair dela, você não pode assustar seu sistema límbico. Você precisa de micro-passos.</p>
                    `,
                    challenge: {
                        id: "chal_w1_d3",
                        title: "Micro-Desconforto",
                        description: "Tome um banho na temperatura normal. Nos últimos 30 segundos, coloque no gelado. Observe sua mente implorando para sair. Fique.",
                        xp: 200
                    }
                },
                {
                    day: 4,
                    title: "O Sequestro Emocional",
                    source: "Daniel Goleman - Cap 2",
                    reading: `
                        <h3>Quando a Amígdala Vence</h3>
                        <p>A Amígdala (no sistema límbico) é o sentinela. Ela vê o perigo antes do Córtex Visual entender o que é. É o caminho 'rápido e sujo'.</p>
                        <p>Quando você explode de raiva, sua Amígdala sequestrou seu Córtex Pré-Frontal. Você literalmente fica 'estúpido' temporariamente porque o acesso à lógica foi cortado em favor da reação de luta ou fuga.</p>
                    `,
                    challenge: {
                        id: "chal_w1_d4",
                        title: "O Gap de 6 Segundos",
                        description: "Hoje, ao sentir qualquer irritação, espere 6 segundos antes de responder. É o tempo químico para o sinal sair da Amígdala e chegar ao Córtex.",
                        xp: 200
                    }
                },
                {
                    day: 5,
                    title: "O Lobo Frontal: O CEO",
                    source: "Oliveira & Santos - Cap 4",
                    reading: `
                        <h3>A Sede da Civilidade</h3>
                        <p>O Lobo Frontal é o freio. É ele que planeja o futuro, pondera consequências e inibe impulsos sociais inaceitáveis. Ele só termina de amadurecer aos 21-24 anos.</p>
                        <p>Toda vez que você diz 'não' a um impulso, você está exercitando esse músculo. Pessoas com lesão aqui tornam-se impulsivas, agressivas ou apáticas.</p>
                    `,
                    challenge: {
                        id: "chal_w1_d5",
                        title: "Planejamento Reverso",
                        description: "Defina uma meta para o fim de semana. Agora escreva, de trás para frente, os 3 passos necessários para chegar lá. Isso ativa o planejamento frontal.",
                        xp: 250
                    }
                },
                {
                    day: 6,
                    title: "Autoconsciência: O Holofote",
                    source: "Goleman - Cap 4",
                    reading: `
                        <h3>Conhece-te a ti mesmo</h3>
                        <p>A maioria das pessoas vive no piloto automático. A autoconsciência é a habilidade de monitorar seus sentimentos *enquanto* eles acontecem, não depois.</p>
                        <p>Não é 'estou com raiva', é 'percebo que estou sentindo raiva'. Essa pequena separação entre o 'Eu' e a 'Emoção' é a chave do controle.</p>
                    `,
                    challenge: {
                        id: "chal_w1_d6",
                        title: "Check-in Emocional",
                        description: "Coloque 3 alarmes no celular. Quando tocarem, pare e nomeie exatamente o que está sentindo e onde sente no corpo (ex: ansiedade, aperto no peito).",
                        xp: 250
                    }
                },
                {
                    day: 7,
                    title: "Revisão da Semana 1",
                    source: "Protocolo NeuroFlow",
                    reading: `
                        <h3>Consolidação</h3>
                        <p>Você aprendeu sobre Neurônios, Córtex, Amígdala e Zonas de Conforto. Você não é seu cérebro; você é o gerente dele.</p>
                        <p>Prepare-se. Na próxima semana, entraremos na química dos vícios, da dopamina e da procrastinação.</p>
                    `,
                    challenge: {
                        id: "chal_w1_d7",
                        title: "O Contrato de Compromisso",
                        description: "Escreva em um papel: 'Eu estou no comando da minha biologia'. Deixe em um lugar visível para a próxima semana.",
                        xp: 500
                    }
                }
            ]
        },
        {
            id: 2,
            title: "Semana 2: Química e Controle",
            theme: "Detox Límbico",
            color: "#bc13fe", // Roxo
            days: [
                {
                    day: 8,
                    title: "Dopamina: O Motor do Desejo",
                    source: "Oliveira & Santos - Cap 5",
                    reading: `
                        <h3>O Sistema de Recompensa</h3>
                        <p>A Área Tegmentar Ventral (ATV) e o Núcleo Accumbens formam o circuito do prazer. A dopamina não é sobre 'gostar', é sobre 'querer'. É a antecipação.</p>
                        <p>Redes sociais, açúcar e jogos sequestram esse sistema, criando loops de feedback que viciam o cérebro em novidade barata.</p>
                    `,
                    challenge: {
                        id: "chal_w2_d8",
                        title: "Jejum de Telas",
                        description: "Sem redes sociais por 24 horas. Se não puder, limite a 15 minutos. Observe a abstinência física.",
                        xp: 300
                    }
                },
                {
                    day: 9,
                    title: "A Biologia da Procrastinação",
                    source: "Oliveira & Santos - Cap 13",
                    reading: `
                        <h3>Não é preguiça, é medo</h3>
                        <p>Procrastinadores tendem a ter uma amígdala maior. O cérebro vê a tarefa difícil como uma 'dor' ou 'ameaça'. Para proteger você dessa dor, o límbico desvia sua atenção para algo prazeroso (fuga).</p>
                        <p>Para vencer, você precisa reduzir o tamanho da ameaça até que a amígdala não dispare.</p>
                    `,
                    challenge: {
                        id: "chal_w2_d9",
                        title: "A Regra dos 2 Minutos",
                        description: "Pegue a tarefa mais chata pendente. Comprometa-se a fazer apenas 2 minutos dela. Só isso. Geralmente, o bloqueio inicial é o pior.",
                        xp: 350
                    }
                },
                {
                    day: 10,
                    title: "Habênula: O Centro da Frustração",
                    source: "Oliveira & Santos - Cap 6",
                    reading: `
                        <h3>O Anti-Prazer</h3>
                        <p>Quando algo dá errado ou a expectativa não é atendida, a Habênula Lateral é ativada e 'desliga' a dopamina. É a sensação química de frustração.</p>
                        <p>Se você evita desafios para não ativar a Habênula, você estagna. O segredo é reinterpretar a falha como dado, não como dor.</p>
                    `,
                    challenge: {
                        id: "chal_w2_d10",
                        title: "Busca da Rejeição",
                        description: "Peça algo hoje que você sabe que a resposta será 'não' (ex: desconto absurdo, um favor estranho). Treine sua habênula a suportar a negativa.",
                        xp: 400
                    }
                },
                {
                    day: 11,
                    title: "Serotonina e Obsessão",
                    source: "Oliveira & Santos - Cap 5",
                    reading: `
                        <h3>O Ciclo do Pensamento</h3>
                        <p>Baixos níveis de serotonina estão ligados a pensamentos obsessivos e circulares (como na paixão ou no TOC). Para aumentar a serotonina naturalmente: luz solar, exercício físico e gratidão.</p>
                    `,
                    challenge: {
                        id: "chal_w2_d11",
                        title: "Exposição Solar",
                        description: "Passe 20 minutos sob luz natural direta pela manhã. Sem óculos escuros (se seguro). Isso regula seu ciclo circadiano e humor.",
                        xp: 300
                    }
                },
                {
                    day: 12,
                    title: "O Teste do Marshmallow",
                    source: "Goleman - Cap 6",
                    reading: `
                        <h3>O Poder do 'Não Agora'</h3>
                        <p>Crianças que conseguiram esperar pelo segundo marshmallow tornaram-se adultos com melhores notas, saúde e relacionamentos. O controle inibitório é o maior preditor de sucesso.</p>
                    `,
                    challenge: {
                        id: "chal_w2_d12",
                        title: "Privação Voluntária",
                        description: "Pule uma refeição (se sua saúde permitir) ou fique sem beber água por 4 horas quando estiver com sede. Observe o impulso e diga 'não agora'.",
                        xp: 400
                    }
                },
                {
                    day: 13,
                    title: "Estresse e Cortisol",
                    source: "Oliveira & Santos - Cap 4",
                    reading: `
                        <h3>O Veneno Lento</h3>
                        <p>O Cortisol é útil para fugir de leões, mas tóxico quando crônico. Ele mata neurônios no hipocampo (memória) e aumenta a gordura visceral.</p>
                        <p>A respiração é a única função autonômica que você pode controlar conscientemente para baixar o cortisol.</p>
                    `,
                    challenge: {
                        id: "chal_w2_d13",
                        title: "Respiração Box (4-4-4-4)",
                        description: "Inspire 4s, Segure 4s, Expire 4s, Segure 4s. Repita por 5 minutos. Isso força o sistema parassimpático a ativar.",
                        xp: 350
                    }
                },
                {
                    day: 14,
                    title: "Revisão da Semana 2",
                    source: "Protocolo NeuroFlow",
                    reading: `
                        <h3>Mestre da Química</h3>
                        <p>Você agora entende os botões do painel de controle: Dopamina (Desejo), Habênula (Frustração), Cortisol (Estresse). Você não é escravo deles.</p>
                    `,
                    challenge: {
                        id: "chal_w2_d14",
                        title: "O Dia de Dopamina Detox",
                        description: "Tente um domingo monástico. Sem celular, sem TV, sem açúcar, sem música. Apenas leitura, caminhada e escrita. Resete seus receptores.",
                        xp: 600
                    }
                }
            ]
        },
        {
            id: 3,
            title: "Semana 3: A Rede Social",
            theme: "Conexão e Empatia",
            color: "#2ecc71", // Verde
            days: [
                {
                    day: 15,
                    title: "Neurônios Espelho",
                    source: "Oliveira & Santos - Cap 10",
                    reading: `
                        <h3>Eu sinto o que você sente</h3>
                        <p>Existem células no seu cérebro que disparam apenas ao *ver* alguém fazer algo. Elas são a base biológica da empatia e do aprendizado por imitação.</p>
                        <p>Se você convive com pessoas ansiosas, seus neurônios espelho copiarão a ansiedade. Cuidado com seu ambiente.</p>
                    `,
                    challenge: {
                        id: "chal_w3_d15",
                        title: "Espelhamento Consciente",
                        description: "Em uma conversa, tente sutilmente espelhar a postura corporal da outra pessoa. Observe se a conexão (rapport) melhora.",
                        xp: 300
                    }
                },
                {
                    day: 16,
                    title: "A Dor da Inveja",
                    source: "Oliveira & Santos - Cap 7",
                    reading: `
                        <h3>Inveja dói (Literalmente)</h3>
                        <p>A inveja ativa o Córtex Cingulado Anterior, a mesma área da dor física. E quando o invejado falha, ativa-se o estriado (prazer). É o 'Schadenfreude'.</p>
                        <p>Isso é primitivo e destrutivo. Combata isso forçando seu cérebro a admirar em vez de invejar.</p>
                    `,
                    challenge: {
                        id: "chal_w3_d16",
                        title: "Elogio Genuíno",
                        description: "Elogie sincera e publicamente alguém que tem algo que você deseja. Quebre o ciclo da inveja no cérebro.",
                        xp: 350
                    }
                },
                {
                    day: 17,
                    title: "Empatia vs. Simpatia",
                    source: "Goleman - Cap 7",
                    reading: `
                        <h3>Sintonizando a Frequência</h3>
                        <p>Simpatia é sentir *pelos* outros. Empatia é sentir *com* os outros. Psicopatas entendem o que você sente (empatia cognitiva) mas não se importam (empatia emocional).</p>
                        <p>Para desenvolver empatia, você precisa calar seu próprio diálogo interno e ouvir de verdade.</p>
                    `,
                    challenge: {
                        id: "chal_w3_d17",
                        title: "Escuta Radical",
                        description: "Tenha uma conversa de 10 minutos sem falar de si mesmo, sem dar conselhos e sem julgar. Apenas faça perguntas para entender profundamente.",
                        xp: 400
                    }
                },
                {
                    day: 18,
                    title: "O Cérebro Social",
                    source: "Goleman - Cap 8",
                    reading: `
                        <h3>Contágio Emocional</h3>
                        <p>Emoções são vírus. Elas se espalham em milissegundos através de microexpressões e tom de voz. Um líder é alguém que gerencia o estado emocional do grupo.</p>
                        <p>Você é um termostato (define a temperatura) ou um termômetro (apenas reage)?</p>
                    `,
                    challenge: {
                        id: "chal_w3_d18",
                        title: "Mudança de Atmosfera",
                        description: "Entre em um ambiente (loja, escritório, casa) e tente elevar a energia do local apenas com seu tom de voz e sorriso. Seja o termostato.",
                        xp: 350
                    }
                },
                {
                    day: 19,
                    title: "Inteligência Conjugal",
                    source: "Goleman - Cap 9",
                    reading: `
                        <h3>O Mapa do Amor</h3>
                        <p>Crítica, Desprezo, Defensiva e Obstrução. Estes são os 4 cavaleiros do apocalipse nos relacionamentos. O antídoto é a admiração e o conhecimento profundo do mundo do outro.</p>
                    `,
                    challenge: {
                        id: "chal_w3_d19",
                        title: "Validação Emocional",
                        description: "Quando alguém reclamar de algo hoje, não dê soluções. Diga apenas: 'Entendo porque você se sente assim, faz sentido'. Valide a emoção.",
                        xp: 300
                    }
                },
                {
                    day: 20,
                    title: "Liderança e Crítica",
                    source: "Goleman - Cap 10",
                    reading: `
                        <h3>A Crítica Sanduíche Morreu</h3>
                        <p>Críticas mal feitas ativam a ameaça de status no cérebro, desligando o pré-frontal. Para criticar, foque no comportamento, não na pessoa, e aponte o caminho para o futuro, não o erro do passado.</p>
                    `,
                    challenge: {
                        id: "chal_w3_d20",
                        title: "Feedback Positivo",
                        description: "Dê um feedback específico e positivo para alguém hoje. Não diga 'bom trabalho', diga 'gostei de X porque ajudou em Y'.",
                        xp: 300
                    }
                },
                {
                    day: 21,
                    title: "Revisão da Semana 3",
                    source: "Protocolo NeuroFlow",
                    reading: `
                        <h3>Nós somos Nós</h3>
                        <p>O cérebro humano atrocia no isolamento. A ocitocina e os neurônios espelho provam que fomos feitos para conexão. Sua inteligência emocional é medida pela qualidade de suas relações.</p>
                    `,
                    challenge: {
                        id: "chal_w3_d21",
                        title: "Conexão Real",
                        description: "Ligue (voz, não texto) para um amigo ou parente que não vê há tempos apenas para saber como ele está.",
                        xp: 500
                    }
                }
            ]
        },
        {
            id: 4,
            title: "Semana 4: A Transcendência",
            theme: "Flow, Futuro e Legado",
            color: "#f1c40f", // Ouro
            days: [
                {
                    day: 22,
                    title: "O Estado de Flow",
                    source: "Daniel Goleman - Cap 6",
                    reading: `
                        <h3>A Neurobiologia da Excelência</h3>
                        <p>O Flow é quando o desafio encontra a habilidade. O córtex pré-frontal se acalma (hipofrontalidade transitória), o crítico interno cala a boca e a ação se torna fluida.</p>
                        <p>Para entrar em Flow: Elimine distrações, defina uma meta clara e busque um desafio levemente acima da sua capacidade atual.</p>
                    `,
                    challenge: {
                        id: "chal_w4_d22",
                        title: "Sessão Deep Work",
                        description: "90 minutos de trabalho focado em uma única tarefa complexa. Celular em outro cômodo. Busque o fluxo.",
                        xp: 500
                    }
                },
                {
                    day: 23,
                    title: "O Cérebro Espiritual",
                    source: "Oliveira & Santos - Cap 8",
                    reading: `
                        <h3>Dissolvendo o Eu</h3>
                        <p>Durante meditação profunda ou oração, a atividade no Lobo Parietal (que define onde você termina e o mundo começa) diminui. O cérebro perde a fronteira do 'Eu'.</p>
                        <p>Isso explica a sensação de 'unidade com o universo'. Não é magia, é neuroanatomia.</p>
                    `,
                    challenge: {
                        id: "chal_w4_d23",
                        title: "Meditação de Dissolução",
                        description: "Sente-se em silêncio por 15 minutos. Tente focar não nos pensamentos, mas no espaço entre eles. Tente sentir o espaço ocupado pelo seu corpo.",
                        xp: 400
                    }
                },
                {
                    day: 24,
                    title: "Otimismo e Saúde",
                    source: "Goleman - Cap 11",
                    reading: `
                        <h3>A Esperança Cura</h3>
                        <p>Pessimistas têm sistemas imunológicos mais fracos. O otimismo não é ignorar a realidade, é a crença de que você tem agência para mudar a situação.</p>
                        <p>A 'imunidade emocional' é tão importante quanto a física.</p>
                    `,
                    challenge: {
                        id: "chal_w4_d24",
                        title: "Diário de Gratidão",
                        description: "Escreva 3 coisas pelas quais é grato hoje e PORQUÊ. O 'porquê' força o cérebro a reviver a emoção positiva.",
                        xp: 300
                    }
                },
                {
                    day: 25,
                    title: "Livre Arbítrio?",
                    source: "Oliveira & Santos - Cap 12",
                    reading: `
                        <h3>Quem está no comando?</h3>
                        <p>Estudos mostram que o cérebro inicia a ação milissegundos antes de você ter consciência de 'decidir' agir. 'Algo pensa em mim'.</p>
                        <p>Seu livre arbítrio talvez não seja a capacidade de iniciar, mas a capacidade de vetar (o 'livre não-arbítrio'). O poder está no 'não'.</p>
                    `,
                    challenge: {
                        id: "chal_w4_d25",
                        title: "O Poder do Veto",
                        description: "Hoje, observe seus impulsos automáticos (coçar, pegar o celular, interromper). Vete conscientemente 5 desses impulsos.",
                        xp: 450
                    }
                },
                {
                    day: 26,
                    title: "Déjà Vu e Mistérios",
                    source: "Oliveira & Santos - Cap 11",
                    reading: `
                        <h3>Falha na Matrix?</h3>
                        <p>O Déjà Vu pode ser um atraso no processamento entre hemisférios ou uma ativação errada da memória no lobo temporal. O cérebro está constantemente tentando prever o futuro baseado no passado.</p>
                        <p>Aceite que seu cérebro é falível e fascinante.</p>
                    `,
                    challenge: {
                        id: "chal_w4_d26",
                        title: "Previsão Consciente",
                        description: "Tente prever como você se sentirá ao final do dia. Escreva. À noite, compare. Veja como seu cérebro erra ou acerta na previsão afetiva.",
                        xp: 300
                    }
                },
                {
                    day: 27,
                    title: "A Construção do Novo Eu",
                    source: "Síntese",
                    reading: `
                        <h3>Neurogênese</h3>
                        <p>Você pode criar novos neurônios a vida toda (neurogênese), especialmente no hipocampo. Exercício, aprendizado e novidade são os estimulantes.</p>
                        <p>Você construiu uma nova arquitetura neural nestes 27 dias.</p>
                    `,
                    challenge: {
                        id: "chal_w4_d27",
                        title: "Aprender Algo Novo",
                        description: "Dedique 30 minutos a aprender o básico de algo totalmente novo (uma língua, um jogo, um conceito de física). Estimule a neurogênese.",
                        xp: 400
                    }
                },
                {
                    day: 28,
                    title: "O Fim e o Início",
                    source: "Protocolo NeuroFlow",
                    reading: `
                        <h3>A Manutenção</h3>
                        <p>O protocolo de 28 dias termina, mas a neuroplasticidade é eterna. Se você parar, a poda neural (synaptic pruning) removerá o que não for usado.</p>
                        <p>Sua missão agora é a consistência. Você é o jardineiro da sua própria mente.</p>
                    `,
                    challenge: {
                        id: "chal_w4_d28",
                        title: "O Manifesto do Futuro",
                        description: "Escreva uma carta para você mesmo daqui a 1 ano. Descreva quem você se tornou. Guarde-a ou agende um e-mail para o futuro.",
                        xp: 1000
                    }
                }
            ]
        }
    ]
};

// --- FUNÇÃO AUXILIAR APRIMORADA ---
export function getContentByDay(globalDay) {
    let currentDayCount = 0;
    
    for (const week of protocolData.weeks) {
        for (const dayData of week.days) {
            currentDayCount++;
            if (currentDayCount === globalDay) {
                return {
                    week: week,
                    data: dayData
                };
            }
        }
    }
    return null; // Dia não encontrado ou protocolo acabou
}
