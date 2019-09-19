

console.log('sw is working');


self.addEventListener('install', function (event) {
  console.log('caching ....');
  // event.waitUntil(
  //   caches.open('mysite-static-v3')
  //     .then(function (cache) {
  //       // console.log('caching successful');
  //       return cache.addAll([
  //         "/favicon.ico",
  //         "/index.html",
  //         "/manifest.webmanifest",
  //         "/*.css",
  //         "/*.js"
  //       ]);
  //     })
  //     .catch(function (error) {
  //       console.log("Error caching");
  //     })
  // );
});



function store() {
  var newPost = ""; // Inputted values
  // Iterate through the inputs
  $("input").each(function () {
    newPost += $(this).val() + ",";
  });
  // Get rid of the last comma
  newPost = newPost.substr(0, newPost.length - 1);
  // Store the data
  localStorage.setItem('newPut', newPost);
}

// function that's called whenever the html is refreshed
// function refresh() {

// }


self.addEventListener('fetch', function (event) {
  var req = event.request;
  if (req.clone().method == "PUT" || req.clone().method == "DELETE") {
    console.log('its a put|delete request : ');

    // fetch(req).catch(() => {
    //   // somthing here 
    // })

  }
  else {
    event.respondWith(
      caches.open('mysite-dynamic')
        .then(function (cache) {
          return cache.match(event.request).then(function (response) {
            return fetch(event.request)
              .then(function (response) {
                cache.put(event.request, response.clone());
                console.log('caching response and request');
                return response;
              })
              .catch(function (error) {
                return response;
              });
          });
        })
        .catch(function (error) {
          console.log("no cache called mysite-dynamic");
        })
    );


    // event.respondWith(
    //   caches.open('mysite-dynamic')
    //     .then(function (cache) {
    //       return cache.match(event.request).then(function (response) {
    //         return response || fetch(event.request)
    //           .then(function (response) {
    //             cache.put(event.request, response.clone());
    //             console.log('caching response and request');
    //             return response;
    //           })
    //           .catch(function (error) {
    //             console.log("Error getting request");
    //           });
    //       });
    //     })
    //     .catch(function (error) {
    //       console.log("no cache called mysite-dynamic");
    //     })
    // );
  }


});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.filter(function (cacheName) {
          // Return true if you want to remove this cache,
          // but remember that caches are shared across
          // the whole origin
        }).map(function (cacheName) {
          console.log('deleting cache');
          return caches.delete(cacheName);
        })
      );
    })
  );
});
