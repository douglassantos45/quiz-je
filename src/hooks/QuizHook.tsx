import { useContext } from 'react';
import { QuizContext } from '../contexts/QuizContexts';

export const useQuiz = () => {
  const context = useContext(QuizContext);
  return context;
};
