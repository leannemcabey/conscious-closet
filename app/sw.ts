import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { NetworkOnly, Serwist } from "serwist";

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
            matcher: ({ url }) => url.pathname.startsWith("/"),
            handler: new NetworkOnly(),
        },
    ],
    fallbacks: {
        entries: [
            {
                url: "/offline",
                matcher({ request }) {
                    return request.destination === "document";
                },
            },
        ],
    },
});

// In order for these to cache successfully, they need the revision property, and it can't come from that const i made seemingly
const revision = crypto.randomUUID();

serwist.addToPrecacheList([
    { url: "/offline" , revision: revision },
    { url: "/pexels-liza-summer-closet.jpg" },
    { url: "/cry.svg" },
    { url: "/global.css", revision: revision },
    { url: "/tailwind.config.js", revision: revision }
])

serwist.addEventListeners();