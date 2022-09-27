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
          id: '',
          name: '',
          type: '',
          dimension: '',
          residents: [''],
          url: '',
          created: '',
        },
      ],
    },
  });

  useMount$(async () => {
    const response = await fetch(`https://rickandmortyapi.com/api/location`);
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
        {store.data.results.map((location) => {
          return (
            <Link href={mutable(`/location/${location.id}`)}>
              <div className="card-inner">
                <p>Episode: {location.id}</p>
                <p>Name: {location.name}</p>
                <p>Type: {location.type}</p>
                <p>Dimension: {location.dimension}</p>
                <p>No. Of Residents: {location.residents.length}</p>
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
