import {
  HiOutlineArrowSmallRight,
  HiOutlineArrowSmallLeft,
} from 'react-icons/hi2';
import { useQuiz } from '../../../../hooks/QuizHook';

type QuestionProps = {
  id: number;
  title: string;
  description: string;
};

export const Question = ({ id, title, description }: QuestionProps) => {
  const {
    isSelectedAnswer,
    currentStep,
    totalStep,
    send,
    nextStep,
    goBackStep,
  } = useQuiz();

  return (
    <div className="relative bg-purple-700 flex flex-col p-10 desktop:p-14 h-full rounded-[40px] desktop:rounded-[80px] text-white group">
      <div className="absolute top-5 right-8 desktop:top-10 desktop:right-14 w-full flex justify-end text-xs md:text-sm">
        <div className="flex items-center justify-center gap-2 md:gap-3 bg-white px-2 py-[6px] md:px-4 md:py-2 rounded-full">
          <span className="flex items-center justify-center bg-purple-700 w-6 h-6 md:w-8 md:h-8 rounded-full font-semibold">
            {id}
          </span>
          <span className="text-gray-600 font-medium">
            {currentStep + 1} de {totalStep}
          </span>
        </div>
      </div>
      <h1 className="mt-10 lg:mt-24 text-xl md:text-3xl desktop:text-4xl font-semibold">
        {title ?? 'Você realiza seu orçamento financeiro mensalmente?'}
      </h1>
      <div className="flex h-full flex-col gap-5 2xl:gap-24 relative mt-5 lg:mt-20 desktop:mt-14 xl:mt-20">
        <p className="flex-1 text-base md:text-xl xl:text-2xl text-justify ">
          {description}
        </p>

        <div className="absolute lg:static -bottom-[4.7rem] desktop:-bottom-16 right-0 desktop:right-16  w-full flex justify-between">
          <button
            className={`${
              currentStep > 0 ? 'opacity-100' : 'opacity-0'
            } flex items-center justify-center rounded-3xl desktop:rounded-[30px] bg-purple-900 lg:bg-transparent w-20 h-16 desktop:w-28 desktop:h-20 duration-400`}
            aria-label="Voltar a pergunta"
            onClick={goBackStep}
          >
            <HiOutlineArrowSmallLeft className="text-xl text-white  desktop:text-4xl" />
          </button>
          {currentStep + 1 < totalStep ? (
            <button
              className="flex items-center justify-center opacity-100 desktop:opacity-100 bg-purple-900 desktop:bg-white rounded-3xl desktop:rounded-[30px] w-20 h-16 desktop:w-28 desktop:h-20 group-hover:opacity-100 duration-300"
              aria-label="Próxima pergunta"
              disabled={!isSelectedAnswer}
              onClick={nextStep}
            >
              <HiOutlineArrowSmallRight className="text-xl text-white desktop:text-purple-700 desktop:text-4xl" />
            </button>
          ) : (
            <button
              className="flex items-center justify-center opacity-100 desktop:opacity-100 bg-purple-900 desktop:bg-white rounded-3xl desktop:rounded-[30px] w-24 h-16 desktop:w-32 desktop:h-20 group-hover:opacity-100 duration-300 text-white desktop:text-purple-700 text-lg font-semibold"
              aria-label="Concluir o quiz"
              onClick={send}
              disabled={!isSelectedAnswer}
            >
              Finalizar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
