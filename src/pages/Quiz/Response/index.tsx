import { useModal } from '../../../hooks/ModalHook';
import { Modal } from '../../../components/Modal';
import { useQuiz } from '../../../hooks/QuizHook';
import { Link } from 'react-router-dom';
import { Feedback } from './Feedback';

export const Response = () => {
  const { iaRecommendations, iaAnswer } = useQuiz();
  const { open } = useModal();
  console.log(iaRecommendations);
  return (
    <>
      <header className="fixed top-0 p-8 px-16 text-xl font-bold">
        <Link to="/">
          <h1>QuizJE</h1>
        </Link>
      </header>
      <main className="">
        <div className="flex flex-col-reverse gap-3 py-8 desktop:justify-between lg:h-screen overflow-hidden">
          <section className="flex flex-col justify-center max-w-xl m-auto mt-10 lg:mt-auto desktop:max-w-lg xl:max-w-3xl items-center w-full p-5 ">
            <button
              className="flex items-center justify-center max-h-[1.2rem] p-8 bg-purple-700 rounded-lg text-lg font-semibold text-white hover:bg-purple-600 duration-300"
              onClick={open}
            >
              Deixe seu Feedback
            </button>
          </section>
          <section className="w-full p-5 max-w-5xl m-auto desktop:max-w-none mt-10 h-auto">
            <div className="relative max-w-[1420px] m-auto bg-purple-700 flex flex-col p-14 lg:p-16 h-full rounded-3xl text-white group">
              <h1 className="mt-2 lg:mt-12 text-xl md:text-3xl desktop:text-4xl font-semibold">
                {iaAnswer?.title ?? ''}
              </h1>

              <p className="flex flex-col gap-5 2xl:gap-24 relative mt-5 desktop:mt-14 xl:mt-20 text-base md:text-xl xl:text-2xl text-justify ">
                {iaAnswer?.recommendations}
              </p>

              <div>
                Cursos
                {iaRecommendations?.courses?.map((course: any, key: number) => (
                  <div key={key}>
                    <a href={course?.Link} target="_blank">
                      {course?.Nome}
                    </a>
                  </div>
                ))}
              </div>
              <div>
                Artigos
                {iaRecommendations?.articles?.map(
                  (article: any, key: number) => (
                    <div key={key}>
                      <a href={article?.Link} target="_blank">
                        {article?.Nome}
                      </a>
                    </div>
                  ),
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
      <Modal>
        <Feedback />
      </Modal>
    </>
  );
};
