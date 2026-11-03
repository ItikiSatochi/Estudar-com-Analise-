import React, { useState } from 'react';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  ArrowRight, 
  RotateCcw, 
  Sparkles, 
  ShieldCheck, 
  Briefcase, 
  BookOpen, 
  AlertTriangle 
} from 'lucide-react';
import { ModuleId } from '../types';
import { moduleQuestsData } from '../data/moduleQuests';
import { calculateQuizScore, getScoreEvaluation } from '../utils/quiz';
import { useTheme } from '../context/ThemeContext';

interface Props {
  moduleId: ModuleId;
  moduleTitle?: string;
  onNavigateNextModule?: () => void;
}

export const ModuleQuizView: React.FC<Props> = ({ 
  moduleId, 
  moduleTitle,
  onNavigateNextModule 
}) => {
  const { isClean } = useTheme();
  const quest = moduleQuestsData[moduleId] || moduleQuestsData.overview;
  
  // Track selected answers per question index: { [questionIndex]: optionIndex }
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const currentQuestion = quest.questions[currentQuestionIndex];
  const isCurrentAnswered = selectedAnswers[currentQuestionIndex] !== undefined;
  const totalQuestions = quest.questions.length;

  const handleSelectOption = (optionIndex: number) => {
    // Only allow selecting if not answered yet for current question
    if (isCurrentAnswered) return;
    
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: optionIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setIsCompleted(false);
  };

  const result = calculateQuizScore(quest.questions, selectedAnswers, quest.passingScorePercent);
  const evaluation = getScoreEvaluation(result.percentage);

  return (
    <div className="space-y-6">
      {/* Top Quest Header */}
      <div className={`border rounded-xl p-6 transition-colors ${
        isClean 
          ? 'bg-gradient-to-r from-indigo-50/90 via-white to-sky-50/70 border-indigo-200 text-slate-800 shadow-sm' 
          : 'bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border-slate-800 text-slate-100'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-1">
              <span className={`px-2 py-0.5 rounded font-mono ${
                isClean ? 'bg-indigo-100 text-indigo-800 border border-indigo-300' : 'bg-indigo-950/80 text-indigo-300 border border-indigo-800/40'
              }`}>
                Quest Avaliativo
              </span>
              <span className={isClean ? 'text-indigo-700' : 'text-indigo-400'}>
                Verificação de Domínio Corporativo
              </span>
            </div>
            
            <h2 className={`text-xl sm:text-2xl font-black ${isClean ? 'text-slate-900' : 'text-white'}`}>
              {quest.title}
            </h2>

            <p className={`text-xs sm:text-sm mt-1 max-w-3xl leading-relaxed ${isClean ? 'text-slate-600' : 'text-slate-400'}`}>
              {quest.description}
            </p>
          </div>

          {/* Badge & Target info */}
          <div className={`flex flex-col sm:items-end justify-center px-4 py-2.5 rounded-xl border flex-shrink-0 ${
            isClean ? 'bg-white border-indigo-200 shadow-xs' : 'bg-slate-950/70 border-slate-800'
          }`}>
            <span className={`text-[10px] font-bold uppercase tracking-wider ${isClean ? 'text-slate-500' : 'text-slate-400'}`}>
              Critério de Aprovação
            </span>
            <span className={`text-base font-extrabold ${isClean ? 'text-indigo-700' : 'text-indigo-400'}`}>
              ≥ {quest.passingScorePercent}% de Acerto
            </span>
            <span className={`text-[11px] ${isClean ? 'text-slate-500' : 'text-slate-400'}`}>
              {totalQuestions} Perguntas de Cenários Reais
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        {!isCompleted && (
          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs font-bold mb-2">
              <span className={isClean ? 'text-slate-700' : 'text-slate-300'}>
                Pergunta {currentQuestionIndex + 1} de {totalQuestions}
              </span>
              <span className={isClean ? 'text-indigo-600' : 'text-indigo-400'}>
                {Math.round(((currentQuestionIndex + (isCurrentAnswered ? 1 : 0)) / totalQuestions) * 100)}% concluído
              </span>
            </div>

            <div className={`w-full h-2 rounded-full overflow-hidden ${isClean ? 'bg-slate-200' : 'bg-slate-800'}`}>
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + (isCurrentAnswered ? 1 : 0)) / totalQuestions) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Question Active Card */}
      {!isCompleted ? (
        <div className={`p-6 sm:p-8 rounded-xl border space-y-6 transition-colors ${
          isClean ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900 border-slate-800'
        }`}>
          {/* Question Header & Context */}
          <div className="space-y-2">
            {currentQuestion.businessScenario && (
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                  isClean 
                    ? 'bg-amber-50 text-amber-900 border-amber-200' 
                    : 'bg-amber-950/40 text-amber-300 border-amber-800/40'
                }`}>
                  <Briefcase className="w-3 h-3 text-amber-500" />
                  <span>Cenário de Negócio: {currentQuestion.businessScenario}</span>
                </span>
              </div>
            )}

            <h3 className={`text-base sm:text-lg font-bold leading-snug ${isClean ? 'text-slate-900' : 'text-white'}`}>
              {currentQuestion.question}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedAnswers[currentQuestionIndex] === idx;
              const isCorrectOption = idx === currentQuestion.correctIndex;
              const hasAnswered = isCurrentAnswered;

              let buttonStyle = isClean 
                ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800' 
                : 'bg-slate-950/60 hover:bg-slate-800/70 border-slate-800 text-slate-200';

              if (hasAnswered) {
                if (isCorrectOption) {
                  buttonStyle = isClean 
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-950 ring-1 ring-emerald-400 font-semibold shadow-xs' 
                    : 'bg-emerald-950/40 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500 font-semibold';
                } else if (isSelected && !isCorrectOption) {
                  buttonStyle = isClean 
                    ? 'bg-rose-50 border-rose-300 text-rose-950 ring-1 ring-rose-300' 
                    : 'bg-rose-950/40 border-rose-600 text-rose-200 ring-1 ring-rose-600';
                } else {
                  buttonStyle = isClean 
                    ? 'opacity-40 bg-slate-50 border-slate-200 text-slate-500' 
                    : 'opacity-40 bg-slate-950/30 border-slate-800/40 text-slate-500';
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={hasAnswered}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-start gap-3.5 ${buttonStyle}`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold ${
                    hasAnswered
                      ? (isCorrectOption 
                          ? 'bg-emerald-600 text-white' 
                          : (isSelected ? 'bg-rose-600 text-white' : 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400'))
                      : (isClean ? 'bg-slate-200 text-slate-700' : 'bg-slate-800 text-slate-300')
                  }`}>
                    {hasAnswered ? (
                      isCorrectOption ? <CheckCircle2 className="w-4 h-4" /> : (isSelected ? <XCircle className="w-4 h-4" /> : String.fromCharCode(65 + idx))
                    ) : (
                      String.fromCharCode(65 + idx)
                    )}
                  </div>

                  <span className="leading-relaxed flex-1">
                    {option}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Explanation Box on Answer */}
          {isCurrentAnswered && (
            <div className={`p-4 sm:p-5 rounded-xl border space-y-2 animate-fadeIn ${
              selectedAnswers[currentQuestionIndex] === currentQuestion.correctIndex
                ? (isClean ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950' : 'bg-emerald-950/30 border-emerald-900/60 text-slate-200')
                : (isClean ? 'bg-amber-50/80 border-amber-300 text-amber-950' : 'bg-amber-950/30 border-amber-900/60 text-slate-200')
            }`}>
              <div className="flex items-center gap-2">
                {selectedAnswers[currentQuestionIndex] === currentQuestion.correctIndex ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                    <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                      Resposta Correta! Justificativa Corporativa:
                    </span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                    <span className="text-xs font-extrabold uppercase tracking-wider text-amber-800 dark:text-amber-400">
                      Atenção ao Risco Corporativo:
                    </span>
                  </>
                )}
              </div>

              <p className={`text-xs sm:text-sm leading-relaxed ${isClean ? 'text-slate-800' : 'text-slate-300'}`}>
                {currentQuestion.corporateExplanation}
              </p>
            </div>
          )}

          {/* Action Bar (Previous, Next, Finish) */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-colors ${
                currentQuestionIndex === 0
                  ? 'opacity-40 cursor-not-allowed border-transparent'
                  : (isClean ? 'border-slate-300 text-slate-700 hover:bg-slate-100' : 'border-slate-700 text-slate-300 hover:bg-slate-800')
              }`}
            >
              Pergunta Anterior
            </button>

            <button
              type="button"
              disabled={!isCurrentAnswered}
              onClick={handleNext}
              className={`flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-lg shadow-sm transition-all ${
                !isCurrentAnswered
                  ? 'opacity-50 cursor-not-allowed bg-slate-300 text-slate-600 dark:bg-slate-800 dark:text-slate-500'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white active:scale-95 shadow-indigo-600/20'
              }`}
            >
              <span>{currentQuestionIndex === totalQuestions - 1 ? 'Finalizar e Ver Resultado' : 'Próxima Pergunta'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Quiz Completed Screen */
        <div className={`p-6 sm:p-10 rounded-xl border space-y-8 text-center transition-colors ${
          isClean ? 'bg-white border-slate-200 shadow-md' : 'bg-slate-900 border-slate-800'
        }`}>
          {/* Badge Icon */}
          <div className="flex justify-center">
            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg ${
              result.passed
                ? 'bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-emerald-500/25'
                : 'bg-gradient-to-tr from-amber-600 to-rose-500 text-white shadow-amber-500/25'
            }`}>
              {result.passed ? <Award className="w-10 h-10" /> : <HelpCircle className="w-10 h-10" />}
            </div>
          </div>

          {/* Result Title & Score */}
          <div className="space-y-2 max-w-xl mx-auto">
            <span className={`text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border ${
              result.passed
                ? (isClean ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-emerald-950/80 text-emerald-300 border-emerald-800/40')
                : (isClean ? 'bg-amber-100 text-amber-800 border-amber-300' : 'bg-amber-950/80 text-amber-300 border-amber-800/40')
            }`}>
              {evaluation.rating}
            </span>

            <h3 className={`text-2xl sm:text-3xl font-black mt-2 ${isClean ? 'text-slate-900' : 'text-white'}`}>
              Você acertou {result.score} de {result.total} perguntas ({result.percentage}%)
            </h3>

            <p className={`text-sm leading-relaxed ${isClean ? 'text-slate-600' : 'text-slate-300'}`}>
              {evaluation.summary}
            </p>
          </div>

          {/* Certificate Badge Card */}
          {result.passed && (
            <div className={`max-w-md mx-auto p-5 rounded-2xl border text-left space-y-3 ${
              isClean 
                ? 'bg-gradient-to-br from-indigo-50 via-white to-emerald-50 border-indigo-200 text-slate-800 shadow-sm' 
                : 'bg-gradient-to-br from-slate-950 via-indigo-950/30 to-slate-950 border-slate-800 text-slate-200'
            }`}>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
                  Selo de Conclusão do Módulo
                </span>
              </div>

              <div>
                <h4 className={`text-base font-black ${isClean ? 'text-slate-900' : 'text-white'}`}>
                  {quest.badgeTitle}
                </h4>
                <p className={`text-xs mt-1 ${isClean ? 'text-slate-600' : 'text-slate-400'}`}>
                  Validação completa dos conceitos essenciais do módulo <strong>{moduleTitle || quest.title}</strong>.
                </p>
              </div>
            </div>
          )}

          {/* Review of all questions */}
          <div className="text-left space-y-3 max-w-2xl mx-auto pt-4 border-t border-slate-200 dark:border-slate-800">
            <h4 className={`text-xs font-bold uppercase tracking-wider ${isClean ? 'text-slate-800' : 'text-slate-300'}`}>
              Gabarito Executivo & Análise das Questões:
            </h4>

            <div className="space-y-2">
              {quest.questions.map((q, idx) => {
                const userAns = selectedAnswers[idx];
                const isCorrect = userAns === q.correctIndex;

                return (
                  <div 
                    key={idx}
                    className={`p-3.5 rounded-lg border text-xs space-y-1.5 ${
                      isCorrect
                        ? (isClean ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950' : 'bg-emerald-950/20 border-emerald-900/40 text-slate-200')
                        : (isClean ? 'bg-rose-50/60 border-rose-200 text-rose-950' : 'bg-rose-950/20 border-rose-900/40 text-slate-200')
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                      )}
                      <div>
                        <span className="font-bold">{idx + 1}. {q.question}</span>
                        <div className={`mt-1 text-[11px] ${isClean ? 'text-slate-700' : 'text-slate-400'}`}>
                          <strong>Gabarito:</strong> {q.options[q.correctIndex]}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              type="button"
              onClick={handleRestart}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg border transition-colors ${
                isClean 
                  ? 'border-slate-300 text-slate-700 hover:bg-slate-100' 
                  : 'border-slate-700 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Refazer Desafio</span>
            </button>

            {onNavigateNextModule && (
              <button
                type="button"
                onClick={onNavigateNextModule}
                className="flex items-center gap-2 px-5 py-2 text-xs font-bold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all active:scale-95"
              >
                <span>Próximo Módulo de Ensino</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
