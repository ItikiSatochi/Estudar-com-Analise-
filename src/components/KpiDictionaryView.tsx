import React, { useState } from 'react';
import { BookOpen, Search, Copy, Check, Filter, Code } from 'lucide-react';
import { corporateKpisList } from '../data/datasets';
import { KPIMetric } from '../types';
import { useTheme } from '../context/ThemeContext';

export const KpiDictionaryView: React.FC = () => {
  const { isClean } = useTheme();
  const [selectedArea, setSelectedArea] = useState<string>('Todas');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeCodeLang, setActiveCodeLang] = useState<'dax' | 'sql' | 'python'>('dax');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const areas = [
    'Todas',
    'Vendas & Crescimento',
    'SaaS & Assinatura',
    'Finanças & Rentabilidade',
    'Supply Chain & Operações',
  ];

  const filteredKPIs = corporateKpisList.filter(kpi => {
    const matchArea = selectedArea === 'Todas' || kpi.area === selectedArea;
    const matchSearch = searchTerm === '' ||
      kpi.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kpi.definicao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kpi.formula.toLowerCase().includes(searchTerm.toLowerCase());
    return matchArea && matchSearch;
  });

  const handleCopyCode = (id: string, code?: string) => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className={`border rounded-xl p-6 transition-colors ${
      isClean ? 'bg-white border-slate-200 text-slate-800 shadow-sm' : 'bg-slate-900 border-slate-800 text-slate-100'
    }`}>
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b gap-4 ${
        isClean ? 'border-slate-200' : 'border-slate-800'
      }`}>
        <div>
          <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-1 ${
            isClean ? 'text-indigo-700' : 'text-indigo-400'
          }`}>
            <BookOpen className="w-4 h-4" />
            <span>Guia de Bolso & Dicionário de Métricas</span>
          </div>
          <h2 className={`text-2xl font-bold ${isClean ? 'text-slate-900' : 'text-white'}`}>
            Dicionário Estratégico de KPIs Corporativos
          </h2>
          <p className={`text-sm mt-1 max-w-3xl ${isClean ? 'text-slate-600' : 'text-slate-400'}`}>
            Definições de negócios C-Level, fórmulas padrão de mercado, benchmarks e snippets prontos em DAX, SQL e Python.
          </p>
        </div>

        {/* Global Language Switcher for snippets */}
        <div className={`flex items-center p-1 rounded-lg border self-start sm:self-auto ${
          isClean ? 'bg-slate-100 border-slate-200' : 'bg-slate-800 border-slate-700'
        }`}>
          <button
            onClick={() => setActiveCodeLang('dax')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              activeCodeLang === 'dax' 
                ? (isClean ? 'bg-amber-100 text-amber-900 border border-amber-300 shadow-xs' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40')
                : (isClean ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-slate-200')
            }`}
          >
            DAX (Power BI)
          </button>
          <button
            onClick={() => setActiveCodeLang('sql')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              activeCodeLang === 'sql' 
                ? (isClean ? 'bg-cyan-100 text-cyan-900 border border-cyan-300 shadow-xs' : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40')
                : (isClean ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-slate-200')
            }`}
          >
            SQL (Relacional)
          </button>
          <button
            onClick={() => setActiveCodeLang('python')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              activeCodeLang === 'python' 
                ? (isClean ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 shadow-xs' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40')
                : (isClean ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-slate-200')
            }`}
          >
            Python (Pandas)
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        <div className="md:col-span-2 flex flex-wrap gap-1.5">
          {areas.map(area => (
            <button
              key={area}
              onClick={() => setSelectedArea(area)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                selectedArea === area
                  ? 'bg-indigo-600 text-white shadow-sm font-semibold'
                  : (isClean 
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200' 
                      : 'bg-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-750')
              }`}
            >
              {area}
            </button>
          ))}
        </div>

        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por KPI, termo, sigla..."
            className="w-full bg-slate-950 text-slate-200 text-xs rounded-lg border border-slate-800 pl-8 pr-3 py-2 focus:outline-none focus:border-indigo-500"
          />
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
        </div>
      </div>

      {/* Cards List */}
      <div className="grid grid-cols-1 gap-6">
        {filteredKPIs.map((kpi) => {
          const codeSnippet = activeCodeLang === 'dax' ? kpi.exemploDax : activeCodeLang === 'sql' ? kpi.exemploSql : kpi.exemploPython;

          return (
            <div key={kpi.id} className="bg-slate-950 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 pb-4 border-b border-slate-800/80">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">{kpi.area}</span>
                    <span className="text-slate-600">·</span>
                    <span className="text-xs text-slate-500 font-mono">ID: {kpi.id}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">{kpi.nome}</h3>
                  <p className="text-xs text-slate-300 mt-1 max-w-2xl">{kpi.definicao}</p>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 self-start lg:min-w-[280px]">
                  <span className="text-[11px] text-slate-500 uppercase block font-medium">Fórmula Matemática:</span>
                  <div className="text-xs font-mono font-bold text-emerald-400 mt-0.5">
                    {kpi.formula}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-2 pt-2 border-t border-slate-800">
                    <span className="text-amber-400 font-medium">Benchmark de Mercado: </span>
                    {kpi.benchmarkMercado}
                  </div>
                </div>
              </div>

              {/* Code Snippet */}
              {codeSnippet && (
                <div className="mt-4">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
                    <span className="font-mono flex items-center gap-1.5 text-indigo-300">
                      <Code className="w-3.5 h-3.5" />
                      Snippet em {activeCodeLang.toUpperCase()}:
                    </span>
                    <button
                      onClick={() => handleCopyCode(kpi.id, codeSnippet)}
                      className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
                    >
                      {copiedId === kpi.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copiar Código</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-3 bg-slate-900/90 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto">
                    {codeSnippet}
                  </pre>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
