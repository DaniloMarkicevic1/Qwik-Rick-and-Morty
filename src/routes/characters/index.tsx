import { component$, Resource, useStylesScoped$ } from "@builder.io/qwik";
import { DocumentHead, useEndpoint, useNavigate } from "@builder.io/qwik-city";
import type { RequestHandler } from "@builder.io/qwik-city";

import styles from "./index.css?inline";

export const onGet: RequestHandler = async () => {
    const api = await fetch("https://rickandmortyapi.com/api/character?page=1");
    const data = await api.json();
    return {
        data,
    };
};

export default component$(() => {
    useStylesScoped$(styles);
    const productData = useEndpoint();
    const navigate = useNavigate();
    return (
        <div className="cards">
            <Resource
                value={productData}
                onPending={() => <p>Div Loading</p>}
                onRejected={() => <p>Div Error</p>}
                onResolved={(data: any) => {
                    const characters = data?.data?.results;
                    return (
                        <>
                            {characters?.map((char: any) => {
                                return (
                                    <div
                                        className="character-card"
                                        onClick$={() =>
                                            (navigate.path = `/character/${char.id}`)
                                        }
                                    >
                                        <img
                                            width={150}
                                            height={150}
                                            src={char.image}
                                            alt="null"
                                        />
                                        <p>Name: {char.name}</p>
                                        <p>Species: {char.species}</p>
                                        <p>Gender: {char.gender}</p>
                                        <p>Episodes: {char.episode.length}</p>
                                    </div>
                                );
                            })}
                        </>
                    );
                }}
            />
        </div>
    );
});

export const head: DocumentHead = {
    title: "Qwick - Rick And Morty",
};
