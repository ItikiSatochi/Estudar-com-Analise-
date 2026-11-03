import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatCurrency,
  formatNumberCompact,
  formatPercent,
  calculateRetailKPIs,
  calculateSaaSOverview,
  calculateCurvaABC,
  convertToCSV,
  executeMockSQL,
} from './analytics';
import { RetailTransaction, SaaSMetricRecord } from '../types';

test('formatCurrency formats BRL and handles zero/null safely', () => {
  const result = formatCurrency(1250.5);
  assert.ok(result.includes('1.250,50') || result.includes('1250,50'));
  assert.equal(formatCurrency(0), 'R$\u00a00,00');
});

test('formatNumberCompact formats thousands and millions correctly', () => {
  assert.equal(formatNumberCompact(950), '950');
  assert.equal(formatNumberCompact(25000), '25k');
  assert.equal(formatNumberCompact(1400000), '1,4M');
  assert.equal(formatNumberCompact(2500000000), '2,5B');
});

test('formatPercent handles float decimals accurately', () => {
  assert.equal(formatPercent(12.345, 1), '12,3%');
  assert.equal(formatPercent(45.678, 2), '45,68%');
  assert.equal(formatPercent(NaN), '0,0%');
});

test('calculateRetailKPIs computes accurate totals, discounts and margins', () => {
  const mockTransactions: RetailTransaction[] = [
    {
      id: 'TX-01',
      data: '2026-03-01',
      cliente: 'Empresa Alpha',
      segmento: 'B2B',
      regiao: 'Sudeste',
      canal: 'E-commerce',
      categoria: 'Informática',
      valorVenda: 1000,
      custoProduto: 600,
      descontoPercent: 10, // 1000 - 100 = 900 faturamento líquido
      qtdItens: 1,
      status: 'Concluído',
    },
    {
      id: 'TX-02',
      data: '2026-03-02',
      cliente: 'Empresa Beta',
      segmento: 'B2B',
      regiao: 'Sudeste',
      canal: 'E-commerce',
      categoria: 'Informática',
      valorVenda: 2000,
      custoProduto: 1200,
      descontoPercent: 0, // 2000 faturamento líquido
      qtdItens: 1,
      status: 'Concluído',
    },
    {
      id: 'TX-03',
      data: '2026-03-03',
      cliente: 'Pessoa Gama',
      segmento: 'B2C',
      regiao: 'Sul',
      canal: 'Loja Física',
      categoria: 'Móveis',
      valorVenda: 500,
      custoProduto: 200,
      descontoPercent: 0,
      qtdItens: 1,
      status: 'Devolvido',
    },
  ];

  const kpis = calculateRetailKPIs(mockTransactions);
  assert.equal(kpis.totalVendas, 2);
  assert.equal(kpis.faturamentoTotal, 2900); // 900 + 2000
  // Custo: 600 + 1200 = 1800. Lucro bruto: 2900 - 1800 = 1100
  assert.equal(kpis.lucroBrutoTotal, 1100);
  assert.equal(kpis.ticketMedio, 1450); // 2900 / 2
  // Devoluções: 1 de 3 = 33.3%
  assert.equal(kpis.taxaDevolucaoPercent, 33.3);
});

test('calculateSaaSOverview computes LTV/CAC ratio and aggregate churn rate', () => {
  const mockSaaS: SaaSMetricRecord[] = [
    {
      mes: 'Jan/26',
      mrr: 100000,
      novosClientes: 20,
      clientesCancelados: 2,
      clientesAtivos: 100,
      arpu: 1000,
      churnRatePercent: 2.0,
      cac: 3000,
      ltv: 15000,
      nrrPercent: 110,
    },
    {
      mes: 'Fev/26',
      mrr: 120000,
      novosClientes: 25,
      clientesCancelados: 3,
      clientesAtivos: 122,
      arpu: 983,
      churnRatePercent: 2.4,
      cac: 3200,
      ltv: 16000,
      nrrPercent: 112,
    },
  ];

  const saasKpis = calculateSaaSOverview(mockSaaS);
  assert.equal(saasKpis.mrrAtual, 120000);
  assert.equal(saasKpis.arrProjetado, 1440000);
  assert.equal(saasKpis.ltvCacRatio, 5.0); // 16000 / 3200
  assert.equal(saasKpis.churnRateMedioPercent, 2.2); // (2.0 + 2.4)/2
  assert.equal(saasKpis.nrrMedioPercent, 111);
});

test('calculateCurvaABC categorizes items into Pareto A, B and C tiers', () => {
  const items = [
    { sku: 'ITEM-1', valorTotalEstoque: 7000 },
    { sku: 'ITEM-2', valorTotalEstoque: 1500 },
    { sku: 'ITEM-3', valorTotalEstoque: 1000 },
    { sku: 'ITEM-4', valorTotalEstoque: 500 },
  ];
  // Total: 10,000. ITEM-1: 70% (A). ITEM-2: 85% (B). ITEM-3: 95% (B). ITEM-4: 100% (C).
  const classified = calculateCurvaABC(items);
  assert.equal(classified[0].classeABC, 'A');
  assert.equal(classified[1].classeABC, 'B');
  assert.equal(classified[2].classeABC, 'B');
  assert.equal(classified[3].classeABC, 'C');
});

test('convertToCSV generates valid semicolon-separated RFC format', () => {
  const data = [
    { nome: 'Notebook Dell', preco: 4500, categoria: 'TI' },
    { nome: 'Monitor "27', preco: 1200, categoria: 'TI' },
  ];
  const csv = convertToCSV(data);
  assert.ok(csv.includes('nome;preco;categoria'));
  assert.ok(csv.includes('"Notebook Dell";"4500";"TI"'));
  assert.ok(csv.includes('"Monitor ""27";"1200";"TI"'));
});

test('executeMockSQL parses mock queries and returns execution stats', () => {
  const dummyTx: RetailTransaction[] = [
    {
      id: 'TX-1',
      data: '2026-03-01',
      cliente: 'Loja A',
      segmento: 'B2B',
      regiao: 'Sudeste',
      canal: 'E-commerce',
      categoria: 'Informática',
      valorVenda: 5000,
      custoProduto: 3000,
      descontoPercent: 0,
      qtdItens: 2,
      status: 'Concluído',
    },
    {
      id: 'TX-2',
      data: '2026-03-02',
      cliente: 'Loja B',
      segmento: 'B2B',
      regiao: 'Sul',
      canal: 'Loja Física',
      categoria: 'Móveis',
      valorVenda: 3000,
      custoProduto: 1800,
      descontoPercent: 0,
      qtdItens: 1,
      status: 'Concluído',
    },
  ];

  const result = executeMockSQL('SELECT * FROM SALES WHERE REGIAO = \'SUDESTE\' GROUP BY REGIAO', { sales: dummyTx });
  assert.equal(result.success, true);
  assert.equal(result.rowCount, 1);
  assert.equal(result.rows[0].regiao, 'Sudeste');
});
