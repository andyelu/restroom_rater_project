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

const logReview = () => {
  getRating()
    .then((reviewData) => {
      console.log(reviewData.data); // Log the review data when it's available
    })
    .catch((err) => {
      console.error(err); // Log any error that occurs during the request
    });
};

const logdeez = () => {
  getReviews()
    .then((reviewData) => {
      console.log(reviewData); // Log the review data when it's available
    })
    .catch((err) => {
      console.error(err); // Log any error that occurs during the request
    });
};

logReview();
logdeez();
