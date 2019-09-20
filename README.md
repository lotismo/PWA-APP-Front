# Challenge

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.0.

This is a PWA application, the purpuse of this app is to be able to modify your account offline. 
How it works: I used a service worker that sores every user interaction. the application returns a response from the back-end when there is a connection and stores that same response in the cache. when the front-end tries to send a request to the back-end but no connection is established the service worker feeds a stored response to the user so it seems like its online. 

The tricky part is that service workers only support the chaching of GET requests, so we can't use them for PUT,POST nor DELETE, well there are other ways(dark arts :p ) so i had to dig deeper :). I stored the PUT request in the local Storage( you can use indexedDb or LocoForage) and i waited for the pae to refresh to send it again and again till the connection to the back-end is restored.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


To see the Service Worker in action you need to run a production server first you need to build with `ng build --prod`. 
And start the app with `http-server -p 8081 dist/challenge`, here we lunch na http server on port 8081 because thats the port we are autorizing in our backend. and go see the magic happen at http://localhost:8081/index.html,  you need to load the link a couple of times to let the service worker do its work(store the cache ...).
