import { component$, mutable, useStylesScoped$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { CharType } from '~/models/char-type';

import styles from './character-card.css?inline';

export const CharCard = component$(({ char }: { char: CharType }) => {
  useStylesScoped$(styles);

  return (
    <div className="character-card">
      <Link href={mutable(`/character/${char.id}`)}>
        <img src={char.image} alt="null" />
        <p>Name: {char.name}</p>
        <p>Species: {char.species}</p>
        <p>Gender: {char.gender}</p>
        <p>Episodes: {char?.episode?.length}</p>
      </Link>
    </div>
  );
});
