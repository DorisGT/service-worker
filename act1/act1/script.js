let registration = null;

function register_service_worker() {
    if ('serviceWorker' in navigator) {
        window.navigator.serviceWorker.register('./sw.js', { scope: './' })
            .then(res => {
                // var console: Console;   ← comentada o eliminada
                console.log("Service Worker successfully registered.");
            })
            .catch(err => {
                console.log("Could not register service worker.");
            });
    }
}

function unregister_service_worker() {
    navigator.serviceWorker.getRegistrations()
        .then(registrations => {
            registrations.forEach(registration => {
                registration.unregister();
                console.log("Service Worker unregistered.");
            })
        })
        .catch(err => {
            console.log("Could not unregister service worker.");
        });
}

register_service_worker();