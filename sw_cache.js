//the name of the cache
const cacheName = 'Map';
//a call install event (to see if its working)
self.addEventListener('install', e => {
    console.log('Service worker is Installed');
});

//service worker activation proccess
self.addEventListener('activate', e => {
    console.log('Service worker is Activated');
    //cleaning up old caches
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if(cache !== cacheName){
                        console.log('Service worker: clearing old cache');
                        return caches.delete(cache);
                    }
                })
            )
        })
    ); 
}); 

/*fetch event which either fetches the file from the network 
(caching response of the clone) or responds with already cache version (if available)*/
self.addEventListener('fetch', e=>{
    console.log('Service worker is fetching');
    e.respondWith(
        fetch(e.request)
        .then(res =>{
            const resclone   = res.clone();
            caches.open(cacheName)
            .then(cache => {
                //adds a response to cache
                cache.put(e.request, resclone);
            });
            return res;
        }).catch(err => caches.match(e.request)).then(res => res )
    );
})
