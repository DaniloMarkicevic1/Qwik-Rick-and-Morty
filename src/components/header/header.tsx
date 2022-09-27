import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './header.css?inline';

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <header className="header">
      <p>Rick And Morty Api</p>
    </header>
  );
});
