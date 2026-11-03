import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Presentation, 
  Code2, 
  Database, 
  Bot, 
  Briefcase, 
  BookOpen, 
  Sparkles,
  Compass,
  Download,
  Sun,
  Moon
} from 'lucide-react';
import { ModuleId } from '../types';
import { modulesList } from '../data/modulesContent';
import { useTheme } from '../context/ThemeContext';

interface Props {
  activeModule: ModuleId;
  onSelectModule: (id: ModuleId) => void;
  onOpenAi: () => void;
  onOpenLab: () => void;
}

export const Navbar: React.FC<Props> = ({
  activeModule,
  onSelectModule,
  onOpenAi,
  onOpenLab
}) => {
  const { theme, toggleTheme, isClean } = useTheme();

  const getIcon = (id: ModuleId) => {
    switch (id) {
      case 'overview': return <Compass className="w-4 h-4" />;
      case 'data-analysis': return <TrendingUp className="w-4 h-4" />;
      case 'storytelling': return <Presentation className="w-4 h-4" />;
      case 'power-bi': return <BarChart3 className="w-4 h-4" />;
      case 'python': return <Code2 className="w-4 h-4" />;
      case 'sql-databases': return <Database className="w-4 h-4" />;
      case 'ai-automation': return <Bot className="w-4 h-4" />;
      case 'corporate-projects': return <Briefcase className="w-4 h-4" />;
      case 'kpi-dictionary': return <BookOpen className="w-4 h-4" />;
      default: return <BarChart3 className="w-4 h-4" />;
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => onSelectModule('overview')}
            className="flex items-center gap-3 cursor-pointer select-none"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`font-bold text-base tracking-tight ${isClean ? 'text-slate-900' : 'text-white'}`}>DataMaster</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950/80 px-1.5 py-0.5 rounded border border-indigo-800/40">
                  PRO
                </span>
              </div>
              <p className={`text-[11px] hidden sm:block ${isClean ? 'text-slate-500' : 'text-slate-400'}`}>Inteligência de Dados, Power BI, SQL & Storytelling</p>
            </div>
          </div>

          {/* Quick Action Badges */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label={`Alternar tema. Atual: ${theme === 'dark' ? 'Dark' : 'Clean'}`}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all border ${
                isClean
                  ? 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-200 shadow-sm'
                  : 'bg-slate-900 hover:bg-slate-850 text-slate-200 border-slate-700 shadow-sm'
              }`}
            >
              {isClean ? (
                <>
                  <Moon className="w-3.5 h-3.5 text-indigo-600" />
                  <span className="hidden xs:inline">Tema:</span>
                  <span className="font-bold text-indigo-700">Clean</span>
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden xs:inline">Tema:</span>
                  <span className="font-bold text-amber-300">Dark</span>
                </>
              )}
            </button>

            {/* Cases Reais Shortcut */}
            <button
              onClick={onOpenLab}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all border ${
                activeModule === 'corporate-projects'
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                  : (isClean
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800')
              }`}
            >
              <Briefcase className={`w-3.5 h-3.5 ${activeModule === 'corporate-projects' ? 'text-white' : (isClean ? 'text-indigo-600' : 'text-indigo-400')}`} />
              <span>Cases Reais</span>
            </button>

            <button
              onClick={onOpenAi}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white shadow-sm transition-all active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>IA Insights</span>
            </button>
          </div>
        </div>

        {/* Horizontal Scrollable Nav of Modules */}
        <nav className={`flex items-center gap-1.5 overflow-x-auto py-2.5 border-t scrollbar-none text-xs transition-colors ${
          isClean ? 'border-slate-200' : 'border-slate-900'
        }`}>
          {modulesList.map((mod) => {
            const isActive = activeModule === mod.id;
            return (
              <button
                key={mod.id}
                onClick={() => onSelectModule(mod.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all font-semibold ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/25 border border-indigo-600 ring-1 ring-indigo-500'
                    : (isClean
                        ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent')
                }`}
              >
                <span className={isActive ? 'text-white' : (isClean ? 'text-slate-500' : 'text-slate-500')}>
                  {getIcon(mod.id)}
                </span>
                <span className={isActive ? 'text-white font-bold' : ''}>{mod.shortTitle}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
