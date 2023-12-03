const restroomCardTemplate = document.querySelector("[data-restroom-template]");
const restroomCardContainer = document.querySelector(
  "[data-restroom-cards-container]"
);
const searchInput = document.querySelector("[data-search]");

let restrooms = [];

searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  restrooms.forEach((restroom) => {
    const isVisible =
      restroom.name.toLowerCase().includes(value) ||
      restroom.location.toLowerCase().includes(value);
    restroom.element.classList.toggle("hide", !isVisible);
  });
});

const getData = () => {
  axios
    .get("http://54.193.72.63:8080/api/v1/restroom")
    .then((response) => {
      const jsonData = response.data;
      restrooms = jsonData.map((restroom) => {
        const card = restroomCardTemplate.content.cloneNode(true).children[0];
        const header = card.querySelector("[data-header]");
        const body = card.querySelector("[data-body]");
        header.textContent = restroom.name;
        body.textContent = restroom.location;
        restroomCardContainer.append(card);
        return {
          name: restroom.name,
          location: restroom.location,
          element: card,
        };
      });
    })
    .catch((err) => {
      console.error("Error fetching data:", err);
    });
};

getData();
