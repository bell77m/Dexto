import { component$ } from '@builder.io/qwik';
import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from '@builder.io/qwik-city';

import './global.css';

export default component$(() => {
    return (
        <QwikCityProvider>
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Qwik Code Editor</title>
                <link rel="manifest" href="/manifest.json" />
            </head>
            <body lang="en">
            <RouterOutlet />
            <ServiceWorkerRegister />
            </body>
        </QwikCityProvider>
    );
});