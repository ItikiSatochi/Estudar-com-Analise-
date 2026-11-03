import React, { useState } from 'react';
import { 
  X, 
  Video, 
  Play, 
  ExternalLink, 
  Clock, 
  CheckCircle2, 
  Plus, 
  Sparkles,
  BookOpen,
  Filter
} from 'lucide-react';
import { ModuleId, VideoGuide } from '../types';
import { moduleVideoGuides } from '../data/videoGuides';
import { VideoPlayerGuide } from './VideoPlayerGuide';
import { useTheme } from '../context/ThemeContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  defaultModule?: ModuleId;
}

export const VideoLibraryModal: React.FC<Props> = ({ 
  isOpen, 
  onClose,
  defaultModule = 'storytelling'
}) => {
  const { isClean } = useTheme();
  const [selectedModule, setSelectedModule] = useState<ModuleId>(defaultModule);

  if (!isOpen) return null;

  const modulesFilter: { id: ModuleId; label: string }[] = [
    { id: 'storytelling', label: 'Storytelling com Dados' },
    { id: 'power-bi', label: 'Power BI & DAX' },
    { id: 'data-analysis', label: 'Metodologias & CRISP-DM' },
    { id: 'python', label: 'Python & Pandas' },
    { id: 'sql-databases', label: 'SQL & Bancos de Dados' },
    { id: 'ai-automation', label: 'IA & Automação' },
    { id: 'corporate-projects', label: 'Apresentação Executiva' },
    { id: 'kpi-dictionary', label: 'Gestão de KPIs' },
    { id: 'overview', label: 'Visão Geral' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className={`w-full max-w-6xl max-h-[92vh] flex flex-col rounded-2xl border shadow-2xl overflow-hidden transition-all ${
          isClean ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-800 text-slate-100'
        }`}
      >
        {/* Modal Header */}
        <div className={`flex items-center justify-between px-6 py-4 border-b ${
          isClean ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-600 flex items-center justify-center text-white shadow-md shadow-rose-600/30">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className={`text-lg font-bold ${isClean ? 'text-slate-900' : 'text-white'}`}>
                  Videoteca de Orientações do YouTube
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-rose-100 text-rose-800 border border-rose-300 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800">
                  Player HD
                </span>
              </div>
              <p className={`text-xs ${isClean ? 'text-slate-600' : 'text-slate-400'}`}>
                Masterclasses gravadas, navegação por minutagem e suporte para adicionar seus próprios links do YouTube.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Fechar videoteca"
            className={`p-2 rounded-lg transition-colors ${
              isClean ? 'text-slate-500 hover:text-slate-900 hover:bg-slate-200' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Module Category Selector Pills */}
        <div className={`px-6 py-2.5 border-b overflow-x-auto scrollbar-none flex items-center gap-1.5 ${
          isClean ? 'bg-slate-100/70 border-slate-200' : 'bg-slate-950/70 border-slate-800'
        }`}>
          <span className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1 mr-2 ${
            isClean ? 'text-slate-600' : 'text-slate-400'
          }`}>
            <Filter className="w-3.5 h-3.5" />
            <span>Módulo:</span>
          </span>

          {modulesFilter.map((mod) => {
            const isSelected = selectedModule === mod.id;
            return (
              <button
                key={mod.id}
                onClick={() => setSelectedModule(mod.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-rose-600 text-white shadow-sm'
                    : (isClean 
                        ? 'bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-200 border border-slate-200 shadow-xs' 
                        : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800')
                }`}
              >
                {mod.label}
              </button>
            );
          })}
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <VideoPlayerGuide 
            moduleId={selectedModule} 
            moduleTitle={modulesFilter.find(m => m.id === selectedModule)?.label}
          />
        </div>

        {/* Modal Footer */}
        <div className={`px-6 py-3 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-xs ${
          isClean ? 'bg-slate-50 border-slate-200 text-slate-600' : 'bg-slate-950 border-slate-800 text-slate-400'
        }`}>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Dica: Use os botões de minutagem para pular diretamente para a explicação do conceito que você precisa aplicar.</span>
          </div>

          <button
            onClick={onClose}
            className={`px-4 py-1.5 rounded-lg border font-semibold transition-colors ${
              isClean 
                ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300 shadow-xs' 
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
            }`}
          >
            Fechar Videoteca
          </button>
        </div>
      </div>
    </div>
  );
};
