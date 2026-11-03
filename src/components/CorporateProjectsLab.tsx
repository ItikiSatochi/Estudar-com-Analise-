import React, { useState, useMemo } from 'react';
import { 
  Briefcase, 
  Download, 
  FileSpreadsheet, 
  FileText, 
  Sparkles, 
  Filter, 
  TrendingUp, 
  AlertTriangle, 
  Layers, 
  Search,
  CheckCircle2,
  DollarSign,
  Users,
  Package,
  Calendar
} from 'lucide-react';
import { 
  retailSalesDataset, 
  saasMetricsDataset, 
  financialIncomeDataset, 
  inventoryDataset 
} from '../data/datasets';
import { 
  formatCurrency, 
  formatPercent, 
  formatNumberCompact, 
  calculateRetailKPIs, 
  calculateSaaSOverview, 
  calculateCurvaABC,
  convertToCSV, 
  downloadFile,
  generateExecutiveReportMarkdown
} from '../utils/analytics';
import { useTheme } from '../context/ThemeContext';

interface Props {
  onOpenAiInsights?: (context: { title: string; data: any; summary: any }) => void;
  onOpenExportModal?: (context: { title: string; data: any; reportMarkdown: string }) => void;
}

export const CorporateProjectsLab: React.FC<Props> = ({ onOpenAiInsights, onOpenExportModal }) => {
  const { isClean } = useTheme();
  const [activeCase, setActiveCase] = useState<'retail' | 'saas' | 'finance' | 'supply'>('retail');
  const [hoveredSaasPoint, setHoveredSaasPoint] = useState<number | null>(null);

  // Retail Filters
  const [retailRegion, setRetailRegion] = useState<string>('Todas');
  const [retailSegment, setRetailSegment] = useState<string>('Todos');
  const [retailChannel, setRetailChannel] = useState<string>('Todos');
  const [retailSearch, setRetailSearch] = useState<string>('');

  // Filtered Retail Transactions
  const filteredRetail = useMemo(() => {
    return retailSalesDataset.filter(t => {
      const matchRegion = retailRegion === 'Todas' || t.regiao === retailRegion;
      const matchSegment = retailSegment === 'Todos' || t.segmento === retailSegment;
      const matchChannel = retailChannel === 'Todos' || t.canal === retailChannel;
      const matchSearch = retailSearch === '' || 
        t.cliente.toLowerCase().includes(retailSearch.toLowerCase()) ||
        t.categoria.toLowerCase().includes(retailSearch.toLowerCase()) ||
        t.id.toLowerCase().includes(retailSearch.toLowerCase());
      return matchRegion && matchSegment && matchChannel && matchSearch;
    });
  }, [retailRegion, retailSegment, retailChannel, retailSearch]);

  const retailKPIs = useMemo(() => calculateRetailKPIs(filteredRetail), [filteredRetail]);
  const saasKPIs = useMemo(() => calculateSaaSOverview(saasMetricsDataset), []);
  const inventoryABC = useMemo(() => calculateCurvaABC(inventoryDataset), []);

  // Quick CSV Export Handler
  const handleQuickExportCSV = (caseType: string) => {
    let data: any[] = [];
    let filename = `case_${caseType}.csv`;

    if (caseType === 'retail') {
      data = filteredRetail.map(r => ({
        ID_Pedido: r.id,
        Data: r.data,
        Cliente: r.cliente,
        Segmento: r.segmento,
        Regiao: r.regiao,
        Canal: r.canal,
        Categoria: r.categoria,
        Valor_Bruto: r.valorVenda,
        Desconto_Pct: r.descontoPercent,
        Valor_Liquido: r.valorVenda * (1 - r.descontoPercent / 100),
        Status: r.status,
      }));
    } else if (caseType === 'saas') {
      data = saasMetricsDataset;
      filename = 'case_saas_metrics.csv';
    } else if (caseType === 'finance') {
      data = financialIncomeDataset;
      filename = 'case_dre_financeiro.csv';
    } else if (caseType === 'supply') {
      data = inventoryABC;
      filename = 'case_supply_curva_abc.csv';
    }

    const csv = convertToCSV(data);
    downloadFile(csv, filename, 'text/csv;charset=utf-8;');
  };

  // Quick JSON Export
  const handleQuickExportJSON = (caseType: string) => {
    let data: any[] = [];
    let filename = `case_${caseType}.json`;

    if (caseType === 'retail') data = filteredRetail;
    else if (caseType === 'saas') data = saasMetricsDataset;
    else if (caseType === 'finance') data = financialIncomeDataset;
    else if (caseType === 'supply') data = inventoryABC;

    const json = JSON.stringify(data, null, 2);
    downloadFile(json, filename, 'application/json');
  };

  // Quick Executive Report Markdown Generation
  const handleGenerateReport = (caseType: string) => {
    let title = '';
    let summary: any[] = [];
    let insights: string[] = [];
    let recs: string[] = [];
    let exportData: any[] = [];

    if (caseType === 'retail') {
      title = 'Varejo Omnichannel & Rentabilidade de Canais';
      summary = [
        { title: 'Faturamento Líquido Total', value: formatCurrency(retailKPIs.faturamentoTotal) },
        { title: 'Lucro Bruto Consolidado', value: formatCurrency(retailKPIs.lucroBrutoTotal) },
        { title: 'Margem Bruta Média', value: formatPercent(retailKPIs.margemBrutaPercent) },
        { title: 'Ticket Médio por Pedido', value: formatCurrency(retailKPIs.ticketMedio) },
        { title: 'Taxa de Devolução', value: formatPercent(retailKPIs.taxaDevolucaoPercent) },
      ];
      insights = [
        'O canal Representante Corporativo concentra mais de 60% do faturamento, impulsionado por compras B2B com ticket médio elevado.',
        'A categoria de Informática apresenta a maior margem de contribuição líquida (44,5%), enquanto Vestuário sofre com descontos excessivos de até 12%.',
        'Taxa de devoluções concentra-se no canal App Mobile para a categoria de Eletrônicos (necessidade de revisar descrição técnica na plataforma).',
      ];
      recs = [
        'Impor teto de desconto de no máximo 5% para pedidos corporativos sem aprovação de diretoria.',
        'Escalar o programa de incentivo para Representantes nas regiões Nordeste e Centro-Oeste.',
        'Implementar validação de especificações no App Mobile para reduzir devoluções de Eletrônicos.',
      ];
      exportData = filteredRetail;
    } else if (caseType === 'saas') {
      title = 'SaaS Tech B2B - MRR, LTV, CAC & Retenção';
      summary = [
        { title: 'MRR Atual (Março/2026)', value: formatCurrency(saasKPIs.mrrAtual) },
        { title: 'ARR Projetado (Anualizado)', value: formatCurrency(saasKPIs.arrProjetado) },
        { title: 'LTV / CAC Ratio', value: `${saasKPIs.ltvCacRatio}x (Saudável > 3.0x)` },
        { title: 'Churn Rate Médio Mensal', value: formatPercent(saasKPIs.churnRateMedioPercent) },
        { title: 'NRR Médio (Net Retention)', value: formatPercent(saasKPIs.nrrMedioPercent) },
      ];
      insights = [
        'NRR consistente acima de 116% em Março/2026 indica que a base existente está expandindo via upsell mais rápido do que cancelamentos.',
        'CAC Payback caiu para 4,2 meses, demonstrando alta eficiência no funil de vendas inbound corporativo.',
        'O churn caiu de 1,7% em Janeiro para 0,8% em Março após implementação de squads dedicadas de Customer Success.',
      ];
      recs = [
        'Aumentar o investimento em campanhas de expansão de licenças (upsell) para contas Enterprise.',
        'Testar plano anual pré-pago com desconto para travar o churn por 12 meses.',
        'Reforçar o time de onboarding técnico para acelerar o Time to Value (TTV) dos novos clientes.',
      ];
      exportData = saasMetricsDataset;
    } else if (caseType === 'finance') {
      title = 'Finanças Corporativas - DRE Gerencial & EBITDA';
      const ultimo = financialIncomeDataset[financialIncomeDataset.length - 1];
      summary = [
        { title: 'Receita Líquida Q1-2026', value: formatCurrency(ultimo.receitaLiquida) },
        { title: 'Lucro Bruto Q1-2026', value: formatCurrency(ultimo.lucroBruto) },
        { title: 'EBITDA Q1-2026', value: formatCurrency(ultimo.ebitda) },
        { title: 'Margem EBITDA', value: formatPercent(ultimo.margemEbitdaPercent) },
        { title: 'Lucro Líquido', value: formatCurrency(ultimo.lucroLiquido) },
      ];
      insights = [
        'Margem EBITDA expandiu de 22,8% em Q1-2025 para 30,4% em Q1-2026 graças a ganhos de escala operacional.',
        'Despesas operacionais cresceram em ritmo inferior à receita (+41% receita vs +28% despesas).',
        'CMV manteve-se controlado em aproximadamente 46% da receita líquida.',
      ];
      recs = [
        'Manter disciplina de custos fixos com foco em produtividade por headcount.',
        'Renegociar contratos de fornecedores de insumos aproveitando maior volume de compras.',
        'Destinar parte do fluxo de caixa operacional para quitação de passivos financeiros de juros altos.',
      ];
      exportData = financialIncomeDataset;
    } else {
      title = 'Supply Chain & Otimização de Estoque Curva ABC';
      const totalEstoque = inventoryABC.reduce((sum, i) => sum + i.valorTotalEstoque, 0);
      const classeA = inventoryABC.filter(i => i.classeABC === 'A');
      summary = [
        { title: 'Valor Total Imobilizado', value: formatCurrency(totalEstoque) },
        { title: 'SKUs Classe A (80% do valor)', value: `${classeA.length} itens correspondendo a 80% do capital` },
        { title: 'SKUs em Risco de Ruptura', value: '1 item (Array All-Flash NVMe)' },
        { title: 'SKUs Obsoletos / Excesso', value: '1 item (Organizador Horizontal 1U)' },
      ];
      insights = [
        'Apenas 3 SKUs de infraestrutura (Servidor Blade, Switch 10Gb e Storage NVMe) representam R$ 808.800 de estoque.',
        'Storage NVMe 32TB possui lead time de 45 dias e estoque para apenas 3 meses (risco de ruptura severa).',
        'Organizador de cabos tem giro muito baixo (1.5 giros/ano), consumindo espaço desnecessário no armazém.',
      ];
      recs = [
        'Emitir pedido de compra de emergência para o Storage NVMe com frete acelerado.',
        'Criar promoção de liquidação imediata dos organizadores de cabos para liberar capital de giro.',
        'Implementar cálculo dinâmico de Ponto de Pedido (ROP) baseado em desvio padrão de consumo.',
      ];
      exportData = inventoryABC;
    }

    const reportMd = generateExecutiveReportMarkdown(title, summary, insights, recs);

    if (onOpenExportModal) {
      onOpenExportModal({ title, data: exportData, reportMarkdown: reportMd });
    } else {
      downloadFile(reportMd, `relatorio_executivo_${caseType}.md`, 'text/markdown;charset=utf-8;');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Case Switcher */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-slate-100">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs text-indigo-400 font-semibold uppercase tracking-wider mb-1">
              <Briefcase className="w-4 h-4" />
              <span>Laboratório Prático de Inteligência de Negócios</span>
            </div>
            <h2 className="text-2xl font-bold text-white">4 Cases Corporativos Reais & Dashboards Executivos</h2>
            <p className="text-sm text-slate-400 mt-1 max-w-3xl">
              Datasets completos com regras de negócio corporativas autênticas. Filtre, analise a esteira de indicadores e exporte relatórios C-Level com um clique.
            </p>
          </div>

          {/* Export Actions Bar */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleQuickExportCSV(activeCase)}
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-3 py-2 rounded-lg border border-slate-700 transition-all shadow-sm"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span>Exportar CSV</span>
            </button>
            <button
              onClick={() => handleQuickExportJSON(activeCase)}
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-3 py-2 rounded-lg border border-slate-700 transition-all shadow-sm"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Exportar JSON</span>
            </button>
            <button
              onClick={() => handleGenerateReport(activeCase)}
              className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-all shadow-sm active:scale-95"
            >
              <FileText className="w-4 h-4" />
              <span>Relatório Executivo C-Level</span>
            </button>
          </div>
        </div>

        {/* Project Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
          <button
            onClick={() => setActiveCase('retail')}
            className={`p-3.5 rounded-lg border text-left transition-all ${
              activeCase === 'retail'
                ? (isClean ? 'bg-indigo-50 border-indigo-400 text-indigo-900 shadow-xs' : 'bg-indigo-600/20 border-indigo-500/60 text-white shadow-sm')
                : (isClean ? 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50' : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700')
            }`}
          >
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold">Case 1</span>
              <DollarSign className="w-3.5 h-3.5 text-indigo-500" />
            </div>
            <div className={`text-sm font-bold ${isClean ? 'text-slate-900' : 'text-white'}`}>Varejo Omnichannel</div>
            <div className={`text-[11px] mt-1 ${isClean ? 'text-slate-500' : 'text-slate-400'}`}>Rentabilidade & Canais</div>
          </button>

          <button
            onClick={() => setActiveCase('saas')}
            className={`p-3.5 rounded-lg border text-left transition-all ${
              activeCase === 'saas'
                ? (isClean ? 'bg-emerald-50 border-emerald-400 text-emerald-900 shadow-xs' : 'bg-indigo-600/20 border-indigo-500/60 text-white shadow-sm')
                : (isClean ? 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50' : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700')
            }`}
          >
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold">Case 2</span>
              <Users className="w-3.5 h-3.5 text-emerald-500" />
            </div>
            <div className={`text-sm font-bold ${isClean ? 'text-slate-900' : 'text-white'}`}>SaaS B2B Tech</div>
            <div className={`text-[11px] mt-1 ${isClean ? 'text-slate-500' : 'text-slate-400'}`}>MRR, LTV, CAC & Churn</div>
          </button>

          <button
            onClick={() => setActiveCase('finance')}
            className={`p-3.5 rounded-lg border text-left transition-all ${
              activeCase === 'finance'
                ? (isClean ? 'bg-cyan-50 border-cyan-400 text-cyan-900 shadow-xs' : 'bg-indigo-600/20 border-indigo-500/60 text-white shadow-sm')
                : (isClean ? 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50' : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700')
            }`}
          >
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold">Case 3</span>
              <TrendingUp className="w-3.5 h-3.5 text-cyan-500" />
            </div>
            <div className={`text-sm font-bold ${isClean ? 'text-slate-900' : 'text-white'}`}>Finanças DRE</div>
            <div className={`text-[11px] mt-1 ${isClean ? 'text-slate-500' : 'text-slate-400'}`}>Margem EBITDA & Resultado</div>
          </button>

          <button
            onClick={() => setActiveCase('supply')}
            className={`p-3.5 rounded-lg border text-left transition-all ${
              activeCase === 'supply'
                ? (isClean ? 'bg-amber-50 border-amber-400 text-amber-900 shadow-xs' : 'bg-indigo-600/20 border-indigo-500/60 text-white shadow-sm')
                : (isClean ? 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50' : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700')
            }`}
          >
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold">Case 4</span>
              <Package className="w-3.5 h-3.5 text-amber-500" />
            </div>
            <div className={`text-sm font-bold ${isClean ? 'text-slate-900' : 'text-white'}`}>Supply Chain & Estoque</div>
            <div className={`text-[11px] mt-1 ${isClean ? 'text-slate-500' : 'text-slate-400'}`}>Curva ABC & Ruptura</div>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CASE 1: VAREJO OMNICHANNEL */}
      {/* ========================================================================= */}
      {activeCase === 'retail' && (
        <div className="space-y-6">
          {/* Slicers / Filters Bar */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 mb-3">
              <Filter className="w-3.5 h-3.5 text-indigo-400" />
              <span>Filtros Multidimensionais Dinâmicos (Slicers):</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Região:</label>
                <select
                  value={retailRegion}
                  onChange={(e) => setRetailRegion(e.target.value)}
                  className="w-full bg-slate-950 text-slate-200 text-xs rounded border border-slate-800 px-3 py-2 focus:outline-none focus:border-indigo-500"
                >
                  <option value="Todas">Todas as Regiões</option>
                  <option value="Sudeste">Sudeste</option>
                  <option value="Sul">Sul</option>
                  <option value="Nordeste">Nordeste</option>
                  <option value="Centro-Oeste">Centro-Oeste</option>
                  <option value="Norte">Norte</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Segmento de Cliente:</label>
                <select
                  value={retailSegment}
                  onChange={(e) => setRetailSegment(e.target.value)}
                  className="w-full bg-slate-950 text-slate-200 text-xs rounded border border-slate-800 px-3 py-2 focus:outline-none focus:border-indigo-500"
                >
                  <option value="Todos">Todos os Segmentos</option>
                  <option value="B2B">B2B (Empresas)</option>
                  <option value="B2C">B2C (Varejo Comum)</option>
                  <option value="VIP">Clientes VIP</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Canal de Aquisição:</label>
                <select
                  value={retailChannel}
                  onChange={(e) => setRetailChannel(e.target.value)}
                  className="w-full bg-slate-950 text-slate-200 text-xs rounded border border-slate-800 px-3 py-2 focus:outline-none focus:border-indigo-500"
                >
                  <option value="Todos">Todos os Canais</option>
                  <option value="E-commerce">E-commerce</option>
                  <option value="Loja Física">Loja Física</option>
                  <option value="App Mobile">App Mobile</option>
                  <option value="Representante">Representante</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Buscar Transação/Cliente:</label>
                <div className="relative">
                  <input
                    type="text"
                    value={retailSearch}
                    onChange={(e) => setRetailSearch(e.target.value)}
                    placeholder="Filtrar por cliente, SKU..."
                    className="w-full bg-slate-950 text-slate-200 text-xs rounded border border-slate-800 pl-8 pr-3 py-2 focus:outline-none focus:border-indigo-500"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
                </div>
              </div>
            </div>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <span className="text-xs text-slate-400 block mb-1">Faturamento Líquido</span>
              <div className="text-xl font-bold font-mono text-white">
                {formatCurrency(retailKPIs.faturamentoTotal)}
              </div>
              <span className="text-[10px] text-emerald-400 mt-1 block">
                {retailKPIs.totalVendas} pedidos faturados
              </span>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <span className="text-xs text-slate-400 block mb-1">Lucro Bruto Total</span>
              <div className="text-xl font-bold font-mono text-indigo-400">
                {formatCurrency(retailKPIs.lucroBrutoTotal)}
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">
                Após custos de mercadoria
              </span>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <span className="text-xs text-slate-400 block mb-1">Margem Bruta %</span>
              <div className={`text-xl font-bold font-mono ${retailKPIs.margemBrutaPercent >= 35 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {formatPercent(retailKPIs.margemBrutaPercent)}
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">
                Meta corporativa: 35,0%
              </span>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <span className="text-xs text-slate-400 block mb-1">Ticket Médio</span>
              <div className="text-xl font-bold font-mono text-white">
                {formatCurrency(retailKPIs.ticketMedio)}
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">
                Por transação concluída
              </span>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <span className="text-xs text-slate-400 block mb-1">Taxa de Devoluções</span>
              <div className={`text-xl font-bold font-mono ${retailKPIs.taxaDevolucaoPercent <= 5 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {formatPercent(retailKPIs.taxaDevolucaoPercent)}
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">
                Alerta se {'>'} 5,0%
              </span>
            </div>
          </div>

          {/* Interactive Visualizations */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Visual 1: Channel Breakdown */}
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Faturamento por Canal de Aquisição (Share %)
                </span>
                <span className="text-[10px] text-slate-500 font-mono">Ordenado Descendente</span>
              </div>

              {/* Channel Bars */}
              <div className="space-y-3">
                {['Representante', 'E-commerce', 'App Mobile', 'Loja Física'].map(ch => {
                  const items = filteredRetail.filter(t => t.canal === ch && t.status === 'Concluído');
                  const val = items.reduce((acc, t) => acc + (t.valorVenda * (1 - t.descontoPercent / 100)), 0);
                  const share = retailKPIs.faturamentoTotal > 0 ? (val / retailKPIs.faturamentoTotal) * 100 : 0;

                  return (
                    <div key={ch} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-slate-300">{ch}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-slate-200">{formatCurrency(val)}</span>
                          <span className="font-mono text-slate-400 text-[11px]">({formatPercent(share)})</span>
                        </div>
                      </div>
                      <div className="w-full bg-slate-950 h-5 rounded overflow-hidden flex items-center relative border border-slate-800">
                        <div
                          className="h-full bg-indigo-600 hover:bg-indigo-500 transition-all duration-300 flex items-center px-2 text-[10px] text-white font-semibold"
                          style={{ width: `${Math.max(share, 3)}%` }}
                        >
                          {share > 12 && `${Math.round(share)}%`}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Visual 2: Category Margin Health */}
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Saúde de Margem por Categoria (Lucro vs Custo)
                </span>
                <span className="text-[10px] text-emerald-400 font-mono">Benchmark: 35%</span>
              </div>

              <div className="space-y-3">
                {['Informática', 'Móveis', 'Alimentos', 'Vestuário', 'Eletrônicos'].map(cat => {
                  const items = filteredRetail.filter(t => t.categoria === cat && t.status === 'Concluído');
                  const fat = items.reduce((acc, t) => acc + (t.valorVenda * (1 - t.descontoPercent / 100)), 0);
                  const custo = items.reduce((acc, t) => acc + t.custoProduto, 0);
                  const lucro = fat - custo;
                  const margem = fat > 0 ? (lucro / fat) * 100 : 0;
                  const isHealthy = margem >= 35;

                  return (
                    <div key={cat} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-slate-300">{cat}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-slate-200">{formatCurrency(lucro)}</span>
                          <span className={`font-mono text-[11px] font-bold ${isHealthy ? 'text-emerald-400' : 'text-amber-400'}`}>
                            {formatPercent(margem)}
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-slate-950 h-5 rounded overflow-hidden flex items-center relative border border-slate-800">
                        <div
                          className={`h-full ${isHealthy ? 'bg-emerald-600' : 'bg-amber-600'} transition-all duration-300 flex items-center px-2 text-[10px] text-white font-semibold`}
                          style={{ width: `${Math.min(margem * 1.5, 100)}%` }}
                        >
                          {margem > 15 && formatPercent(margem)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Table of Transactions */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300">
                Base Transacional Detalhada ({filteredRetail.length} registros exibidos)
              </span>
              <button
                onClick={() => handleQuickExportCSV('retail')}
                className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Exportar Seleção Atual</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse font-mono">
                <thead>
                  <tr className="bg-slate-950 text-slate-400 border-b border-slate-800">
                    <th className="p-3">ID Pedido</th>
                    <th className="p-3">Data</th>
                    <th className="p-3">Cliente</th>
                    <th className="p-3">Segmento</th>
                    <th className="p-3">Região</th>
                    <th className="p-3">Canal</th>
                    <th className="p-3">Categoria</th>
                    <th className="p-3 text-right">Valor Venda</th>
                    <th className="p-3 text-right">Desconto</th>
                    <th className="p-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {filteredRetail.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-3 font-semibold text-slate-200">{t.id}</td>
                      <td className="p-3 text-slate-400">{t.data}</td>
                      <td className="p-3">{t.cliente}</td>
                      <td className="p-3">
                        <span className="text-slate-300">{t.segmento}</span>
                      </td>
                      <td className="p-3 text-slate-400">{t.regiao}</td>
                      <td className="p-3 text-slate-400">{t.canal}</td>
                      <td className="p-3">{t.categoria}</td>
                      <td className="p-3 text-right font-medium text-white">{formatCurrency(t.valorVenda)}</td>
                      <td className="p-3 text-right text-slate-400">{t.descontoPercent}%</td>
                      <td className="p-3 text-center">
                        <span className={`text-[11px] font-semibold ${t.status === 'Concluído' ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {t.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CASE 2: SAAS TECH B2B */}
      {/* ========================================================================= */}
      {activeCase === 'saas' && (
        <div className="space-y-6">
          {/* SaaS KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <span className="text-xs text-slate-400 block mb-1">MRR Atual (Mês Fechado)</span>
              <div className="text-xl font-bold font-mono text-emerald-400">
                {formatCurrency(saasKPIs.mrrAtual)}
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">
                +10,2% vs Mês Anterior
              </span>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <span className="text-xs text-slate-400 block mb-1">ARR Projetado</span>
              <div className="text-xl font-bold font-mono text-white">
                {formatCurrency(saasKPIs.arrProjetado)}
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">
                Run-rate anualizado
              </span>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <span className="text-xs text-slate-400 block mb-1">LTV / CAC Ratio</span>
              <div className="text-xl font-bold font-mono text-indigo-400">
                {saasKPIs.ltvCacRatio}x
              </div>
              <span className="text-[10px] text-emerald-400 mt-1 block">
                Top-quartile corporativo ({'>'} 3.0x)
              </span>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <span className="text-xs text-slate-400 block mb-1">Churn Rate Médio</span>
              <div className="text-xl font-bold font-mono text-emerald-400">
                {formatPercent(saasKPIs.churnRateMedioPercent)}
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">
                Meta B2B: {'<'} 1,5%
              </span>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <span className="text-xs text-slate-400 block mb-1">NRR Médio (Net Retention)</span>
              <div className="text-xl font-bold font-mono text-cyan-400">
                {formatPercent(saasKPIs.nrrMedioPercent)}
              </div>
              <span className="text-[10px] text-emerald-400 mt-1 block">
                Expansão orgânica líquida
              </span>
            </div>
          </div>

          {/* SaaS Visual Time-series */}
          <div className={`border p-6 rounded-xl transition-colors ${
            isClean ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900 border-slate-800'
          }`}>
            <div className={`flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b mb-6 gap-3 ${
              isClean ? 'border-slate-200' : 'border-slate-800'
            }`}>
              <div>
                <h4 className={`text-sm font-bold ${isClean ? 'text-slate-900' : 'text-white'}`}>
                  Evolução do MRR & Clientes Ativos (6 Meses)
                </h4>
                <p className={`text-xs mt-0.5 ${isClean ? 'text-slate-500' : 'text-slate-400'}`}>
                  Crescimento sustentável de receita recorrente mensal · Passe o mouse sobre os pontos para auditar
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-mono font-semibold px-2.5 py-1 rounded border transition-colors ${
                  isClean 
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300' 
                    : 'bg-emerald-950/60 text-emerald-400 border-emerald-800/40'
                }`}>
                  CAGR Mensal: +8,9%
                </span>
              </div>
            </div>

            {/* Interactive Hover Tooltip Inspector */}
            {hoveredSaasPoint !== null && (
              <div className={`mb-4 p-3 rounded-lg border text-xs flex flex-wrap items-center justify-between gap-3 animate-fadeIn ${
                isClean 
                  ? 'bg-emerald-50/80 border-emerald-200 text-slate-800 shadow-xs' 
                  : 'bg-emerald-950/40 border-emerald-800/50 text-emerald-200'
              }`}>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded text-[11px]">
                    {saasMetricsDataset[hoveredSaasPoint].mes}
                  </span>
                  <span className="font-mono font-bold text-slate-900">
                    MRR: {formatCurrency(saasMetricsDataset[hoveredSaasPoint].mrr)}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-[11px] font-mono">
                  <span>Base Ativa: <strong>{saasMetricsDataset[hoveredSaasPoint].clientesAtivos}</strong> clientes</span>
                  <span>Churn: <strong className="text-emerald-700">{formatPercent(saasMetricsDataset[hoveredSaasPoint].churnRatePercent)}</strong></span>
                  <span>NRR: <strong className="text-indigo-700">{formatPercent(saasMetricsDataset[hoveredSaasPoint].nrrPercent)}</strong></span>
                </div>
              </div>
            )}

            {/* SVG Visual Chart */}
            <div className="h-64 w-full relative">
              <svg viewBox="0 0 600 200" className="w-full h-full overflow-visible">
                {/* Horizontal gridlines */}
                <line x1="40" y1="30" x2="580" y2="30" stroke={isClean ? '#e2e8f0' : '#1e293b'} strokeDasharray="4" />
                <line x1="40" y1="80" x2="580" y2="80" stroke={isClean ? '#e2e8f0' : '#1e293b'} strokeDasharray="4" />
                <line x1="40" y1="130" x2="580" y2="130" stroke={isClean ? '#e2e8f0' : '#1e293b'} strokeDasharray="4" />
                <line x1="40" y1="180" x2="580" y2="180" stroke={isClean ? '#cbd5e1' : '#334155'} />

                {/* Area under curve */}
                <path
                  d="M 60,160 L 160,140 L 260,118 L 360,98 L 460,72 L 560,40 L 560,180 L 60,180 Z"
                  fill="url(#mrrGrad)"
                  opacity={isClean ? '0.2' : '0.35'}
                  pointerEvents="none"
                />

                <defs>
                  <linearGradient id="mrrGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Line */}
                <path
                  d="M 60,160 L 160,140 L 260,118 L 360,98 L 460,72 L 560,40"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  pointerEvents="none"
                />

                {/* Data Points */}
                {saasMetricsDataset.map((s, idx) => {
                  const x = 60 + idx * 100;
                  const y = 160 - (idx * 24);
                  const isHovered = hoveredSaasPoint === idx;

                  return (
                    <g 
                      key={s.mes} 
                      className="cursor-pointer transition-transform"
                      onMouseEnter={() => setHoveredSaasPoint(idx)}
                      onMouseLeave={() => setHoveredSaasPoint(null)}
                    >
                      {/* Invisible larger hit target for effortless interaction */}
                      <circle cx={x} cy={y} r="25" fill="transparent" />

                      {/* Pulse aura when hovered */}
                      {isHovered && (
                        <circle cx={x} cy={y} r="12" fill="#10b981" opacity="0.25" className="animate-ping" pointerEvents="none" />
                      )}

                      <circle 
                        cx={x} 
                        cy={y} 
                        r={isHovered ? 7.5 : 5.5} 
                        fill={isClean ? '#ffffff' : '#0f172a'} 
                        stroke={isHovered ? '#047857' : '#10b981'} 
                        strokeWidth={isHovered ? '3.5' : '2.5'} 
                        pointerEvents="none"
                      />

                      {/* Explicit Theme-Aware Value Label */}
                      <text 
                        x={x} 
                        y={y - 12} 
                        fill={isClean ? '#0f172a' : '#f8fafc'} 
                        fontSize="11" 
                        fontWeight="bold" 
                        textAnchor="middle" 
                        fontFamily="monospace"
                        pointerEvents="none"
                      >
                        R$ {(s.mrr / 1000).toFixed(0)}k
                      </text>

                      {/* Month label */}
                      <text 
                        x={x} 
                        y="196" 
                        fill={isClean ? '#475569' : '#94a3b8'} 
                        fontSize="11" 
                        fontWeight={isHovered ? 'bold' : 'normal'}
                        textAnchor="middle"
                        pointerEvents="none"
                      >
                        {s.mes}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* SaaS Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-slate-800">
              <span className="text-xs font-semibold text-slate-300">
                Histórico Consolidado de Métricas SaaS
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse font-mono">
                <thead>
                  <tr className="bg-slate-950 text-slate-400 border-b border-slate-800">
                    <th className="p-3">Mês</th>
                    <th className="p-3 text-right">MRR</th>
                    <th className="p-3 text-right">Novos Clientes</th>
                    <th className="p-3 text-right">Cancelados</th>
                    <th className="p-3 text-right">Base Ativa</th>
                    <th className="p-3 text-right">ARPU</th>
                    <th className="p-3 text-right">CAC</th>
                    <th className="p-3 text-right">LTV</th>
                    <th className="p-3 text-right">Churn %</th>
                    <th className="p-3 text-right">NRR %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {saasMetricsDataset.map((m) => (
                    <tr key={m.mes} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-3 font-semibold text-white">{m.mes}</td>
                      <td className="p-3 text-right text-emerald-400 font-medium">{formatCurrency(m.mrr)}</td>
                      <td className="p-3 text-right text-slate-300">+{m.novosClientes}</td>
                      <td className="p-3 text-right text-rose-400">-{m.clientesCancelados}</td>
                      <td className="p-3 text-right text-white font-medium">{m.clientesAtivos}</td>
                      <td className="p-3 text-right">{formatCurrency(m.arpu)}</td>
                      <td className="p-3 text-right">{formatCurrency(m.cac)}</td>
                      <td className="p-3 text-right text-cyan-400">{formatCurrency(m.ltv)}</td>
                      <td className="p-3 text-right text-emerald-400">{formatPercent(m.churnRatePercent)}</td>
                      <td className="p-3 text-right font-bold text-indigo-400">{formatPercent(m.nrrPercent)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CASE 3: FINANÇAS DRE GERENCIAL */}
      {/* ========================================================================= */}
      {activeCase === 'finance' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <span className="text-xs text-slate-400 block mb-1">Receita Líquida Q1-26</span>
              <div className="text-xl font-bold font-mono text-white">
                {formatCurrency(financialIncomeDataset[4].receitaLiquida)}
              </div>
              <span className="text-[10px] text-emerald-400 mt-1 block">
                +74,4% vs Q1-25
              </span>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <span className="text-xs text-slate-400 block mb-1">EBITDA Gerencial Q1-26</span>
              <div className="text-xl font-bold font-mono text-cyan-400">
                {formatCurrency(financialIncomeDataset[4].ebitda)}
              </div>
              <span className="text-[10px] text-emerald-400 mt-1 block">
                Geração operacional pura
              </span>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <span className="text-xs text-slate-400 block mb-1">Margem EBITDA %</span>
              <div className="text-xl font-bold font-mono text-emerald-400">
                {formatPercent(financialIncomeDataset[4].margemEbitdaPercent)}
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">
                Meta do Conselho: 28,0%
              </span>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <span className="text-xs text-slate-400 block mb-1">Lucro Líquido Q1-26</span>
              <div className="text-xl font-bold font-mono text-white">
                {formatCurrency(financialIncomeDataset[4].lucroLiquido)}
              </div>
              <span className="text-[10px] text-emerald-400 mt-1 block">
                Margem Líquida: 19,0%
              </span>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <span className="text-xs text-slate-400 block mb-1">Alavancagem Fixa</span>
              <div className="text-xl font-bold font-mono text-indigo-400">
                Controlada
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">
                Resultado Fin: -R$ 28k
              </span>
            </div>
          </div>

          {/* DRE Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">Demonstrativo de Resultado do Exercício (DRE Trimestral)</h4>
                <p className="text-xs text-slate-400 mt-0.5">Visão gerencial consolidada para acionistas e investidores</p>
              </div>
              <button
                onClick={() => handleQuickExportCSV('finance')}
                className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Exportar DRE</span>
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse font-mono">
                <thead>
                  <tr className="bg-slate-950 text-slate-400 border-b border-slate-800">
                    <th className="p-3">Período</th>
                    <th className="p-3 text-right">Receita Bruta</th>
                    <th className="p-3 text-right">Deduções/Impostos</th>
                    <th className="p-3 text-right">Receita Líquida</th>
                    <th className="p-3 text-right">CMV</th>
                    <th className="p-3 text-right">Lucro Bruto</th>
                    <th className="p-3 text-right">Desp. Operacionais</th>
                    <th className="p-3 text-right">EBITDA</th>
                    <th className="p-3 text-right">Margem EBITDA</th>
                    <th className="p-3 text-right">Lucro Líquido</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {financialIncomeDataset.map((f) => (
                    <tr key={f.periodo} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-3 font-semibold text-white">{f.periodo}</td>
                      <td className="p-3 text-right">{formatCurrency(f.receitaBruta)}</td>
                      <td className="p-3 text-right text-rose-400">-{formatCurrency(f.impostosDeducoes)}</td>
                      <td className="p-3 text-right font-medium text-white">{formatCurrency(f.receitaLiquida)}</td>
                      <td className="p-3 text-right text-rose-400">-{formatCurrency(f.cmv)}</td>
                      <td className="p-3 text-right text-indigo-400 font-medium">{formatCurrency(f.lucroBruto)}</td>
                      <td className="p-3 text-right text-rose-400">-{formatCurrency(f.despesasOperacionais)}</td>
                      <td className="p-3 text-right text-cyan-400 font-bold">{formatCurrency(f.ebitda)}</td>
                      <td className="p-3 text-right text-emerald-400 font-bold">{formatPercent(f.margemEbitdaPercent)}</td>
                      <td className="p-3 text-right text-white font-bold">{formatCurrency(f.lucroLiquido)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CASE 4: SUPPLY CHAIN & CURVA ABC */}
      {/* ========================================================================= */}
      {activeCase === 'supply' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <span className="text-xs text-slate-400 block mb-1">Capital Imobilizado Total</span>
              <div className="text-xl font-bold font-mono text-white">
                {formatCurrency(inventoryABC.reduce((s, i) => s + i.valorTotalEstoque, 0))}
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">
                9 SKUs de missão crítica
              </span>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <span className="text-xs text-slate-400 block mb-1">Classe A (80% do Capital)</span>
              <div className="text-xl font-bold font-mono text-amber-400">
                {inventoryABC.filter(i => i.classeABC === 'A').length} SKUs
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">
                Exige controle diário estrito
              </span>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <span className="text-xs text-slate-400 block mb-1">Ruptura Iminente</span>
              <div className="text-xl font-bold font-mono text-rose-400">
                1 SKU em Risco
              </div>
              <span className="text-[10px] text-rose-400 mt-1 block">
                Storage NVMe (Lead Time 45d)
              </span>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <span className="text-xs text-slate-400 block mb-1">Excesso / Obsoleto</span>
              <div className="text-xl font-bold font-mono text-amber-300">
                1 SKU Parado
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">
                Organizador 1U (Giro 1.5)
              </span>
            </div>
          </div>

          {/* Table ABC */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">Matriz Curva ABC de Pareto & Níveis de Risco</h4>
                <p className="text-xs text-slate-400 mt-0.5">Classificação automática com base no valor acumulado em estoque</p>
              </div>
              <button
                onClick={() => handleQuickExportCSV('supply')}
                className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Exportar Curva ABC</span>
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse font-mono">
                <thead>
                  <tr className="bg-slate-950 text-slate-400 border-b border-slate-800">
                    <th className="p-3 text-center">Classe ABC</th>
                    <th className="p-3">SKU</th>
                    <th className="p-3">Produto</th>
                    <th className="p-3">Categoria</th>
                    <th className="p-3 text-right">Estoque Atual</th>
                    <th className="p-3 text-right">Estoque Mínimo</th>
                    <th className="p-3 text-right">Custo Unitário</th>
                    <th className="p-3 text-right">Valor Total Imobilizado</th>
                    <th className="p-3 text-right">Acumulado %</th>
                    <th className="p-3 text-center">Status de Risco</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {inventoryABC.map((item) => (
                    <tr key={item.sku} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-3 text-center">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                          item.classeABC === 'A' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                          item.classeABC === 'B' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40' :
                          'bg-slate-800 text-slate-400 border border-slate-700'
                        }`}>
                          Classe {item.classeABC}
                        </span>
                      </td>
                      <td className="p-3 font-semibold text-slate-200">{item.sku}</td>
                      <td className="p-3 font-sans text-white">{item.produto}</td>
                      <td className="p-3 text-slate-400 font-sans">{item.categoria}</td>
                      <td className="p-3 text-right font-medium">{item.estoqueAtual}</td>
                      <td className="p-3 text-right text-slate-400">{item.estoqueMinimo}</td>
                      <td className="p-3 text-right">{formatCurrency(item.custoUnitario)}</td>
                      <td className="p-3 text-right font-bold text-white">{formatCurrency(item.valorTotalEstoque)}</td>
                      <td className="p-3 text-right text-cyan-400">{item.acumuladoPercent}%</td>
                      <td className="p-3 text-center font-sans">
                        <span className={`text-[11px] font-semibold ${
                          item.statusRisco === 'Ruptura Iminente' ? 'text-rose-400' :
                          item.statusRisco === 'Excesso / Obsoleto' ? 'text-amber-400' :
                          'text-emerald-400'
                        }`}>
                          {item.statusRisco}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
