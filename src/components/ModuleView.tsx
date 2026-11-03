import React, { useState } from 'react';
import { 
  BookOpen, 
  Code, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ArrowRight, 
  Copy, 
  Check, 
  AlertCircle,
  Sparkles,
  ChevronRight,
  Video,
  Award
} from 'lucide-react';
import { ModuleId } from '../types';
import { modulesList, modulesDetailData } from '../data/modulesContent';
import { StorytellingBeforeAfter } from './StorytellingBeforeAfter';
import { DaxSimulator } from './DaxSimulator';
import { SqlPlayground } from './SqlPlayground';
import { PythonPlayground } from './PythonPlayground';
import { VideoPlayerGuide } from './VideoPlayerGuide';
import { ModuleQuizView } from './ModuleQuizView';
import { useTheme } from '../context/ThemeContext';

interface Props {
  moduleId: ModuleId;
  onNavigateModule: (id: ModuleId) => void;
  onOpenLab: () => void;
}

export const ModuleView: React.FC<Props> = ({ moduleId, onNavigateModule, onOpenLab }) => {
  const { isClean } = useTheme();
  const currentModule = modulesList.find(m => m.id === moduleId);
  const detail = modulesDetailData[moduleId];
  const [activeTab, setActiveTab] = useState<'guide' | 'code' | 'practices' | 'videos' | 'quest'>('guide');
  const [copiedCodeTitle, setCopiedCodeTitle] = useState<string | null>(null);

  const currentIndex = modulesList.findIndex(m => m.id === moduleId);
  const nextModule = modulesList[currentIndex + 1];

  const handleNavigateNext = () => {
    if (nextModule) {
      onNavigateModule(nextModule.id);
      setActiveTab('guide');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (!currentModule || !detail) {
    return (
      <div className={`border rounded-xl p-8 text-center ${
        isClean ? 'bg-white border-slate-200 text-slate-600 shadow-sm' : 'bg-slate-900 border-slate-800 text-slate-400'
      }`}>
        Módulo em desenvolvimento ou selecione outro módulo no menu superior.
      </div>
    );
  }

  const handleCopy = (title: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeTitle(title);
    setTimeout(() => setCopiedCodeTitle(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Module Hero Banner */}
      <div className={`border rounded-xl p-6 lg:p-8 relative overflow-hidden transition-colors ${
        isClean ? 'bg-white border-slate-200 text-slate-800 shadow-sm' : 'bg-slate-900 border-slate-800 text-slate-100'
      }`}>
        <div className="max-w-3xl relative z-10">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-2">
            <span className={isClean ? 'text-indigo-600 font-bold' : 'text-indigo-400 font-bold'}>Nível: {currentModule.level}</span>
            <span className={isClean ? 'text-slate-400' : 'text-slate-600'}>·</span>
            <span className={isClean ? 'text-slate-700' : 'text-slate-300'}>{currentModule.topicsCount} Tópicos Práticos</span>
          </div>

          <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${isClean ? 'text-slate-900' : 'text-white'}`}>
            {currentModule.title}
          </h1>

          <p className={`text-sm sm:text-base mt-2 font-medium ${isClean ? 'text-slate-700' : 'text-slate-300'}`}>
            {currentModule.tagline}
          </p>

          <p className={`text-xs sm:text-sm mt-3 leading-relaxed ${isClean ? 'text-slate-600' : 'text-slate-400'}`}>
            {detail.summary}
          </p>

          {/* Tab navigation with high-contrast active and inactive states */}
          <div className={`flex flex-wrap items-center gap-2 mt-6 pt-6 border-t ${
            isClean ? 'border-slate-200' : 'border-slate-800'
          }`}>
            <button
              onClick={() => setActiveTab('guide')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'guide'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 ring-2 ring-indigo-400/50'
                  : (isClean 
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300' 
                      : 'bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700')
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Guia Estratégico & Teoria Prática</span>
            </button>

            <button
              onClick={() => setActiveTab('code')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'code'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 ring-2 ring-indigo-400/50'
                  : (isClean 
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300' 
                      : 'bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700')
              }`}
            >
              <Code className="w-4 h-4" />
              <span>Scripts & Códigos Prontos</span>
            </button>

            <button
              onClick={() => setActiveTab('practices')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'practices'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 ring-2 ring-indigo-400/50'
                  : (isClean 
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300' 
                      : 'bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700')
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Checklist de Governança & Práticas</span>
            </button>

            <button
              onClick={() => setActiveTab('videos')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'videos'
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30 ring-2 ring-rose-400/50'
                  : (isClean 
                      ? 'bg-rose-50 hover:bg-rose-100 text-rose-900 border border-rose-300' 
                      : 'bg-rose-950/40 hover:bg-rose-900/60 text-rose-200 border border-rose-800/50')
              }`}
            >
              <Video className="w-4 h-4" />
              <span>Vídeo Aulas (PT-BR)</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold uppercase ${
                activeTab === 'videos' 
                  ? 'bg-white/20 text-white' 
                  : (isClean ? 'bg-rose-200 text-rose-900' : 'bg-rose-900 text-rose-200')
              }`}>
                YouTube
              </span>
            </button>

            <button
              onClick={() => setActiveTab('quest')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'quest'
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30 ring-2 ring-amber-400/50'
                  : (isClean 
                      ? 'bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300' 
                      : 'bg-amber-950/40 hover:bg-amber-900/60 text-amber-200 border border-amber-800/50')
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Desafio de Fixação (Quest)</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold uppercase ${
                activeTab === 'quest' 
                  ? 'bg-white/20 text-white' 
                  : (isClean ? 'bg-amber-200 text-amber-900' : 'bg-amber-900 text-amber-200')
              }`}>
                Avaliativo
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Tab 1: Detailed Guide with Embedded Interactive Simulators */}
      {activeTab === 'guide' && (
        <div className="space-y-8">
          {detail.topics.map((topic) => (
            <div 
              key={topic.id} 
              className={`border rounded-xl p-6 sm:p-8 space-y-6 transition-colors ${
                isClean ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900 border-slate-800'
              }`}
            >
              <div className={`pb-4 border-b ${isClean ? 'border-slate-200' : 'border-slate-800'}`}>
                <div className={`flex items-center gap-2 text-xs mb-1 ${isClean ? 'text-slate-500' : 'text-slate-500'}`}>
                  <Clock className="w-3.5 h-3.5" />
                  <span>{topic.readTime}</span>
                </div>
                <h2 className={`text-xl sm:text-2xl font-bold ${isClean ? 'text-slate-900' : 'text-white'}`}>
                  {topic.title}
                </h2>
                <p className={`text-sm font-semibold mt-1 ${isClean ? 'text-indigo-600' : 'text-indigo-300'}`}>
                  {topic.subtitle}
                </p>
              </div>

              {/* Rich Content Markdown / Prose */}
              <div className={`text-sm leading-relaxed space-y-4 whitespace-pre-line ${
                isClean ? 'text-slate-700' : 'text-slate-300'
              }`}>
                {topic.content}
              </div>

              {/* Embedded Interactive Simulator if topic requires it */}
              {topic.interactiveType === 'storytelling-before-after' && (
                <div className="pt-4">
                  <StorytellingBeforeAfter />
                </div>
              )}

              {topic.interactiveType === 'dax-runner' && (
                <div className="pt-4">
                  <DaxSimulator />
                </div>
              )}

              {topic.interactiveType === 'sql-runner' && (
                <div className="pt-4">
                  <SqlPlayground />
                </div>
              )}

              {topic.interactiveType === 'python-runner' && (
                <div className="pt-4">
                  <PythonPlayground />
                </div>
              )}

              {/* Key Takeaways */}
              {topic.keyTakeaways && topic.keyTakeaways.length > 0 && (
                <div className={`p-5 rounded-xl border space-y-2.5 ${
                  isClean ? 'bg-indigo-50/70 border-indigo-200 text-slate-800' : 'bg-slate-950/70 border-slate-800 text-slate-300'
                }`}>
                  <span className={`text-xs font-bold uppercase tracking-wider block ${
                    isClean ? 'text-indigo-800' : 'text-indigo-400'
                  }`}>
                    Pontos Chave para Aplicação Corporativa:
                  </span>
                  <ul className="space-y-2 text-xs">
                    {topic.keyTakeaways.map((point, idx) => (
                      <li key={idx} className={`flex items-start gap-2.5 ${isClean ? 'text-slate-800' : 'text-slate-300'}`}>
                        <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                          isClean ? 'text-emerald-600' : 'text-emerald-400'
                        }`} />
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Code Snippets & Production Scripts */}
      {activeTab === 'code' && (
        <div className="space-y-6">
          {detail.topics.flatMap(t => t.codeExamples || []).map((example, idx) => (
            <div 
              key={idx} 
              className={`border rounded-xl overflow-hidden ${
                isClean ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900 border-slate-800'
              }`}
            >
              <div className={`p-4 border-b flex items-center justify-between ${
                isClean ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
              }`}>
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold uppercase font-mono px-2 py-0.5 rounded border ${
                      isClean 
                        ? 'bg-indigo-100 text-indigo-700 border-indigo-300' 
                        : 'bg-indigo-950 text-indigo-300 border-indigo-800/40'
                    }`}>
                      {example.language}
                    </span>
                    <h3 className={`text-sm font-bold ${isClean ? 'text-slate-900' : 'text-white'}`}>
                      {example.title}
                    </h3>
                  </div>
                  <p className={`text-xs mt-1 ${isClean ? 'text-slate-600' : 'text-slate-400'}`}>
                    {example.description}
                  </p>
                </div>

                <button
                  onClick={() => handleCopy(example.title, example.code)}
                  className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                    isClean 
                      ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300 shadow-xs' 
                      : 'bg-slate-800 hover:bg-slate-750 text-slate-300 border-slate-700'
                  }`}
                >
                  {copiedCodeTitle === example.title ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-600 font-semibold">Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar Código</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="p-5 font-mono text-xs text-emerald-400 bg-slate-950 overflow-x-auto leading-relaxed border-t border-slate-900">
                {example.code}
              </pre>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Best Practices vs Fatal Errors */}
      {activeTab === 'practices' && (
        <div className="space-y-6">
          {detail.topics.flatMap(t => t.bestPractices || []).map((practice, idx) => (
            <div 
              key={idx} 
              className={`border rounded-xl p-6 space-y-4 ${
                isClean ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900 border-slate-800'
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`p-4 rounded-xl space-y-1.5 border ${
                  isClean 
                    ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950' 
                    : 'bg-emerald-950/20 border-emerald-900/40 text-slate-200'
                }`}>
                  <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${
                    isClean ? 'text-emerald-700' : 'text-emerald-400'
                  }`}>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Faça (Prática Recomendada)</span>
                  </div>
                  <p className={`text-xs leading-relaxed ${isClean ? 'text-slate-800' : 'text-slate-200'}`}>
                    {practice.do}
                  </p>
                </div>

                <div className={`p-4 rounded-xl space-y-1.5 border ${
                  isClean 
                    ? 'bg-rose-50/70 border-rose-200 text-rose-950' 
                    : 'bg-rose-950/20 border-rose-900/40 text-slate-200'
                }`}>
                  <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${
                    isClean ? 'text-rose-700' : 'text-rose-400'
                  }`}>
                    <XCircle className="w-4 h-4" />
                    <span>Evite (Erro Corporativo Frequente)</span>
                  </div>
                  <p className={`text-xs leading-relaxed ${isClean ? 'text-slate-800' : 'text-slate-200'}`}>
                    {practice.dont}
                  </p>
                </div>
              </div>

              <div className={`p-3 rounded-lg border text-xs flex items-center gap-2 ${
                isClean ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-slate-950/60 border-slate-800 text-slate-400'
              }`}>
                <span className={`font-bold whitespace-nowrap ${isClean ? 'text-amber-700' : 'text-amber-400'}`}>
                  Impacto no Negócio:
                </span>
                <span className={isClean ? 'text-slate-700' : 'text-slate-300'}>{practice.corporateImpact}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: YouTube Video Classes & Interactive Player */}
      {activeTab === 'videos' && (
        <VideoPlayerGuide 
          moduleId={moduleId} 
          moduleTitle={currentModule.title} 
          onOpenQuest={() => setActiveTab('quest')}
        />
      )}

      {/* Tab 5: Interactive Module Quest / Quiz */}
      {activeTab === 'quest' && (
        <ModuleQuizView 
          moduleId={moduleId}
          moduleTitle={currentModule.title}
          onNavigateNextModule={nextModule ? handleNavigateNext : undefined}
        />
      )}
    </div>
  );
};
