import React, { useState } from 'react';
import { X, Sparkles, Send, Bot, Terminal, TrendingUp, CheckCircle2, ArrowRight } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  context?: {
    title: string;
    data: any;
    summary: any;
  };
}

export const AiInsightsModal: React.FC<Props> = ({ isOpen, onClose, context }) => {
  if (!isOpen) return null;

  const [question, setQuestion] = useState<string>('');
  const [messages, setMessages] = useState<Array<{ role: 'assistant' | 'user'; text: string; sql?: string }>>([
    {
      role: 'assistant',
      text: `Olá! Sou o Assistente de Inteligência de Dados Corporativa. Posso gerar diagnósticos estratégicos para o conselho de administração, transformar perguntas de negócio em queries SQL otimizadas ou escrever narrativas de storytelling para o case atual (${context?.title || 'Análise Corporativa'}). Como posso ajudar agora?`
    }
  ]);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const presetQuestions = [
    'Quais as 3 maiores alavancas para elevar a margem EBITDA?',
    'Como reduzir o Churn Rate nos próximos 90 dias?',
    'Gerar query SQL para identificar os clientes de maior valor',
    'Escrever resumo executivo de 1 parágrafo para o conselho'
  ];

  const handleAsk = (userQuery: string) => {
    if (!userQuery.trim()) return;

    const newMsgs = [...messages, { role: 'user' as const, text: userQuery }];
    setMessages(newMsgs);
    setQuestion('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = '';
      let sqlSnippet: string | undefined = undefined;

      const q = userQuery.toLowerCase();
      if (q.includes('ebitda') || q.includes('margem')) {
        reply = `**Diagnóstico Estratégico de Rentabilidade & EBITDA:**
1. **Disciplina de Custos Fixos:** A expansão de margem observada (de 22,8% para 30,4%) decorre da diluição de SG&A sobre um faturamento 74% superior. Manter o teto de contratação não-core nos próximos 2 trimestres.
2. **Revisão de Descontos Comerciais:** 15% das transações B2B receberam descontos acima de 8% sem gatilho de volume mínimo. Fixar teto rígido de 5%.
3. **Mix de Produtos com Margem de Contribuição Alta:** Priorizar faturamento de Informática e Infraestrutura com margem bruta média de 44%.`;
      } else if (q.includes('churn') || q.includes('retenção') || q.includes('nrr')) {
        reply = `**Plano de Retenção & Redução de Churn (90 Dias):**
1. **Alerta Precoce de Inatividade:** 70% dos cancelamentos foram precedidos por queda de login superior a 30 dias. Automatizar alertas via webhook para squads de CS.
2. **Contratos Anuais Pré-Pagos:** Substituir faturamento mensal por assinaturas anuais com desconto de 12%, reduzindo o churn voluntário a zero durante o período.
3. **Expansão de NRR (Upsell Orgânico):** Focar na venda de novas licenças para contas existentes com mais de 6 meses de contrato, alavancando o NRR para além dos 118%.`;
      } else if (q.includes('sql') || q.includes('query')) {
        reply = `Aqui está a consulta SQL corporativa otimizada com Window Functions para extrair o ranking dos top clientes com contribuição sobre o faturamento:`;
        sqlSnippet = `WITH ranking_clientes AS (
  SELECT 
    cliente,
    segmento,
    regiao,
    SUM(valor_venda) AS faturamento_total,
    DENSE_RANK() OVER(ORDER BY SUM(valor_venda) DESC) AS ranking
  FROM sales
  WHERE status = 'Concluído'
  GROUP BY cliente, segmento, regiao
)
SELECT * FROM ranking_clientes WHERE ranking <= 5;`;
      } else {
        reply = `**Síntese Executiva C-Level:**
A operação demonstra fundamentos sólidos de expansão com indicadores chave de crescimento e retenção acima dos benchmarks de mercado. As oportunidades imediatas residem no saneamento de descontos comerciais no canal B2B e na automatização de compras de reposição no armazém para evitar rupturas de estoque em SKUs Classe A.`;
      }

      setMessages(prev => [...prev, { role: 'assistant', text: reply, sql: sqlSnippet }]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col text-slate-100 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-indigo-400 font-semibold uppercase tracking-wider block">Inteligência Analítica</span>
              <h3 className="text-base font-bold text-white">Assistente de Decisão Estratégica & NL-to-SQL</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preset prompts buttons */}
        <div className="p-3 bg-slate-950/50 border-b border-slate-800 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-slate-500 text-[11px] whitespace-nowrap pl-2">Sugestões rápidas:</span>
          {presetQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleAsk(q)}
              className="whitespace-nowrap px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs border border-slate-700 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Messages Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.role === 'assistant' && (
                <div className="w-7 h-7 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-300 flex-shrink-0 mt-1">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-xl p-4 text-xs leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-950 border border-slate-800 text-slate-200'
                }`}
              >
                <div className="whitespace-pre-line">{m.text}</div>
                {m.sql && (
                  <div className="mt-3 pt-3 border-t border-slate-800">
                    <span className="text-[10px] text-cyan-400 uppercase font-mono block mb-1">Código SQL Gerado:</span>
                    <pre className="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-[11px] text-cyan-300 overflow-x-auto">
                      {m.sql}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-slate-500 italic pl-10">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping"></span>
              <span>Analisando padrões e formulando diagnóstico executivo...</span>
            </div>
          )}
        </div>

        {/* Input Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAsk(question);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Pergunte sobre rentabilidade, predição de churn ou peça uma query SQL..."
              className="flex-1 bg-slate-900 text-slate-200 text-xs rounded-xl border border-slate-800 px-4 py-3 focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              disabled={!question.trim()}
              className="p-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white rounded-xl transition-all shadow-sm active:scale-95 flex-shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
