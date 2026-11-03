/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ModuleId } from './types';
import { Navbar } from './components/Navbar';
import { OverviewView } from './components/OverviewView';
import { CorporateProjectsLab } from './components/CorporateProjectsLab';
import { KpiDictionaryView } from './components/KpiDictionaryView';
import { ModuleView } from './components/ModuleView';
import { ExportModal } from './components/ExportModal';
import { AiInsightsModal } from './components/AiInsightsModal';
import { ThemeProvider, useTheme } from './context/ThemeContext';

function AppContent() {
  const [activeModule, setActiveModule] = useState<ModuleId>('overview');
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);
  const { theme, isClean } = useTheme();
  const [exportContext, setExportContext] = useState<{
    title: string;
    data: any[];
    reportMarkdown: string;
  }>({
    title: 'Relatório Executivo Geral',
    data: [],
    reportMarkdown: '',
  });

  const handleOpenExportModal = (context: { title: string; data: any; reportMarkdown: string }) => {
    setExportContext(context);
    setIsExportModalOpen(true);
  };

  return (
    <div 
      data-theme={theme}
      className={`min-h-screen flex flex-col font-sans transition-colors duration-200 selection:bg-indigo-600 selection:text-white ${
        isClean ? 'bg-slate-50 text-slate-900' : 'bg-slate-950 text-slate-100'
      }`}
    >
      {/* Top Navbar */}
      <Navbar
        activeModule={activeModule}
        onSelectModule={setActiveModule}
        onOpenAi={() => setIsAiModalOpen(true)}
        onOpenLab={() => setActiveModule('corporate-projects')}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeModule === 'overview' && (
          <OverviewView
            onSelectModule={setActiveModule}
            onOpenLab={() => setActiveModule('corporate-projects')}
            onOpenAi={() => setIsAiModalOpen(true)}
          />
        )}

        {activeModule === 'corporate-projects' && (
          <CorporateProjectsLab
            onOpenExportModal={handleOpenExportModal}
            onOpenAiInsights={() => setIsAiModalOpen(true)}
          />
        )}

        {activeModule === 'kpi-dictionary' && (
          <KpiDictionaryView />
        )}

        {activeModule !== 'overview' && 
         activeModule !== 'corporate-projects' && 
         activeModule !== 'kpi-dictionary' && (
          <ModuleView
            moduleId={activeModule}
            onNavigateModule={setActiveModule}
            onOpenLab={() => setActiveModule('corporate-projects')}
          />
        )}
      </main>

      {/* Modals */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        context={exportContext}
      />

      <AiInsightsModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        context={{
          title: 'DataMaster Analytics Suite',
          data: null,
          summary: null,
        }}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 text-slate-500 text-xs py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">DataMaster Pro</span>
            <span>·</span>
            <span>Plataforma de Inteligência Analítica, Storytelling e Engenharia de Decisão</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <button
              onClick={() => setActiveModule('corporate-projects')}
              className="hover:text-white transition-colors"
            >
              Cases Reais
            </button>
            <button
              onClick={() => setActiveModule('power-bi')}
              className="hover:text-white transition-colors"
            >
              Power BI & DAX
            </button>
            <button
              onClick={() => setActiveModule('sql-databases')}
              className="hover:text-white transition-colors"
            >
              SQL Tuning
            </button>
            <button
              onClick={() => setActiveModule('kpi-dictionary')}
              className="hover:text-white transition-colors"
            >
              Dicionário KPIs
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
