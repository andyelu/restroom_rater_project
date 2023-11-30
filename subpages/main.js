const getData = () => {
  axios.get("54.193.72.63:8080/api/v1/reviews").then((response) => {
    console.log(response);
  });
};

const sendData = () => {
  axios
    .post(
      "https://reqres.in/api/register",
      {
        email: "eve.holt@reqres.in",
        password: "pistol",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
};
