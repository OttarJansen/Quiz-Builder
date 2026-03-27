const CACHE_NAME = "quiz-app-v36";
const urlsToCache = [
    "/",
    "/index.html",
    "/app.mjs",
    "/manifest.json",
    "/viewLoader.mjs",
    "/fetchManager.mjs",
    "/http.mjs",
    "/controllers/registerController.mjs",
    "/views/registerView.html",
    "/i18nClient.mjs",
    "/views/loginView.html",
    "/controllers/loginController.mjs",
    "/controllers/profileController.mjs",
    "/views/profileView.html",

    "/localization/en.json",
    "/localization/nb.json",
    "/localization/no.json",

    "/images/icon-192.png",
    "/images/icon-512.png"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((names) =>
            Promise.all(
                names.map((name) => {
                    if (name !== CACHE_NAME) {
                        return caches.delete(name);
                    }
                })
            )
        )
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});