let ascending = false;

const getRestrooms = () => {
  return axios.get("https://restroomrater.org/api/v1/restroom");
};

const getRating = (name) => {
  return axios.get(`https://restroomrater.org/api/v1/reviews/rating/${name}`);
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
//as
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
    console.log(sortedRestrooms);
  } catch (error) {
    console.error("Error:", error);
  }
}; //d

const reviewCardsContainer = document.querySelector("[data-restroom-cards-container]");
const reviewTemplate = document.querySelector("[data-restroom-template]");

const displayRankedRestrooms = () => {
  const restroomsContainer = document.querySelector("[data-restroom-cards-container]");

  while (restroomsContainer.firstChild) {
    restroomsContainer.removeChild(restroomsContainer.firstChild);
  }

  const highestRatedRestroom = sortedRestrooms[0];
  console.log(highestRatedRestroom);

  sortedRestrooms.forEach((restroomData) => {
    const restroom = restroomData.restroom;
    const rating = restroomData.rating;

    const card = document.createElement("div");
    card.classList.add("restroom-card");

    const nameElement = document.createElement("h2");
    nameElement.textContent = restroom.name;

    const ratingElement = document.createElement("p");
    ratingElement.textContent = `${rating}`;

    card.appendChild(nameElement);

    if (rating == 0) {
      ratingElement.classList.add("no-rating");
    } else if (rating > 0 && rating <= 2) {
      ratingElement.classList.add("low-rating");
    } else if (rating > 2 && rating <= 3) {
      ratingElement.classList.add("medium-rating");
    } else {
      ratingElement.classList.add("high-rating");
      if (restroom == highestRatedRestroom.restroom) {
        const crownIcon = document.createElement("img");
        crownIcon.src = "./icons/crown.png";
        crownIcon.alt = "Crown Icon";
        crownIcon.classList.add("crown-icon");
        card.appendChild(crownIcon);
      }
    }

    card.appendChild(ratingElement);
    if (rating != 0) {
      restroomsContainer.appendChild(card);
    }
  });
};

(async () => {
  await sortByRatings();
  console.log("Sorted Restrooms:", sortedRestrooms);
})();
