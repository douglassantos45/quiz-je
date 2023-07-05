import { FiEye } from 'react-icons/fi';
import { Link } from 'react-router-dom';

type StoryCardProps = {
  id: number | string;
  title: string;
  viewer: number;
};

export const StoryCard = ({ id, title, viewer = 0 }: StoryCardProps) => {
  return (
    <Link
      to={`/story/${id}`}
      className="relative flex flex-col justify-between p-4 px-8 max-h-[180px] h-52 bg-white w-full rounded-lg overflow-hidden shadow-lg cursor-pointer hover:scale-105 duration-300"
    >
      <div className="absolute inset-0 bg-purple-600 h-1 w-full" />
      <h1 className="text-xl font-bold text-gray-700 mt-2 max-w-xs">{title}</h1>
      <footer className="flex items-center gap-2 mt-2">
        <FiEye className="text-gray-500" size={18} />
        <span className="text-gray-500 text-xs">{viewer} Visualizações</span>
      </footer>
    </Link>
  );
};
