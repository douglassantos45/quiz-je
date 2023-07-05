import { Link } from 'react-router-dom';

type HeaderProps = {
  title?: string;
  navigateTo?: string;
};

export const Header = ({ title, navigateTo }: HeaderProps) => {
  return (
    <header className="relative min-h-[150px] max-h-[200px] bg-purple-700 w-full">
      <div className="p-8">
        <Link to={navigateTo ? navigateTo : '/animated-stories'}>
          <h1 className="text-white font-bold text-lg">QuizJE</h1>
        </Link>
      </div>
      <div className="absolute flex items-center justify-center bg-white max-h-[200px] max-w-sm md:max-w-xl w-full py-10 px-4 md:px-14 rounded-[2rem] inset-0 -bottom-52 md:-bottom-32 m-auto shadow-md">
        <h1
          className={`${
            title ? 'text-3xl' : 'text-4xl'
          } font-black text-center text-purple-800`}
        >
          {title ?? 'Escolha uma história e compartilhe experiências'}
        </h1>
      </div>
    </header>
  );
};
