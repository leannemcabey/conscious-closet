import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { NetworkOnly, Serwist } from "serwist";

// This declares the value of `injectionPoint` to TypeScript.
// `injectionPoint` is the string that will be replaced by the
// actual precache manifest. By default, this string is set to
// `"self.__SW_MANIFEST"`.
declare global {
    interface WorkerGlobalScope extends SerwistGlobalConfig {
        // Change this attribute's name to your `injectionPoint`.
        // `injectionPoint` is an InjectManifest option.
        // See https://serwist.pages.dev/docs/build/configuring
        __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
    }
}

declare const self: WorkerGlobalScope;

const serwist = new Serwist({
    precacheEntries: self.__SW_MANIFEST,
    skipWaiting: true,
    clientsClaim: true,
    navigationPreload: true,
    runtimeCaching: [
        {
            matcher: ({ url }) => !url.pathname.startsWith("/offline"),
            handler: new NetworkOnly(),
        },
    ],
    fallbacks: {
        entries: [
            {
                url: "/offline", // the page that'll display if user goes offline
                matcher({ request }) {
                    return request.destination === "document";
                },
            },
        ],
    },
});

const revision = crypto.randomUUID();

serwist.addToPrecacheList([
    { url: "/offline" , revision: revision },
    { url: "/pexels-liza-summer-closet.jpg" },
    { url: "/cry.svg" },
    { url: "/global.css", revision: revision },
    { url: "/tailwind.config.js", revision: revision }
])

serwist.addEventListeners();
