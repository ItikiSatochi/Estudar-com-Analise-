import { QuizQuestion, QuizAttemptResult } from '../types';

/**
 * Calculates the score, percentage, and passing status of a completed quiz.
 */
export function calculateQuizScore(
  questions: QuizQuestion[],
  selectedAnswers: Record<number, number>,
  passingScorePercent = 75
): QuizAttemptResult {
  if (!questions || questions.length === 0) {
    return {
      score: 0,
      total: 0,
      percentage: 0,
      passed: false,
      selectedAnswers: selectedAnswers || {},
    };
  }

  let correctCount = 0;
  questions.forEach((q, idx) => {
    if (selectedAnswers[idx] === q.correctIndex) {
      correctCount++;
    }
  });

  const percentage = Math.round((correctCount / questions.length) * 100);
  const passed = percentage >= passingScorePercent;

  return {
    score: correctCount,
    total: questions.length,
    percentage,
    passed,
    selectedAnswers: selectedAnswers || {},
  };
}

/**
 * Returns corporate evaluation status and feedback based on score percentage.
 */
export function getScoreEvaluation(percentage: number): {
  rating: string;
  badgeColor: string;
  summary: string;
} {
  if (percentage === 100) {
    return {
      rating: 'Especialista Sênior (100%)',
      badgeColor: 'emerald',
      summary: 'Desempenho impecável! Domínio conceitual e prático pronto para liderar decisões corporativas.',
    };
  }
  if (percentage >= 75) {
    return {
      rating: 'Aprovado com Louvor (Apto para Produção)',
      badgeColor: 'indigo',
      summary: 'Excelente compreensão dos pilares de governança, modelagem e raciocínio analítico.',
    };
  }
  if (percentage >= 50) {
    return {
      rating: 'Atenção Necessária (Revisão Recomendada)',
      badgeColor: 'amber',
      summary: 'Conceitos básicos absorvidos, mas há riscos em armadilhas corporativas clássicas.',
    };
  }
  return {
    rating: 'Necessita Reestudo do Módulo',
    badgeColor: 'rose',
    summary: 'Revise os tópicos do guia teórico e os scripts antes de aplicar em bases de dados em produção.',
  };
}
