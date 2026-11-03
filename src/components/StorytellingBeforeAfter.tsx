import React, { useState } from 'react';
import { Sparkles, Eye, CheckCircle2, XCircle, ArrowRight, Zap, Info } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const StorytellingBeforeAfter: React.FC = () => {
  const { isClean } = useTheme();
  const [mode, setMode] = useState<'bad' | 'good' | 'split'>('split');
  const [highlightKeyAction, setHighlightKeyAction] = useState(true);

  // Sample data for the visual
  const categories = [
    { name: 'Informática', value: 106700, share: 41.5, badColor: '#ff0055', status: 'Líder de Volume' },
    { name: 'Móveis & Escritório', value: 48950, share: 19.0, badColor: '#00ffcc', status: 'Margem Saudável' },
    { name: 'Alimentos Corporativos', value: 70650, share: 27.5, badColor: '#ffff00', status: 'Giro Rápido' },
    { name: 'Eletrônicos & Acessórios', value: 18600, share: 7.2, badColor: '#ff00ff', status: 'Alerta: Queda Margem (-14%)' },
    { name: 'Vestuário Corporativo', value: 12250, share: 4.8, badColor: '#0099ff', status: 'Em Avaliação' },
  ];

  return (
    <div className={`border rounded-xl p-6 transition-colors ${
      isClean ? 'bg-white border-slate-200 text-slate-800 shadow-sm' : 'bg-slate-900 border-slate-800 text-slate-100'
    }`}>
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b gap-4 ${
        isClean ? 'border-slate-200' : 'border-slate-800'
      }`}>
        <div>
          <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-1 ${
            isClean ? 'text-emerald-700' : 'text-emerald-400'
          }`}>
            <Sparkles className="w-4 h-4" />
            <span>Laboratório Interativo de Storytelling Executivo</span>
          </div>
          <h3 className={`text-xl font-bold ${isClean ? 'text-slate-900' : 'text-white'}`}>
            Antes vs. Depois: O Impacto Cognitivo do Design de Dados
          </h3>
          <p className={`text-sm mt-1 ${isClean ? 'text-slate-600' : 'text-slate-400'}`}>
            Compare o gráfico amador que confunde o conselho vs. o painel executivo que provoca ação estratégica.
          </p>
        </div>

        {/* Mode Selector */}
        <div className={`flex items-center p-1 rounded-lg border self-start sm:self-auto ${
          isClean ? 'bg-slate-100 border-slate-200' : 'bg-slate-800 border-slate-700'
        }`}>
          <button
            onClick={() => setMode('bad')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              mode === 'bad'
                ? (isClean ? 'bg-rose-100 text-rose-800 border border-rose-300 shadow-xs' : 'bg-rose-500/20 text-rose-300 border border-rose-500/40')
                : (isClean ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-slate-200')
            }`}
          >
            ❌ Gráfico Tóxico
          </button>
          <button
            onClick={() => setMode('split')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              mode === 'split'
                ? 'bg-indigo-600 text-white shadow-sm'
                : (isClean ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-slate-200')
            }`}
          >
            ⚖️ Comparação Lado a Lado
          </button>
          <button
            onClick={() => setMode('good')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              mode === 'good'
                ? (isClean ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-xs' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40')
                : (isClean ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-slate-200')
            }`}
          >
            ✅ Padrão C-Level
          </button>
        </div>
      </div>

      {/* Grid of comparison */}
      <div className={`grid gap-6 mt-6 ${mode === 'split' ? 'lg:grid-cols-2' : 'grid-cols-1'}`}>
        
        {/* The Bad Chart */}
        {(mode === 'bad' || mode === 'split') && (
          <div className={`rounded-xl p-5 flex flex-col justify-between border ${
            isClean ? 'bg-rose-50/50 border-rose-200 text-slate-800 shadow-xs' : 'bg-slate-950/80 border-rose-900/40 text-slate-100'
          }`}>
            <div>
              <div className={`flex items-center justify-between pb-3 border-b mb-4 ${
                isClean ? 'border-rose-200' : 'border-rose-900/20'
              }`}>
                <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${
                  isClean ? 'text-rose-700' : 'text-rose-400'
                }`}>
                  <XCircle className="w-4 h-4" />
                  <span>Antes: Erros Fatais de Comunicação</span>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded font-medium border ${
                  isClean ? 'text-rose-800 bg-rose-100 border-rose-300' : 'text-rose-400 bg-rose-950/60 border-rose-800/40'
                }`}>
                  Tempo p/ Decisão: ~35 segundos
                </span>
              </div>

              {/* Title problem */}
              <div className="mb-4">
                <span className={`text-xs block uppercase font-medium ${isClean ? 'text-slate-500' : 'text-slate-400'}`}>
                  Título Genérico e Burocrático:
                </span>
                <h4 className={`text-sm font-bold ${isClean ? 'text-rose-950' : 'text-rose-200'}`}>
                  Relatório de Vendas 2026 - Gráfico 1 (Fatias)
                </h4>
              </div>

              {/* Simulated Bad Pie Chart with ugly colors and noisy legends */}
              <div className={`p-4 rounded-lg border my-4 text-center ${
                isClean ? 'bg-white border-rose-200 shadow-xs' : 'bg-gradient-to-r from-purple-950/40 via-pink-950/30 to-blue-950/40 border-rose-800/20'
              }`}>
                <div className={`text-xs mb-2 italic font-medium ${isClean ? 'text-rose-700' : 'text-rose-300'}`}>
                  ⚠️ Gráfico circular 3D com sombras e cores desconexas
                </div>

                {/* SVG Mock Pie */}
                <svg viewBox="0 0 200 200" className="w-44 h-44 mx-auto drop-shadow-md">
                  {/* Slice 1: Informática */}
                  <circle r="70" cx="100" cy="100" fill="transparent"
                          stroke="#ff0055" strokeWidth="60"
                          strokeDasharray="182 258" strokeDashoffset="0" />
                  {/* Slice 2: Alimentos */}
                  <circle r="70" cx="100" cy="100" fill="transparent"
                          stroke="#ffff00" strokeWidth="60"
                          strokeDasharray="121 319" strokeDashoffset="-182" />
                  {/* Slice 3: Móveis */}
                  <circle r="70" cx="100" cy="100" fill="transparent"
                          stroke="#00ffcc" strokeWidth="60"
                          strokeDasharray="83 357" strokeDashoffset="-303" />
                  {/* Slice 4: Eletrônicos */}
                  <circle r="70" cx="100" cy="100" fill="transparent"
                          stroke="#ff00ff" strokeWidth="60"
                          strokeDasharray="32 408" strokeDashoffset="-386" />
                  {/* Slice 5: Vestuário */}
                  <circle r="70" cx="100" cy="100" fill="transparent"
                          stroke="#0099ff" strokeWidth="60"
                          strokeDasharray="21 419" strokeDashoffset="-418" />
                </svg>

                {/* Distant ugly legend */}
                <div className={`flex flex-wrap justify-center gap-2 mt-4 pt-3 border-t text-[11px] font-semibold ${
                  isClean ? 'border-slate-200' : 'border-slate-800'
                }`}>
                  <span className="text-[#d90429]">■ Informática</span>
                  <span className="text-[#b45309]">■ Alimentos</span>
                  <span className="text-[#0d9488]">■ Móveis</span>
                  <span className="text-[#c026d3]">■ Eletrônicos</span>
                  <span className="text-[#0284c7]">■ Vestuário</span>
                </div>
              </div>

              {/* Cognitive traps */}
              <div className="space-y-2 text-xs">
                <p className={`flex items-start gap-1.5 ${isClean ? 'text-slate-800' : 'text-rose-300'}`}>
                  <span className="text-rose-500 font-bold">•</span>
                  <span><strong className={isClean ? 'text-rose-900' : 'text-rose-200'}>Sobrecarga Cognitiva:</strong> O cérebro precisa alternar os olhos entre a fatia e a legenda repetidamente.</span>
                </p>
                <p className={`flex items-start gap-1.5 ${isClean ? 'text-slate-800' : 'text-rose-300'}`}>
                  <span className="text-rose-500 font-bold">•</span>
                  <span><strong className={isClean ? 'text-rose-900' : 'text-rose-200'}>Sem Hierarquia:</strong> Cores de neon competem igualmente por atenção. O problema real fica camuflado.</span>
                </p>
              </div>
            </div>

            <div className={`mt-4 pt-3 border-t text-xs flex items-center justify-between font-semibold ${
              isClean ? 'border-rose-200 text-rose-800' : 'border-slate-800 text-rose-400'
            }`}>
              <span>Resultado: Diretoria perde 15 minutos discutindo o formato.</span>
            </div>
          </div>
        )}

        {/* The Good Chart */}
        {(mode === 'good' || mode === 'split') && (
          <div className={`rounded-xl p-5 flex flex-col justify-between border ${
            isClean ? 'bg-emerald-50/30 border-emerald-200 text-slate-800 shadow-xs' : 'bg-slate-950/80 border-emerald-900/40 text-slate-100'
          }`}>
            <div>
              <div className={`flex items-center justify-between pb-3 border-b mb-4 ${
                isClean ? 'border-emerald-200' : 'border-emerald-900/20'
              }`}>
                <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${
                  isClean ? 'text-emerald-700' : 'text-emerald-400'
                }`}>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Depois: Padrão Edward Tufte & C-Level</span>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded font-medium border ${
                  isClean ? 'text-emerald-800 bg-emerald-100 border-emerald-300' : 'text-emerald-400 bg-emerald-950/60 border-emerald-800/40'
                }`}>
                  Tempo p/ Decisão: ~3 segundos
                </span>
              </div>

              {/* Title with executive conclusion */}
              <div className="mb-4">
                <span className={`text-xs font-bold uppercase tracking-wider block ${
                  isClean ? 'text-emerald-700' : 'text-emerald-400'
                }`}>
                  Insight em Destaque:
                </span>
                <h4 className={`text-sm font-bold ${isClean ? 'text-slate-900' : 'text-white'}`}>
                  Informática gera 41,5% da receita; Eletrônicos exige ação imediata de contenção de margem
                </h4>
              </div>

              {/* Horizontal Bar Chart with high Data-Ink ratio and action focus */}
              <div className="space-y-3 my-4">
                {categories.map((cat, idx) => {
                  const isActionItem = cat.name.includes('Eletrônicos');
                  const barColor = isActionItem && highlightKeyAction 
                    ? 'bg-rose-500' 
                    : (idx === 0 ? 'bg-indigo-600' : (isClean ? 'bg-slate-400' : 'bg-slate-600'));

                  return (
                    <div key={cat.name} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className={`font-semibold ${
                          isActionItem 
                            ? (isClean ? 'text-rose-700 font-bold' : 'text-rose-400 font-bold') 
                            : (isClean ? 'text-slate-800' : 'text-slate-300')
                        }`}>
                          {cat.name}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className={`font-mono font-bold ${isClean ? 'text-slate-900' : 'text-slate-200'}`}>
                            R$ {(cat.value / 1000).toFixed(1)}k
                          </span>
                          <span className={`font-mono text-[11px] font-semibold ${isClean ? 'text-slate-600' : 'text-slate-400'}`}>
                            ({cat.share}%)
                          </span>
                        </div>
                      </div>

                      {/* Bar and inline label */}
                      <div className="flex items-center gap-2">
                        <div className={`w-full h-5 rounded overflow-hidden flex items-center relative ${
                          isClean ? 'bg-slate-200' : 'bg-slate-800'
                        }`}>
                          <div 
                            className={`h-full ${barColor} transition-all duration-500 flex items-center px-2 text-[10px] text-white font-bold shadow-inner`}
                            style={{ width: `${cat.share * 2.2}%` }}
                          >
                            {cat.share > 15 && `${cat.share}%`}
                          </div>
                        </div>
                      </div>

                      {/* Contextual Action Tag if key item */}
                      {isActionItem && (
                        <div className={`text-[11px] font-medium flex items-center gap-1.5 pl-1 ${
                          isClean ? 'text-rose-800' : 'text-rose-300'
                        }`}>
                          <span className="inline-block w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                          <span>Recomendação: Renegociar fornecedores ou revisar tabela de descontos</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Storytelling pillars */}
              <div className="space-y-2 text-xs">
                <p className={`flex items-start gap-1.5 ${isClean ? 'text-slate-800' : 'text-emerald-300'}`}>
                  <span className="text-emerald-500 font-bold">•</span>
                  <span><strong className={isClean ? 'text-emerald-800' : 'text-emerald-300'}>Zero Fricção:</strong> Rótulos colados diretamente no dado. Eliminação total de linhas de grade supérfluas e 3D.</span>
                </p>
                <p className={`flex items-start gap-1.5 ${isClean ? 'text-slate-800' : 'text-emerald-300'}`}>
                  <span className="text-emerald-500 font-bold">•</span>
                  <span><strong className={isClean ? 'text-emerald-800' : 'text-emerald-300'}>Cor Intencional:</strong> O tom neutro estabiliza o padrão; a cor quente foca onde a diretoria precisa agir.</span>
                </p>
              </div>
            </div>

            <div className={`mt-4 pt-3 border-t text-xs flex items-center justify-between font-semibold ${
              isClean ? 'border-emerald-200 text-emerald-800' : 'border-slate-800 text-emerald-400'
            }`}>
              <span>Resultado: Decisão aprovada nos primeiros 2 minutos da reunião.</span>
              <button
                onClick={() => setHighlightKeyAction(!highlightKeyAction)}
                className={`text-[11px] font-semibold px-2.5 py-1 rounded border transition-colors ${
                  isClean 
                    ? 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300 shadow-xs' 
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                }`}
              >
                {highlightKeyAction ? 'Desativar Foco de Ação' : 'Ativar Foco de Ação'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Principles summary cards */}
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t text-xs ${
        isClean ? 'border-slate-200' : 'border-slate-800'
      }`}>
        <div className={`p-4 rounded-xl border ${
          isClean ? 'bg-slate-50/90 border-slate-300 text-slate-800 shadow-xs' : 'bg-slate-900 border-slate-800 text-slate-200'
        }`}>
          <span className={`font-bold block mb-1.5 text-xs sm:text-sm ${isClean ? 'text-indigo-900' : 'text-indigo-400'}`}>
            1. Regra do Data-Ink Ratio
          </span>
          <p className={`leading-relaxed text-xs ${isClean ? 'text-slate-700 font-medium' : 'text-slate-300'}`}>
            Se você pode apagar uma borda, sombra ou linha de grade sem perder o significado do dado, apague imediatamente.
          </p>
        </div>
        <div className={`p-4 rounded-xl border ${
          isClean ? 'bg-slate-50/90 border-slate-300 text-slate-800 shadow-xs' : 'bg-slate-900 border-slate-800 text-slate-200'
        }`}>
          <span className={`font-bold block mb-1.5 text-xs sm:text-sm ${isClean ? 'text-indigo-900' : 'text-indigo-400'}`}>
            2. Gestalt: Proximidade
          </span>
          <p className={`leading-relaxed text-xs ${isClean ? 'text-slate-700 font-medium' : 'text-slate-300'}`}>
            Coloque valores e descrições colados na barra correspondente, poupando a memória de curto prazo do leitor.
          </p>
        </div>
        <div className={`p-4 rounded-xl border ${
          isClean ? 'bg-slate-50/90 border-slate-300 text-slate-800 shadow-xs' : 'bg-slate-900 border-slate-800 text-slate-200'
        }`}>
          <span className={`font-bold block mb-1.5 text-xs sm:text-sm ${isClean ? 'text-indigo-900' : 'text-indigo-400'}`}>
            3. Títulos como Conclusão
          </span>
          <p className={`leading-relaxed text-xs ${isClean ? 'text-slate-700 font-medium' : 'text-slate-300'}`}>
            O título do gráfico deve responder: "E daí? Qual decisão este visual está me pedindo para tomar?".
          </p>
        </div>
      </div>
    </div>
  );
};
