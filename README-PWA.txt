Void Runner-Mobile PWA Package
Files:
- void-runner-pwa.html  (the full-featured game wrapped as a PWA)
- manifest.json         (app manifest — display: standalone)
- service-worker.js     (caches files for offline use)
- icon-192.png, icon-512.png  (app icons)
- README-PWA.txt

How to use:
1. For best behaviour, serve the files via HTTP(S). Example: `python -m http.server 8000` then open http://localhost:8000/void-runner-pwa.html
2. On Android Chrome: open the page, then 'Add to Home screen'. It will install and launch fullscreen (standalone).
3. On iOS Safari: tap Share -> Add to Home Screen (service worker support is limited on iOS; offline caching may be partial).
Notes:
- Service workers require secure contexts (HTTPS) except on localhost. For full offline/installation experience, host the files on a simple static server.
- The start_url is set to ./void-runner-pwa.html so the app opens directly to the game.
