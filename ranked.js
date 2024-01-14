let ascending = false;

const getRestrooms = () => {
  return axios.get("https://restroomrater.org/api/v1/restroom");
};

const getRating = (name) => {
  return axios.get(`https://restroomrater.org/api/v1/reviews/rating/${name}`);
};

const getTotalRatings = (name) => {
  return axios
    .get(`https://restroomrater.org/api/v1/reviews/${name}`)
    .then((response) => {
      const jsonData = response.data;
      const length = jsonData.length;
      return length;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      return 0;
    });
};

const quicksort = (arr) => {
  if (arr.length <= 1) {
    return arr;
  }

  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter((elem) => elem.rating > pivot.rating);
  const middle = arr.filter((elem) => elem.rating === pivot.rating);
  const right = arr.filter((elem) => elem.rating < pivot.rating);

  return [...quicksort(left), ...middle, ...quicksort(right)];
};

let sortedRestrooms = [];

const sortByRatings = async () => {
  try {
    const response = await getRestrooms();
    const restroomData = response.data;

    for (const restroom of restroomData) {
      const rating = await getRating(restroom.name);
      const formattedRating = parseFloat(rating.data.toFixed(1));

      sortedRestrooms.push({ restroom: restroom, rating: formattedRating });
    }
    sortedRestrooms = quicksort(sortedRestrooms);
    displayRankedRestrooms();
    return sortedRestrooms;
  } catch (error) {
    console.error("Error:", error);
  }
};

const toggleBtn = document.getElementById("toggleBtn");
const toggleIcon = document.getElementById("toggleIcon");

toggleBtn.onclick = async () => {
  try {
    if (ascending) {
      ascending = false;
      toggleIcon.src = "./icons/up.png";
    } else {
      ascending = true;
      toggleIcon.src = "./icons/down.png";
    }

    sortedRestrooms.reverse();
    displayRankedRestrooms();
  } catch (error) {
    console.error("Error:", error);
  }
};

const reviewCardsContainer = document.querySelector("[data-restroom-cards-container]");
const reviewTemplate = document.querySelector("[data-restroom-template]");

const displayRankedRestrooms = async () => {
  const restroomsContainer = document.querySelector("[data-restroom-cards-container]");

  while (restroomsContainer.firstChild) {
    restroomsContainer.removeChild(restroomsContainer.firstChild);
  }

  for (const restroomData of sortedRestrooms) {
    const restroom = restroomData.restroom;
    const rating = restroomData.rating;
    const totalReviews = await getTotalRatings(restroom.name);

    const card = document.createElement("div");
    card.classList.add("restroom-card");

    const nameElement = document.createElement("h2");
    nameElement.textContent = restroom.name;
    nameElement.classList.add("name");

    const ratingElement = document.createElement("p");
    ratingElement.textContent = `${rating}`;
    ratingElement.classList.add("rating");

    const totalElement = document.createElement("p");
    totalElement.textContent = `Total Reviews: ${totalReviews}`;
    totalElement.classList.add("total-reviews");

    card.appendChild(nameElement);

    if (rating == 0) {
      ratingElement.classList.add("no-rating");
    } else if (rating > 0 && rating <= 2) {
      ratingElement.classList.add("low-rating");
    } else if (rating > 2 && rating <= 3) {
      ratingElement.classList.add("medium-rating");
    } else {
      ratingElement.classList.add("high-rating");
    }

    card.appendChild(ratingElement);
    card.appendChild(totalElement);

    if (rating != 0) {
      restroomsContainer.appendChild(card);
    }
  }
};

(async () => {
  await sortByRatings();
  console.log("Sorted Restrooms:", sortedRestrooms);
})();
