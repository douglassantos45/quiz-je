import { Link, useParams } from 'react-router-dom';

import { useStories } from '../../hooks/StoriesHook';
import { Header } from '../../components/Header';
import { StoryCard } from './StoryCard';

import './story.css';
import { useEffect } from 'react';
import { getLocalStorage, saveLocalStorage } from '../../utils/local-storage';
import { pb } from '../../services/pocketbase';

export const Story = () => {
  const param = useParams();
  const { stories } = useStories();

  const [story] = stories.filter((story) => story.id === param?.id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [param.id]);

  useEffect(() => {
    const fetchIpAddress = async () => {
      if (!param?.id) return;
      try {
        const response = await fetch('https://api.ipify.org/?format=json');
        const data = await response.json();
        const { views } = await pb.collection('stories').getOne(param.id, {
          fields: 'views',
        });
        const ip = getLocalStorage(`@quiz-je:ip-${story?.id}`);
        if (!ip)
          await pb.collection('stories').update(param.id, { views: views + 1 });
        saveLocalStorage(`@quiz-je:ip-${story?.id}`, data.ip);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchIpAddress();
  }, []);

  return (
    <>
      <Header title={story.title} />
      <main className="flex flex-col items-center gap-8 max-w-5xl m-auto w-full px-8 pb-10 overflow-y-auto overflow-x-hidden mt-44">
        <article>
          <div
            className="flex flex-col gap-8 text-gray-800 text-justify text-2xl leading-relaxed"
            dangerouslySetInnerHTML={{ __html: story.story }}
          />
          <div className="flex w-full justify-center mt-12">
            <Link
              to={`/story/forum/${param?.id}`}
              className="bg-purple-700 hover:bg-purple-600 text-gray-50 font-medium py-4 px-6 rounded-lg duration-300"
            >
              Bate pato sobre a história
            </Link>
          </div>
        </article>
        <footer className="w-full mt-10">
          <div className="flex flex-col md:flex-row justify-center flex-wrap gap-5 md:max-w-5xl md:m-auto w-full md:px-0 pt-2 pb-10 overflow-hidden">
            {stories.map((story, key) => {
              if (key < 3 && story.id !== param?.id)
                return (
                  <div key={story.id}>
                    <StoryCard
                      id={story.id}
                      title={story.title}
                      viewer={story.views}
                    />
                  </div>
                );
            })}
          </div>
        </footer>
      </main>
    </>
  );
};
