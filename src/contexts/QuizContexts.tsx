import { Dispatch, ReactNode, createContext, useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { getLocalStorage, saveLocalStorage } from '../utils/local-storage';
import { quiz } from '../pages/Quiz/db/quiz';

type IaAnswerProps = {
  title: string;
  recommendations: string;
};

type QuizContextProps = {
  iaRecommendations: any;
  isSelectedAnswer: boolean;
  currentStep: number;
  isLoading: boolean;
  isSuccess: boolean;
  totalStep: number;
  isError: boolean;
  iaAnswer: IaAnswerProps;
  setIsSelectedAnswer: Dispatch<boolean>;
  goBackStep: () => void;
  nextStep: () => void;
  send: () => void;
};

type QuizProviderProps = {
  children: ReactNode;
};

export const QuizContext = createContext<QuizContextProps>(
  {} as QuizContextProps,
);

export const QuizProvider = ({ children }: QuizProviderProps) => {
  const [currentStep, setCurrentStep] = useState(
    getLocalStorage('@quiz-je:currentStep') ?? 0,
  );
  const [iaRecommendations, setIaRecommendations] = useState({});
  const [iaAnswer, setIaAnswer] = useState({} as IaAnswerProps);
  const [isSelectedAnswer, setIsSelectedAnswer] = useState(false);
  const totalStep = quiz.length;

  const { isLoading, isError, isSuccess, mutateAsync } = useMutation(
    (data: string[]) => ai(data),
  );

  const verifyCurrentStep = (currentStep: number): number => {
    if (currentStep < 0) return (currentStep = 0);
    if (currentStep > totalStep - 1) return (currentStep = totalStep - 1);
    saveLocalStorage('@quiz-je:currentStep', currentStep);
    return currentStep;
  };

  const nextStep = () => {
    const step = verifyCurrentStep(currentStep + 1);
    setCurrentStep(step);
  };

  const goBackStep = () => {
    const step = verifyCurrentStep(currentStep - 1);
    setCurrentStep(step);
  };

  const coursesRecommendations = async (text: any) => {
    if (!text.length)
      return alert('Ocorreu um erro ao recomendar materiais de apoio');
    if (getLocalStorage('example')) return;
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt:
          text +
          'O texto acima é meu perfil financeiro. Me recomende cursos e artigos gratuitos em português com links. Coloque a resposta em formato JSON válido',
        max_tokens: 3000,
        temperature: 0,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      }),
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    const resp = JSON.parse(result.choices[0].text?.replace('.', ''));
    console.log(resp);
    const recommendations = resp.map((res: any) => ({
      courses: res?.Curso,
      articles: res?.Artigo,
    }));
    saveLocalStorage('example', {
      courses: resp?.Cursos,
      articles: resp?.Artigos,
    });
    setIaRecommendations(recommendations);
  };

  const ai = async (answers: string[]) => {
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt:
          answers.join() +
          'O texto acima é meu perfil financeiro, o que você recomendaria? E um título para o meu tipo do perfil. Coloque a resposta em formato JSON',
        max_tokens: 3000,
        temperature: 0,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      }),
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    const output = await response.json();
    const resp = output.choices[0].text;
    const jsonResponse = JSON.parse(
      (resp.length > 0 && resp) || JSON.stringify({}),
    );
    await coursesRecommendations(jsonResponse?.recomendação);
    setIaAnswer({
      title: jsonResponse?.título,
      recommendations: jsonResponse?.recomendação,
    });
    localStorage.removeItem('@quiz-je:currentStep');
    for (let i = 0; i < totalStep; i++)
      localStorage.removeItem(`@quiz-js:answerSelected-${i}`);
  };

  const send = () => {
    const answers = [];
    for (let i = 0; i < totalStep; i++) {
      const {
        title,
        option: { answer },
      } = getLocalStorage(`@quiz-js:answerSelected-${i}`);
      answers.push(title + answer);
    }
    mutateAsync(answers);
  };

  return (
    <QuizContext.Provider
      value={{
        iaRecommendations,
        isSelectedAnswer,
        currentStep,
        isLoading,
        isSuccess,
        totalStep,
        iaAnswer,
        isError,
        setIsSelectedAnswer,
        goBackStep,
        nextStep,
        send,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
