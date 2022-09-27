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
      residents: [
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
      location: {
        id: 0,
        name: '',
        type: '',
        dimension: '',
        residents: [''],
        url: '',
        created: '',
      },
    },
    isLoading: true,
  });

  useMount$(async () => {
    store.isLoading = true;
    const residentArray: string[] = [];
    const api = await fetch(`https://rickandmortyapi.com/api/location/${id}`);
    store.data.location = await api.json();
    const location = store.data.location;

    for (let index = 0; index < location.residents.length; index++) {
      residentArray.push(location.residents[index].split('/').slice(-1)[0]);
    }

    if (residentArray.length > 0) {
      const residentsApi = await fetch(
        `https://rickandmortyapi.com/api/character/${residentArray}`
      );
      const residents = await residentsApi.json();
      if (residents.length > 1) {
        store.data.residents = residents;
      } else {
        store.data.residents = [residents];
      }
    } else {
      store.data.residents = [];
    }

    // Episode API returns object if there is only one episode, and array if multiple episodes
    store.isLoading = false;
  });

  if (store.isLoading) return null;

  console.log(store.data);
  return (
    <>
      <Link className="single-char" href={'/locations'}>
        Go Back
      </Link>
      <div className="location-card">
        <div className="location-card-text">
          <p>Name: {store.data.location.name}</p>
          <p>Dimension: {store.data.location.dimension}</p>
          <p>Type: {store.data.location.type}</p>
        </div>
      </div>
      <p style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold' }}>
        Residents:{' '}
      </p>
      <div className="residents">
        {store.data.residents.length > 0
          ? store.data.residents?.map((resident) => (
              <>
                {console.log(resident)}
                <CharCard char={resident} />
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
