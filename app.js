const rateBtn = document.getElementById("rate-btn");
const mapBtn = document.getElementById("map-btn");
const reviewCardTemplate = document.querySelector("[data-review-template]");
const reviewCardContainer = document.querySelector(
  "[data-review-cards-container]"
);

rateBtn.onclick = () => {
  window.location.href = `rate.html?id=${getRestroomNameFromUrl()}`;
};

let reviews = [];

function getRestroomNameFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return decodeURIComponent(urlParams.get("id"));
}

mapBtn.onclick = () => {
  getLocation()
    .then((location) => {
      window.location.href = `https://www.google.com/maps?q=${location}`;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const getRating = () => {
  // Directly return the Promise from axios.get
  return axios.get(
    `http://3.101.24.44:8080/api/v1/reviews/rating/${getRestroomNameFromUrl()}`
  );
};

const getLocation = () => {
  return axios
    .get(
      `http://3.101.24.44:8080/api/v1/restroom/search?name=${getRestroomNameFromUrl()}`
    )
    .then((response) => {
      const jsonData = response.data;
      const location = jsonData.location;
      console.log(location);
      console.log(jsonData);
      return location;
    });
};

const getReviews = () => {
  return axios
    .get(`http://3.101.24.44:8080/api/v1/reviews/${getRestroomNameFromUrl()}`)
    .then((response) => {
      const jsonData = response.data;
      return jsonData;
    });
};

const displayRestroomName = () => {
  const name = getRestroomNameFromUrl();
  const nameContainer = document.getElementById("nameContainer");
  nameContainer.textContent = name;
  nameContainer.classList.add("restroom-title");
};

const displayReviews = () => {
  getReviews()
    .then((response) => {
      const jsonData = response;

      // Reverse the order of reviews
      const reversedReviews = jsonData.reverse();

      reviews = reversedReviews.map((review) => {
        const card = reviewCardTemplate.content.cloneNode(true).children[0];
        const rating = card.querySelector("[data-rating]");
        const comment = card.querySelector("[data-comment]");
        const tags = card.querySelector("[data-tags]");
        const accessible = card.querySelector("[data-accessible]");
        const genderNeutral = card.querySelector("[data-genderNeutral]");
        const gender = card.querySelector("[data-gender]");
        const date = card.querySelector("[data-date]");
        rating.textContent = review.rating;
        comment.textContent = review.comment;
        if (review.gender) {
          gender.innerHTML =
            "<span style='font-weight:normal;'>Restroom Used:&nbsp;</span>" +
            review.gender;
        }
        date.textContent = review.date_of_review;

        // Add background color based on rating value
        if (review.rating === 1 || review.rating === 2) {
          rating.style.backgroundColor = "#dc3545"; // Red
        } else if (review.rating === 3) {
          rating.style.backgroundColor = "#ffc107"; // Yellow
        } else if (review.rating === 4 || review.rating === 5) {
          rating.style.backgroundColor = "#28a745"; // Green
        }

        const tagElements = [];
        if (review.tag1 != "" && review.tag1 !== null)
          tagElements.push(createTagElement(review.tag1));
        if (review.tag2 != "" && review.tag2 !== null)
          tagElements.push(createTagElement(review.tag2));
        if (review.tag3 != "" && review.tag3 !== null)
          tagElements.push(createTagElement(review.tag3));
        tags.append(...tagElements);

        if (review.wheelChair === true) {
          const accessibleIconContainer = document.createElement("span");
          accessibleIconContainer.classList.add("icon-container"); // Add this line to apply the class
          const accessibleIcon = createSVGIcon(
            "icons/noun-wheelchair-accessible-4293_1.svg",
            28,
            28
          ); // Customize size if needed
          accessibleIconContainer.appendChild(accessibleIcon);
          accessible.appendChild(accessibleIconContainer);
        } else {
          accessible.style.display = "none";
        }

        if (review.allGender === true) {
          const genderNeutralIconContainer = document.createElement("span");
          genderNeutralIconContainer.classList.add("icon-container");
          const genderNeutralIcon = createSVGIcon("icons/neutral.svg", 28, 28);
          genderNeutralIconContainer.appendChild(genderNeutralIcon);
          genderNeutral.appendChild(genderNeutralIconContainer);
        }

        reviewCardContainer.appendChild(card);
        return {
          rating: review.rating,
          comment: review.comment,
          date: review.date_of_review,
          element: card,
        };
      });
    })
    .catch((err) => {
      console.error("Error fetching data:", err);
    });
};

const createSVGIcon = (iconPath, width = 32, height = 32) => {
  const svgIcon = document.createElement("img");
  svgIcon.src = iconPath;
  svgIcon.alt = "Accessible Icon";
  svgIcon.style.width = `${width}px`;
  svgIcon.style.height = `${height}px`;
  return svgIcon;
};

const positiveTags = ["Usually Empty", "Clean", "Quiet"];

const createTagElement = (tagName) => {
  const tagElement = document.createElement("span");
  tagElement.classList.add("tag");

  if (positiveTags.includes(tagName)) {
    tagElement.classList.add("positive");
  }

  tagElement.textContent = tagName;
  return tagElement;
};

const displayRating = () => {
  getRating()
    .then((res) => {
      const ratingContainer = document.getElementById("ratingContainer");
      const formattedRating = res.data.toFixed(1);

      ratingContainer.innerHTML = `
      <span class="overall-rating">${formattedRating}</span>
      <span class="highest-possible">/ 5.0</span>
      `;
    })
    .catch((err) => {
      console.log(err);
      const ratingContainer = document.getElementById("ratingContainer");
      ratingContainer.textContent = "Error loading rating.";
    });
};

displayRestroomName();
displayRating();
displayReviews();
