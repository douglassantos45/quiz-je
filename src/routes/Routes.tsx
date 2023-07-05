import { Route, Routes as ReactRoutes } from 'react-router-dom';
import { AnimatedStories } from '../pages/AnimatedStories';
import { Story } from '../pages/AnimatedStories/Story';
import { Forum } from '../pages/AnimatedStories/Forum';
import { Quiz } from '../pages/Quiz';
import { QuizProvider } from '../contexts/QuizContexts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { App } from '../App';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const Routes = () => {
  return (
    <ReactRoutes>
      <Route path="/" element={<App />} />
      <Route
        path="/quiz"
        element={
          <QueryClientProvider client={queryClient}>
            <QuizProvider>
              <Quiz />
            </QuizProvider>
          </QueryClientProvider>
        }
      />
      <Route path="animated-stories" element={<AnimatedStories />} />
      <Route path="story/:id" element={<Story />} />
      <Route path="story/forum/:id" element={<Forum />} />
    </ReactRoutes>
  );
};
