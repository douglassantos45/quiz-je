import { create } from 'zustand';

export type QuestionSelect = {
  title: string;
  option: {
    id: number;
    answer: string;
  };
};

type State = {
  questionsSelect: QuestionSelect[];
  addQuestion: (question: QuestionSelect) => void;
};

export const useQuestionsStore = create<State>((set) => ({
  questionsSelect: [],
  addQuestion: (question) =>
    set((state) => ({
      ...state,
      questionsSelect: [...state.questionsSelect, question],
    })),
}));
