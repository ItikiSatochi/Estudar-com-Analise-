import React, { useState, useEffect } from 'react';
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
  Sparkles,
  Video,
  Palette
} from 'lucide-react';
import { ModuleId } from '../types';
import { modulesList } from '../data/modulesContent';
import { useTheme } from '../context/ThemeContext';

interface Props {
  onSelectModule: (id: ModuleId) => void;
  onOpenLab: () => void;
  onOpenAi: () => void;
}

type GradientPreset = 'indigo-violet' | 'ocean-cyan' | 'sunset-magenta' | 'safira-blue';

interface PresetConfig {
  id: GradientPreset;
  label: string;
  previewClass: string;
  cleanClass: string;
  darkClass: string;
}

const GRADIENT_PRESETS: PresetConfig[] = [
  {
    id: 'indigo-violet',
    label: 'Índigo Real & Violeta Vibrante (Padrão)',
    previewClass: 'from-blue-600 via-indigo-600 to-purple-600',
    cleanClass: 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 border-indigo-400/40 shadow-xl shadow-indigo-600/25',
    darkClass: 'bg-gradient-to-r from-blue-950 via-indigo-900 to-purple-950 border-indigo-500/50 shadow-2xl shadow-indigo-950/60'
  },
  {
    id: 'ocean-cyan',
    label: 'Oceano & Ciano Elétrico',
    previewClass: 'from-cyan-500 via-teal-600 to-blue-700',
    cleanClass: 'bg-gradient-to-r from-cyan-600 via-teal-600 to-blue-700 border-cyan-400/40 shadow-xl shadow-cyan-600/25',
    darkClass: 'bg-gradient-to-r from-cyan-950 via-teal-900 to-blue-950 border-cyan-500/50 shadow-2xl shadow-cyan-950/60'
  },
  {
    id: 'sunset-magenta',
    label: 'Sunset Executivo & Púrpura',
    previewClass: 'from-indigo-600 via-purple-600 to-rose-600',
    cleanClass: 'bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-600 border-rose-400/40 shadow-xl shadow-purple-600/25',
    darkClass: 'bg-gradient-to-r from-indigo-950 via-purple-900 to-rose-950 border-purple-500/50 shadow-2xl shadow-purple-950/60'
  },
  {
    id: 'safira-blue',
    label: 'Hiper Safira & Azul Cobalto',
    previewClass: 'from-blue-600 via-indigo-700 to-sky-600',
    cleanClass: 'bg-gradient-to-r from-blue-600 via-indigo-700 to-sky-600 border-blue-400/40 shadow-xl shadow-blue-600/25',
    darkClass: 'bg-gradient-to-r from-slate-950 via-blue-950 to-indigo-950 border-blue-500/50 shadow-2xl shadow-blue-950/60'
  }
];

export const OverviewView: React.FC<Props> = ({ onSelectModule, onOpenLab, onOpenAi }) => {
  const { isClean } = useTheme();

  const [activeGradient, setActiveGradient] = useState<GradientPreset>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('datamaster-hero-gradient');
      if (saved && GRADIENT_PRESETS.some(p => p.id === saved)) {
        return saved as GradientPreset;
      }
    }
    return 'indigo-violet';
  });

  const handleSelectGradient = (id: GradientPreset) => {
    setActiveGradient(id);
    localStorage.setItem('datamaster-hero-gradient', id);
  };

  const currentPreset = GRADIENT_PRESETS.find(p => p.id === activeGradient) || GRADIENT_PRESETS[0];

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
      {/* Hero Section with Vibrant, Alive Gradient */}
      <div 
        className={`hero-banner border rounded-2xl p-6 sm:p-10 relative overflow-hidden transition-all duration-300 ${
          isClean ? currentPreset.cleanClass : currentPreset.darkClass
        }`}
      >
        {/* Luminous Ambient Light Glow Orbs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-cyan-400/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-purple-400/20 rounded-full blur-2xl pointer-events-none" />

        {/* Top Controls: Badge + Vibrant Gradient Theme Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 relative z-10">
          <div className="hero-badge inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 border border-white/35 text-white text-xs font-semibold backdrop-blur-md shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span className="tracking-wide">Guia Corporativo Definitivo de Inteligência Analítica & Vídeos YouTube</span>
          </div>

          {/* Gradient Color Palette Switcher */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/25 backdrop-blur-md border border-white/25">
            <Palette className="w-3.5 h-3.5 text-white/90 mr-1" />
            <span className="text-[11px] font-semibold text-white/90 hidden sm:inline mr-1">Cor do Degradê:</span>
            {GRADIENT_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleSelectGradient(preset.id)}
                title={preset.label}
                aria-label={preset.label}
                className={`w-5 h-5 rounded-full bg-gradient-to-r ${preset.previewClass} transition-all ${
                  activeGradient === preset.id 
                    ? 'ring-2 ring-white scale-110 shadow-md' 
                    : 'opacity-70 hover:opacity-100 hover:scale-105'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Hero Content */}
        <div className="max-w-3xl relative z-10">
          <h1 className="hero-title text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight drop-shadow-sm">
            Domine Análise de Dados, Storytelling,{' '}
            <span className="text-[#fde047] font-black drop-shadow-sm">Power BI</span>,{' '}
            <span className="text-[#6ee7b7] font-black drop-shadow-sm">Python</span> &{' '}
            <span className="text-[#a5f3fc] font-black drop-shadow-sm">SQL</span>
          </h1>

          <p className="hero-subtitle text-sm sm:text-base text-white/95 mt-4 leading-relaxed font-normal drop-shadow-xs">
            Aprenda as metodologias, modelos dimensionais e técnicas de visualização executiva aplicadas em corporações de alta performance. Assista a vídeo aulas do YouTube integradas e pratique com datasets reais.
          </p>

          {/* Action Buttons with High-Contrast Vivid Styling */}
          <div className="flex flex-wrap items-center gap-3 mt-8">
            <button
              onClick={onOpenLab}
              className={`flex items-center gap-2 text-xs sm:text-sm font-bold px-5 py-3 rounded-xl transition-all shadow-lg active:scale-95 ${
                isClean 
                  ? 'bg-white hover:bg-slate-100 text-indigo-700 shadow-black/15' 
                  : 'bg-white hover:bg-slate-100 text-indigo-900 shadow-indigo-950/40'
              }`}
            >
              <Briefcase className="w-4 h-4 text-indigo-600" />
              <span>Explorar Laboratório de Cases Reais</span>
              <ArrowRight className="w-4 h-4 text-indigo-600" />
            </button>

            <button
              onClick={() => onSelectModule('storytelling')}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white text-xs sm:text-sm font-bold px-4 py-3 rounded-xl transition-all shadow-lg shadow-red-950/30 active:scale-95 border border-red-400/40"
            >
              <Video className="w-4 h-4" />
              <span>Vídeo Aulas YouTube</span>
            </button>

            <button
              onClick={() => onSelectModule('storytelling')}
              className="flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white text-xs sm:text-sm font-semibold px-5 py-3 rounded-xl border border-white/30 backdrop-blur-md transition-all active:scale-95"
            >
              <Presentation className="w-4 h-4 text-rose-300" />
              <span>Ver Storytelling Antes vs Depois</span>
            </button>

            <button
              onClick={onOpenAi}
              className="flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs sm:text-sm font-bold px-4 py-3 rounded-xl shadow-md shadow-amber-950/20 transition-all active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Assistente IA</span>
            </button>
          </div>
        </div>
      </div>

      {/* Corporate Capabilities Summary */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className={`p-4 rounded-xl border transition-colors ${
          isClean ? 'bg-white border-slate-200 shadow-xs' : 'bg-slate-900 border-slate-800'
        }`}>
          <span className={`text-xs block mb-1 font-medium ${isClean ? 'text-slate-600' : 'text-slate-400'}`}>Cases Corporativos Reais</span>
          <div className={`text-2xl font-bold font-mono ${isClean ? 'text-slate-900' : 'text-white'}`}>4 Verticais</div>
          <span className="text-[11px] text-indigo-500 font-semibold mt-1 block">Varejo, SaaS, Finanças & Estoque</span>
        </div>

        <div className={`p-4 rounded-xl border transition-colors ${
          isClean ? 'bg-white border-slate-200 shadow-xs' : 'bg-slate-900 border-slate-800'
        }`}>
          <span className={`text-xs block mb-1 font-medium ${isClean ? 'text-slate-600' : 'text-slate-400'}`}>Vídeo Aulas & Mentoria</span>
          <div className="text-2xl font-bold font-mono text-rose-600">YouTube HD</div>
          <span className={`text-[11px] mt-1 block font-medium ${isClean ? 'text-rose-700' : 'text-rose-300'}`}>Capítulos & Player Integrado</span>
        </div>

        <div className={`p-4 rounded-xl border transition-colors ${
          isClean ? 'bg-white border-slate-200 shadow-xs' : 'bg-slate-900 border-slate-800'
        }`}>
          <span className={`text-xs block mb-1 font-medium ${isClean ? 'text-slate-600' : 'text-slate-400'}`}>Simuladores Interativos</span>
          <div className="text-2xl font-bold font-mono text-emerald-600">4 Motores</div>
          <span className={`text-[11px] mt-1 block font-medium ${isClean ? 'text-slate-600' : 'text-slate-400'}`}>DAX, SQL, Python & Gestalt</span>
        </div>

        <div className={`p-4 rounded-xl border transition-colors ${
          isClean ? 'bg-white border-slate-200 shadow-xs' : 'bg-slate-900 border-slate-800'
        }`}>
          <span className={`text-xs block mb-1 font-medium ${isClean ? 'text-slate-600' : 'text-slate-400'}`}>Dicionário de KPIs</span>
          <div className="text-2xl font-bold font-mono text-cyan-600">40+ Fórmulas</div>
          <span className={`text-[11px] mt-1 block font-medium ${isClean ? 'text-slate-600' : 'text-slate-400'}`}>Snippets em DAX, SQL e Python</span>
        </div>

        <div className={`p-4 rounded-xl border transition-colors ${
          isClean ? 'bg-white border-slate-200 shadow-xs' : 'bg-slate-900 border-slate-800'
        }`}>
          <span className={`text-xs block mb-1 font-medium ${isClean ? 'text-slate-600' : 'text-slate-400'}`}>Formatos de Exportação</span>
          <div className="text-2xl font-bold font-mono text-amber-600">CSV, JSON, MD</div>
          <span className={`text-[11px] mt-1 block font-medium ${isClean ? 'text-slate-600' : 'text-slate-400'}`}>Relatório Executivo C-Level</span>
        </div>
      </div>

      {/* The 8 Modules Architecture Track */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className={`text-xl font-bold ${isClean ? 'text-slate-900' : 'text-white'}`}>
              Trilha de Formação em Inteligência de Dados
            </h2>
            <p className={`text-xs mt-0.5 ${isClean ? 'text-slate-600' : 'text-slate-400'}`}>
              Selecione qualquer módulo para mergulhar em fundamentos, práticas, código e vídeos YouTube
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {modulesList.filter(m => m.id !== 'overview').map((mod) => (
            <div
              key={mod.id}
              onClick={() => onSelectModule(mod.id)}
              className={`border rounded-xl p-5 cursor-pointer transition-all flex flex-col justify-between group shadow-xs ${
                isClean 
                  ? 'bg-white border-slate-200 hover:border-indigo-400 hover:shadow-md hover:bg-slate-50/80' 
                  : 'bg-slate-900 border-slate-800 hover:border-indigo-500/60 hover:bg-slate-850'
              }`}
            >
              <div>
                <div className={`flex items-center justify-between pb-3 border-b mb-3 ${
                  isClean ? 'border-slate-100' : 'border-slate-800/80'
                }`}>
                  <div className="flex items-center gap-2.5">
                    <div className={`p-2 rounded-lg border transition-colors ${
                      isClean 
                        ? 'bg-slate-50 border-slate-200 group-hover:border-indigo-400' 
                        : 'bg-slate-950 border-slate-800 group-hover:border-indigo-500/40'
                    }`}>
                      {getIcon(mod.id)}
                    </div>
                    <div>
                      <h3 className={`text-sm font-bold transition-colors ${
                        isClean 
                          ? 'text-slate-900 group-hover:text-indigo-600' 
                          : 'text-white group-hover:text-indigo-300'
                      }`}>
                        {mod.title}
                      </h3>
                      <span className={`text-[10px] font-mono ${isClean ? 'text-slate-500' : 'text-slate-500'}`}>
                        Nível: {mod.level}
                      </span>
                    </div>
                  </div>
                </div>

                <p className={`text-xs font-semibold mb-2 ${isClean ? 'text-indigo-600' : 'text-indigo-400'}`}>
                  {mod.tagline}
                </p>
                <p className={`text-xs line-clamp-2 leading-relaxed ${isClean ? 'text-slate-600' : 'text-slate-400'}`}>
                  {mod.description}
                </p>
              </div>

              <div className={`mt-4 pt-3 border-t flex items-center justify-between text-xs font-medium ${
                isClean ? 'border-slate-100 text-indigo-600' : 'border-slate-800 text-indigo-400'
              }`}>
                <span className="flex items-center gap-1.5 text-rose-600 font-semibold">
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
