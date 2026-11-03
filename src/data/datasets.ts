import { RetailTransaction, SaaSMetricRecord, FinancialRecord, InventoryRecord, KPIMetric } from '../types';

export const retailSalesDataset: RetailTransaction[] = [
  { id: 'PED-1001', data: '2026-03-01', cliente: 'TechCorp Brasil', segmento: 'B2B', regiao: 'Sudeste', canal: 'Representante', categoria: 'Informática', valorVenda: 14500, custoProduto: 8900, descontoPercent: 5, qtdItens: 6, status: 'Concluído' },
  { id: 'PED-1002', data: '2026-03-01', cliente: 'Lucas Silva', segmento: 'B2C', regiao: 'Sul', canal: 'E-commerce', categoria: 'Eletrônicos', valorVenda: 3200, custoProduto: 1950, descontoPercent: 0, qtdItens: 1, status: 'Concluído' },
  { id: 'PED-1003', data: '2026-03-02', cliente: 'Marina Andrade', segmento: 'VIP', regiao: 'Sudeste', canal: 'App Mobile', categoria: 'Vestuário', valorVenda: 1850, custoProduto: 620, descontoPercent: 10, qtdItens: 4, status: 'Concluído' },
  { id: 'PED-1004', data: '2026-03-02', cliente: 'Inovação Logística Ltda', segmento: 'B2B', regiao: 'Nordeste', canal: 'Representante', categoria: 'Móveis', valorVenda: 28400, custoProduto: 16500, descontoPercent: 8, qtdItens: 12, status: 'Concluído' },
  { id: 'PED-1005', data: '2026-03-03', cliente: 'Carlos Eduardo', segmento: 'B2C', regiao: 'Centro-Oeste', canal: 'Loja Física', categoria: 'Alimentos', valorVenda: 450, custoProduto: 280, descontoPercent: 0, qtdItens: 8, status: 'Concluído' },
  { id: 'PED-1006', data: '2026-03-03', cliente: 'Grupo Varejo Sul', segmento: 'B2B', regiao: 'Sul', canal: 'E-commerce', categoria: 'Informática', valorVenda: 9800, custoProduto: 6100, descontoPercent: 4, qtdItens: 5, status: 'Concluído' },
  { id: 'PED-1007', data: '2026-03-04', cliente: 'Beatriz Ramos', segmento: 'B2C', regiao: 'Sudeste', canal: 'App Mobile', categoria: 'Eletrônicos', valorVenda: 2400, custoProduto: 1500, descontoPercent: 0, qtdItens: 1, status: 'Devolvido' },
  { id: 'PED-1008', data: '2026-03-04', cliente: 'Empório Nacional', segmento: 'B2B', regiao: 'Norte', canal: 'Representante', categoria: 'Alimentos', valorVenda: 16200, custoProduto: 10800, descontoPercent: 5, qtdItens: 35, status: 'Concluído' },
  { id: 'PED-1009', data: '2026-03-05', cliente: 'Juliana Costa', segmento: 'VIP', regiao: 'Sudeste', canal: 'E-commerce', categoria: 'Vestuário', valorVenda: 4200, custoProduto: 1300, descontoPercent: 12, qtdItens: 7, status: 'Concluído' },
  { id: 'PED-1010', data: '2026-03-05', cliente: 'DataSystems SA', segmento: 'B2B', regiao: 'Sudeste', canal: 'Representante', categoria: 'Informática', valorVenda: 42000, custoProduto: 26000, descontoPercent: 7, qtdItens: 18, status: 'Concluído' },
  { id: 'PED-1011', data: '2026-03-06', cliente: 'Rafael Mendes', segmento: 'B2C', regiao: 'Nordeste', canal: 'Loja Física', categoria: 'Móveis', valorVenda: 1950, custoProduto: 1100, descontoPercent: 0, qtdItens: 2, status: 'Concluído' },
  { id: 'PED-1012', data: '2026-03-06', cliente: 'Construções Alfa', segmento: 'B2B', regiao: 'Centro-Oeste', canal: 'Representante', categoria: 'Móveis', valorVenda: 18600, custoProduto: 11200, descontoPercent: 6, qtdItens: 8, status: 'Concluído' },
  { id: 'PED-1013', data: '2026-03-07', cliente: 'Camila Pires', segmento: 'VIP', regiao: 'Sul', canal: 'App Mobile', categoria: 'Eletrônicos', valorVenda: 5800, custoProduto: 3600, descontoPercent: 5, qtdItens: 2, status: 'Concluído' },
  { id: 'PED-1014', data: '2026-03-07', cliente: 'Felipe Santana', segmento: 'B2C', regiao: 'Sudeste', canal: 'E-commerce', categoria: 'Alimentos', valorVenda: 680, custoProduto: 410, descontoPercent: 0, qtdItens: 10, status: 'Concluído' },
  { id: 'PED-1015', data: '2026-03-08', cliente: 'AgroPlus Brasil', segmento: 'B2B', regiao: 'Centro-Oeste', canal: 'Representante', categoria: 'Informática', valorVenda: 31000, custoProduto: 19500, descontoPercent: 6, qtdItens: 14, status: 'Concluído' },
  { id: 'PED-1016', data: '2026-03-08', cliente: 'Renata Albuquerque', segmento: 'VIP', regiao: 'Sudeste', canal: 'Loja Física', categoria: 'Vestuário', valorVenda: 3100, custoProduto: 980, descontoPercent: 0, qtdItens: 5, status: 'Concluído' },
  { id: 'PED-1017', data: '2026-03-09', cliente: 'Hospitalar Vida', segmento: 'B2B', regiao: 'Nordeste', canal: 'Representante', categoria: 'Informática', valorVenda: 22400, custoProduto: 14100, descontoPercent: 4, qtdItens: 9, status: 'Concluído' },
  { id: 'PED-1018', data: '2026-03-09', cliente: 'Gustavo Lima', segmento: 'B2C', regiao: 'Sul', canal: 'E-commerce', categoria: 'Eletrônicos', valorVenda: 1400, custoProduto: 900, descontoPercent: 0, qtdItens: 1, status: 'Devolvido' },
  { id: 'PED-1019', data: '2026-03-10', cliente: 'Supermercados Estrela', segmento: 'B2B', regiao: 'Sudeste', canal: 'Representante', categoria: 'Alimentos', valorVenda: 54000, custoProduto: 37800, descontoPercent: 8, qtdItens: 90, status: 'Concluído' },
  { id: 'PED-1020', data: '2026-03-10', cliente: 'Fernanda Rocha', segmento: 'VIP', regiao: 'Sudeste', canal: 'App Mobile', categoria: 'Informática', valorVenda: 7600, custoProduto: 4800, descontoPercent: 5, qtdItens: 2, status: 'Concluído' },
];

export const saasMetricsDataset: SaaSMetricRecord[] = [
  { mes: 'Out/25', mrr: 184500, novosClientes: 32, clientesCancelados: 5, clientesAtivos: 340, arpu: 542, churnRatePercent: 1.5, cac: 2150, ltv: 16800, nrrPercent: 109.2 },
  { mes: 'Nov/25', mrr: 201200, novosClientes: 38, clientesCancelados: 4, clientesAtivos: 374, arpu: 538, churnRatePercent: 1.2, cac: 2200, ltv: 17200, nrrPercent: 111.4 },
  { mes: 'Dez/25', mrr: 219800, novosClientes: 44, clientesCancelados: 6, clientesAtivos: 412, arpu: 533, churnRatePercent: 1.6, cac: 2080, ltv: 17500, nrrPercent: 112.8 },
  { mes: 'Jan/26', mrr: 236400, novosClientes: 35, clientesCancelados: 7, clientesAtivos: 440, arpu: 537, churnRatePercent: 1.7, cac: 2310, ltv: 17900, nrrPercent: 110.5 },
  { mes: 'Fev/26', mrr: 258000, novosClientes: 42, clientesCancelados: 5, clientesAtivos: 477, arpu: 541, churnRatePercent: 1.1, cac: 2190, ltv: 18400, nrrPercent: 114.1 },
  { mes: 'Mar/26', mrr: 284300, novosClientes: 49, clientesCancelados: 4, clientesAtivos: 522, arpu: 545, churnRatePercent: 0.8, cac: 2050, ltv: 19200, nrrPercent: 116.5 },
];

export const financialIncomeDataset: FinancialRecord[] = [
  { periodo: 'Q1-2025', receitaBruta: 1250000, impostosDeducoes: 175000, receitaLiquida: 1075000, cmv: 520000, lucroBruto: 555000, despesasOperacionais: 310000, ebitda: 245000, depreciacaoAmortizacao: 35000, ebit: 210000, resultadoFinanceiro: -18000, lucroLiquido: 138240, margemEbitdaPercent: 22.8, margemLiquidaPercent: 12.9 },
  { periodo: 'Q2-2025', receitaBruta: 1420000, impostosDeducoes: 198800, receitaLiquida: 1221200, cmv: 585000, lucroBruto: 636200, despesasOperacionais: 335000, ebitda: 301200, depreciacaoAmortizacao: 38000, ebit: 263200, resultadoFinanceiro: -20000, lucroLiquido: 175104, margemEbitdaPercent: 24.7, margemLiquidaPercent: 14.3 },
  { periodo: 'Q3-2025', receitaBruta: 1580000, impostosDeducoes: 221200, receitaLiquida: 1358800, cmv: 642000, lucroBruto: 716800, despesasOperacionais: 360000, ebitda: 356800, depreciacaoAmortizacao: 41000, ebit: 315800, resultadoFinanceiro: -22000, lucroLiquido: 211536, margemEbitdaPercent: 26.3, margemLiquidaPercent: 15.6 },
  { periodo: 'Q4-2025', receitaBruta: 1940000, impostosDeducoes: 271600, receitaLiquida: 1668400, cmv: 780000, lucroBruto: 888400, despesasOperacionais: 415000, ebitda: 473400, depreciacaoAmortizacao: 45000, ebit: 428400, resultadoFinanceiro: -25000, lucroLiquido: 290448, margemEbitdaPercent: 28.4, margemLiquidaPercent: 17.4 },
  { periodo: 'Q1-2026', receitaBruta: 2180000, impostosDeducoes: 305200, receitaLiquida: 1874800, cmv: 865000, lucroBruto: 1009800, despesasOperacionais: 440000, ebitda: 569800, depreciacaoAmortizacao: 48000, ebit: 521800, resultadoFinanceiro: -28000, lucroLiquido: 355536, margemEbitdaPercent: 30.4, margemLiquidaPercent: 19.0 },
];

export const inventoryDataset: InventoryRecord[] = [
  { sku: 'SKU-SRV-901', produto: 'Servidor Blade Xeon Gold', categoria: 'Infraestrutura', estoqueAtual: 24, estoqueMinimo: 8, custoUnitario: 14500, valorTotalEstoque: 348000, vendaMensalMedia: 10, giroEstoque: 5.0, leadTimeDias: 35, classeABC: 'A', statusRisco: 'Normal' },
  { sku: 'SKU-SWT-402', produto: 'Switch Gerenciável 48p 10Gb', categoria: 'Redes', estoqueAtual: 45, estoqueMinimo: 15, custoUnitario: 5200, valorTotalEstoque: 234000, vendaMensalMedia: 18, giroEstoque: 4.8, leadTimeDias: 25, classeABC: 'A', statusRisco: 'Normal' },
  { sku: 'SKU-STG-108', produto: 'Array All-Flash NVMe 32TB', categoria: 'Storage', estoqueAtual: 12, estoqueMinimo: 5, custoUnitario: 18900, valorTotalEstoque: 226800, vendaMensalMedia: 4, giroEstoque: 4.0, leadTimeDias: 45, classeABC: 'A', statusRisco: 'Ruptura Iminente' },
  { sku: 'SKU-FWL-301', produto: 'Firewall Next-Gen Enterprise', categoria: 'Segurança', estoqueAtual: 18, estoqueMinimo: 6, custoUnitario: 9400, valorTotalEstoque: 169200, vendaMensalMedia: 7, giroEstoque: 4.7, leadTimeDias: 20, classeABC: 'B', statusRisco: 'Normal' },
  { sku: 'SKU-APC-550', produto: 'Nobreak Modular Senoidal 10kVA', categoria: 'Energia', estoqueAtual: 15, estoqueMinimo: 6, custoUnitario: 7800, valorTotalEstoque: 117000, vendaMensalMedia: 5, giroEstoque: 4.0, leadTimeDias: 30, classeABC: 'B', statusRisco: 'Normal' },
  { sku: 'SKU-CAB-012', produto: 'Bobina Cabo Cat6A 305m', categoria: 'Conectividade', estoqueAtual: 85, estoqueMinimo: 20, custoUnitario: 890, valorTotalEstoque: 75650, vendaMensalMedia: 32, giroEstoque: 4.5, leadTimeDias: 10, classeABC: 'B', statusRisco: 'Normal' },
  { sku: 'SKU-PTC-005', produto: 'Patch Panel Cat6 24 Portas', categoria: 'Acessórios', estoqueAtual: 120, estoqueMinimo: 30, custoUnitario: 280, valorTotalEstoque: 33600, vendaMensalMedia: 45, giroEstoque: 4.5, leadTimeDias: 12, classeABC: 'C', statusRisco: 'Normal' },
  { sku: 'SKU-SFP-099', produto: 'Transceiver Óptico SFP+ 10G', categoria: 'Conectividade', estoqueAtual: 210, estoqueMinimo: 50, custoUnitario: 140, valorTotalEstoque: 29400, vendaMensalMedia: 80, giroEstoque: 4.6, leadTimeDias: 15, classeABC: 'C', statusRisco: 'Normal' },
  { sku: 'SKU-GAV-001', produto: 'Organizador Horizontal de Cabos 1U', categoria: 'Racks', estoqueAtual: 290, estoqueMinimo: 40, custoUnitario: 65, valorTotalEstoque: 18850, vendaMensalMedia: 35, giroEstoque: 1.5, leadTimeDias: 10, classeABC: 'C', statusRisco: 'Excesso / Obsoleto' },
];

export const corporateKpisList: KPIMetric[] = [
  {
    id: 'kpi-cac',
    nome: 'CAC (Custo de Aquisição de Clientes)',
    area: 'Vendas & Crescimento',
    formula: 'Soma dos Investimentos em Marketing + Vendas / Total de Novos Clientes',
    definicao: 'Mede o esforço financeiro direto e indireto para conquistar cada novo comprador corporativo ou assinante.',
    benchmarkMercado: 'Em B2B/SaaS, a meta é recuperar o CAC em até 12 meses (CAC Payback < 12m).',
    exemploDax: `CAC = 
VAR TotalInvestimento = [Total Gastos Marketing] + [Total Gastos Vendas]
VAR NovosClientes = DISTINCTCOUNT('Clientes'[ClienteID])
RETURN DIVIDE(TotalInvestimento, NovosClientes, 0)`,
    exemploSql: `SELECT 
  DATE_TRUNC('month', data_investimento) AS mes,
  SUM(valor_marketing + valor_vendas) / COUNT(DISTINCT novo_cliente_id) AS cac_medio
FROM investimentos_aquisicao
GROUP BY 1 ORDER BY 1 DESC;`,
    exemploPython: `def calcular_cac(custos_mkt_vendas, novos_clientes):
    return custos_mkt_vendas / max(novos_clientes, 1)`
  },
  {
    id: 'kpi-ltv',
    nome: 'LTV (Lifetime Value)',
    area: 'SaaS & Assinatura',
    formula: 'ARPU (Ticket Médio) x Margem Bruta (%) / Churn Rate (%)',
    definicao: 'Estima o valor presente líquido que o cliente gerará para a empresa durante todo o seu ciclo de vida contratual.',
    benchmarkMercado: 'A proporção LTV / CAC saudável para scale-ups corporativas é de no mínimo 3.0x a 5.0x.',
    exemploDax: `LTV = 
VAR Arpu = [Ticket Medio Mensal]
VAR Margem = [Margem Bruta %]
VAR Churn = [Taxa Churn Mensal]
RETURN DIVIDE(Arpu * Margem, Churn, 0)`,
    exemploSql: `WITH metricas AS (
  SELECT 
    AVG(valor_mensalidade) AS arpu,
    AVG(margem_bruta_pct) AS margem,
    AVG(taxa_churn_pct) / 100 AS churn
  FROM kpi_mensal
)
SELECT (arpu * margem) / NULLIF(churn, 0) AS ltv_projetado FROM metricas;`,
    exemploPython: `def calcular_ltv(arpu, margem_bruta_pct, churn_rate_pct):
    if churn_rate_pct <= 0: return float('inf')
    return (arpu * (margem_bruta_pct / 100.0)) / (churn_rate_pct / 100.0)`
  },
  {
    id: 'kpi-ebitda',
    nome: 'Margem EBITDA',
    area: 'Finanças & Rentabilidade',
    formula: '(Lucro Operacional antes de Juros, Impostos, Depreciação e Amortização) / Receita Líquida',
    definicao: 'Indicador padrão-ouro de geração de caixa operacional da operação pura, sem distorções tributárias ou de endividamento.',
    benchmarkMercado: 'Varia entre 18% a 35% dependendo do setor corporativo (tecnologia/software costuma superar 30%).',
    exemploDax: `Margem EBITDA % = 
DIVIDE([EBITDA Gerencial], [Receita Liquida], BLANK())`,
    exemploSql: `SELECT 
  ano_fiscal,
  (SUM(lucro_bruto) - SUM(despesas_operacionais_sem_depreciacao)) 
  / NULLIF(SUM(receita_liquida), 0) * 100 AS margem_ebitda_pct
FROM dre_gerencial
GROUP BY ano_fiscal;`,
    exemploPython: `def margem_ebitda(ebitda, receita_liquida):
    return (ebitda / receita_liquida) * 100 if receita_liquida > 0 else 0`
  },
  {
    id: 'kpi-nrr',
    nome: 'NRR (Net Revenue Retention)',
    area: 'SaaS & Assinatura',
    formula: '(MRR Inicial + Expansões - Contratos Reduzidos - Churn) / MRR Inicial x 100',
    definicao: 'Mede o crescimento da receita vindo da mesma base de clientes existentes ao longo de um período, sem contar novos clientes.',
    benchmarkMercado: 'Empresas SaaS "Top-Quartile" possuem NRR superior a 115%-125%. Acima de 100% significa crescimento orgânico líquido.',
    exemploDax: `NRR % = 
VAR MrrBase = [MRR Inicio Mes]
VAR Expansao = [MRR Expansao Upsell]
VAR Contracao = [MRR Downgrade]
VAR Churn = [MRR Cancelamento]
RETURN DIVIDE(MrrBase + Expansao - Contracao - Churn, MrrBase, 0) * 100`,
    exemploSql: `SELECT 
  cohort_mes,
  ((mrr_inicio + mrr_upsell - mrr_downgrade - mrr_churn) / NULLIF(mrr_inicio, 0)) * 100 AS nrr_pct
FROM coorte_receita;`,
    exemploPython: `def calcular_nrr(mrr_inicio, upsell, downgrade, churn):
    return ((mrr_inicio + upsell - downgrade - churn) / mrr_inicio) * 100`
  },
  {
    id: 'kpi-giro-estoque',
    nome: 'Giro de Estoque (Inventory Turnover)',
    area: 'Supply Chain & Operações',
    formula: 'CMV Anual (Custo das Mercadorias Vendidas) / Estoque Médio Valorizado',
    definicao: 'Frequência com que o estoque é totalmente renovado e convertido em vendas durante um período contábil.',
    benchmarkMercado: 'Média de 4 a 8 giros ao ano para bens duráveis; varejo de perecíveis chega a 20+ giros.',
    exemploDax: `Giro de Estoque = 
DIVIDE([CMV Acumulado 12M], [Estoque Medio Valorizado], 0)`,
    exemploSql: `SELECT 
  categoria_produto,
  SUM(cmv_12m) / NULLIF(AVG(custo_estoque_medio), 0) AS giro_anual
FROM estoque_posicao
GROUP BY categoria_produto;`,
    exemploPython: `def giro_estoque(cmv_total, estoque_medio):
    return cmv_total / max(estoque_medio, 1)`
  }
];
