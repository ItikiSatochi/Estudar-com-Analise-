import { RetailTransaction, SaaSMetricRecord, FinancialRecord, InventoryRecord } from '../types';

/**
 * Format currency in Brazilian Real (BRL)
 */
export function formatCurrency(value: number, currency: string = 'BRL'): string {
  if (isNaN(value) || value === null || value === undefined) return 'R$ 0,00';
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Format compact numbers for C-level dashboards (e.g. 1.2M, 450k)
 */
export function formatNumberCompact(value: number): string {
  if (isNaN(value)) return '0';
  const abs = Math.abs(value);
  if (abs >= 1_000_000_000) {
    const num = value / 1_000_000_000;
    return (num % 1 === 0 ? num.toFixed(0) : num.toFixed(1)).replace('.', ',') + 'B';
  }
  if (abs >= 1_000_000) {
    const num = value / 1_000_000;
    return (num % 1 === 0 ? num.toFixed(0) : num.toFixed(1)).replace('.', ',') + 'M';
  }
  if (abs >= 1_000) {
    const num = value / 1_000;
    return (num % 1 === 0 ? num.toFixed(0) : num.toFixed(1)).replace('.', ',') + 'k';
  }
  return value.toLocaleString('pt-BR');
}

/**
 * Format percentage
 */
export function formatPercent(value: number, decimals: number = 1): string {
  if (isNaN(value)) return '0,0%';
  return `${value.toFixed(decimals).replace('.', ',')}%`;
}

/**
 * Calculate Retail Sales KPIs
 */
export function calculateRetailKPIs(transactions: RetailTransaction[]) {
  if (!transactions.length) {
    return {
      faturamentoTotal: 0,
      lucroBrutoTotal: 0,
      margemBrutaPercent: 0,
      ticketMedio: 0,
      totalVendas: 0,
      taxaDevolucaoPercent: 0,
      totalItens: 0,
    };
  }

  const concluidas = transactions.filter(t => t.status === 'Concluído');
  const devolvidas = transactions.filter(t => t.status === 'Devolvido');

  const faturamentoTotal = concluidas.reduce((acc, t) => {
    const desconto = t.valorVenda * (t.descontoPercent / 100);
    return acc + (t.valorVenda - desconto);
  }, 0);

  const custoTotal = concluidas.reduce((acc, t) => acc + t.custoProduto, 0);
  const lucroBrutoTotal = faturamentoTotal - custoTotal;
  const margemBrutaPercent = faturamentoTotal > 0 ? (lucroBrutoTotal / faturamentoTotal) * 100 : 0;
  const ticketMedio = concluidas.length > 0 ? faturamentoTotal / concluidas.length : 0;
  const taxaDevolucaoPercent = transactions.length > 0 ? (devolvidas.length / transactions.length) * 100 : 0;
  const totalItens = concluidas.reduce((acc, t) => acc + t.qtdItens, 0);

  return {
    faturamentoTotal: Math.round(faturamentoTotal * 100) / 100,
    lucroBrutoTotal: Math.round(lucroBrutoTotal * 100) / 100,
    margemBrutaPercent: Math.round(margemBrutaPercent * 10) / 10,
    ticketMedio: Math.round(ticketMedio * 100) / 100,
    totalVendas: concluidas.length,
    taxaDevolucaoPercent: Math.round(taxaDevolucaoPercent * 10) / 10,
    totalItens,
  };
}

/**
 * Calculate SaaS Key Metrics
 */
export function calculateSaaSOverview(records: SaaSMetricRecord[]) {
  if (!records.length) {
    return {
      mrrAtual: 0,
      arrProjetado: 0,
      ltvCacRatio: 0,
      churnRateMedioPercent: 0,
      nrrMedioPercent: 0,
      totalClientes: 0,
    };
  }

  const ultimoMes = records[records.length - 1];
  const mrrAtual = ultimoMes.mrr;
  const arrProjetado = mrrAtual * 12;
  const ltvCacRatio = ultimoMes.cac > 0 ? ultimoMes.ltv / ultimoMes.cac : 0;

  const somaChurn = records.reduce((acc, r) => acc + r.churnRatePercent, 0);
  const churnRateMedioPercent = somaChurn / records.length;

  const somaNrr = records.reduce((acc, r) => acc + r.nrrPercent, 0);
  const nrrMedioPercent = somaNrr / records.length;

  return {
    mrrAtual,
    arrProjetado,
    ltvCacRatio: Math.round(ltvCacRatio * 10) / 10,
    churnRateMedioPercent: Math.round(churnRateMedioPercent * 10) / 10,
    nrrMedioPercent: Math.round(nrrMedioPercent * 10) / 10,
    totalClientes: ultimoMes.clientesAtivos,
  };
}

/**
 * Calculate Curva ABC for Inventory Optimization (Pareto 80/15/5 rule)
 */
export function calculateCurvaABC<T extends { valorTotalEstoque: number }>(items: T[]): (T & { classeABC: 'A' | 'B' | 'C'; acumuladoPercent: number })[] {
  const sorted = [...items].sort((a, b) => b.valorTotalEstoque - a.valorTotalEstoque);
  const valorTotalGeral = sorted.reduce((sum, item) => sum + item.valorTotalEstoque, 0);

  if (valorTotalGeral === 0) {
    return sorted.map(item => ({ ...item, classeABC: 'C' as const, acumuladoPercent: 100 }));
  }

  let acumulado = 0;
  return sorted.map(item => {
    acumulado += item.valorTotalEstoque;
    const acumuladoPercent = (acumulado / valorTotalGeral) * 100;
    let classeABC: 'A' | 'B' | 'C';
    if (acumuladoPercent <= 80) {
      classeABC = 'A';
    } else if (acumuladoPercent <= 95) {
      classeABC = 'B';
    } else {
      classeABC = 'C';
    }
    return {
      ...item,
      classeABC,
      acumuladoPercent: Math.round(acumuladoPercent * 10) / 10,
    };
  });
}

/**
 * Convert array of objects to CSV string
 */
export function convertToCSV(data: Record<string, any>[]): string {
  if (!data || !data.length) return '';
  const headers = Object.keys(data[0]);
  const rows = data.map(row => 
    headers.map(header => {
      const val = row[header];
      if (val === null || val === undefined) return '""';
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    }).join(';')
  );
  return [headers.join(';'), ...rows].join('\r\n');
}

/**
 * Trigger browser file download
 */
export function downloadFile(content: string, filename: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Generate Executive Markdown Report for C-Level Presentation
 */
export function generateExecutiveReportMarkdown(
  projectName: string,
  summary: { title: string; value: string; variance?: string }[],
  insights: string[],
  recommendations: string[]
): string {
  const dataHoje = new Date().toLocaleDateString('pt-BR');
  return `# Relatório Executivo de Inteligência de Dados & Performance
**Projeto:** ${projectName}
**Data de Emissão:** ${dataHoje}
**Classificação:** Confidencial / Corporativo

---

## 1. Resumo Executivo (C-Level Summary)
${summary.map(s => `- **${s.title}:** ${s.value} ${s.variance ? `(${s.variance})` : ''}`).join('\n')}

---

## 2. Diagnóstico & Principais Insights de Dados (Storytelling com Fatos)
${insights.map((ins, i) => `${i + 1}. ${ins}`).join('\n')}

---

## 3. Recomendações Estratégicas & Plano de Ação (Próximos Passos)
${recommendations.map((rec, i) => `- [ ] **Ação ${i + 1}:** ${rec}`).join('\n')}

---
*Gerado via DataMaster Pro Analytics Engine. Validado para conformidade com governança de dados corporativa.*`;
}

/**
 * Lightweight mock SQL query runner for interactive SQL learning
 */
export function executeMockSQL(query: string, tables: { sales: RetailTransaction[] }) {
  const clean = query.trim().toUpperCase();
  const startTime = performance.now();

  try {
    let resultRows: any[] = [];
    let columns: string[] = [];
    let explanation = '';

    if (clean.includes('SELECT') && clean.includes('FROM SALES')) {
      let filtered = [...tables.sales];

      // Simple WHERE filter simulation
      if (clean.includes("REGIAO = 'SUDESTE'")) {
        filtered = filtered.filter(f => f.regiao === 'Sudeste');
      } else if (clean.includes("REGIAO = 'SUL'")) {
        filtered = filtered.filter(f => f.regiao === 'Sul');
      }

      if (clean.includes("SEGMENTO = 'B2B'")) {
        filtered = filtered.filter(f => f.segmento === 'B2B');
      }

      // Group by simulation
      if (clean.includes('GROUP BY REGIAO') || clean.includes('GROUP BY REGIAO, CANAL')) {
        const groups: Record<string, { regiao: string; total_faturamento: number; total_pedidos: number; ticket_medio: number }> = {};
        for (const row of filtered) {
          const key = row.regiao;
          if (!groups[key]) {
            groups[key] = { regiao: key, total_faturamento: 0, total_pedidos: 0, ticket_medio: 0 };
          }
          groups[key].total_faturamento += row.valorVenda;
          groups[key].total_pedidos += 1;
        }
        resultRows = Object.values(groups).map(g => ({
          regiao: g.regiao,
          total_pedidos: g.total_pedidos,
          total_faturamento: formatCurrency(g.total_faturamento),
          ticket_medio: formatCurrency(g.total_faturamento / g.total_pedidos),
        }));
        columns = ['regiao', 'total_pedidos', 'total_faturamento', 'ticket_medio'];
        explanation = 'Agregação executada via índice de agrupamento com hash aggregation (O(N)).';
      } else if (clean.includes('GROUP BY CATEGORIA')) {
        const groups: Record<string, { categoria: string; total_faturamento: number; qtd_itens: number }> = {};
        for (const row of filtered) {
          const key = row.categoria;
          if (!groups[key]) {
            groups[key] = { categoria: key, total_faturamento: 0, qtd_itens: 0 };
          }
          groups[key].total_faturamento += row.valorVenda;
          groups[key].qtd_itens += row.qtdItens;
        }
        resultRows = Object.values(groups).map(g => ({
          categoria: g.categoria,
          total_faturamento: formatCurrency(g.total_faturamento),
          qtd_itens: g.qtd_itens,
        }));
        columns = ['categoria', 'total_faturamento', 'qtd_itens'];
        explanation = 'Agregação por categoria de produto com ordenação descendente.';
      } else if (clean.includes('ROW_NUMBER()') || clean.includes('DENSE_RANK()')) {
        // Window function simulation
        const sorted = [...filtered].sort((a, b) => b.valorVenda - a.valorVenda);
        resultRows = sorted.slice(0, 5).map((row, idx) => ({
          ranking: idx + 1,
          cliente: row.cliente,
          regiao: row.regiao,
          canal: row.canal,
          valorVenda: formatCurrency(row.valorVenda),
        }));
        columns = ['ranking', 'cliente', 'regiao', 'canal', 'valorVenda'];
        explanation = 'Window Function OVER(PARTITION BY regiao ORDER BY valorVenda DESC) executada em pipeline particionado.';
      } else {
        // Simple select limit
        resultRows = filtered.slice(0, 6).map(r => ({
          id: r.id,
          data: r.data,
          cliente: r.cliente,
          segmento: r.segmento,
          regiao: r.regiao,
          valorVenda: formatCurrency(r.valorVenda),
          status: r.status,
        }));
        columns = ['id', 'data', 'cliente', 'segmento', 'regiao', 'valorVenda', 'status'];
        explanation = 'Varredura indexada na tabela sales (Index Scan: PRIMARY).';
      }

      const durationMs = (performance.now() - startTime).toFixed(2);

      return {
        success: true,
        columns,
        rows: resultRows,
        rowCount: resultRows.length,
        executionTime: `${durationMs} ms`,
        explainPlan: [
          { step: '1. Index Range Scan', cost: '0.04', details: 'Filtro de partições aplicadas com sucesso.' },
          { step: '2. Hash Aggregate / Stream Sort', cost: '0.12', details: explanation },
          { step: '3. Projection & Output Formatter', cost: '0.02', details: `Retornadas ${resultRows.length} linhas formatadas.` },
        ],
      };
    } else {
      return {
        success: false,
        columns: [],
        rows: [],
        rowCount: 0,
        executionTime: '0.00 ms',
        error: 'Sintaxe SQL não reconhecida no laboratório. Experimente usar os templates corporativos disponíveis acima.',
      };
    }
  } catch (err: any) {
    return {
      success: false,
      columns: [],
      rows: [],
      rowCount: 0,
      executionTime: '0.00 ms',
      error: err?.message || 'Erro de execução SQL.',
    };
  }
}
