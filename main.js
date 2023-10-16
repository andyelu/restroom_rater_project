require("dotenv").config();

const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

function initMap() {
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 20,
    center: { lat: 32.2319, lng: -110.9527 },
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    keyboardShortcuts: false,
  });
}


function openReviewsPage() {
  window.location.href = "subpages/reviews.html";
}

function openNearbyPage() {
  window.location.href = "subpages/nearby.html";
}
