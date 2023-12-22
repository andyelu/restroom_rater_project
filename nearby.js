const apiKey = "AIzaSyDtB9nJjKODzGj_xbzec0IPZaZyKJdpcvw";

function initMap() {
  if (!apiKey) {
    console.error("Google Maps API Key not found in environment variables.");
    return;
  }

  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 18,
    center: { lat: 32.2319, lng: -110.951 },
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    keyboardShortcuts: false,
    maxZoom: 18,
    minZoom: 16,
    restriction: {
      latLngBounds: {
        north: 32.2419,
        south: 32.2219,
        east: -110.931,
        west: -110.971,
      },
      strictBounds: false,
    },
  });

  const infoWindow = new google.maps.InfoWindow();

  const getRestroomData = () => {
    return new Promise((resolve, reject) => {
      axios
        .get("https://restroomrater.org/api/v1/restroom")
        .then((response) => {
          const restroomObjects = response.data;

          let locations = [];

          for (const restroom of restroomObjects) {
            const thisRestroom = {
              address: restroom.location,
              title: restroom.name,
            };
            locations.push(thisRestroom);
          }
          resolve(locations);
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
          reject(err);
        });
    });
  };

  getRestroomData().then((locations) => {
    locations.forEach((location) => {
      const marker = new google.maps.Marker({
        position: location.address
          ? undefined
          : { lat: location.lat, lng: location.lng },
        map: map,
        icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
        title: location.title,
      });

      marker.addListener("click", () => {
        const contentString = `
          <div class="info-window">
            <h3 class="info-title">${location.title}</h3>
            <p class="info-address"> ${location.address}</p>
            <p class="info-directions"><a href="https://www.google.com/maps?q=${location.address}" target="_blank">Get Directions</a></p>
            <p class="read-reviews"><a href="review.html?id=${location.title}" target="_blank">Reviews</a></p>
          </div>
        `;

        infoWindow.setContent(contentString);
        infoWindow.open(map, marker);
      });

      if (location.address) {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: location.address }, (results, status) => {
          if (status === "OK" && results[0].geometry) {
            marker.setPosition(results[0].geometry.location);
          } else {
            console.error("Geocoding failed for address: " + location.address);
          }
        });
      }
    });
  });
}

if (typeof google === "undefined") {
  var script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
  script.async = true;
  script.defer = true;
  script.onload = function () {
    initMap();
  };
  document.head.appendChild(script);
}
