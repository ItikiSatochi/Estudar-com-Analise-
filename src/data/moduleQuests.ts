import { ModuleId, ModuleQuest } from '../types';

export const moduleQuestsData: Record<ModuleId, ModuleQuest> = {
  overview: {
    moduleId: 'overview',
    title: 'Desafio Executivo: Fundamentos de Inteligência de Dados',
    badgeTitle: 'Certificado em Governança & Arquitetura Analítica',
    description: 'Teste sua capacidade de discernir relatórios estratégicos de operacionais, aplicar o Data-Ink Ratio e dominar o fluxo ponta a ponta da esteira de dados corporativa.',
    passingScorePercent: 75,
    questions: [
      {
        id: 'q-ov-1',
        question: 'Qual a principal diferença entre um relatório operacional e um painel estratégico C-Level?',
        options: [
          'O relatório operacional tem mais cores e gráficos 3D, enquanto o estratégico tem apenas tabelas.',
          'O operacional foca no detalhe diário da execução das tarefas; o estratégico foca no impacto em EBITDA, faturamento e decisões de alocação de capital.',
          'O estratégico deve conter todas as 150 colunas do banco de dados para que os diretores procurem o que quiserem.',
          'Não há diferença técnica, apenas o público que recebe por e-mail.'
        ],
        correctIndex: 1,
        corporateExplanation: 'Diretoria executiva não tem tempo para garimpar dados transacionais. Painéis C-Level respondem diretamente ao "E daí? Qual decisão tomar?", correlacionando métricas operacionais com impacto monetário.',
        businessScenario: 'Reunião mensal do conselho avaliando desempenho financeiro das unidades de negócio.'
      },
      {
        id: 'q-ov-2',
        question: 'Qual é o princípio fundamental do "Data-Ink Ratio" proposto por Edward Tufte para visualização corporativa?',
        options: [
          'Maximizar o uso de cores brilhantes para impressionar o cliente.',
          'Eliminar qualquer elemento gráfico (linhas de grade pesadas, 3D, sombras, bordas grossas) que não represente dados reais diretamente.',
          'Usar o máximo de tinta ou pixels possíveis para preencher todo o espaço em branco da tela.',
          'Substituir todos os gráficos por textos corridos em Word.'
        ],
        correctIndex: 1,
        corporateExplanation: 'A tinta ou pixel da tela deve ser dedicada exclusivamente à informação que guia a decisão. Elementos decorativos geram sobrecarga cognitiva e desviam o foco da anomalia.',
        businessScenario: 'Redução do tempo de leitura de relatórios de vendas semanais de 20 minutos para 2 minutos.'
      },
      {
        id: 'q-ov-3',
        question: 'Em uma esteira moderna de dados corporativa (Modern Data Stack), qual a sequência correta e sustentável do fluxo analítico?',
        options: [
          'Baixar CSV no Excel -> Fazer PROCV manual -> Colar prints no PowerPoint.',
          'Ingestão em Banco Transacional (OLTP) -> Modelagem Analítica (Star Schema em DW/SQL) -> Camada de Negócios / Métricas -> Consumo Visual e Automação.',
          'Conectar o Power BI diretamente no banco de produção sem modelagem e rodar consultas pesadas no horário de pico.',
          'Subir dados não tratados diretamente para um modelo de Machine Learning.'
        ],
        correctIndex: 1,
        corporateExplanation: 'Separar o ambiente transacional (OLTP) do analítico (OLAP com Star Schema) garante integridade, velocidade de consulta e evita travar os sistemas de caixa da empresa.',
        businessScenario: 'Arquitetura de dados escalável para suportar crescimento de 10x no volume de transações.'
      },
      {
        id: 'q-ov-4',
        question: 'Por que métricas de vaidade (ex: acessos brutos a uma página sem conversão monetária) são danosas em apresentações executivas?',
        options: [
          'Porque são fáceis demais de calcular no SQL.',
          'Porque criam uma falsa sensação de sucesso sem demonstrar geração de caixa, retenção ou rentabilidade real da empresa.',
          'Porque exigem computadores mais caros para renderizar.',
          'Porque a área de marketing não autoriza a divulgação.'
        ],
        correctIndex: 1,
        corporateExplanation: 'Uma métrica que sobe sem gerar margem de contribuição ou retenção de clientes ilude a governança corporativa e atrasa correções de rota urgentes.',
        businessScenario: 'Alocação de orçamento de marketing de R$ 2,5 milhões para o próximo trimestre.'
      }
    ]
  },

  'data-analysis': {
    moduleId: 'data-analysis',
    title: 'Desafio CRISP-DM & Análise Exploratória (EDA)',
    badgeTitle: 'Certificado em Análise Exploratória & Governança de Dados',
    description: 'Valide seu conhecimento nas 6 fases do CRISP-DM, identificação de anomalias estatísticas via IQR e tratamento responsável de valores nulos.',
    passingScorePercent: 75,
    questions: [
      {
        id: 'q-da-1',
        question: 'No framework CRISP-DM, qual a etapa mais crítica que deve preceder qualquer linha de código ou consulta SQL?',
        options: [
          'Modelagem de Machine Learning.',
          'Business Understanding (Compreensão do Negócio e Definição da Dor do Stakeholder).',
          'Deploy imediato do dashboard na nuvem.',
          'Limpeza de dados aleatória.'
        ],
        correctIndex: 1,
        corporateExplanation: 'Sem entender a dor do negócio e a decisão que o gestor precisa tomar, a equipe cria análises estatisticamente perfeitas para problemas irrelevantes.',
        businessScenario: 'Início de um projeto de diagnóstico de devoluções no e-commerce.'
      },
      {
        id: 'q-da-2',
        question: 'Ao identificar outliers em um dataset de faturamento corporativo, qual a técnica robusta recomendada para detecção estatística?',
        options: [
          'Apagar todos os valores que parecem altos sem avisar ninguém.',
          'Método do Intervalo Interquartil (IQR: Q1 - 1.5*IQR e Q3 + 1.5*IQR) ou Z-Score.',
          'Substituir todos os outliers pelo número 0.',
          'Apenas olhar a tabela de ponta a ponta manualmente.'
        ],
        correctIndex: 1,
        corporateExplanation: 'O método de Boxplot e IQR é imune a distorções causadas por assimetria severa na distribuição, permitindo isolar fraudes ou grandes compras B2B legítimas.',
        businessScenario: 'Auditoria de fraudes em transações de cartão de crédito empresarial.'
      },
      {
        id: 'q-da-3',
        question: 'No tratamento de valores ausentes (Missing Values) em dados de clientes corporativos, qual conduta NUNCA deve ser adotada de forma cega?',
        options: [
          'Investigar o motivo do nulo junto à área que gera o dado.',
          'Excluir sumariamente todas as linhas com campos nulos sem avaliar se isso introduz viés severo na amostra.',
          'Documentar a regra de imputação utilizada no catálogo de metadados.',
          'Substituir campos numéricos pela mediana quando a distribuição for assimétrica.'
        ],
        correctIndex: 1,
        corporateExplanation: 'Excluir linhas com nulos pode apagar segmentos inteiros de clientes (ex: clientes corporativos que não preencheram CPF por terem CNPJ), gerando conclusões falsas.',
        businessScenario: 'Base de 200.000 clientes com campo de renda ou data de nascimento incompleta.'
      },
      {
        id: 'q-da-4',
        question: 'Qual a diferença entre Análise Diagnóstica e Análise Prescritiva?',
        options: [
          'A diagnóstica prevê o futuro com 100% de precisão; a prescritiva apenas tira fotos do passado.',
          'A diagnóstica investiga "Por que aconteceu?"; a prescritiva sugere "O que a empresa deve fazer para maximizar o resultado ou evitar o problema?".',
          'A diagnóstica usa Excel e a prescritiva usa exclusivamente ChatGPT.',
          'São termos sinônimos utilizados apenas em marketing acadêmico.'
        ],
        correctIndex: 1,
        corporateExplanation: 'A maturidade analítica máxima reside no nível prescritivo: além de diagnosticar a raiz da perda de margem, o analista recomenda a ação de negócio concreta.',
        businessScenario: 'Apresentação de fechamento trimestral para o comitê de operações.'
      }
    ]
  },

  storytelling: {
    moduleId: 'storytelling',
    title: 'Desafio Storytelling com Dados & Princípios de Gestalt',
    badgeTitle: 'Certificado em Storytelling Analítico & Design Executivo',
    description: 'Comprove seu domínio na eliminação de poluição visual, aplicação das leis de Gestalt e redação de títulos prescritivos de alto impacto.',
    passingScorePercent: 75,
    questions: [
      {
        id: 'q-st-1',
        question: 'Por que o uso de gráficos de pizza ou rosca 3D com muitas fatias é severamente desencorajado em apresentações C-Level?',
        options: [
          'Porque consome muita memória RAM do projetor da sala de reunião.',
          'O cérebro humano é péssimo para estimar ângulos e áreas em perspectiva 3D, forçando comparações confusas e dependência de legendas distantes.',
          'Porque executivos não gostam de formas circulares.',
          'Apenas por convenção estética, sem impacto prático na compreensão.'
        ],
        correctIndex: 1,
        corporateExplanation: 'Barras horizontais ordenadas superam fatias de pizza porque o córtex visual compara comprimentos alinhados com precisão subconsciente instantânea.',
        businessScenario: 'Substituição de um gráfico de 8 fatias por barras horizontais de receita por categoria.'
      },
      {
        id: 'q-st-2',
        question: 'De acordo com a Lei da Proximidade de Gestalt, como os rótulos de dados devem ser posicionados em um gráfico de barras?',
        options: [
          'Em uma legenda separada no canto inferior direito, forçando o leitor a olhar repetidamente de um lado para o outro.',
          'Diretamente colados ou integrados no final de cada barra correspondente, poupando a memória de trabalho do espectador.',
          'Em uma nota de rodapé no final da página.',
          'Ocultos para que o executivo tenha que passar o mouse para descobrir.'
        ],
        correctIndex: 1,
        corporateExplanation: 'Ao posicionar o valor e o nome colados na barra, você reduz a distância sacádica dos olhos a zero, gerando compreensão imediata.',
        businessScenario: 'Dashboard estático em PDF enviado por e-mail para diretores todas as manhãs.'
      },
      {
        id: 'q-st-3',
        question: 'Qual dos títulos abaixo segue a melhor prática corporativa de Storytelling com Dados?',
        options: [
          'Gráfico 1: Vendas por Região (Faturamento Consolidado Anual).',
          'Vendas de Eletrônicos no Sul caíram 14% devido à ruptura de estoque no CD; migração emergencial para o Sudeste é recomendada.',
          'Dados Mensais de 2026.',
          'Tabela Demonstrativa de Faturamento Bruto e Deduções Fiscais.'
        ],
        correctIndex: 1,
        corporateExplanation: 'Títulos executivos devem responder à pergunta "E daí?". Títulos com a conclusão e recomendação de negócio guiam a reunião para a tomada de decisão.',
        businessScenario: 'Slide principal de um deck executivo para o conselho diretivo.'
      },
      {
        id: 'q-st-4',
        question: 'Como a paleta de cores deve ser usada intencionalmente em um dashboard corporativo de alto desempenho?',
        options: [
          'Usar 12 cores vibrantes diferentes para cada categoria para deixar o visual chamativo.',
          'Tons neutros (cinzas e ardósia) como padrão base e uma única cor de destaque intencional (ex: rubi ou azul escuro) no ponto crítico de ação.',
          'Fundo preto com texto em neon amarelo e verde piscante.',
          'Todas as barras exatamente na mesma cor sem nenhum tipo de destaque.'
        ],
        correctIndex: 1,
        corporateExplanation: 'A cor é um atributo pré-atentivo. Se tudo grita por atenção, nada é ouvido. O cinza atenua o estável; a cor quente direciona o foco da diretoria.',
        businessScenario: 'Identificação rápida de contratos B2B com risco de cancelamento.'
      }
    ]
  },

  'power-bi': {
    moduleId: 'power-bi',
    title: 'Desafio Power BI: Modelagem Star Schema & DAX Avançado',
    badgeTitle: 'Certificado em Modelagem Dimensional & DAX Specialist',
    description: 'Valide seus conhecimentos técnicos sobre Star Schema, dCalendario contínua, transição de contexto com CALCULATE e boas práticas com a engine VertiPaq.',
    passingScorePercent: 75,
    questions: [
      {
        id: 'q-pb-1',
        question: 'Por que o modelo dimensional Star Schema (Esquema Estrela) é muito mais eficiente no Power BI do que uma tabela única desnormalizada ("Flat Table")?',
        options: [
          'Porque ocupa mais espaço no disco da Microsoft.',
          'A engine VertiPaq do Power BI comprime dados por coluna (Run-length encoding e Hash de dicionário). Dimensões estreitas e normalizadas maximizam a taxa de compressão e velocidade de cache.',
          'Porque a Microsoft não permite carregar tabelas com mais de 5 colunas.',
          'O Star Schema é apenas um desenho estético e não afeta a velocidade das medidas DAX.'
        ],
        correctIndex: 1,
        corporateExplanation: 'O VertiPaq é colunar. Tabelas fato com chaves inteiras e dimensões curtas permitem compressões de até 10x e consultas instantâneas em bilhões de linhas.',
        businessScenario: 'Otimização de um modelo de varejo com 15 milhões de linhas de cupons fiscais.'
      },
      {
        id: 'q-pb-2',
        question: 'Qual requisito é mandatório para uma tabela dCalendario no Power BI funcionar corretamente com funções de Time Intelligence (ex: SAMEPERIODLASTYEAR, TOTALYTD)?',
        options: [
          'Ter apenas os dias em que houve vendas na empresa.',
          'Ter uma coluna de data contínua, sem buracos ou datas puladas, cobrindo anos completos (1 de janeiro a 31 de dezembro) e marcada como Tabela de Data.',
          'Ser criada exclusivamente no Power Query e nunca no DAX.',
          'Conter apenas o primeiro dia de cada mês.'
        ],
        correctIndex: 1,
        corporateExplanation: 'As funções de inteligência temporal do DAX assumem uma linha contínua no tempo. Se faltar um feriado ou final de semana, cálculos de ano anterior e YTD retornam valores errados.',
        businessScenario: 'Cálculo de crescimento anual YoY da receita líquida da companhia.'
      },
      {
        id: 'q-pb-3',
        question: 'O que acontece internamente quando a função CALCULATE é executada no DAX?',
        options: [
          'Ela apenas formata a saída em reais (R$).',
          'Ela executa a transição de contexto (converte contexto de linha atual em contexto de filtro equivalente) e aplica/sobrescreve os novos filtros passados como argumento.',
          'Ela reinicia a conexão com o banco de dados SQL.',
          'Ela apaga todas as medidas anteriores.'
        ],
        correctIndex: 1,
        corporateExplanation: 'CALCULATE é a única função no DAX capaz de alterar o contexto de filtro e operar a transição de contexto. É o alicerce de 90% dos cálculos corporativos avançados.',
        businessScenario: 'Cálculo de participação percentual do cliente sobre o total geral (% com ALL).'
      },
      {
        id: 'q-pb-4',
        question: 'Qual o risco clássico de utilizar relacionamentos Bidirecionais ("Cross filter direction: Both") indiscriminadamente no Power BI?',
        options: [
          'O Power BI trava a licença do usuário imediatamente.',
          'Gera caminhos de propagação ambíguos, resultados matemáticos imprevisíveis e lentidão extrema na atualização dos visuais.',
          'Não há risco nenhum; a Microsoft recomenda bidirecional em todas as tabelas.',
          'Apaga os dados da tabela Dimensão.'
        ],
        correctIndex: 1,
        corporateExplanation: 'Filtros cruzados bidirecionais criam loops de propagação e forçam a engine a avaliar filtros circulares complexos. O padrão de mercado é relacionamento unidirecional 1 para Muitos.',
        businessScenario: 'Auditoria de consistência em relatórios financeiros auditados por Big Four.'
      }
    ]
  },

  python: {
    moduleId: 'python',
    title: 'Desafio Python & Pandas: Análise de Dados Corporativa',
    badgeTitle: 'Certificado em Python & Engenharia de Dados com Pandas',
    description: 'Comprove que você sabe escrever código Python de alta performance para ambientes corporativos, eliminando loops iterativos e dominando groupby e vetorização.',
    passingScorePercent: 75,
    questions: [
      {
        id: 'q-py-1',
        question: 'Ao calcular uma nova coluna em um DataFrame do Pandas com 800.000 linhas, por que a vetorização é a abordagem mandatória?',
        options: [
          'Porque a sintaxe com loop for é mais moderna.',
          'Vetorização executa em código compilado C/SIMD em baixo nível em milissegundos, enquanto loops for em Python puro iteram linha a linha gerando lentidão extrema.',
          'Loops com for não funcionam no Linux.',
          'Para economizar espaço no disco rígido.'
        ],
        correctIndex: 1,
        corporateExplanation: '`df["lucro"] = df["venda"] - df["custo"]` roda em menos de 10 milissegundos em C otimizado. Um loop `iterrows()` levaria mais de 40 segundos e travaria o servidor.',
        businessScenario: 'Esteira de processamento de dados diários de fechamento de faturamento.'
      },
      {
        id: 'q-py-2',
        question: 'Qual a diferença entre os indexadores `.loc[]` e `.iloc[]` no Pandas?',
        options: [
          '`.loc` é para bancos de dados locais e `.iloc` é para nuvem.',
          '`.loc[]` acessa dados baseando-se em rótulos/nomes de colunas e índices; `.iloc[]` baseia-se exclusivamente em posições inteiras (0, 1, 2...).',
          'Não há diferença de comportamento, apenas preferência do programador.',
          '`.iloc` só funciona em sistemas operacionais Apple.'
        ],
        correctIndex: 1,
        corporateExplanation: 'Misturar referências posicionais com nomes de coluna é fonte de bugs fatais de produção quando uma nova coluna é inserida no início do schema.',
        businessScenario: 'Filtragem de pedidos onde a data é 2026 e a região é "Sudeste".'
      },
      {
        id: 'q-py-3',
        question: 'Como calcular simultaneamente a soma de faturamento e a média de margem por Categoria no Pandas de forma idiomática?',
        options: [
          'Criar dois scripts separados e juntar no Excel.',
          '`df.groupby("categoria").agg(faturamento_total=("valorVenda", "sum"), margem_media=("margemPercent", "mean"))`',
          'Executar um loop while por toda a tabela.',
          '`df.filter(categoria).calculate()`'
        ],
        correctIndex: 1,
        corporateExplanation: 'A sintaxe nomeada do `.agg()` no Pandas moderno gera DataFrames limpos com nomes de colunas explícitos, ideais para exportação e integração.',
        businessScenario: 'Pipeline automatizado gerando relatórios de fechamento mensal.'
      },
      {
        id: 'q-py-4',
        question: 'Ao carregar colunas de datas de um CSV no Pandas, qual a consequência de esquecer de convertê-las com `pd.to_datetime()`?',
        options: [
          'O Python encerra a execução do script com erro de sintaxe.',
          'As datas permanecem como strings (object), fazendo com que ordenações e filtros lógicos (<, >) operem por ordem alfabética e gerem cálculos de período completamente errados.',
          'O arquivo original do CSV é corrompido.',
          'Nenhuma consequência, o Pandas converte automaticamente tudo em tempo de execução.'
        ],
        correctIndex: 1,
        corporateExplanation: 'Como string, "10/01/2026" vem antes de "09/12/2025" por ordem alfabética. A tipagem explícita em datetime64 é o primeiro mandamento de qualidade de dados.',
        businessScenario: 'Cálculo de lead time de entrega entre data do pedido e data da entrega.'
      }
    ]
  },

  'sql-databases': {
    moduleId: 'sql-databases',
    title: 'Desafio SQL: Consultas Analíticas, Window Functions & Schemas',
    badgeTitle: 'Certificado em SQL Avançado & Arquitetura Relacional',
    description: 'Valide seu conhecimento sobre ordenações analíticas com Window Functions, distinção entre WHERE e HAVING, e modelagem de índices B-Tree.',
    passingScorePercent: 75,
    questions: [
      {
        id: 'q-sql-1',
        question: 'Qual é a diferença funcional crítica entre as cláusulas WHERE e HAVING em uma consulta SQL?',
        options: [
          'WHERE só pode ser usado em tabelas MySQL; HAVING só em PostgreSQL.',
          'WHERE filtra registros linha a linha ANTES da agregação; HAVING filtra os grupos formados DEPOIS da agregação com GROUP BY.',
          'HAVING é mais rápido que WHERE para filtrar chaves primárias.',
          'São intercambiáveis e produzem o mesmo plano de execução.'
        ],
        correctIndex: 1,
        corporateExplanation: 'Tentar filtrar `SUM(valor) > 1000` em um WHERE resulta em erro de sintaxe imediato do banco. O WHERE reduz as linhas antes de agrupar; o HAVING filtra o resultado consolidado.',
        businessScenario: 'Listar apenas categorias de produtos cujo faturamento total superou R$ 500.000 no ano.'
      },
      {
        id: 'q-sql-2',
        question: 'Para ranquear os 3 vendedores com maior faturamento dentro de CADA filial em SQL, qual Window Function resolve o desafio com elegância?',
        options: [
          'COUNT(DISTINCT vendedor_id)',
          'ROW_NUMBER() ou DENSE_RANK() OVER (PARTITION BY filial_id ORDER BY faturamento DESC)',
          'GROUP BY filial_id, vendedor_id com LIMIT 3',
          'ORDER BY filial_id, faturamento DESC sem particionamento'
        ],
        correctIndex: 1,
        corporateExplanation: 'Window Functions particionam o cálculo sem colapsar as linhas em um único registro, permitindo ranqueamentos, médias móveis e cálculos acumulados complexos.',
        businessScenario: 'Cálculo de comissões e bonificações semestrais da força comercial.'
      },
      {
        id: 'q-sql-3',
        question: 'O que acontece em uma consulta com `LEFT JOIN` entre Clientes e Pedidos quando um cliente nunca efetuou nenhuma compra?',
        options: [
          'O cliente é omitido do resultado final.',
          'O cliente aparece no resultado, e as colunas provenientes da tabela de Pedidos retornam preenchidas com valor NULL.',
          'A consulta aborta com erro de integridade referencial.',
          'O banco cria automaticamente um pedido fictício com valor 0.'
        ],
        correctIndex: 1,
        corporateExplanation: 'O LEFT JOIN preserva 100% das linhas da tabela à esquerda. É a técnica padrão para identificar "Clientes inativos" usando a cláusula `WHERE pedidos.id IS NULL`.',
        businessScenario: 'Campanha de reativação de clientes cadastrados que nunca compraram.'
      },
      {
        id: 'q-sql-4',
        question: 'Qual o papel fundamental de um índice B-Tree criado em uma coluna de `data_pedido` em um banco corporativo?',
        options: [
          'Criptografar as datas para atender à LGPD.',
          'Reduzir a complexidade de busca de O(N) (leitura sequencial de toda a tabela) para O(log N), acelerando drasticamente filtros por período em dashboards.',
          'Impedir que novos pedidos sejam inseridos no final de semana.',
          'Transformar a tabela relacional em formato JSON automaticamente.'
        ],
        correctIndex: 1,
        corporateExplanation: 'Em tabelas com milhões de linhas, um Full Table Scan consome disco e CPU do servidor. O índice B-Tree permite que o banco encontre o intervalo de datas quase que instantaneamente.',
        businessScenario: 'Dashboard que abre em 0,8 segundo versus 25 segundos sem índice.'
      }
    ]
  },

  'ai-automation': {
    moduleId: 'ai-automation',
    title: 'Desafio Inteligência Artificial & Automação Analítica',
    badgeTitle: 'Certificado em IA & Engenharia de Prompts para Analytics',
    description: 'Avalie sua capacidade de utilizar LLMs de forma segura em dados corporativos, estruturar prompts com few-shot e orquestrar automações resilientes.',
    passingScorePercent: 75,
    questions: [
      {
        id: 'q-ai-1',
        question: 'Qual é a regra número 1 de governança e segurança da informação ao utilizar modelos de IA generativa em bases de dados corporativas?',
        options: [
          'Copiar e colar tabelas com CPFs, salários e dados sensíveis de clientes diretamente em ferramentas de chat públicas.',
          'Nunca enviar dados brutos identificáveis (PII); enviar apenas metadados do schema (DDL), regras de negócio e resumos numéricos consolidados.',
          'Bloquear totalmente qualquer uso de computadores pelos analistas.',
          'Deixar a IA atualizar a tabela de produção sem revisão humana.'
        ],
        correctIndex: 1,
        corporateExplanation: 'Vazamentos de dados sensíveis violam a LGPD/GDPR e expõem a companhia a multas milionárias. A arquitetura correta alimenta o modelo com o dicionário de dados, gerando a query para rodar no ambiente seguro.',
        businessScenario: 'Implementação de assistente analítico interno em um banco ou seguradora.'
      },
      {
        id: 'q-ai-2',
        question: 'O que caracteriza a técnica de "Few-Shot Prompting" na geração automatizada de medidas DAX ou queries SQL complexas?',
        options: [
          'Pedir à IA para responder em menos de 1 segundo.',
          'Fornecer de 2 a 3 exemplos reais de entrada e saída esperada dentro do prompt para calibrar o padrão de raciocínio do modelo antes da pergunta final.',
          'Fazer perguntas sem fornecer o nome das tabelas.',
          'Repetir a mesma pergunta 10 vezes.'
        ],
        correctIndex: 1,
        corporateExplanation: 'Few-shot prompting reduz alucinações em mais de 85% em tarefas de código estruturado, garantindo que o modelo use as convenções de nomenclatura exatas da sua empresa.',
        businessScenario: 'Geração de queries padronizadas para analistas juniores.'
      },
      {
        id: 'q-ai-3',
        question: 'Ao integrar um modelo de IA para gerar narrativas executivas a partir de relatórios financeiros, como eliminar riscos de cálculos incorretos?',
        options: [
          'Pedir para a IA calcular a raiz quadrada de cabeça sem ferramentas.',
          'Fazer com que a camada de dados (SQL ou Python) calcule os números exatos com precisão determinística e passar os resultados calculados para a IA apenas redigir a narrativa executiva.',
          'Ignorar as discrepâncias se a linguagem estiver bonita.',
          'Usar apenas perguntas de sim ou não.'
        ],
        correctIndex: 1,
        corporateExplanation: 'LLMs são motores linguísticos probabilísticos, não calculadoras financeiras. Cálculos devem ser fechados no SQL/Python; a IA atua na contextualização e síntese textual.',
        businessScenario: 'Envio automático de boletim executivo matinal para a diretoria financeira.'
      },
      {
        id: 'q-ai-4',
        question: 'Qual o maior valor agregado gerado pela automação analítica com IA para um time de Business Intelligence?',
        options: [
          'Demitir toda a equipe de liderança da empresa.',
          'Liberar os analistas do trabalho braçal de montar relatórios manuais repetitivos, permitindo que foquem em estratégia, negociação e resolução de problemas de negócio.',
          'Aumentar o número de reuniões diárias da equipe.',
          'Substituir o Power BI por prints estáticos.'
        ],
        correctIndex: 1,
        corporateExplanation: 'A automação analítica transforma o time de dados de um "balcão de pedidos de planilhas" em um parceiro estratégico de crescimento sustentável.',
        businessScenario: 'Transição cultural do time de BI para Data Strategy.'
      }
    ]
  },

  'corporate-projects': {
    moduleId: 'corporate-projects',
    title: 'Desafio Gestão de Projetos Analíticos & Board Meetings',
    badgeTitle: 'Certificado em Apresentação Executiva & Métricas C-Level',
    description: 'Valide sua maturidade em conduzir reuniões com diretores e conselho, quantificar impactos financeiros e estruturar relatórios de uma página.',
    passingScorePercent: 75,
    questions: [
      {
        id: 'q-cp-1',
        question: 'Ao abrir uma reunião com o comitê executivo (CEO, CFO, Diretores) para apresentar o diagnóstico de vendas, qual deve ser a sua primeira abordagem?',
        options: [
          'Começar explicando os detalhes técnicos de qual biblioteca do Python foi instalada e quantos erros de sintaxe ocorreram.',
          'Apresentar diretamente o impacto financeiro consolidado (ex: "Identificamos uma fuga de R$ 1,4 milhão na margem bruta de Eletrônicos") e as três ações recomendadas.',
          'Pedir desculpas pelos dados estarem desatualizados.',
          'Mostrar uma tabela com 50.000 linhas em fonte 8.'
        ],
        correctIndex: 1,
        corporateExplanation: 'Executivos operam com o modelo "Bottom-Line First". Comece com o impacto no EBITDA e a decisão necessária; deixe os detalhes metodológicos para o anexo técnico se houver perguntas.',
        businessScenario: 'Reunião extraordinária de alinhamento com a diretoria de varejo.'
      },
      {
        id: 'q-cp-2',
        question: 'O que diferencia uma simulação de cenários (Análise What-If) de um relatório estático comum?',
        options: [
          'O relatório estático é em preto e branco e a simulação é colorida.',
          'A simulação de cenários permite parametrizar variáveis dinâmicas (ex: aumento de 5% de desconto, variação cambial, taxa de churn) para prever o impacto financeiro antes de tomar a decisão.',
          'A simulação só pode ser realizada em supercomputadores governamentais.',
          'Não há diferença conceitual.'
        ],
        correctIndex: 1,
        corporateExplanation: 'Tomadores de decisão querem saber o risco da decisão. Simulações What-If dão previsibilidade orçamentária em cenários otimistas, conservadores e pessimistas.',
        businessScenario: 'Definição da nova tabela de preços e descontos para o canal B2B.'
      },
      {
        id: 'q-cp-3',
        question: 'Por que o catálogo de dados e a documentação clara das regras de negócio são essenciais ao entregar um projeto corporativo?',
        options: [
          'Para cumprir burocracia sem utilidade prática.',
          'Garante a "Single Source of Truth" (Única Fonte da Verdade), evitando que áreas diferentes calculem métricas iguais com regras conflitantes gerando reuniões improdutivas.',
          'Porque o banco de dados apaga as tabelas que não tiverem comentários.',
          'Apenas para empresas com mais de 100.000 funcionários.'
        ],
        correctIndex: 1,
        corporateExplanation: 'O maior desperdício corporativo é gastar 45 minutos de uma reunião discutindo "Qual número está certo: o do Comercial ou o do Financeiro?". Um dicionário unificado sana o problema.',
        businessScenario: 'Padronização do cálculo de Margem de Contribuição entre Vendas e Controladoria.'
      },
      {
        id: 'q-cp-4',
        question: 'Qual formato de exportação é ideal para diretores que necessitam incorporar os insights em apresentações de conselho e auditorias externas?',
        options: [
          'Apenas prints de tela em baixa resolução.',
          'Relatório estruturado executivo em Markdown com resumos numéricos consolidados e tabelas CSV/JSON auditáveis.',
          'Arquivos de texto sem formatação nem cabeçalhos.',
          'Links expirados de plataformas terceiras.'
        ],
        correctIndex: 1,
        corporateExplanation: 'Conselhos de administração exigem rastreabilidade e formatos que possam ser auditados pela governança corporativa e arquivados formalmente em atas.',
        businessScenario: 'Prestação de contas semestral aos investidores e acionistas.'
      }
    ]
  },

  'kpi-dictionary': {
    moduleId: 'kpi-dictionary',
    title: 'Desafio Dicionário de KPIs: LTV, CAC, EBITDA & Churn',
    badgeTitle: 'Certificado em Indicadores Financeiros & Governança de Métricas',
    description: 'Comprove domínio completo sobre fórmulas de mercado, diferença entre Leading e Lagging indicators e cálculo de saúde financeira corporativa.',
    passingScorePercent: 75,
    questions: [
      {
        id: 'q-kpi-1',
        question: 'Como é calculada a relação LTV / CAC e o que um resultado inferior a 1,0x significa para a empresa?',
        options: [
          'LTV dividido por CAC; resultado abaixo de 1,0x significa que a empresa gasta mais para adquirir o cliente do que ele gera de receita, queimando caixa e operando no prejuízo.',
          'LTV vezes CAC; resultado abaixo de 1,0x significa lucro recorde.',
          'É um cálculo que só se aplica a empresas de construção civil.',
          'Significa que os clientes estão muito satisfeitos com o produto.'
        ],
        correctIndex: 0,
        corporateExplanation: 'Unit economics básico: se você gasta R$ 1.500 de marketing e vendas (CAC) para trazer um cliente que só deixa R$ 1.000 ao longo de toda a vida (LTV), seu modelo de negócio é insustentável.',
        businessScenario: 'Avaliação de captação de rodada de investimentos Série B.'
      },
      {
        id: 'q-kpi-2',
        question: 'Em contabilidade e finanças corporativas, o que representa o EBITDA (LAJIDA)?',
        options: [
          'O valor total de dinheiro em espécie na conta bancária do CEO.',
          'O Lucro Antes de Juros, Impostos, Depreciação e Amortização, mensurando a pura geração de caixa operacional do negócio desconsiderando efeitos financeiros e tributários.',
          'O total de produtos devolvidos pelos clientes.',
          'A soma de todos os salários pagos pela companhia.'
        ],
        correctIndex: 1,
        corporateExplanation: 'EBITDA é a métrica padrão mundial para avaliar a eficiência estritamente operacional de empresas do mesmo setor, eliminando distorções de dívidas ou regimes tributários diferentes.',
        businessScenario: 'M&A (Fusões e Aquisições) e avaliação de valuation da companhia.'
      },
      {
        id: 'q-kpi-3',
        question: 'Qual a diferença crucial entre um Indicador Lagging (Consequente) e um Indicador Leading (Antecedente)?',
        options: [
          'Lagging mede o passado e não pode mais ser alterado (ex: Faturamento do mês passado); Leading mede comportamentos precoces que influenciam o resultado futuro (ex: Número de propostas qualificadas enviadas).',
          'Leading é medido em dólares; Lagging é medido em reais.',
          'Lagging é usado apenas por estagiários; Leading por diretores.',
          'Não há diferença prática na gestão por indicadores.'
        ],
        correctIndex: 0,
        corporateExplanation: 'Se você só acompanha faturamento (Lagging), você só descobre o desastre quando o mês já fechou. Monitorar propostas e engajamento (Leading) permite corrigir a rota a tempo.',
        businessScenario: 'Implantação de metodologia de OKRs com acompanhamento semanal.'
      },
      {
        id: 'q-kpi-4',
        question: 'Em um modelo de negócio por assinatura (SaaS), como é calculado o Churn Rate Percentual mensal?',
        options: [
          '(Novos clientes adquiridos / Total de clientes) * 100',
          '(Clientes cancelados no mês / Total de clientes ativos no início do mês) * 100',
          'Soma de todos os cancelamentos divididos pelo faturamento anual.',
          'Número de cliques no botão de suporte.'
        ],
        correctIndex: 1,
        corporateExplanation: 'O churn rate de clientes mede o vazamento do balde. Para negócios B2B saudáveis, taxas mensais acima de 2% acumulam perdas severas ao longo do ano.',
        businessScenario: 'Alerta precoce de insatisfação após atualização de produto de software.'
      }
    ]
  }
};
