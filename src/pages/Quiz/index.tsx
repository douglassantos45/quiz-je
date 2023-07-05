import { useQuiz } from '../../hooks/QuizHook';
import { Response } from './Response';
import { Steps } from './Steps';

export const Quiz = () => {
  const { isSuccess } = useQuiz();
  if (isSuccess) return <Response />;
  return <Steps />;
};
