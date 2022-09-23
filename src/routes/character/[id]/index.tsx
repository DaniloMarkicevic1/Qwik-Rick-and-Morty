import { component$, Resource } from "@builder.io/qwik";
import {
    DocumentHead,
    RequestHandler,
    useEndpoint,
} from "@builder.io/qwik-city";

export const onGet: RequestHandler = async ({ params }) => {
    const epsArray = [];
    const api = await fetch(
        `https://rickandmortyapi.com/api/character/${params.id}`
    );
    const data = await api.json();
    let origin = "";
    if (data.origin.url) {
        const originApi = await fetch(`${data?.origin?.url}`);
        origin = await originApi.json();
    }

    for (let index = 0; index < data.episode.length; index++) {
        const res: any = await fetch(data.episode[index]);
        const epData: any = await res.json();
        epsArray.push(epData);
    }

    return {
        data,
        origin,
        epsArray,
    };
};

export default component$(() => {
    const data = useEndpoint();
    return (
        <Resource
            value={data}
            onPending={() => <p>Div Loading</p>}
            onRejected={() => <p>Div Error</p>}
            onResolved={(data: any) => {
                const character = data.data;
                const origin = data.origin;
                const eps = data.epsArray;
                return (
                    <div>
                        <img src={character.image} alt="profile" />
                        <p>Name: {character.name}</p>
                        <p>Species: {character.species}</p>
                        <p>Gender: {character.gender}</p>
                        <p>Status: {character.status}</p>
                        <p>Type: {character.type}</p>
                        <p>Location: {character.location?.name || "Unknown"}</p>
                        <p>Origin: {character.origin?.name || "Unknown"}</p>
                        <p>Episodes: {character.episode?.length}</p>
                        <p>Dimension: {origin?.dimension || "Unknown"}</p>
                        <div>
                            {eps.map((ep: any) => (
                                <p>{ep.name}</p>
                            ))}
                        </div>
                    </div>
                );
            }}
        />
    );
});

export const head: DocumentHead<any> = ({ data }) => {
    return {
        title: `Qwik - ` + data.data.name,
    };
};
