import { CgSpinnerTwo } from 'react-icons/cg';
export const Loading = () => {
  return (
    <div className="fixed flex flex-col items-center justify-center z-10 inset-0 w-screen h-screen text-white bg-black/80">
      <CgSpinnerTwo className="animate-spin" size={72} />
      <span>Carregando...</span>
    </div>
  );
};
