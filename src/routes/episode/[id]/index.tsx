import {
  component$,
  useMount$,
  useStore,
  useStylesScoped$,
} from '@builder.io/qwik';

import { DocumentHead, Link, useLocation } from '@builder.io/qwik-city';
import { CharCard } from '~/components/card/CharCard';

import styles from './index.css?inline';

export default component$(() => {
  useStylesScoped$(styles);

  const {
    params: { id },
  } = useLocation();

  const store = useStore({
    data: {
      episode: {
        id: 0,
        name: '',
        air_date: '',
        episode: '',
        characters: [''],
        url: '',
        created: '',
      },
      characters: [
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
    isLoading: true,
  });

  useMount$(async () => {
    store.isLoading = true;
    const charactersArray: string[] = [];
    const api = await fetch(`https://rickandmortyapi.com/api/episode/${id}`);
    store.data.episode = await api.json();
    const episode = store.data.episode;

    console.log(store.data.episode);
    for (let index = 0; index < episode.characters.length; index++) {
      charactersArray.push(episode.characters[index].split('/').slice(-1)[0]);
    }

    if (charactersArray.length > 0) {
      const charactersApi = await fetch(
        `https://rickandmortyapi.com/api/character/${charactersArray}`
      );
      const characters = await charactersApi.json();
      if (characters.length > 1) {
        store.data.characters = characters;
      } else {
        store.data.characters = [characters];
      }
    } else {
      store.data.characters = [];
    }

    // Episode API returns object if there is only one episode, and array if multiple episodes
    store.isLoading = false;
  });

  if (store.isLoading) return null;

  return (
    <>
      <Link className="single-char" href={'/locations'}>
        Go Back
      </Link>
      <div className="location-card">
        <div className="location-card-text">
          <p>Name: {store.data.episode.name}</p>
          <p>Date Aired: {store.data.episode.air_date}</p>
          <p>Episode: {store.data.episode.episode}</p>
        </div>
      </div>
      <p style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold' }}>
        Residents:{' '}
      </p>
      <div className="characters">
        {store.data.characters.length > 0
          ? store.data.characters?.map((character) => (
              <>
                <CharCard char={character} />
              </>
            ))
          : 'No Residents'}
      </div>
    </>
  );
});

export const head: DocumentHead<any> = () => {
  return {
    title: `Qwik - `,
  };
};
