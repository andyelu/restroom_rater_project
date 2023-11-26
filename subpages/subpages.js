const apiKey = "_REMOVED";

function initMap() {
  if (!apiKey) {
    console.error("Google Maps API Key not found in environment variables.");
    return;
  }

  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 18,
    center: { lat: 32.2319, lng: -110.9527 },
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    keyboardShortcuts: false,
  });

  const locations = [
    // Bear Down Gym
    [32.231169477970646, -110.94999891821708],
    // Weaver Library
    [32.231081377660416, -110.95063880472296],
    // Old Main
    [32.23204407181208, -110.95336445581904],
  ];

  locations.forEach((location) => {
    const marker = new google.maps.Marker({
      position: { lat: location[0], lng: location[1] },
      map: map,
      icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
      title: "Red Marker",
    });
  });
}

// Ensure the Google Maps API script is loaded
if (typeof google === "undefined") {
  var script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
  script.async = true;
  script.defer = true;
  script.onload = function () {
    // Initialize the map
    console.log("working");
    initMap();
  };
  document.head.appendChild(script);
} else {
  console.log("ERROR!");
}
