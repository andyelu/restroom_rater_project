const apiKey = "--Insert API Key Here--";

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

  const infoWindow = new google.maps.InfoWindow();

  const getRestroomData = () => {
    return new Promise((resolve, reject) => {
      axios
        .get("http://54.193.72.63:8080/api/v1/restroom")
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
        icon: "/icons/pin.png",
        title: location.title,
      });

      marker.addListener("click", () => {
        const contentString = `
          <div class="info-window">
            <h3 class="info-title">${location.title}</h3>
            <p class="info-address"> ${location.address}</p>
            <p class="info-directions"><a href="https://www.google.com/maps?q=${location.address}" target="_blank">Get Directions</a></p>
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