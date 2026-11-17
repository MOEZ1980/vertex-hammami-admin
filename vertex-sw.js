
self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("push", (event) => {
  let data = {};

  try {
    data = event.data ? event.data.json() : {};
  } catch (error) {
    data = {
      body: event.data ? event.data.text() : ""
    };
  }

  const title = data.title || "VERTEX HAMMAMI";
  const appUrl = new URL("./admin-mobile-v2.html", self.registration.scope).href;

  const options = {
    body: data.body || "Nuova prenotazione ricevuta!",
    icon: new URL("./logo.jpg", self.registration.scope).href,
    badge: new URL("./logo.jpg", self.registration.scope).href,
    tag: data.tag || "vertex-booking",
    renotify: true,
    data: {
      url: data.url || appUrl
    }
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const url = new URL(
    event.notification.data?.url || new URL("./admin-mobile-v2.html", self.registration.scope).href,
    self.registration.scope
  ).href;

  event.waitUntil(
    self.clients.openWindow(url)
  );
});
