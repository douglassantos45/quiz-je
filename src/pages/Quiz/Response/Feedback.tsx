import { FiX } from 'react-icons/fi';
import { useModal } from '../../../hooks/ModalHook';
import {
  BsEmojiHeartEyes,
  BsEmojiFrown,
  BsEmojiSmile,
  BsEmojiAngry,
  BsEmojiNeutral,
} from 'react-icons/bs';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { pb } from '../../../services/pocketbase';
import {
  getLocalStorage,
  saveLocalStorage,
} from '../../../utils/local-storage';
import { CgSpinnerTwo } from 'react-icons/cg';

export const Feedback = () => {
  const { close } = useModal();
  const [textarea, setTextArea] = useState('');
  const [selectIndex, setSelectIndex] = useState(0);
  const mutation = useMutation({
    mutationFn: (data: any) => {
      return pb.collection('feedbacks').create({
        feed: data.iconFeed,
        opinion: data.textarea,
      });
    },
    onSuccess: () => {
      saveLocalStorage('@quiz-je:feedback', true);
      setTextArea('');
      close();
      return alert('Feedback registrado com sucesso');
    },
    onError: (err) => {
      console.log(err);
      return alert('Ocorreu um erro. Tente novamente');
    },
  });

  const feeds = [
    { icon: <BsEmojiAngry />, label: 'Péssimo', id: 1 },
    { icon: <BsEmojiFrown />, label: 'Ruim', id: 2 },
    { icon: <BsEmojiNeutral />, label: 'Regular', id: 3 },
    { icon: <BsEmojiSmile />, label: 'Bom', id: 4 },
    { icon: <BsEmojiHeartEyes />, label: 'Amei', id: 5 },
  ];

  const onSubmit = () => {
    const isFeedbackRegistered =
      !textarea.length || getLocalStorage('@quiz-je:feedback');
    if (isFeedbackRegistered) {
      return alert('Você já registrou seu feedback');
    }
    const [iconFeed] = feeds.filter((feed) => feed.id === selectIndex);
    mutation.mutate({
      textarea,
      iconFeed: iconFeed.label,
    });
  };

  return (
    <>
      <header className="flex justify-between items-center">
        <h1 className="font-bold text-lg">Feedback</h1>
        <div className="cursor-pointer" tabIndex={0} onClick={close}>
          <FiX size={32} />
        </div>
      </header>
      <section className="flex flex-wrap items-center justify-start gap-y-5 sm:gap-y-0 sm:justify-around py-4">
        {feeds.map((feedImg, key) => (
          <div
            className={`flex flex-col items-center justify-center gap-1 md:gap-3 cursor-pointer text-gray-500 text-2xl sm:text-4xl py-1 px-4 md:py-3 md:px-6 ${
              selectIndex === feedImg.id &&
              'text-purple-700 scale-110 border border-purple-400 rounded-xl'
            } duration-300`}
            key={feedImg.id}
            onClick={() => setSelectIndex(feedImg.id)}
          >
            {feedImg.icon}
            <span
              className={`text-center ${
                selectIndex === feedImg.id
                  ? 'font-semibold text-xs md:text-sm'
                  : 'font-medium text-xs'
              }`}
            >
              {feedImg.label}
            </span>
          </div>
        ))}
      </section>
      <form className="text-sm md:text-base text-gray-800 font-semibold">
        Descreva sua experiência com a ferramenta:
        <textarea
          className="w-full bg-gray-100 rounded-lg p-5 focus-within:outline-gray-200 mt-2 font-normal"
          name=""
          id=""
          rows={5}
          placeholder="Informe seu texto aqui"
          onChange={({ target }) => setTextArea(target.value)}
        ></textarea>
      </form>
      <footer className="flex gap-5 justify-end w-full">
        <button
          onClick={onSubmit}
          disabled={mutation.isSuccess}
          className="text-sm md:text-base bg-purple-700 cursor-pointer text-white py-2 px-8 font-medium rounded-lg hover:bg-purple-600 duration-300"
        >
          {mutation.isLoading ? (
            <CgSpinnerTwo className="animate-spin" size={20} />
          ) : (
            'Enviar'
          )}
        </button>
        <button
          className="text-sm md:text-base text-red-500 font-semibold hover:text-red-400 duration-300"
          onClick={close}
        >
          Cancelar
        </button>
      </footer>
    </>
  );
};
