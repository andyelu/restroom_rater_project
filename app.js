const reviewCardTemplate = document.querySelector("[data-review-template]");
const reviewCardContainer = document.querySelector(
  "[data-review-cards-container]"
);

let reviews = [];

function getRestroomNameFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return decodeURIComponent(urlParams.get("id"));
}

const getRating = () => {
  // Directly return the Promise from axios.get
  return axios.get(
    `http://54.193.72.63:8080/api/v1/reviews/rating/${getRestroomNameFromUrl()}`
  );
};

const getReviews = () => {
  return axios
    .get(`http://54.193.72.63:8080/api/v1/reviews/${getRestroomNameFromUrl()}`)
    .then((response) => {
      const jsonData = response.data;
      return jsonData;
    });
};

const displayRestroomName = () => {
  const name = getRestroomNameFromUrl();
  const nameContainer = document.getElementById("nameContainer");
  nameContainer.textContent = name;
};

const displayReviews = () => {
  getReviews()
    .then((response) => {
      const jsonData = response;
      reviews = jsonData.map((review) => {
        const card = reviewCardTemplate.content.cloneNode(true).children[0];
        const rating = card.querySelector("[data-rating]");
        const comment = card.querySelector("[data-comment]");
        const date = card.querySelector("[data-date]");
        rating.textContent = review.rating;
        comment.textContent = review.comment;
        date.textContent = review.date_of_review;

        reviewCardContainer.append(card);
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

const displayRating = () => {
  getRating()
    .then((res) => {
      const ratingContainer = document.getElementById("ratingContainer");
      ratingContainer.textContent = `${res.data}`;
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
