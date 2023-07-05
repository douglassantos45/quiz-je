import { ReactNode } from 'react';

type OptionProps = {
  index: number;
  selectedIndex?: number;
  onSelect: (index: number) => void;
  children: ReactNode;
};

export const Option = ({
  index,
  selectedIndex,
  onSelect,
  children,
}: OptionProps) => {
  const isSelected = index === selectedIndex;
  return (
    <div
      className={`flex items-center shadow-sm cursor-pointer transition duration-300 rounded-2xl xl:rounded-3xl px-5 py-2 flex-1 text-md font-bold  ${
        isSelected ? 'bg-purple-600 text-white' : 'bg-gray-200'
      } hover:brightness-90`}
      onClick={() => onSelect(index)}
    >
      <div
        className={`flex items-center justify-center rounded-full w-8 h-8 md:w-10 md:h-10 text-white text-sm md:text-lg ${
          isSelected ? 'bg-purple-800' : 'bg-gray-500'
        }`}
      >
        {index}
      </div>
      {children}
    </div>
  );
};
