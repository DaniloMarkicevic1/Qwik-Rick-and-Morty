import {
  component$,
  mutable,
  useMount$,
  useStore,
  useStylesScoped$,
} from '@builder.io/qwik';

import { DocumentHead, Link } from '@builder.io/qwik-city';

import styles from './index.css?inline';

export default component$(() => {
  useStylesScoped$(styles);

  const store = useStore({
    data: {
      info: {
        count: 0,
        pages: 0,
        next: '' || null,
        prev: '' || null,
      },
      results: [
        {
          id: 0,
          name: '',
          air_date: '',
          episode: '',
          url: '',
          characters: [''],
          created: '',
        },
      ],
    },
  });

  useMount$(async () => {
    const response = await fetch(`https://rickandmortyapi.com/api/episode`);
    store.data = await response.json();
  });
  if (store.data.results.length === 0) return null;
  return (
    <>
      <Link
        href="/"
        style={mutable({
          background: '#333',
          color: 'white',
          borderRadius: '8px',
          padding: '2px 4px',
        })}
      >
        {'<'} Go Back
      </Link>
      <div className="cards">
        {store.data.results.map((episode) => {
          return (
            <Link href={mutable(`/episode/${episode.id}`)}>
              <div className="card-inner">
                <p>Episode: {episode.id}</p>
                <p>Name: {episode.name}</p>
                <p>Air Date: {episode.air_date}</p>
                <p>Characters Appearing: {episode.characters.length}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Qwik - Rick And Morty',
};
