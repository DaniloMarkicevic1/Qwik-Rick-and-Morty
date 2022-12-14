import {
  component$,
  mutable,
  useMount$,
  useStore,
  useStylesScoped$,
} from '@builder.io/qwik';

import { DocumentHead, Link } from '@builder.io/qwik-city';
import { CharCard } from '~/components/card/CharCard';

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
          status: '',
          species: '',
          type: '',
          gender: '',
          origin: { name: '', url: '' },
          location: { name: '', url: '' },
          image: '',
          episode: [''],
          url: '',
          created: '',
        },
      ],
    },
  });

  useMount$(async () => {
    const response = await fetch(`https://rickandmortyapi.com/api/character`);
    store.data = await response.json();
  });

  if (store.data?.results?.length === 0) return null;

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
        {store.data?.results?.map((char) => {
          return <CharCard char={char} />;
        })}
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Qwik - Rick And Morty',
};
