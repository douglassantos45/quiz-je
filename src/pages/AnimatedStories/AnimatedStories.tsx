import { useEffect } from 'react';
import { Header } from '../../components/Header';
import { useStories } from '../../hooks/StoriesHook';
import { StoryCard } from './StoryCard';

export const AnimatedStories = () => {
  const { getStories, stories } = useStories();

  useEffect(() => {
    getStories();
  }, []);

  return (
    <>
      <Header navigateTo="/" />
      <main className="flex flex-wrap items-center justify-center gap-10 px-8 w-full md:px-0 mt-44 pt-8 pb-10 overflow-y-auto overflow-x-hidden">
        {!!stories.length ? (
          stories.map((story) => (
            <div key={story.id}>
              <StoryCard
                id={story.id}
                title={story.title}
                viewer={story.views}
              />
            </div>
          ))
        ) : (
          <p className="text-gray-500">Nenhuma história cadastrada</p>
        )}
      </main>
    </>
  );
};
