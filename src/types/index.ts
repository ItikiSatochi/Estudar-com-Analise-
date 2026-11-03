export type ModuleId = 
  | 'overview'
  | 'data-analysis'
  | 'storytelling'
  | 'power-bi'
  | 'python'
  | 'sql-databases'
  | 'ai-automation'
  | 'corporate-projects'
  | 'kpi-dictionary';

export interface ModuleInfo {
  id: ModuleId;
  title: string;
  shortTitle: string;
  tagline: string;
  icon: string;
  level: 'Iniciante' | 'Intermediário' | 'Avançado' | 'Executivo';
  topicsCount: number;
  description: string;
}

export interface TopicSection {
  id: string;
  title: string;
  subtitle: string;
  readTime: string;
  content: string; // Markdown or rich text
  keyTakeaways: string[];
  codeExamples?: {
    language: 'python' | 'sql' | 'dax' | 'json';
    title: string;
    description: string;
    code: string;
  }[];
  bestPractices: {
    do: string;
    dont: string;
    corporateImpact: string;
  }[];
  interactiveType?: 'storytelling-before-after' | 'dax-runner' | 'sql-runner' | 'python-runner' | 'pipeline-simulator';
}

export interface RetailTransaction {
  id: string;
  data: string;
  cliente: string;
  segmento: 'B2B' | 'B2C' | 'VIP';
  regiao: 'Sudeste' | 'Sul' | 'Nordeste' | 'Centro-Oeste' | 'Norte';
  canal: 'E-commerce' | 'Loja Física' | 'App Mobile' | 'Representante';
  categoria: 'Eletrônicos' | 'Móveis' | 'Vestuário' | 'Alimentos' | 'Informática';
  valorVenda: number;
  custoProduto: number;
  descontoPercent: number;
  qtdItens: number;
  status: 'Concluído' | 'Devolvido' | 'Em Trânsito';
}

export interface SaaSMetricRecord {
  mes: string;
  mrr: number;
  novosClientes: number;
  clientesCancelados: number;
  clientesAtivos: number;
  arpu: number;
  churnRatePercent: number;
  cac: number;
  ltv: number;
  nrrPercent: number;
}

export interface FinancialRecord {
  periodo: string;
  receitaBruta: number;
  impostosDeducoes: number;
  receitaLiquida: number;
  cmv: number; // Custo Mercadoria Vendida
  lucroBruto: number;
  despesasOperacionais: number;
  ebitda: number;
  depreciacaoAmortizacao: number;
  ebit: number;
  resultadoFinanceiro: number;
  lucroLiquido: number;
  margemEbitdaPercent: number;
  margemLiquidaPercent: number;
}

export interface InventoryRecord {
  sku: string;
  produto: string;
  categoria: string;
  estoqueAtual: number;
  estoqueMinimo: number;
  custoUnitario: number;
  valorTotalEstoque: number;
  vendaMensalMedia: number;
  giroEstoque: number;
  leadTimeDias: number;
  classeABC: 'A' | 'B' | 'C';
  statusRisco: 'Normal' | 'Ruptura Iminente' | 'Excesso / Obsoleto';
}

export interface KPIMetric {
  id: string;
  nome: string;
  area: 'Vendas & Crescimento' | 'SaaS & Assinatura' | 'Finanças & Rentabilidade' | 'Supply Chain & Operações' | 'Customer Experience';
  formula: string;
  definicao: string;
  benchmarkMercado: string;
  exemploDax?: string;
  exemploSql?: string;
  exemploPython?: string;
}
