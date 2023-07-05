import { BrowserRouter } from 'react-router-dom';
import { AnimatedStories } from '../pages/AnimatedStories';
import { Routes } from './Routes';
import { Header } from '../components/Header';
import { StoriesProvider } from '../contexts/StoriesContexts';

export const Route = () => {
  return (
    <BrowserRouter>
      <StoriesProvider>
        <Routes />
      </StoriesProvider>
    </BrowserRouter>
  );
};
