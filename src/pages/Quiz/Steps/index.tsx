import { Link } from 'react-router-dom';
import { Loading } from '../../../components/Loading';
import { useQuiz } from '../../../hooks/QuizHook';
import { quiz } from '../db/quiz';
import { Option } from './Option';
import { Question } from './Question';

export const Steps = () => {
  const { currentStep, isLoading, isError, isSuccess, iaAnswer } = useQuiz();
  return (
    <>
      <header className="fixed top-0 p-8 px-16">
        <Link to="/" className="text-2xl font-black" aria-label="Título QuizJE">
          Quiz<span className="text-purple-700">JE</span>
        </Link>
      </header>
      <main className="mt-10 lg:mt-0">
        {quiz.map(
          (quiz) =>
            quiz.id == currentStep + 1 && (
              <div
                className="flex flex-col-reverse lg:flex-row gap-3 py-8 desktop:justify-between lg:h-screen overflow-hidden"
                key={quiz.id}
              >
                <section className="flex flex-col justify-center max-w-5xl m-auto mt-10 lg:mt-auto lg:max-w-lg xl:max-w-3xl items-center w-full p-5 xl:ml-10 xl:p-10">
                  <Option options={quiz.options} id={quiz.id} />
                </section>
                <section className="w-full p-5 max-w-5xl m-auto desktop:max-w-none h-full desktop:p-10">
                  <Question
                    id={quiz.id}
                    title={quiz.title}
                    description={quiz.description}
                  />
                </section>
              </div>
            ),
        )}
        {isLoading && <Loading />}
      </main>
    </>
  );
};
