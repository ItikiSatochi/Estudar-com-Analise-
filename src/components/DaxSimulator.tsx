import React, { useState } from 'react';
import { Copy, Check, Play, Cpu, Layers, HelpCircle } from 'lucide-react';
import { retailSalesDataset } from '../data/datasets';
import { formatCurrency, formatPercent } from '../utils/analytics';
import { useTheme } from '../context/ThemeContext';

export const DaxSimulator: React.FC = () => {
  const { isClean } = useTheme();
  const [selectedPreset, setSelectedPreset] = useState<number>(0);
  const [selectedCanal, setSelectedCanal] = useState<string>('E-commerce');
  const [selectedRegiao, setSelectedRegiao] = useState<string>('Todas');
  const [copied, setCopied] = useState<boolean>(false);

  const presets = [
    {
      title: 'CALCULATE com Modificador de Filtro',
      measureName: 'Faturamento Canal E-commerce',
      description: 'Sobrescreve o contexto de filtro da tela para focar apenas nas vendas do canal digital selecionado.',
      getFormula: (canal: string, regiao: string) => `Faturamento ${canal} = 
CALCULATE(
    SUM(fVendas[ValorLiquido]),
    dCanal[NomeCanal] = "${canal}"${regiao !== 'Todas' ? `,\n    dRegiao[NomeRegiao] = "${regiao}"` : ''}
)`,
      evaluate: (canal: string, regiao: string) => {
        let filtered = retailSalesDataset.filter(t => t.status === 'Concluído' && t.canal === canal);
        if (regiao !== 'Todas') {
          filtered = filtered.filter(t => t.regiao === regiao);
        }
        const total = filtered.reduce((sum, t) => sum + (t.valorVenda * (1 - t.descontoPercent / 100)), 0);
        return {
          valor: formatCurrency(total),
          transacoes: filtered.length,
          contexto: `Filtro injetado via CALCULATE: dCanal[NomeCanal] = '${canal}' ${regiao !== 'Todas' ? `e dRegiao = '${regiao}'` : ''}`,
          engine: 'VertiPaq Storage Engine Scan com Hash Filter Pushdown.',
        };
      }
    },
    {
      title: 'Time Intelligence: Faturamento YTD',
      measureName: 'Faturamento Acumulado YTD',
      description: 'Calcula o faturamento acumulado desde o primeiro dia do ano fiscal atual até a data máxima no contexto.',
      getFormula: () => `Faturamento YTD = 
CALCULATE(
    [Faturamento Liquido],
    DATESYTD(dCalendario[Date], "31/12")
)`,
      evaluate: () => {
        const concluidas = retailSalesDataset.filter(t => t.status === 'Concluído');
        const total = concluidas.reduce((sum, t) => sum + (t.valorVenda * (1 - t.descontoPercent / 100)), 0);
        return {
          valor: formatCurrency(total),
          transacoes: concluidas.length,
          contexto: 'DATESYTD gera uma tabela interna de datas de 01/01/2026 até a data máxima filtrada.',
          engine: 'Transição de contexto temporal nativa via Formula Engine + VertiPaq Time Dictionary.',
        };
      }
    },
    {
      title: 'Participação Percentual com ALL (Share %)',
      measureName: 'Share Faturamento %',
      description: 'Calcula a proporção de uma categoria em relação ao faturamento total da empresa inteira, ignorando filtros locais.',
      getFormula: () => `Share Categoria % = 
VAR FaturamentoCategoria = [Faturamento Liquido]
VAR FaturamentoTotalGeral = CALCULATE([Faturamento Liquido], ALL(dProdutos[Categoria]))
RETURN
DIVIDE(FaturamentoCategoria, FaturamentoTotalGeral, 0)`,
      evaluate: () => {
        const concluidas = retailSalesDataset.filter(t => t.status === 'Concluído');
        const informatica = concluidas.filter(t => t.categoria === 'Informática');
        const fatInfo = informatica.reduce((sum, t) => sum + (t.valorVenda * (1 - t.descontoPercent / 100)), 0);
        const fatTotal = concluidas.reduce((sum, t) => sum + (t.valorVenda * (1 - t.descontoPercent / 100)), 0);
        const share = (fatInfo / fatTotal) * 100;
        return {
          valor: formatPercent(share),
          transacoes: informatica.length,
          contexto: 'ALL(dProdutos[Categoria]) remove o filtro do visual, garantindo denominador 100% íntegro.',
          engine: 'Otimização VertiPaq: Executa 1 query de agregação global e reutiliza em cache.',
        };
      }
    }
  ];

  const currentPreset = presets[selectedPreset];
  const formulaCode = currentPreset.getFormula(selectedCanal, selectedRegiao);
  const evaluationResult = currentPreset.evaluate(selectedCanal, selectedRegiao);

  const handleCopy = () => {
    navigator.clipboard.writeText(formulaCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`border rounded-xl p-6 transition-colors ${
      isClean ? 'bg-white border-slate-200 text-slate-800 shadow-sm' : 'bg-slate-900 border-slate-800 text-slate-100'
    }`}>
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b gap-3 ${
        isClean ? 'border-slate-200' : 'border-slate-800'
      }`}>
        <div>
          <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-1 ${
            isClean ? 'text-amber-700' : 'text-amber-400'
          }`}>
            <Cpu className="w-4 h-4" />
            <span>Simulador Interativo DAX & Engine VertiPaq</span>
          </div>
          <h3 className={`text-xl font-bold ${isClean ? 'text-slate-900' : 'text-white'}`}>
            Laboratório de Fórmulas DAX em Tempo Real
          </h3>
        </div>

        {/* Preset Selector */}
        <div className={`flex flex-wrap gap-1 p-1 rounded-lg border ${
          isClean ? 'bg-slate-100 border-slate-200' : 'bg-slate-800 border-slate-700'
        }`}>
          {presets.map((p, idx) => (
            <button
              key={p.title}
              onClick={() => setSelectedPreset(idx)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                selectedPreset === idx 
                  ? (isClean ? 'bg-amber-100 text-amber-900 border border-amber-300 shadow-xs' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40')
                  : (isClean ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-slate-200')
              }`}
            >
              {p.title.split(':')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-slate-400 mt-4">
        {currentPreset.description}
      </p>

      {/* Interactive Controls (if preset supports parameters) */}
      {selectedPreset === 0 && (
        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 my-4 p-4 rounded-xl border ${
          isClean ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/60 border-slate-800'
        }`}>
          <div>
            <label className={`text-xs font-semibold block mb-1.5 ${isClean ? 'text-slate-700' : 'text-slate-300'}`}>
              Parâmetro Canal (dCanal):
            </label>
            <select
              value={selectedCanal}
              onChange={(e) => setSelectedCanal(e.target.value)}
              className={`w-full text-xs rounded border px-3 py-2 focus:outline-none ${
                isClean 
                  ? 'bg-white text-slate-900 border-slate-300 focus:border-amber-500 shadow-2xs' 
                  : 'bg-slate-800 text-slate-200 border-slate-700 focus:border-amber-500'
              }`}
            >
              <option value="E-commerce">E-commerce</option>
              <option value="Loja Física">Loja Física</option>
              <option value="App Mobile">App Mobile</option>
              <option value="Representante">Representante</option>
            </select>
          </div>

          <div>
            <label className={`text-xs font-semibold block mb-1.5 ${isClean ? 'text-slate-700' : 'text-slate-300'}`}>
              Parâmetro Região (dRegiao):
            </label>
            <select
              value={selectedRegiao}
              onChange={(e) => setSelectedRegiao(e.target.value)}
              className={`w-full text-xs rounded border px-3 py-2 focus:outline-none ${
                isClean 
                  ? 'bg-white text-slate-900 border-slate-300 focus:border-amber-500 shadow-2xs' 
                  : 'bg-slate-800 text-slate-200 border-slate-700 focus:border-amber-500'
              }`}
            >
              <option value="Todas">Todas as Regiões (Sem filtro regional adicional)</option>
              <option value="Sudeste">Sudeste</option>
              <option value="Sul">Sul</option>
              <option value="Nordeste">Nordeste</option>
              <option value="Centro-Oeste">Centro-Oeste</option>
              <option value="Norte">Norte</option>
            </select>
          </div>
        </div>
      )}

      {/* Code Editor Preview */}
      <div className="relative mt-4">
        <div className={`flex items-center justify-between px-4 py-2.5 rounded-t-lg border-t border-x text-xs ${
          isClean ? 'bg-slate-100 border-slate-300' : 'bg-slate-950 border-slate-800'
        }`}>
          <span className={`font-mono font-bold ${isClean ? 'text-amber-800' : 'text-amber-400'}`}>
            Medida DAX ({currentPreset.measureName})
          </span>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 transition-colors ${
              isClean ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
            }`}
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span className={copied ? 'text-emerald-600 font-semibold' : ''}>{copied ? 'Copiado!' : 'Copiar Medida'}</span>
          </button>
        </div>
        <pre className="p-4 bg-slate-950 font-mono text-xs text-emerald-400 rounded-b-lg border border-slate-900 overflow-x-auto shadow-inner leading-relaxed">
          {formulaCode}
        </pre>
      </div>

      {/* Real Evaluation Box */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className={`p-4 rounded-xl border ${
          isClean 
            ? 'bg-amber-50/70 border-amber-200 text-slate-900 shadow-xs' 
            : 'bg-slate-950/80 border-amber-900/30 text-slate-100'
        }`}>
          <span className={`text-xs block mb-1 font-semibold ${isClean ? 'text-amber-800' : 'text-slate-400'}`}>
            Resultado Avaliado (Live):
          </span>
          <div className={`text-2xl font-bold font-mono ${isClean ? 'text-amber-800' : 'text-amber-300'}`}>
            {evaluationResult.valor}
          </div>
          <span className={`text-[11px] mt-1 block font-medium ${isClean ? 'text-slate-600' : 'text-slate-500'}`}>
            Baseado em {evaluationResult.transacoes} transações corporativas válidas
          </span>
        </div>

        <div className={`p-4 rounded-xl border col-span-2 ${
          isClean 
            ? 'bg-slate-50 border-slate-200 text-slate-800 shadow-xs' 
            : 'bg-slate-950/80 border-slate-800 text-slate-100'
        }`}>
          <div className={`flex items-center gap-1.5 text-xs font-bold mb-1 ${
            isClean ? 'text-indigo-700' : 'text-indigo-400'
          }`}>
            <Layers className="w-3.5 h-3.5" />
            <span>Mecânica do Contexto de Filtro (VertiPaq Engine):</span>
          </div>
          <p className={`text-xs leading-relaxed ${isClean ? 'text-slate-700' : 'text-slate-300'}`}>
            {evaluationResult.contexto}
          </p>
          <div className={`mt-2 text-[11px] flex items-center gap-1 font-mono ${
            isClean ? 'text-slate-600' : 'text-slate-400'
          }`}>
            <span>⚙️ Execução:</span>
            <span>{evaluationResult.engine}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
