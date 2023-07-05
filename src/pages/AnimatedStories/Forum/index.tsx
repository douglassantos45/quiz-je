import { Link, useParams } from 'react-router-dom';
import { CommentCard, CommentCardProps } from '../../../components/CommentCard';
import { Header } from '../../../components/Header';
import { useStories } from '../../../hooks/StoriesHook';
import { CgSpinnerTwo } from 'react-icons/cg';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { pb } from '../../../services/pocketbase';

export const Forum = () => {
  const [comments, setComments] = useState<CommentCardProps[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { stories } = useStories();
  const param = useParams();
  const [story] = stories.filter((story) => story.id === param?.id);
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = async (comment: string) => {
    try {
      const data = {
        story_id: [`${param?.id}`],
        comment: comment,
      };
      const record = await pb.collection('comments').create(data);
      return record;
    } catch (err: any) {
      console.error(err.message);
      throw err;
    }
  };

  const commentSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    if (!textareaRef.current || !textareaRef.current.value) return;
    const { value } = textareaRef.current;
    await sendRequest(value);
    getComments();
    textareaRef.current.value = '';
    setIsLoading(false);
  };

  const getComments = async () => {
    try {
      const records = (await pb.collection('comments').getFullList({
        sort: '-created',
        filter: `story_id = '${param?.id}'`,
      })) as CommentCardProps[];
      setComments(records);
    } catch (err: any) {
      console.error(err.message);
      throw err;
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    getComments();
  }, [param?.id]);

  return (
    <>
      <Header title={story?.title} />
      <main className="flex flex-col items-center gap-8 max-w-5xl m-auto w-full px-3 md:px-0 pb-10 overflow-y-auto overflow-x-hidden mt-44">
        <article className="">
          <div className="relative before:content-[''] before:w-full before:h-[5.5rem] before:absolute before:bg-linear-bg">
            <div
              className="text-lg px-8 text-justify max-h-[5.5rem] overflow-hidden"
              dangerouslySetInnerHTML={{ __html: story?.story }}
            />
          </div>
          <div className="flex w-full justify-center">
            <Link
              to={`/story/${param?.id}`}
              className="text-purple-500 hover:text-purple-700 text-center text-lg duration-300"
            >
              Ler a história novamente
            </Link>
          </div>
        </article>
        <form
          onSubmit={commentSubmit}
          className="flex flex-col gap-5 w-full px-8 mt-5"
        >
          <textarea
            ref={textareaRef}
            className="w-full bg-gray-200 rounded-xl py-5 px-8 outline-gray-300 placeholder:text-lg text-lg text-gray-800 placeholder:text-gray-400 overflow-hidden focus-within:bg-gray-200/40 duration-300"
            name=""
            id=""
            placeholder="Deixe  sua experiência com a leitura ou resposta aos outros comentários"
            rows={4}
          ></textarea>
          <div className="flex w-full justify-end">
            <button
              className="flex items-center justify-center max-w-[90px] w-full bg-purple-700 text-gray-50 font-medium py-2 px-4 rounded-lg hover:bg-purple-600 duration-300"
              disabled={isLoading}
            >
              {isLoading ? (
                <CgSpinnerTwo className="animate-spin" size={20} />
              ) : (
                'Comentar'
              )}
            </button>
          </div>
        </form>
        <section className="flex flex-col gap-5 w-full px-8 mt-4">
          {comments.length ? (
            comments.map((comment) => (
              <CommentCard key={comment.id} props={comment} />
            ))
          ) : (
            <p className="text-center text-gray-500 text-sm">
              Nenhum comentário
            </p>
          )}
        </section>
        <footer className="w-full mt-24">
          <div className="flex flex-col md:flex-row justify-center flex-wrap gap-5 md:max-w-5xl md:m-auto w-full md:px-0 pb-10 overflow-hidden"></div>
        </footer>
      </main>
    </>
  );
};
