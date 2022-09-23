import { component$ } from "@builder.io/qwik";
import { DocumentHead, useLocation } from "@builder.io/qwik-city";

export default component$(() => {
    const location = useLocation();
    const id = location.params.id;
    return (
        <>
            <div>This is ID: {id}</div>
        </>
    );
});

export const head: DocumentHead = {
    title: "Qwik Dynamic Route",
};
