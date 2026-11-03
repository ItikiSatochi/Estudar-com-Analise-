import { ModuleInfo, TopicSection } from '../types';

export const modulesList: ModuleInfo[] = [
  {
    id: 'overview',
    title: 'Visão Geral & Trilha de Inteligência',
    shortTitle: 'Visão Geral',
    tagline: 'O Mapa da Mina da Inteligência de Dados Corporativa Moderna',
    icon: 'Compass',
    level: 'Executivo',
    topicsCount: 5,
    description: 'Arquitetura de dados ponta a ponta: da ingestão relacional ao storytelling executivo com IA e automação.'
  },
  {
    id: 'data-analysis',
    title: 'Metodologias & Engenharia de Análise',
    shortTitle: 'Análise de Dados',
    tagline: 'Da Coleta ao Diagnóstico Preditivo com Rigor Metodológico',
    icon: 'TrendingUp',
    level: 'Iniciante',
    topicsCount: 4,
    description: 'Frameworks analíticos CRISP-DM, limpeza de dados sujos, detecção de outliers e análise descritiva vs diagnóstica.'
  },
  {
    id: 'storytelling',
    title: 'Data Storytelling & Design de Dashboards',
    shortTitle: 'Storytelling',
    tagline: 'Transforme Métricas Confusas em Decisões C-Level Imediatas',
    icon: 'Presentation',
    level: 'Intermediário',
    topicsCount: 4,
    description: 'Princípios de Gestalt, eliminação de ruído (Data-Ink Ratio), a matriz de escolha de gráficos e simulador Antes vs Depois.'
  },
  {
    id: 'power-bi',
    title: 'Power BI Corporativo & Modelagem DAX',
    shortTitle: 'Power BI & DAX',
    tagline: 'Modelagem Star Schema e Fórmulas Analíticas de Alto Impacto',
    icon: 'BarChart3',
    level: 'Avançado',
    topicsCount: 5,
    description: 'Star Schema vs Snowflake, cálculo de contexto de filtro no CALCULATE, Time Intelligence e simulador de DAX interativo.'
  },
  {
    id: 'python',
    title: 'Python para Análise de Dados Complexos',
    shortTitle: 'Python & Pandas',
    tagline: 'Processamento Vetorizado, Polars, Estatística e Visualização',
    icon: 'Code2',
    level: 'Avançado',
    topicsCount: 4,
    description: 'Manipulação de alto desempenho com Pandas/Polars, testes de hipóteses estatísticas, Plotly e playground de código.'
  },
  {
    id: 'sql-databases',
    title: 'Bancos de Dados Relacionais, SQL & MySQL',
    shortTitle: 'Bancos & SQL',
    tagline: 'Window Functions, CTEs e Otimização de Consultas de Missão Crítica',
    icon: 'Database',
    level: 'Avançado',
    topicsCount: 4,
    description: 'Modelagem 3FN, índices B-Tree, particionamento, Window Functions complexas e executor SQL com análise de planos de execução.'
  },
  {
    id: 'ai-automation',
    title: 'IA & Automação de Processos Analíticos',
    shortTitle: 'IA & Automação',
    tagline: 'Pipelines Autônomos, Machine Learning e Generative BI',
    icon: 'Bot',
    level: 'Executivo',
    topicsCount: 4,
    description: 'Pipelines ETL agendados, modelos preditivos explicáveis e geração assistida por IA de relatórios gerenciais automáticos.'
  },
  {
    id: 'corporate-projects',
    title: 'Laboratório de Cases Corporativos Reais',
    shortTitle: 'Cases Reais',
    tagline: '4 Projetos Completos com Dados Reais para Praticar e Exportar',
    icon: 'Briefcase',
    level: 'Executivo',
    topicsCount: 4,
    description: 'Dashboards dinâmicos com dados reais de Varejo, SaaS B2B, Finanças DRE e Supply Chain com exportador multiformato.'
  },
  {
    id: 'kpi-dictionary',
    title: 'Dicionário Estratégico de KPIs Corporativos',
    shortTitle: 'Dicionário KPIs',
    tagline: 'Fórmulas, Benchmarks e Códigos Prontos para Vendas, Finanças e RH',
    icon: 'BookOpen',
    level: 'Intermediário',
    topicsCount: 5,
    description: 'Referência corporativa imediata com definições de negócio, benchmarks e códigos correspondentes em DAX, SQL e Python.'
  }
];

export const modulesDetailData: Record<string, { summary: string; topics: TopicSection[] }> = {
  'data-analysis': {
    summary: 'Aprenda os fundamentos metodológicos e a esteira de tratamento que diferencia um analista júnior de um estrategista sênior de dados corporativos.',
    topics: [
      {
        id: 'crisp-dm',
        title: 'Framework CRISP-DM no Contexto Corporativo',
        subtitle: 'Como estruturar projetos de dados sem se perder em requisitos soltos',
        readTime: '6 min de leitura',
        content: `O **CRISP-DM** (Cross-Industry Standard Process for Data Mining) é a metodologia mais sólida para conduzir projetos analíticos em corporações.

### As 6 Fases Estratégicas:
1. **Compreensão do Negócio (Business Understanding):** Qual dor de negócio precisa ser resolvida? (Ex: Por que a taxa de cancelamento no Nordeste subiu 14%?). Definir KPIs de sucesso antes de tocar em qualquer linha de código.
2. **Compreensão dos Dados (Data Understanding):** Levantamento das fontes (ERP, CRM, Google Analytics, Logs), volumetria, completude e consistência temporal.
3. **Preparação dos Dados (Data Preparation):** 70% do tempo do projeto. Limpeza, tratamento de valores faltantes, tratamento de duplicidade e padronização de chaves primárias.
4. **Modelagem (Modeling):** Agrupamentos, regressões, modelos de classificação ou modelagem dimensional (Star Schema).
5. **Avaliação (Evaluation):** O resultado responde à pergunta inicial de negócio? É viável financeiramente agir com base nessa descoberta?
6. **Implantação & Monitoramento (Deployment):** Publicação em dashboards automatizados no Power BI, gatilhos de alerta via e-mail/Slack e esteiras de dados agendadas.`,
        keyTakeaways: [
          'Nunca inicie escrevendo código sem uma métrica de sucesso de negócio clara (ex: reduzir tempo de entrega em 18%).',
          'A fase de validação com stakeholders de negócio evita entregar dashboards tecnicamente perfeitos porém sem utilidade corporativa.',
          'Documente cada regra de saneamento de dados para garantir auditoria e governança.'
        ],
        codeExamples: [
          {
            language: 'python',
            title: 'Pipeline de Verificação de Qualidade dos Dados',
            description: 'Validação automática de nulos, tipos de dados e limites estatísticos',
            code: `import pandas as pd
import numpy as np

def auditar_qualidade_dataset(df: pd.DataFrame) -> pd.DataFrame:
    """Gera sumário corporativo de integridade dos dados."""
    resumo = pd.DataFrame({
        'Coluna': df.columns,
        'Tipo': df.dtypes,
        'Nulos': df.isnull().sum(),
        'Percentual_Nulos': (df.isnull().sum() / len(df) * 100).round(2),
        'Valores_Distintos': df.nunique(),
        'Zeros': (df == 0).sum()
    })
    return resumo.sort_values(by='Percentual_Nulos', ascending=False)

# Exemplo de auditoria corporativa
# audit_report = auditar_qualidade_dataset(df_vendas)`
          }
        ],
        bestPractices: [
          {
            do: 'Alinhar com a diretoria quais são os 3 KPIs prioritários antes de coletar as tabelas.',
            dont: 'Criar relatórios com 30 gráficos genéricos esperando que o usuário encontre valor sozinho.',
            corporateImpact: 'Economiza semanas de retrabalho e foca os analistas na alavanca financeira real.'
          }
        ]
      },
      {
        id: 'outliers-missing',
        title: 'Tratamento de Outliers e Valores Ausentes',
        subtitle: 'Quando imputar média, mediana, KNN ou expurgar anomalias',
        readTime: '8 min de leitura',
        content: `Dados do mundo corporativo são inerentemente imperfeitos: integrações de API falham, operadores digitam valores errados e clientes deixam cadastros pela metade.

### Estratégias para Valores Ausentes (Missing Values):
- **MCAR (Missing Completely at Random):** A falta é puramente acidental. Pode-se usar imputação pela mediana (para dados numéricos assimétricos) ou moda (para categóricos).
- **MAR (Missing at Random):** A falta tem relação com outra coluna (ex: renda não informada para clientes PJ). Imputar usando regressão ou modelos baseados em vizinhos (KNN Imputer).
- **MNAR (Missing Not at Random):** A própria ausência é um dado (ex: data de devolução em branco significa que o pedido foi retido pelo cliente com sucesso). Nunca substitua por zero sem antes modelar essa regra de negócio!

### Detecção de Outliers Corporativos:
- **Regra do IQR (Intervalo Interquartil):** $Outlier < Q1 - 1.5 \\times IQR$ ou $Outlier > Q3 + 1.5 \\times IQR$. Robusto contra distribuições não gaussianas.
- **Z-Score:** Identifica desvios além de $\\pm 3$ desvios padrão para distribuições normais.`,
        keyTakeaways: [
          'A média é extremamente sensível a outliers (um pedido de R$ 500k distorce todo o ticket médio da empresa). Use sempre a mediana como métrica de tendência central confiável.',
          'Em finanças e e-commerce, valores extremos podem ser fraudes ou compras corporativas B2B legítimas: crie uma coluna flag_anomalia em vez de simplesmente deletar a linha.'
        ],
        codeExamples: [
          {
            language: 'python',
            title: 'Detecção de Outliers via IQR no Pandas',
            description: 'Algoritmo corporativo para identificar transações fora da curva normal',
            code: `import pandas as pd

def flag_outliers_iqr(df: pd.DataFrame, coluna: str) -> pd.DataFrame:
    q1 = df[coluna].quantile(0.25)
    q3 = df[coluna].quantile(0.75)
    iqr = q3 - q1
    limite_inferior = q1 - 1.5 * iqr
    limite_superior = q3 + 1.5 * iqr
    
    df['is_outlier'] = (df[coluna] < limite_inferior) | (df[coluna] > limite_superior)
    df['limite_max_sugerido'] = limite_superior
    return df`
          }
        ],
        bestPractices: [
          {
            do: 'Segmentar a análise de outliers por grupo (ex: o valor médio de uma venda B2B é naturalmente 10x maior que B2C).',
            dont: 'Excluir compras de alto valor sem validar se tratam-se de clientes estratégicos da empresa.',
            corporateImpact: 'Evita a perda de visibilidade sobre os 5% de clientes que trazem 80% do faturamento.'
          }
        ]
      }
    ]
  },
  'storytelling': {
    summary: 'Aprenda a arte e a ciência de transformar relatórios maçantes em narrativas visuais executivas que provocam decisões e ações no conselho de administração.',
    topics: [
      {
        id: 'gestalt-data-ink',
        title: 'Princípios de Gestalt & Data-Ink Ratio de Edward Tufte',
        subtitle: 'Como o cérebro humano decodifica formas, cores e dados em milissegundos',
        readTime: '7 min de leitura',
        content: `Edward Tufte estabeleceu o princípio fundamental da visualização de dados: **Maximizar a proporção de Tinta-Dado (Data-Ink Ratio)**.

$$\\text{Data-Ink Ratio} = \\frac{\\text{Tinta usada para dados}}{\\text{Tinta total gasta no gráfico}}$$

### Os 4 Grandes Pecados Visuais Corporativos:
1. **Gráficos 3D:** Distorcem as áreas e distâncias angulares. Uma fatia de 15% na frente parece maior que uma de 30% no fundo.
2. **Linhas de Grade Escuras e Bordas Pesadas:** Competem pela atenção do cérebro com as barras e linhas reais.
3. **Uso de Paletas Arco-Íris Sem Significado:** O olho humano busca padrão onde não existe. Cores devem indicar categoria constante ou destaque intencional (cor neutra vs cor de alerta).
4. **Gráficos de Pizza com mais de 4 fatias:** O cérebro humano é péssimo em estimar ângulos comparativos. Substitua sempre por gráficos de barras horizontais ordenadas.

### Princípios de Gestalt Essenciais:
- **Proximidade:** Elementos próximos são percebidos como relacionados (coloque o rótulo colado na linha em vez de uma legenda distante).
- **Similaridade:** Mesma cor implica mesma métrica em diferentes visuais.
- **Continuidade & Conexão:** Linhas criam sensação de fluxo temporal contínuo.`,
        keyTakeaways: [
          'Tudo que não for dado no gráfico deve ser atenuado em tons de cinza ou eliminado.',
          'Adicione títulos com insights e conclusões (ex: "Faturamento caiu 12% no Sul devido à ruptura logística"), não títulos burocráticos (ex: "Gráfico 1: Vendas por Região").'
        ],
        interactiveType: 'storytelling-before-after',
        bestPractices: [
          {
            do: 'Usar cor de destaque apenas no ponto que demanda ação imediata (ex: uma barra em vermelho-alerta e o restante em cinza-chumbo).',
            dont: 'Usar fundos escuros brilhantes com gradientes de neon e 12 cores aleatórias em apresentações financeiras.',
            corporateImpact: 'Reduz o tempo de leitura do relatório de 15 minutos para 45 segundos em reuniões com executivos.'
          }
        ]
      },
      {
        id: 'chart-chooser-matrix',
        title: 'A Matriz Estratégica: Qual Gráfico Usar?',
        subtitle: 'O guia definitivo para nunca mais errar na escolha visual',
        readTime: '5 min de leitura',
        content: `A escolha do visual depende estritamente do objetivo cognitivo da mensagem:

| Objetivo Analítico | Cenário Corporativo Típico | Gráfico Recomendado | O Que Evitar a Todo Custo |
| :--- | :--- | :--- | :--- |
| **Comparação Simples** | Vendas por Canal ou Região | Barras Horizontais Ordenadas | Gráfico de Pizza ou Radar |
| **Tendência Temporal** | Evolução mensal de MRR e Churn | Gráfico de Linhas com Marcadores Discretos | Barras com 50 períodos espremidos |
| **Composição (Parte do Todo)** | Divisão do orçamento de Marketing | Barra 100% Empilhada ou Treemap | Pizza com 9 fatias miúdas |
| **Distribuição** | Dispersão de Salários ou Ticket Médio | Histograma ou Boxplot | Média simples sem variância |
| **Correlação** | Gastos em Google Ads vs Faturamento | Dispersão (Scatter Plot) com Linha de Tendência | Gráficos de colunas lado a lado |
| **Desvio de Meta** | Venda Realizada vs Orçado (Budget) | Gráfico Bullet (Bala) ou Barras de Variação | Tacômetro / Velocímetro circular |`,
        keyTakeaways: [
          'Se você tem rótulos longos de categorias (ex: "Servidores Blade High-End Enterprise"), o gráfico de barras horizontais é obrigatório para não truncar texto.',
          'Sempre inicie o eixo Y no zero para gráficos de barras para não induzir a diretoria a conclusões falsas de proporção.'
        ],
        bestPractices: [
          {
            do: 'Exibir a variação percentual vs meta diretamente anotada sobre as barras.',
            dont: 'Exigir que o leitor faça cálculos mentais subtraindo valores entre duas barras distantes.',
            corporateImpact: 'Garante decisões unânimes e evita discussões prolongadas sobre a interpretação do dado.'
          }
        ]
      }
    ]
  },
  'power-bi': {
    summary: 'Domine a ferramenta líder de BI corporativo: desde a arquitetura de tabelas Fato/Dimensão até fórmulas DAX complexas e otimização do motor VertiPaq.',
    topics: [
      {
        id: 'star-schema',
        title: 'Modelagem Star Schema vs Snowflake',
        subtitle: 'A base da performance e simplicidade analítica em ambientes corporativos',
        readTime: '7 min de leitura',
        content: `A modelagem dimensional é o coração do Power BI. O motor colunar **VertiPaq** é otimizado para **Star Schema (Esquema em Estrela)**.

### Tabela Fato (F_VENDAS):
- Contém eventos numéricos que ocorreram no tempo (métricas quantitativas, IDs estrangeiros, valores transacionados, quantidades).
- Alta cardinalidade de linhas (milhões de registros).

### Tabelas Dimensão (D_CLIENTES, D_PRODUTOS, D_CALENDARIO):
- Contêm o contexto das análises (quem, onde, quando, qual produto).
- Menor número de linhas, texto rico, atributos para filtros e fatiamento (slicers).
- Relacionamento estrito **1 para Muitos (1:*)** com filtro unidirecional partindo da Dimensão para a Fato.

### Por que Evitar Snowflake no Power BI?
O modelo Snowflake normaliza as dimensões em subdimensões (ex: Categoria -> Subcategoria -> Família). Isso aumenta a quantidade de JOINs relacionais no VertiPaq, degradando a memória cache e complicando fórmulas DAX. Desnormalize suas dimensões em uma única tabela via Power Query!`,
        keyTakeaways: [
          'Dimensão Calendário própria (d_Calendario) criada via DAX ou Power Query é obrigatória em 100% dos relatórios corporativos para funcionamento do Time Intelligence.',
          'Evite relacionamentos bidirecionais (*:*) ou bi-direcionais automáticos, pois eles causam ambiguidade nos contextos de filtro e lentidão extrema.'
        ],
        codeExamples: [
          {
            language: 'dax',
            title: 'Criação de Tabela Calendário Profissional em DAX',
            description: 'Tabela dCalendario completa com colunas de ordenação corretas',
            code: `dCalendario = 
VAR DataMinima = DATE(2024, 01, 01)
VAR DataMaxima = DATE(2027, 12, 31)
RETURN
ADDCOLUMNS (
    CALENDAR(DataMinima, DataMaxima),
    "Ano", YEAR([Date]),
    "AnoMesNum", FORMAT([Date], "YYYYMM"),
    "MesNome", FORMAT([Date], "mmmm"),
    "MesAbrev", FORMAT([Date], "mmm"),
    "MesNum", MONTH([Date]),
    "Trimestre", "T" & FORMAT([Date], "q"),
    "DiaSemana", FORMAT([Date], "dddd"),
    "DiaSemanaNum", WEEKDAY([Date], 2),
    "IsDiaUtil", IF(WEEKDAY([Date], 2) <= 5, TRUE(), FALSE())
)`
          }
        ],
        bestPractices: [
          {
            do: 'Ocultar chaves primárias e estrangeiras nas tabelas Fato para que os usuários usem apenas as colunas das Dimensões.',
            dont: 'Fazer cálculos calculando colunas calculadas na tabela Fato quando uma Medida DAX resolve o problema.',
            corporateImpact: 'Reduz o tamanho do arquivo .pbix em até 85% e acelera o carregamento dos visuais para menos de 1 segundo.'
          }
        ]
      },
      {
        id: 'dax-fundamentals',
        title: 'DAX Avançado: CALCULATE, Context Transition & Time Intelligence',
        subtitle: 'Como o DAX pensa: contexto de linha vs contexto de filtro',
        readTime: '9 min de leitura',
        content: `A função mais importante de todo o Power BI é a **CALCULATE**. Ela é a única função capaz de **modificar o contexto de filtro** de uma avaliação.

$$\\text{CALCULATE}(\\text{Expressão}, \\text{Filtro 1}, \\text{Filtro 2}, \\dots)$$

### Como Funciona:
1. Avalia os argumentos de filtro em um novo contexto.
2. Mescla esses filtros com os filtros externos vindos de segmentadores visuais da tela.
3. Se houver sobreposição, o filtro interno da CALCULATE sobrescreve o filtro externo.
4. Executa a expressão matemática sobre o subconjunto resultante.

### Funções Modificadoras de Contexto:
- **ALL(Tabela ou Coluna):** Remove todos os filtros, permitindo calcular percentuais sobre o total geral.
- **KEEPFILTERS():** Mantém o filtro externo existente em vez de substituí-lo.
- **USERELATIONSHIP():** Ativa relacionamentos inativos (ex: filtrar pela Data de Envio em vez da Data de Pedido).`,
        keyTakeaways: [
          'CALCULATE transforma automaticamente um Contexto de Linha em Contexto de Filtro (Transição de Contexto).',
          'Use sempre DIVIDE(numerador, denominador, 0) em vez da barra "/" para evitar erros de divisão por zero.'
        ],
        interactiveType: 'dax-runner',
        codeExamples: [
          {
            language: 'dax',
            title: 'Métricas de Crescimento MoM e Acumulado YTD',
            description: 'Medidas corporativas com Time Intelligence',
            code: `// Faturamento Acumulado no Ano Atual
Faturamento YTD = 
CALCULATE(
    [Faturamento Total],
    DATESYTD(dCalendario[Date])
)

// Faturamento do Mês Anterior (MoM)
Faturamento Mes Anterior = 
CALCULATE(
    [Faturamento Total],
    DATEADD(dCalendario[Date], -1, MONTH)
)

// Variação Percentual MoM
Crescimento MoM % = 
VAR Atual = [Faturamento Total]
VAR Anterior = [Faturamento Mes Anterior]
RETURN
DIVIDE(Atual - Anterior, Anterior, BLANK())`
          }
        ],
        bestPractices: [
          {
            do: 'Criar uma tabela vazia exclusiva chamada "_Medidas" para organizar todas as métricas em pastas organizadas.',
            dont: 'Espalhar medidas soltas dentro das tabelas de dimensão ou da tabela fato.',
            corporateImpact: 'Facilita a manutenção do relatório por múltiplos analistas e acelera auditorias.'
          }
        ]
      }
    ]
  },
  'python': {
    summary: 'Aprenda Python corporativo de alta fidelidade: manipulação com Pandas e Polars, cálculos estatísticos e geração de gráficos de alta resolução para relatórios de diretoria.',
    topics: [
      {
        id: 'pandas-vectorization',
        title: 'Pandas & Polars de Alto Desempenho',
        subtitle: 'Evite loops lentos e domine operações vetorizadas em milhões de linhas',
        readTime: '7 min de leitura',
        content: `No processamento de dados corporativos, loops convencionais (\`for row in df\`) são centenas de vezes mais lentos que **operações vetorizadas** em linguagem C/Rust executadas pelo Pandas e Polars.

### Regras de Ouro de Otimização:
1. **Nunca use iterrows() ou itertuples()** para transformações numéricas.
2. **Utilize tipos de dados eficientes (Downcasting):** Converta \`float64\` para \`float32\`, \`int64\` para \`int32\` e colunas de texto repetitivo para \`category\`. Isso reduz o consumo de RAM em até 80%.
3. **Prefira Polars para Big Data:** O Polars é multithread nativo em Rust, não sofre com o GIL (Global Interpreter Lock) do Python e processa agregações 10x mais rápido que o Pandas padrão.`,
        keyTakeaways: [
          'Vetorização transfere os cálculos diretamente para registradores SIMD da CPU.',
          'GroupBy combinado com .agg() permite calcular múltiplas métricas simultaneamente sem múltiplos escaneamentos de memória.'
        ],
        interactiveType: 'python-runner',
        codeExamples: [
          {
            language: 'python',
            title: 'Agrupamento Avançado e Análise RFV (Recência, Frequência e Valor)',
            description: 'Segmentação de clientes de alto valor em poucas linhas vetorizadas',
            code: `import pandas as pd
import numpy as np

def calcular_rfv_corporativo(df_vendas: pd.DataFrame, data_referencia: str) -> pd.DataFrame:
    df_vendas['data'] = pd.to_datetime(df_vendas['data'])
    ref = pd.to_datetime(data_referencia)
    
    rfv = df_vendas.groupby('cliente').agg(
        recencia_dias=('data', lambda x: (ref - x.max()).days),
        frequencia=('id', 'count'),
        valor_total=('valorVenda', 'sum'),
        ticket_medio=('valorVenda', 'mean')
    ).reset_index()
    
    # Atribuição de scores por quartis (1 a 4)
    rfv['r_score'] = pd.qcut(rfv['recencia_dias'], 4, labels=[4, 3, 2, 1])
    rfv['f_score'] = pd.qcut(rfv['frequencia'].rank(method='first'), 4, labels=[1, 2, 3, 4])
    rfv['v_score'] = pd.qcut(rfv['valor_total'], 4, labels=[1, 2, 3, 4])
    
    return rfv.sort_values(by='valor_total', ascending=False)`
          }
        ],
        bestPractices: [
          {
            do: 'Aplicar transformações usando np.select ou np.where para regras condicionais com múltiplos critérios.',
            dont: 'Usar df.apply(lambda ...) com funções Python pesadas dentro de colunas com mais de 500 mil registros.',
            corporateImpact: 'Execuções de ETL diárias caem de 45 minutos para 30 segundos.'
          }
        ]
      }
    ]
  },
  'sql-databases': {
    summary: 'Domine bancos relacionais corporativos (PostgreSQL, MySQL, SQL Server) com técnicas avançadas de Window Functions, CTEs recursivas e tuning de planos de execução.',
    topics: [
      {
        id: 'window-functions',
        title: 'Window Functions: ROW_NUMBER, RANK, DENSE_RANK, LAG e LEAD',
        subtitle: 'Como realizar cálculos acumulados e comparativos sem subconsultas lentas',
        readTime: '8 min de leitura',
        content: `As **Window Functions** operam sobre um conjunto de linhas (janela) mantendo a identidade individual de cada registro, ao contrário de um \`GROUP BY\` comum que colapsa as linhas.

$$\\text{FUNÇÃO}() \\text{ OVER } (\\text{PARTITION BY } col_1 \\text{ ORDER BY } col_2)$$

### As Funções Essenciais:
- **ROW_NUMBER():** Numera sequencialmente cada linha dentro da partição. Excelente para deduplicação (filtrar \`WHERE rn = 1\`).
- **DENSE_RANK():** Classifica sem pular números em caso de empates.
- **LAG(coluna, N):** Acessa o valor da linha anterior (essencial para calcular crescimento MoM).
- **LEAD(coluna, N):** Acessa o valor da linha posterior.
- **SUM(coluna) OVER (ORDER BY data):** Cria o acumulado no ano (Running Total) de forma instantânea.`,
        keyTakeaways: [
          'Window functions são executadas APÓS a cláusula WHERE, portanto não podem ser filtradas diretamente no WHERE sem uma subquery ou CTE.',
          'PARTITION BY particiona o cálculo em blocos de memória isolados, garantindo alta escalabilidade.'
        ],
        interactiveType: 'sql-runner',
        codeExamples: [
          {
            language: 'sql',
            title: 'Top 3 Clientes por Região com Crescimento MoM',
            description: 'Consulta avançada utilizando CTE e Window Functions',
            code: `WITH faturamento_cliente AS (
    SELECT 
        regiao,
        cliente,
        SUM(valor_venda) AS faturamento,
        DENSE_RANK() OVER(PARTITION BY regiao ORDER BY SUM(valor_venda) DESC) AS rank_regional
    FROM transacoes_vendas
    WHERE status = 'Concluído'
    GROUP BY regiao, cliente
)
SELECT 
    regiao,
    rank_regional,
    cliente,
    faturamento
FROM faturamento_cliente
WHERE rank_regional <= 3
ORDER BY regiao, rank_regional;`
          }
        ],
        bestPractices: [
          {
            do: 'Criar índices compostos que cubram as colunas usadas no PARTITION BY e no ORDER BY da janela.',
            dont: 'Fazer auto-relacionamentos (SELF JOINs) desnecessários quando uma simples função LAG() resolve o problema.',
            corporateImpact: 'Consultas que travavam o servidor de produção agora rodam em milissegundos.'
          }
        ]
      }
    ]
  },
  'ai-automation': {
    summary: 'Automatize a esteira analítica inteira: geração de relatórios autônomos com IA, NL-to-SQL e modelos de Machine Learning para predição de churn e demanda.',
    topics: [
      {
        id: 'generative-bi',
        title: 'Generative BI & Análise com Modelos de Linguagem',
        subtitle: 'Como utilizar IA para interpretar padrões complexos e redigir sínteses executivas',
        readTime: '6 min de leitura',
        content: `A Inteligência Artificial moderna não substitui o analista de dados, mas multiplica sua produtividade por 10x ao automatizar as tarefas repetitivas de extração, tradução de linguagem natural para SQL e redação de relatórios.

### Casos de Uso Corporativos de Alto Retorno:
1. **NL-to-SQL (Text to Query):** Permitir que diretores façam perguntas em linguagem natural e recebam a consulta SQL validada com esquema corporativo.
2. **Sumarização Executiva Automática:** A IA analisa uma tabela de KPIs e redige o parágrafo de introdução para a diretoria, destacando as 3 maiores anomalias do mês.
3. **Detecção de Anomalias Não Supervisionada:** Algoritmos como Isolation Forest identificando variações atípicas em custos logísticos em tempo real.`,
        keyTakeaways: [
          'Nunca envie dados corporativos sensíveis (LGPD / PII) desprotegidos para modelos de IA públicos. Utilize prompts com esquemas anonimizados.',
          'Valide sempre a sintaxe gerada antes de executar em bases de dados transacionais de produção.'
        ],
        codeExamples: [
          {
            language: 'python',
            title: 'Agente de Alerta de Churn Automatizado com Envio de E-mail',
            description: 'Script que detecta queda brusca de engajamento e dispara plano de retenção',
            code: `import pandas as pd

def monitorar_risco_churn(clientes_df: pd.DataFrame, limiar_dias_sem_compra=60):
    """Identifica clientes estratégicos com risco imediato de cancelamento."""
    em_risco = clientes_df[
        (clientes_df['dias_inatividade'] > limiar_dias_sem_compra) &
        (clientes_df['segmento'].isin(['VIP', 'B2B']))
    ]
    
    print(f"ALERTA: {len(em_risco)} clientes estratégicos em zona de perigo de churn!")
    return em_risco[['cliente', 'dias_inatividade', 'valor_ltv']]`
          }
        ],
        bestPractices: [
          {
            do: 'Configurar limites de confiança e salvaguardas (guardrails) em agentes que automatizam relatórios.',
            dont: 'Permitir que agentes de IA façam comandos de escrita (UPDATE/DELETE) sem aprovação humana prévia.',
            corporateImpact: 'Garante 100% de precisão e segurança na esteira analítica da empresa.'
          }
        ]
      }
    ]
  }
};
