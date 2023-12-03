const getBtn = document.getElementById("get-btn");

const getData = () => {
  axios
    .get("http://54.193.72.63:8080/api/v1/reviews")
    .then((response) => {
      const jsonData = response.data;
      const myObject = jsonData[0];

      console.log(myObject);
      console.log(myObject.restroom_name);
    })
    .catch((err) => {
      console.error("Error fetching data:", err);
    });
};

// const sendData = () => {
//   axios
//     .post(
//       "https://reqres.in/api/register",
//       {
//         email: "eve.holt@reqres.in",
//         password: "pistol",
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     )
//     .then((response) => {
//       console.log(response);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

console.log("abc");
getBtn.addEventListener("click", getData);
