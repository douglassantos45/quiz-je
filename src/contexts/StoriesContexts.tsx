import { ReactNode, createContext, useState } from 'react';
import { pb } from '../services/pocketbase';
import { getLocalStorage, saveLocalStorage } from '../utils/local-storage';

type StoryProps = {
  id: string;
  title: string;
  story: string;
  views: number;
};

type StoriesContextProps = {
  stories: StoryProps[];
  getStories(): void;
};

type StoriesProviderProps = {
  children: ReactNode;
};

export const StoriesContext = createContext<StoriesContextProps>(
  {} as StoriesContextProps,
);

export const StoriesProvider = ({ children }: StoriesProviderProps) => {
  const [stories, setStories] = useState<StoryProps[]>(
    getLocalStorage('@quiz-js:stories') ?? [],
  );

  const getStories = async () => {
    try {
      const record = await pb.collection('stories').getFullList();
      saveLocalStorage('@quiz-js:stories', record);
      setStories(record as any);
    } catch (err: any) {
      console.error(err.message);
      throw err;
    }
  };

  return (
    <StoriesContext.Provider value={{ stories, getStories }}>
      {children}
    </StoriesContext.Provider>
  );
};
