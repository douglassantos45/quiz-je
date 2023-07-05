import { useContext } from 'react';
import { StoriesContext } from '../contexts/StoriesContexts';

export const useStories = () => {
  const context = useContext(StoriesContext);
  return context;
};
