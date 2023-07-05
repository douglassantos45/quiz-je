import { useState } from 'react';
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiFillLike,
  AiFillDislike,
} from 'react-icons/ai';
import { getLocalStorage, saveLocalStorage } from '../utils/local-storage';
import { normalizeDate } from '../utils/normalizeDate';
import { pb } from '../services/pocketbase';

export type CommentCardProps = {
  id: string;
  story_id: string;
  comment: string;
  created: Date;
  like: number;
  dislike: number;
};

type CommentCardDataProps = {
  props: CommentCardProps;
};

export const CommentCard = ({ props }: CommentCardDataProps) => {
  const [likes, setLikes] = useState(props?.like);
  const [dislikes, setDislikes] = useState(props?.dislike);
  const [userLiked, setUserLiked] = useState(
    getLocalStorage(`@quiz-je:likes-${props?.id}`) ?? false,
  );
  const [userDisliked, setUserDisliked] = useState(
    getLocalStorage(`@quiz-je:dislikes-${props?.id}`) ?? false,
  );

  const sendRequest = async (key: string, value: number) => {
    try {
      const data = {
        story_id: props.story_id,
        [key]: value,
      };
      await pb.collection('comments').update(props.id, data);
    } catch (err: any) {
      console.error(err.message);
      throw err;
    }
  };

  const handleLike = () => {
    const removeDisliked = dislikes - 1;
    const removeLiked = likes - 1;
    const addLiked = likes + 1;
    if (userLiked) {
      setLikes(removeLiked);
      saveLocalStorage(`@quiz-je:likes-${props.id}`, false);
      setUserLiked(false);
      sendRequest('like', removeLiked < 0 ? 0 : removeLiked);
    } else {
      setLikes(addLiked);
      saveLocalStorage(`@quiz-je:likes-${props.id}`, true);
      sendRequest('like', addLiked);
      setUserLiked(true);
      if (userDisliked) {
        setDislikes(removeDisliked);
        setUserDisliked(false);
        saveLocalStorage(`@quiz-je:dislikes-${props.id}`, false);
        sendRequest('dislike', removeDisliked < 0 ? 0 : removeDisliked);
      }
    }
  };

  const handleDislike = () => {
    const removeDisliked = dislikes - 1;
    const removeLiked = likes - 1;
    const addDisliked = dislikes + 1;
    if (userDisliked) {
      setDislikes(removeDisliked);
      setUserDisliked(false);
      saveLocalStorage(`@quiz-je:dislikes-${props.id}`, false);
      sendRequest('dislike', removeDisliked < 0 ? 0 : removeDisliked);
    } else {
      setDislikes(addDisliked);
      saveLocalStorage(`@quiz-je:dislikes-${props.id}`, true);
      setUserDisliked(true);
      sendRequest('dislike', addDisliked);
      if (userLiked) {
        setLikes(removeLiked);
        saveLocalStorage(`@quiz-je:likes-${props.id}`, false);
        setUserLiked(false);
        sendRequest('like', removeLiked < 0 ? 0 : removeLiked);
      }
    }
  };

  return props?.id ? (
    <div className="bg-white shadow-md py-4 px-8 rounded-2xl">
      <header className="flex items-center gap-3">
        <img
          className="w-16"
          src="https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg"
        />
        <div>
          <span className="text-sm text-gray-500">
            {normalizeDate(props.created)}
          </span>
          <h1 className="text-base font-semibold text-gray-700">Anônimo</h1>
        </div>
      </header>
      <main className="mt-6 px-4">
        <p className="text-justify text-gray-700">{props.comment}</p>
      </main>
      <footer className="flex justify-end gap-4 mt-6">
        <div
          className="flex items-center justify-center gap-1 text-purple-600 cursor-pointer"
          onClick={() => handleLike()}
        >
          <small className="text-purple-500 font-medium">{likes}</small>
          {userLiked ? <AiFillLike /> : <AiOutlineLike />}
        </div>
        <div
          className="flex items-center justify-center gap-1 text-purple-600 cursor-pointer"
          onClick={() => handleDislike()}
        >
          <small className="text-purple-500 font-medium">{dislikes}</small>
          {userDisliked ? <AiFillDislike /> : <AiOutlineDislike />}
        </div>
      </footer>
    </div>
  ) : (
    <></>
  );
};
