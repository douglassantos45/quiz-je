import { Link } from 'react-router-dom';

export const App = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-10 md:flex-row w-full px-8 md:px-0 h-screen overflow-y-auto overflow-x-hidden">
      <Link
        to="/quiz"
        className="relative flex flex-col items-center justify-center p-4 px-8 max-h-[150px] h-52 bg-white max-w-sm w-full rounded-lg overflow-hidden shadow-lg cursor-pointer hover:scale-105 duration-300"
      >
        <div className="absolute inset-0 bg-purple-600 h-1 w-full" />
        <h1 className="text-2xl font-bold">Quiz</h1>
      </Link>
      <Link
        to="/animated-stories"
        className="relative flex flex-col items-center justify-center p-4 px-8 max-h-[150px] h-52 bg-white max-w-sm w-full rounded-lg overflow-hidden shadow-lg cursor-pointer hover:scale-105 duration-300"
      >
        <div className="absolute inset-0 bg-purple-600 h-1 w-full" />
        <h1 className="text-2xl font-bold">Histórias animadas</h1>
      </Link>
    </div>
  );
};
