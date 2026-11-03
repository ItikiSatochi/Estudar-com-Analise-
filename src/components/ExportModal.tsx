import React, { useState } from 'react';
import { X, Download, Copy, Check, FileSpreadsheet, FileCode, FileText, Printer } from 'lucide-react';
import { convertToCSV, downloadFile } from '../utils/analytics';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  context: {
    title: string;
    data: any[];
    reportMarkdown: string;
  };
}

export const ExportModal: React.FC<Props> = ({ isOpen, onClose, context }) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'csv' | 'json' | 'markdown' | 'print'>('markdown');
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(context.reportMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadMarkdown = () => {
    downloadFile(context.reportMarkdown, `relatorio_${context.title.toLowerCase().replace(/\s+/g, '_')}.md`, 'text/markdown;charset=utf-8;');
  };

  const handleDownloadCSV = () => {
    const csv = convertToCSV(context.data);
    downloadFile(csv, `dados_${context.title.toLowerCase().replace(/\s+/g, '_')}.csv`, 'text/csv;charset=utf-8;');
  };

  const handleDownloadJSON = () => {
    const json = JSON.stringify(context.data, null, 2);
    downloadFile(json, `dados_${context.title.toLowerCase().replace(/\s+/g, '_')}.json`, 'application/json');
  };

  const handleTriggerPrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col text-slate-100 shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/80">
          <div>
            <span className="text-xs text-indigo-400 font-semibold uppercase tracking-wider block">Central de Exportação & Governança</span>
            <h3 className="text-lg font-bold text-white mt-0.5">{context.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Export Formats Nav */}
        <div className="flex items-center gap-2 p-3 bg-slate-950/50 border-b border-slate-800 px-5">
          <button
            onClick={() => setActiveTab('markdown')}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg transition-all ${
              activeTab === 'markdown' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Relatório C-Level (Markdown)</span>
          </button>
          <button
            onClick={() => setActiveTab('csv')}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg transition-all ${
              activeTab === 'csv' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Planilha Excel / CSV</span>
          </button>
          <button
            onClick={() => setActiveTab('json')}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg transition-all ${
              activeTab === 'json' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileCode className="w-4 h-4" />
            <span>JSON Estruturado</span>
          </button>
          <button
            onClick={() => setActiveTab('print')}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg transition-all ${
              activeTab === 'print' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir / Gerar PDF</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 font-mono text-xs">
          {activeTab === 'markdown' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Pré-visualização do Relatório Executivo Formatado:</span>
                <div className="flex items-center gap-2 font-sans">
                  <button
                    onClick={handleCopyMarkdown}
                    className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copiado!' : 'Copiar Texto'}</span>
                  </button>
                  <button
                    onClick={handleDownloadMarkdown}
                    className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Baixar .md</span>
                  </button>
                </div>
              </div>
              <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-emerald-300 whitespace-pre-wrap leading-relaxed max-h-[450px] overflow-y-auto">
                {context.reportMarkdown}
              </pre>
            </div>
          )}

          {activeTab === 'csv' && (
            <div className="space-y-4 font-sans">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">Formato CSV Delimitado por Ponto e Vírgula (;)</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Compatível diretamente com Microsoft Excel e Power BI Desktop no Brasil</p>
                </div>
                <button
                  onClick={handleDownloadCSV}
                  className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Baixar Arquivo .CSV</span>
                </button>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-[11px] text-slate-300 max-h-80 overflow-auto">
                {context.data && context.data.length > 0 ? (
                  convertToCSV(context.data.slice(0, 10))
                ) : (
                  'Nenhum registro selecionado.'
                )}
                {context.data && context.data.length > 10 && (
                  <div className="text-slate-500 mt-2 italic font-sans text-xs">
                    ... e mais {context.data.length - 10} linhas exportadas na íntegra no download.
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'json' && (
            <div className="space-y-4 font-sans">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">JSON Estruturado para APIs & Pipelines ETL</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Payload normalizado para integração com Python, Spark ou Data Lake</p>
                </div>
                <button
                  onClick={handleDownloadJSON}
                  className="flex items-center gap-1.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Baixar Arquivo .JSON</span>
                </button>
              </div>

              <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-[11px] text-cyan-300 max-h-80 overflow-auto">
                {JSON.stringify(context.data.slice(0, 5), null, 2)}
              </pre>
            </div>
          )}

          {activeTab === 'print' && (
            <div className="space-y-4 font-sans text-slate-300">
              <div className="p-4 bg-indigo-950/40 border border-indigo-800/40 rounded-xl">
                <h4 className="text-sm font-bold text-white">Visualização Pronta para Apresentação em Diretoria</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Clique abaixo para acionar a janela de impressão do navegador ou salvar diretamente como PDF em formato A4 com estilos corporativos limpos.
                </p>
                <button
                  onClick={handleTriggerPrint}
                  className="mt-4 flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-all shadow-sm"
                >
                  <Printer className="w-4 h-4" />
                  <span>Abrir Diálogo de Impressão / Salvar PDF</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
