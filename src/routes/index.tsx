import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { DocumentHead, Link } from '@builder.io/qwik-city';

import styles from './index.css?inline';

export default component$(() => {
  useStylesScoped$(styles);
  return (
    <div className="links-div">
      <Link href={`/characters`}>Characters</Link>
      <Link href={`/locations`}>Locations</Link>
      <Link href={`/episodes`}>Episodes</Link>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Qwick - Rick And Morty',
};
