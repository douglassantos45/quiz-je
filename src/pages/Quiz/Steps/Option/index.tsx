import { useEffect, useState } from 'react';
import { Option as SelectOption } from '../../../../components/Option';
import { RadioGroup } from '../../../../components/RadioGroup';
import {
  getLocalStorage,
  saveLocalStorage,
} from '../../../../utils/local-storage';
import { useQuiz } from '../../../../hooks/QuizHook';
import { quiz } from '../../db/quiz';

type OptionProps = {
  options: any[];
  id: any;
};

export const Option = ({ options, id }: OptionProps) => {
  const [selectedIndex, setSelectedIndex] = useState(
    getLocalStorage(`@quiz-js:answerSelected-${id - 1}`)?.option?.id ?? 0,
  );
  const { setIsSelectedAnswer, currentStep } = useQuiz();

  const handleSaveAnswerSelected = (id: any) => {
    if (id === selectedIndex) {
      setSelectedIndex(0);
      setIsSelectedAnswer(false);
      return localStorage.removeItem(`@quiz-js:answerSelected-${currentStep}`);
    }
    const { title, options } = quiz[currentStep] ?? {};
    const currentOption = {
      title,
      option: options[id - 1],
    };
    setIsSelectedAnswer(true);
    setSelectedIndex(id);
    saveLocalStorage(`@quiz-js:answerSelected-${currentStep}`, currentOption);
  };

  useEffect(() => {
    if (selectedIndex > 0) return setIsSelectedAnswer(true);
  }, []);

  return (
    <RadioGroup>
      {options.map(({ id, answer }) => (
        <SelectOption
          index={id}
          key={id}
          selectedIndex={selectedIndex}
          onSelect={() => {
            handleSaveAnswerSelected(id);
          }}
        >
          <div
            className={`flex flex-col flex-1 py-2 md:py-4 lg:py-6 ml-5 ${
              selectedIndex === id ? 'text-white' : 'text-gray-800'
            }`}
          >
            <span className="font-medium text-sm md:text-base xl:text-xl">
              {answer}
            </span>
          </div>
        </SelectOption>
      ))}
    </RadioGroup>
  );
};
