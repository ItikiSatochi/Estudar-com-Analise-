import { describe, it } from 'node:test';
import assert from 'node:assert';
import { calculateQuizScore, getScoreEvaluation } from './quiz.ts';
import { QuizQuestion } from '../types/index.ts';

const mockQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Qual o papel do Star Schema?',
    options: ['Evitar relacionamentos', 'Separar Fatos de Dimensões', 'Criar loops circulares', 'Eliminar tabelas'],
    correctIndex: 1,
    corporateExplanation: 'Separa métricas quantitativas (Fato) de contextos de negócio (Dimensão).',
  },
  {
    id: 'q2',
    question: 'Por que eliminar pizza 3D?',
    options: ['Porque gasta tinta', 'Sobrecarga cognitiva e distorção angular', 'A diretoria prefere 4D', 'Não há motivo'],
    correctIndex: 1,
    corporateExplanation: 'O olho humano tem dificuldade em julgar áreas e ângulos em 3D.',
  },
  {
    id: 'q3',
    question: 'Qual a função de CALCULATE no DAX?',
    options: ['Formatar números', 'Transição de contexto e modificação de filtros', 'Exportar para Excel', 'Criar colunas apenas'],
    correctIndex: 1,
    corporateExplanation: 'Modifica o contexto de filtro da avaliação da medida.',
  },
  {
    id: 'q4',
    question: 'O que avalia o LTV/CAC?',
    options: ['Custo de servidor', 'Retorno de valor do cliente sobre o custo de aquisição', 'Velocidade da query SQL', 'Número de cliques'],
    correctIndex: 1,
    corporateExplanation: 'Mede a sustentabilidade unit economics (>3x é saudável).',
  },
];

describe('calculateQuizScore', () => {
  it('should return 100% and passed=true when all answers are correct', () => {
    const answers = { 0: 1, 1: 1, 2: 1, 3: 1 };
    const result = calculateQuizScore(mockQuestions, answers, 75);
    assert.strictEqual(result.score, 4);
    assert.strictEqual(result.total, 4);
    assert.strictEqual(result.percentage, 100);
    assert.strictEqual(result.passed, true);
  });

  it('should return 75% and passed=true for 3 out of 4 correct', () => {
    const answers = { 0: 1, 1: 1, 2: 1, 3: 0 }; // 4th wrong
    const result = calculateQuizScore(mockQuestions, answers, 75);
    assert.strictEqual(result.score, 3);
    assert.strictEqual(result.percentage, 75);
    assert.strictEqual(result.passed, true);
  });

  it('should return 50% and passed=false when below threshold', () => {
    const answers = { 0: 1, 1: 1, 2: 0, 3: 0 };
    const result = calculateQuizScore(mockQuestions, answers, 75);
    assert.strictEqual(result.score, 2);
    assert.strictEqual(result.percentage, 50);
    assert.strictEqual(result.passed, false);
  });

  it('handles empty questions or empty answers gracefully', () => {
    const emptyResult = calculateQuizScore([], {});
    assert.strictEqual(emptyResult.percentage, 0);
    assert.strictEqual(emptyResult.passed, false);

    const noAnswers = calculateQuizScore(mockQuestions, {});
    assert.strictEqual(noAnswers.score, 0);
    assert.strictEqual(noAnswers.percentage, 0);
    assert.strictEqual(noAnswers.passed, false);
  });
});

describe('getScoreEvaluation', () => {
  it('categorizes 100% as specialist', () => {
    const eval100 = getScoreEvaluation(100);
    assert.strictEqual(eval100.badgeColor, 'emerald');
    assert.ok(eval100.rating.includes('100%'));
  });

  it('categorizes 75-99% as approved', () => {
    const eval80 = getScoreEvaluation(80);
    assert.strictEqual(eval80.badgeColor, 'indigo');
  });

  it('categorizes 50-74% as attention required', () => {
    const eval60 = getScoreEvaluation(60);
    assert.strictEqual(eval60.badgeColor, 'amber');
  });

  it('categorizes below 50% as restudy needed', () => {
    const eval25 = getScoreEvaluation(25);
    assert.strictEqual(eval25.badgeColor, 'rose');
  });
});
