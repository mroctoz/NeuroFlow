const ModulesData = [
    {
        id: '1-1',
        phase: 1,
        title: 'O Maestro Biológico',
        subtitle: 'Anatomia Básica e o Córtex',
        type: 'theory', // theory, challenge, book
        duration: '5 min',
        locked: false,
        content: `
            <h3>Prazer, sou o Cérebro</h3>
            <p>Imagine uma orquestra. Você tem músicos talentosos (órgãos), mas se cada um tocar em um tom diferente, vira barulho. O Cérebro é o maestro que garante a harmonia (homeostase).</p>
            
            <div class="highlight-box">
                <i class="fa-solid fa-microchip"></i>
                <strong>O Processador Central:</strong> Consome 25% de toda sua energia diária, embora seja apenas 2% do seu peso.
            </div>

            <h4>O Segredo Humano: O Córtex</h4>
            <p>Não temos o maior cérebro do mundo animal, mas temos o córtex mais complexo. É a "casca" externa, cheia de dobras (sulcos e giros). É aqui que mora sua consciência, seu raciocínio lógico e sua capacidade de ler este texto agora.</p>
            <p><strong>Conceito Chave:</strong> Tudo o que você faz conscientemente passa pelo Córtex. Tudo o que é automático (batimentos, temperatura, medo instintivo) passa pelas regiões Subcorticais (abaixo do córtex).</p>
        `
    },
    {
        id: '1-2',
        phase: 1,
        title: 'A Rede Neural',
        subtitle: 'Neurônios e Sinapses',
        type: 'theory',
        duration: '7 min',
        locked: true, // Bloqueado até completar o anterior
        content: `
            <h3>A Unidade Fundamental</h3>
            <p>Você é um aglomerado de 86 bilhões de células chamadas <strong>Neurônios</strong>. Eles não se tocam fisicamente. Eles conversam através de um espaço vazio chamado "Fenda Sináptica".</p>

            <ul class="concept-list">
                <li><strong>Dendritos:</strong> As antenas que recebem informações.</li>
                <li><strong>Axônio:</strong> O cabo que transmite a eletricidade.</li>
                <li><strong>Sinapse:</strong> Onde a mágica química acontece.</li>
            </ul>

            <h4>Neuroplasticidade</h4>
            <p>Aqui está a regra de ouro da neurociência aplicada:</p>
            <blockquote class="neuro-quote">"Neurônios que disparam juntos, se conectam."</blockquote>
            <p>Toda vez que você repete um comportamento (seja estudar ou procrastinar), você fortalece essa conexão física no seu cérebro. Aprender é, literalmente, mudar a anatomia do seu cérebro.</p>
        `
    },
    {
        id: '1-3',
        phase: 1,
        title: 'Protocolo: Zona de Conforto',
        subtitle: 'Desafio Prático #01',
        type: 'challenge',
        duration: 'Ação',
        locked: true,
        content: `
            <h3>O Perigo da Economia de Energia</h3>
            <p>Seu cérebro foi programado biologicamente para poupar energia. O "conforto" não é apenas agradável, é um mecanismo de sobrevivência primitivo. O problema? O cérebro se adapta até ao que é ruim (Acomodação Olfativa ou Comportamental).</p>

            <div class="challenge-box">
                <h4><i class="fa-solid fa-bolt"></i> Missão: Quebrar o Padrão</h4>
                <p>Identifique uma área onde você está "confortável demais" mas insatisfeito (ex: alimentação, rotina de sono, falta de estudo).</p>
                <p><strong>Ação:</strong> Durante as próximas 24h, execute uma "Micro-Mudança". Se você não lê, leia 1 página. Se come mal, troque apenas uma refeição.</p>
                <p><em>O objetivo não é o resultado, é sinalizar para seus neurônios que o padrão antigo está sendo desafiado.</em></p>
            </div>
        `
    }
];
