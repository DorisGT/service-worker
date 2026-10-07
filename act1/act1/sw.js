self.addEventListener('install', event => {
    self.skipWaiting();
    event.waitUntil(
        caches.open('v3')
            .then(cache => {
                cache.addAll([
                    './',
                    './script.js',
                    './obj.jpg'
                ]);
                console.log("Assets cached.");
            })
            .catch(err => console.log("Could not cache."))
    );
});

self.addEventListener('fetch', event => {
    console.log("INTERCEPTED");

    event.respondWith(
        caches.match(event.request)
            .then(response => {
                console.log("V3 The request: ", event.request);
                console.log("V3 Got the response...", response);

                // from cache or fetched if not
                return response || fetch(event.request);

                // target specific request object and respond with different data but same type
                // if (event.request.url === 'http://127.0.0.1:5500/obj.jpg') {
                //     return fetch('https://picsum.photos/800');
                // } else {
                //     return response;
                // }

                // target specific request object and respond with different data but same type; save response to cache
                // if (event.request.url === 'http://127.0.0.1:5500/obj.jpg') {
                //     return fetch('https://picsum.photos/800')
                //         .then(res => {
                //             return caches.open('v3').then(cache => {
                //                 cache.put(event.request, res.clone());
                //                 return res;
                //             });
                //         });
                // } else {
                //     return response;
                // }
            })
            .catch(err => {
                console.log("Could not find matching request.");
                return null;
            })
    );
});