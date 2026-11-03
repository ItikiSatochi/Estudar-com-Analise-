import React from 'react';
import { 
  Compass, 
  TrendingUp, 
  Presentation, 
  BarChart3, 
  Code2, 
  Database, 
  Bot, 
  Briefcase, 
  BookOpen, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Layers,
  Cpu,
  FileSpreadsheet,
  Video,
  Play
} from 'lucide-react';
import { ModuleId } from '../types';
import { modulesList } from '../data/modulesContent';

interface Props {
  onSelectModule: (id: ModuleId) => void;
  onOpenLab: () => void;
  onOpenAi: () => void;
}

export const OverviewView: React.FC<Props> = ({ onSelectModule, onOpenLab, onOpenAi }) => {
  const getIcon = (id: ModuleId) => {
    switch (id) {
      case 'data-analysis': return <TrendingUp className="w-5 h-5 text-indigo-400" />;
      case 'storytelling': return <Presentation className="w-5 h-5 text-rose-400" />;
      case 'power-bi': return <BarChart3 className="w-5 h-5 text-amber-400" />;
      case 'python': return <Code2 className="w-5 h-5 text-emerald-400" />;
      case 'sql-databases': return <Database className="w-5 h-5 text-cyan-400" />;
      case 'ai-automation': return <Bot className="w-5 h-5 text-purple-400" />;
      case 'corporate-projects': return <Briefcase className="w-5 h-5 text-blue-400" />;
      case 'kpi-dictionary': return <BookOpen className="w-5 h-5 text-teal-400" />;
      default: return <Compass className="w-5 h-5 text-indigo-400" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-10 text-slate-100 relative overflow-hidden">
        <div className="max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Guia Corporativo Definitivo de Inteligência Analítica & Vídeos YouTube</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Domine Análise de Dados, Storytelling, Power BI, Python & SQL
          </h1>

          <p className="text-sm sm:text-base text-slate-300 mt-4 leading-relaxed font-normal">
            Aprenda as metodologias, modelos dimensionais e técnicas de visualização executiva aplicadas em corporações de alta performance. Assista a vídeo aulas do YouTube integradas e pratique com datasets reais.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-8">
            <button
              onClick={onOpenLab}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-semibold px-5 py-3 rounded-xl transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
            >
              <Briefcase className="w-4 h-4" />
              <span>Explorar Laboratório de Cases Reais</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onSelectModule('storytelling')}
              className="flex items-center gap-2 bg-rose-600 hover:bg-rose-500 text-white text-xs sm:text-sm font-semibold px-4 py-3 rounded-xl transition-all shadow-md shadow-rose-600/20 active:scale-95"
            >
              <Video className="w-4 h-4" />
              <span>Vídeo Aulas YouTube</span>
            </button>

            <button
              onClick={() => onSelectModule('storytelling')}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold px-5 py-3 rounded-xl border border-slate-700 transition-all"
            >
              <Presentation className="w-4 h-4 text-rose-400" />
              <span>Ver Storytelling Antes vs Depois</span>
            </button>

            <button
              onClick={onOpenAi}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold px-4 py-3 rounded-xl border border-slate-700 transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Assistente IA</span>
            </button>
          </div>
        </div>
      </div>

      {/* Corporate Capabilities Summary */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <span className="text-xs text-slate-400 block mb-1">Cases Corporativos Reais</span>
          <div className="text-2xl font-bold font-mono text-white">4 Verticais</div>
          <span className="text-[11px] text-indigo-400 mt-1 block">Varejo, SaaS, Finanças & Estoque</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <span className="text-xs text-slate-400 block mb-1">Vídeo Aulas & Mentoria</span>
          <div className="text-2xl font-bold font-mono text-rose-400">YouTube HD</div>
          <span className="text-[11px] text-rose-300 mt-1 block">Capítulos & Player Integrado</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <span className="text-xs text-slate-400 block mb-1">Simuladores Interativos</span>
          <div className="text-2xl font-bold font-mono text-emerald-400">4 Motores</div>
          <span className="text-[11px] text-slate-400 mt-1 block">DAX, SQL, Python & Gestalt</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <span className="text-xs text-slate-400 block mb-1">Dicionário de KPIs</span>
          <div className="text-2xl font-bold font-mono text-cyan-400">40+ Fórmulas</div>
          <span className="text-[11px] text-slate-400 mt-1 block">Snippets em DAX, SQL e Python</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <span className="text-xs text-slate-400 block mb-1">Formatos de Exportação</span>
          <div className="text-2xl font-bold font-mono text-amber-400">CSV, JSON, MD</div>
          <span className="text-[11px] text-slate-400 mt-1 block">Relatório Executivo C-Level</span>
        </div>
      </div>

      {/* The 8 Modules Architecture Track */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-white">Trilha de Formação em Inteligência de Dados</h2>
            <p className="text-xs text-slate-400 mt-0.5">Selecione qualquer módulo para mergulhar em fundamentos, práticas, código e vídeos YouTube</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {modulesList.filter(m => m.id !== 'overview').map((mod) => (
            <div
              key={mod.id}
              onClick={() => onSelectModule(mod.id)}
              className="bg-slate-900 border border-slate-800 hover:border-indigo-500/60 rounded-xl p-5 cursor-pointer transition-all hover:bg-slate-850 flex flex-col justify-between group shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 group-hover:border-indigo-500/40 transition-colors">
                      {getIcon(mod.id)}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                        {mod.title}
                      </h3>
                      <span className="text-[10px] text-slate-500 font-mono">Nível: {mod.level}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 font-medium mb-2">{mod.tagline}</p>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{mod.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-indigo-400 font-medium">
                <span className="flex items-center gap-1.5 text-rose-400 font-semibold">
                  <Video className="w-3.5 h-3.5" />
                  <span>Vídeo Aula Disponível</span>
                </span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

