import {
  component$,
  useMount$,
  useStore,
  useStylesScoped$,
} from '@builder.io/qwik';

import { DocumentHead, Link, useLocation } from '@builder.io/qwik-city';

import styles from './index.css?inline';

export default component$(() => {
  useStylesScoped$(styles);

  const location = useLocation();

  const store = useStore({
    data: {
      character: {
        id: 0,
        origin: { url: '', name: '' },
        location: { name: '' },
        episode: [''],
        image: '',
        name: '',
        species: '',
        gender: '',
        status: '',
        type: '',
      },
      episodes: [
        {
          id: '',
          name: '',
          air_date: '',
          episode: '',
          characters: [''],
          url: '',
          created: '',
        },
      ],
      origin: { dimension: '', name: '' },
    },
    isLoading: true,
  });

  useMount$(async () => {
    store.isLoading = true;
    const epsArray: string[] = [];
    const api = await fetch(
      `https://rickandmortyapi.com/api/character/${location.params.id}`
    );
    store.data.character = await api.json();
    const character = store.data.character;

    if (character.origin.url) {
      const originApi = await fetch(`${character?.origin?.url}`);
      store.data.origin = await originApi.json();
    }

    for (let index = 0; index < character.episode.length; index++) {
      epsArray.push(character.episode[index].split('/').slice(-1)[0]);
    }
    const epApi = await fetch(
      `https://rickandmortyapi.com/api/episode/${epsArray}`
    );

    // Episode API returns object if there is only one episode, and array if multiple episodes
    const eps = await epApi.json();
    if (eps.length > 1) {
      store.data.episodes = eps;
    } else {
      store.data.episodes = [eps];
    }
    store.isLoading = false;
  });

  if (store.isLoading) return null;

  return (
    <>
      <Link className="single-char" href={'/characters'}>
        Go Back
      </Link>
      <div className="character-card">
        <div>
          <img src={store.data.character?.image} alt="profile" />
        </div>
        <div className="character-card-text">
          <p>Name: {store.data.character?.name}</p>
          <p>Species: {store.data.character?.species}</p>
          <p>Gender: {store.data.character?.gender}</p>
          <p>Status: {store.data.character?.status}</p>
          <p>Type: {store.data.character?.type}</p>
          <p>Location: {store.data.character?.location?.name || 'Unknown'}</p>
          <p>Origin: {store.data.character?.origin?.name || 'Unknown'}</p>
          <p>Episodes: {store.data.character?.episode?.length}</p>
          <p>Dimension: {store.data.origin?.dimension || 'Unknown'}</p>
        </div>
      </div>
      <div className="episode-links">
        {store.data.episodes?.map((ep, i: number) => (
          <Link href={`/episode/${ep.id}`}>
            <span className="span">
              {i + 1}. {ep.name}
            </span>
          </Link>
        ))}
      </div>
    </>
  );
});

export const head: DocumentHead<any> = () => {
  return {
    title: `Qwik - `,
  };
};
