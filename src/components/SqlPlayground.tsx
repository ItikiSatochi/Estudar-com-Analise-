import React, { useState } from 'react';
import { Database, Play, Download, CheckCircle, Terminal, HelpCircle, FileSpreadsheet } from 'lucide-react';
import { retailSalesDataset } from '../data/datasets';
import { executeMockSQL, convertToCSV, downloadFile } from '../utils/analytics';
import { useTheme } from '../context/ThemeContext';

export const SqlPlayground: React.FC = () => {
  const { isClean } = useTheme();
  const queryPresets = [
    {
      name: 'Agregação por Região',
      query: `SELECT 
  regiao,
  COUNT(id) AS total_pedidos,
  SUM(valor_venda) AS total_faturamento,
  AVG(valor_venda) AS ticket_medio
FROM sales
WHERE status = 'Concluído'
GROUP BY regiao
ORDER BY total_faturamento DESC;`
    },
    {
      name: 'Window Function (DENSE_RANK)',
      query: `SELECT 
  cliente,
  regiao,
  canal,
  valor_venda,
  DENSE_RANK() OVER(PARTITION BY regiao ORDER BY valor_venda DESC) AS ranking
FROM sales
WHERE status = 'Concluído'
ORDER BY regiao, ranking;`
    },
    {
      name: 'Agregação por Categoria',
      query: `SELECT 
  categoria,
  SUM(valor_venda) AS total_faturamento,
  SUM(qtd_itens) AS qtd_itens
FROM sales
GROUP BY categoria;`
    },
    {
      name: 'Filtro Região Sudeste',
      query: `SELECT * FROM sales WHERE regiao = 'Sudeste' LIMIT 10;`
    }
  ];

  const [currentQuery, setCurrentQuery] = useState<string>(queryPresets[0].query);
  const [queryResult, setQueryResult] = useState<any>(() => 
    executeMockSQL(queryPresets[0].query, { sales: retailSalesDataset })
  );
  const [activeTab, setActiveTab] = useState<'results' | 'explain'>('results');

  const handleRunQuery = () => {
    const res = executeMockSQL(currentQuery, { sales: retailSalesDataset });
    setQueryResult(res);
  };

  const handleExportCSV = () => {
    if (!queryResult || !queryResult.rows || !queryResult.rows.length) return;
    const csv = convertToCSV(queryResult.rows);
    downloadFile(csv, 'resultado_consulta_sql.csv', 'text/csv;charset=utf-8;');
  };

  const handleExportJSON = () => {
    if (!queryResult || !queryResult.rows || !queryResult.rows.length) return;
    const json = JSON.stringify(queryResult.rows, null, 2);
    downloadFile(json, 'resultado_consulta_sql.json', 'application/json');
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
            isClean ? 'text-cyan-700' : 'text-cyan-400'
          }`}>
            <Database className="w-4 h-4" />
            <span>Laboratório SQL & Query Tuning Engine</span>
          </div>
          <h3 className={`text-xl font-bold ${isClean ? 'text-slate-900' : 'text-white'}`}>
            Executor Interativo de Consultas Relacionais
          </h3>
        </div>

        {/* Preset Selector */}
        <div className={`flex flex-wrap gap-1 p-1 rounded-lg border ${
          isClean ? 'bg-slate-100 border-slate-200' : 'bg-slate-800 border-slate-700'
        }`}>
          {queryPresets.map((p) => (
            <button
              key={p.name}
              onClick={() => {
                setCurrentQuery(p.query);
                setQueryResult(executeMockSQL(p.query, { sales: retailSalesDataset }));
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                currentQuery.trim() === p.query.trim()
                  ? (isClean ? 'bg-cyan-100 text-cyan-900 border border-cyan-300 shadow-xs' : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40')
                  : (isClean ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-slate-200')
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* SQL Editor Area */}
      <div className="mt-4">
        <div className="flex items-center justify-between bg-slate-950 px-4 py-2 rounded-t-lg border-t border-x border-slate-800 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>Editor SQL (MySQL / PostgreSQL Dialect)</span>
          </div>
          <span className="text-[11px] text-slate-500">Tabela disponível: <code>sales</code></span>
        </div>
        <textarea
          value={currentQuery}
          onChange={(e) => setCurrentQuery(e.target.value)}
          rows={6}
          className="w-full bg-slate-950 font-mono text-xs text-cyan-300 p-4 border border-slate-800 focus:outline-none focus:border-cyan-500 resize-y"
          placeholder="Digite sua query SQL aqui..."
        />
        <div className="flex items-center justify-between bg-slate-950/80 px-4 py-2.5 rounded-b-lg border-b border-x border-slate-800">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            {queryResult.success ? (
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>{queryResult.rowCount} linhas retornadas em {queryResult.executionTime}</span>
              </span>
            ) : (
              <span className="text-rose-400">{queryResult.error}</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleRunQuery}
              className="flex items-center gap-1.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold px-4 py-1.5 rounded transition-all shadow-sm active:scale-95"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Executar Query</span>
            </button>
          </div>
        </div>
      </div>

      {/* Results Header with View Mode and Export Actions */}
      <div className="flex items-center justify-between mt-6 mb-3">
        <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-lg border border-slate-700">
          <button
            onClick={() => setActiveTab('results')}
            className={`px-3 py-1 text-xs font-medium rounded ${
              activeTab === 'results' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Tabela de Dados ({queryResult.rowCount})
          </button>
          <button
            onClick={() => setActiveTab('explain')}
            className={`px-3 py-1 text-xs font-medium rounded ${
              activeTab === 'explain' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            🔍 EXPLAIN ANALYZE (Plano de Execução)
          </button>
        </div>

        {/* Export Buttons */}
        {queryResult.success && queryResult.rows.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 px-3 py-1.5 rounded transition-all"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
              <span>Exportar CSV</span>
            </button>
            <button
              onClick={handleExportJSON}
              className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 px-3 py-1.5 rounded transition-all"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>Exportar JSON</span>
            </button>
          </div>
        )}
      </div>

      {/* Tab: Results Table */}
      {activeTab === 'results' && (
        <div className="overflow-x-auto rounded-lg border border-slate-800 bg-slate-950">
          {queryResult.success && queryResult.rows.length > 0 ? (
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-800/80 text-slate-300 border-b border-slate-700 font-mono">
                  {queryResult.columns.map((col: string) => (
                    <th key={col} className="p-3 font-semibold capitalize">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-mono">
                {queryResult.rows.map((row: any, i: number) => (
                  <tr key={i} className="hover:bg-slate-800/40 transition-colors">
                    {queryResult.columns.map((col: string) => (
                      <td key={col} className="p-3 text-slate-300">
                        {row[col] !== undefined ? String(row[col]) : '-'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-8 text-center text-slate-500 text-xs">
              {queryResult.error || 'Nenhum registro retornado para a consulta especificada.'}
            </div>
          )}
        </div>
      )}

      {/* Tab: EXPLAIN ANALYZE */}
      {activeTab === 'explain' && (
        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 font-mono text-xs space-y-3">
          <div className="text-cyan-400 font-semibold mb-2">Plano de Execução Estimado (CBO - Cost-Based Optimizer):</div>
          {queryResult.explainPlan ? (
            queryResult.explainPlan.map((step: any, idx: number) => (
              <div key={idx} className="p-3 bg-slate-900/60 rounded border border-slate-800/80 flex items-start justify-between">
                <div>
                  <span className="text-amber-300 font-bold">{step.step}</span>
                  <p className="text-slate-400 text-[11px] mt-0.5">{step.details}</p>
                </div>
                <span className="text-[10px] text-slate-500 bg-slate-800 px-2 py-0.5 rounded">
                  Cost: {step.cost}
                </span>
              </div>
            ))
          ) : (
            <p className="text-slate-500">Execute uma consulta válida para inspecionar o plano de execução.</p>
          )}
        </div>
      )}
    </div>
  );
};
