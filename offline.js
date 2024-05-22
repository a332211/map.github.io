// make sure service workers are supported
//this code registers service workers 
if ('serviceWorker' in navigator){
    window.addEventListener('load',()=> {
        navigator.serviceWorker.register('./sw_cache.js')
        .then(reg => console.log("serviceworker is registered"))
        .catch( err => console.log(`serviceworker: Error: ${err}`));
    })
}
