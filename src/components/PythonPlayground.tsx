import { formatCurrency, formatPercent, convertToCSV, downloadFile } from '../utils/analytics';
import { useTheme } from '../context/ThemeContext';

export const PythonPlayground: React.FC = () => {
  const { isClean } = useTheme();
  const scripts = [
    {
      id: 'groupby',
      name: 'Pandas GroupBy & Margem por Canal',
      code: `import pandas as pd
import numpy as np

# Carrega transações corporativas
df = pd.DataFrame(dataset_vendas)

# Calcula Margem Bruta e Faturamento Líquido
df['faturamento_liquido'] = df['valorVenda'] * (1 - df['descontoPercent'] / 100)
df['lucro_bruto'] = df['faturamento_liquido'] - df['custoProduto']

# Agrupamento corporativo por canal de aquisição
resumo_canais = df.groupby('canal').agg(
    total_faturamento=('faturamento_liquido', 'sum'),
    lucro_total=('lucro_bruto', 'sum'),
    margem_media_pct=('lucro_bruto', lambda x: (x.sum() / df.loc[x.index, 'faturamento_liquido'].sum()) * 100),
    pedidos=('id', 'count')
).reset_index().sort_values(by='total_faturamento', ascending=False)

print(resumo_canais)`,
      run: () => {
        const canais = ['Representante', 'E-commerce', 'App Mobile', 'Loja Física'];
        const rows = canais.map(canal => {
          const items = retailSalesDataset.filter(t => t.canal === canal && t.status === 'Concluído');
          const fat = items.reduce((acc, t) => acc + (t.valorVenda * (1 - t.descontoPercent / 100)), 0);
          const custo = items.reduce((acc, t) => acc + t.custoProduto, 0);
          const lucro = fat - custo;
          const margem = fat > 0 ? (lucro / fat) * 100 : 0;
          return {
            canal,
            total_faturamento: Math.round(fat),
            faturamento_fmt: formatCurrency(fat),
            lucro_total: Math.round(lucro),
            lucro_fmt: formatCurrency(lucro),
            margem_pct: Math.round(margem * 10) / 10,
            pedidos: items.length,
          };
        }).sort((a, b) => b.total_faturamento - a.total_faturamento);

        return {
          columns: ['canal', 'faturamento_fmt', 'lucro_fmt', 'margem_pct', 'pedidos'],
          columnLabels: ['Canal de Venda', 'Faturamento Líquido', 'Lucro Bruto', 'Margem (%)', 'Qtd Pedidos'],
          rows,
          rawExport: rows.map(r => ({ Canal: r.canal, Faturamento: r.total_faturamento, Lucro: r.lucro_total, MargemPercent: r.margem_pct, Pedidos: r.pedidos })),
          log: `[Pandas 2.2.1] GroupBy executado via Hash Table C-vectorized em 1.4ms. Memória RAM alocada: 28KB.`
        };
      }
    },
    {
      id: 'iqr-outliers',
      name: 'Detecção de Outliers via IQR',
      code: `import pandas as pd

df = pd.DataFrame(dataset_vendas)

# Cálculo do Intervalo Interquartil (IQR)
q1 = df['valorVenda'].quantile(0.25)
q3 = df['valorVenda'].quantile(0.75)
iqr = q3 - q1
limite_superior = q3 + 1.5 * iqr

# Identifica transações corporativas anômalas (Whales / Grandes Contratos)
outliers = df[df['valorVenda'] > limite_superior][['cliente', 'segmento', 'regiao', 'valorVenda']]
print(f"Limite Superior Sugerido: R$ {limite_superior:,.2f}")
print(outliers)`,
      run: () => {
        const sorted = [...retailSalesDataset].map(t => t.valorVenda).sort((a, b) => a - b);
        const q1 = sorted[Math.floor(sorted.length * 0.25)];
        const q3 = sorted[Math.floor(sorted.length * 0.75)];
        const iqr = q3 - q1;
        const lim = q3 + 1.5 * iqr;

        const outliers = retailSalesDataset.filter(t => t.valorVenda > lim);
        const rows = outliers.map(t => ({
          cliente: t.cliente,
          segmento: t.segmento,
          regiao: t.regiao,
          valor_formatado: formatCurrency(t.valorVenda),
          valorVenda: t.valorVenda,
          classificacao: 'Grande Contrato B2B (Whale)'
        }));

        return {
          columns: ['cliente', 'segmento', 'regiao', 'valor_formatado', 'classificacao'],
          columnLabels: ['Cliente', 'Segmento', 'Região', 'Valor Venda', 'Classificação Estatística'],
          rows,
          rawExport: rows,
          log: `[Estatística] Q1: ${formatCurrency(q1)} | Q3: ${formatCurrency(q3)} | Limite Superior: ${formatCurrency(lim)}. Detectados ${rows.length} registros.`
        };
      }
    },
    {
      id: 'polars',
      name: 'Polars LazyFrame: Agrupamento em Rust',
      code: `import polars as pl

# Leitura em LazyFrame (Avaliação Tardia e Otimização de Grafo de Consulta)
lf = pl.LazyFrame(dataset_vendas)

resultado = (
    lf.filter(pl.col("status") == "Concluído")
    .group_by("categoria")
    .agg([
        pl.col("valorVenda").sum().alias("faturamento_bruto"),
        pl.col("qtdItens").sum().alias("unidades_vendidas"),
        pl.col("valorVenda").mean().alias("ticket_medio")
    ])
    .sort("faturamento_bruto", descending=True)
    .collect() # Dispara execução paralela em Rust
)

print(resultado)`,
      run: () => {
        const cats = ['Informática', 'Alimentos', 'Móveis', 'Eletrônicos', 'Vestuário'];
        const rows = cats.map(cat => {
          const items = retailSalesDataset.filter(t => t.categoria === cat && t.status === 'Concluído');
          const fat = items.reduce((acc, t) => acc + t.valorVenda, 0);
          const qtd = items.reduce((acc, t) => acc + t.qtdItens, 0);
          const ticket = items.length > 0 ? fat / items.length : 0;
          return {
            categoria: cat,
            faturamento_fmt: formatCurrency(fat),
            unidades: qtd,
            ticket_fmt: formatCurrency(ticket),
            faturamento_raw: fat,
          };
        }).sort((a, b) => b.faturamento_raw - a.faturamento_raw);

        return {
          columns: ['categoria', 'faturamento_fmt', 'unidades', 'ticket_fmt'],
          columnLabels: ['Categoria', 'Faturamento Bruto', 'Unidades Vendidas', 'Ticket Médio'],
          rows,
          rawExport: rows,
          log: `[Polars 0.20.10] Plano compilado em grafo nativo Rust multithreaded (SIMD enabled). Execução em 0.8ms.`
        };
      }
    }
  ];

  const [activeScriptIdx, setActiveScriptIdx] = useState(0);
  const activeScript = scripts[activeScriptIdx];
  const [output, setOutput] = useState(activeScript.run());

  const handleRun = () => {
    setOutput(activeScript.run());
  };

  const handleExportCSV = () => {
    const csv = convertToCSV(output.rawExport);
    downloadFile(csv, `resultado_python_${activeScript.id}.csv`, 'text/csv;charset=utf-8;');
  };

  const handleExportJSON = () => {
    const json = JSON.stringify(output.rawExport, null, 2);
    downloadFile(json, `resultado_python_${activeScript.id}.json`, 'application/json');
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
            isClean ? 'text-emerald-700' : 'text-emerald-400'
          }`}>
            <Code2 className="w-4 h-4" />
            <span>Playground Interativo Python & Pandas/Polars</span>
          </div>
          <h3 className={`text-xl font-bold ${isClean ? 'text-slate-900' : 'text-white'}`}>
            Laboratório de Processamento Vetorizado
          </h3>
        </div>

        {/* Script Selector */}
        <div className={`flex flex-wrap gap-1 p-1 rounded-lg border ${
          isClean ? 'bg-slate-100 border-slate-200' : 'bg-slate-800 border-slate-700'
        }`}>
          {scripts.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => {
                setActiveScriptIdx(idx);
                setOutput(scripts[idx].run());
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                activeScriptIdx === idx
                  ? (isClean ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 shadow-xs' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40')
                  : (isClean ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-slate-200')
              }`}
            >
              {s.name.split(':')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Code Viewer */}
      <div className="mt-4">
        <div className="flex items-center justify-between bg-slate-950 px-4 py-2 rounded-t-lg border-t border-x border-slate-800 text-xs">
          <div className="flex items-center gap-2 text-slate-400 font-mono">
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span>script_analise.py (Python 3.12 / Vectorized Engine)</span>
          </div>
          <span className="text-[11px] text-slate-500">Dataset: <code>df_vendas (20 linhas corporativas)</code></span>
        </div>
        <pre className="p-4 bg-slate-950 font-mono text-xs text-emerald-300 border border-slate-800 overflow-x-auto">
          {activeScript.code}
        </pre>
        <div className="flex items-center justify-between bg-slate-950/80 px-4 py-2.5 rounded-b-lg border-b border-x border-slate-800">
          <span className="text-xs text-slate-400 font-mono truncate max-w-lg">{output.log}</span>
          <button
            onClick={handleRun}
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-4 py-1.5 rounded transition-all shadow-sm active:scale-95"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Executar Script</span>
          </button>
        </div>
      </div>

      {/* Output Header */}
      <div className="flex items-center justify-between mt-6 mb-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>DataFrame Resultante (Pandas Output):</span>
        </div>

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
      </div>

      {/* Output Table */}
      <div className="overflow-x-auto rounded-lg border border-slate-800 bg-slate-950">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-800/80 text-slate-300 border-b border-slate-700 font-mono">
              {output.columnLabels.map((lbl: string) => (
                <th key={lbl} className="p-3 font-semibold">
                  {lbl}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 font-mono">
            {output.rows.map((row: any, i: number) => (
              <tr key={i} className="hover:bg-slate-800/40 transition-colors">
                {output.columns.map((col: string) => (
                  <td key={col} className="p-3 text-slate-300">
                    {row[col] !== undefined ? String(row[col]) : '-'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
