const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

function initMap() {
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: { lat: 32.2319, lng: -110.9527 },
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    keyboardShortcuts: false,
  });
}
