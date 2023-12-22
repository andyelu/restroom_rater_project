var stars = document.querySelectorAll(".star a");
var startLabel = document.querySelectorAll(".label-container a");
var dynamicLabel = document.querySelector(".dynamic-label");

let rating;
let length;

const postBtn = document.getElementById("post-btn");

const updateButtonStatus = function () {
  if (
    rating > 0 &&
    rating <= 5 &&
    length > 1 &&
    length <= 255 &&
    selectedGender.length != 0
  ) {
    postBtn.disabled = false;
  } else {
    postBtn.disabled = true;
  }
};

updateButtonStatus();

function getRatingText(rating) {
  switch (rating) {
    case 1:
      return "1 - Awful";
    case 2:
      return "2 - OK";
    case 3:
      return "3 - Good";
    case 4:
      return "4 - Great";
    case 5:
      return "5 - Awesome";
    default:
      return `${rating}`;
  }
}

stars.forEach((item, index1) => {
  // Mouseover (hover) event
  item.addEventListener("mouseover", () => {
    dynamicLabel.classList.remove("hide");
    dynamicLabel.classList.remove("black-font");

    dynamicLabel.textContent = `${getRatingText(index1 + 1)}`;

    startLabel.forEach((label, index) => {
      label.classList.add("hide");
    });
    stars.forEach((star, index2) => {
      star.classList.remove("active");
      star.classList.remove("selected");
      if (index1 >= index2) {
        star.classList.add("active");
      }
    });
  });

  // Mouseout event
  item.addEventListener("mouseout", () => {
    if (rating == null) {
      dynamicLabel.classList.add("hide");
      startLabel.forEach((label, index) => {
        label.classList.remove("hide");
      });
    }
    if (rating != null && rating - 1 != index1) {
      dynamicLabel.textContent = getRatingText(rating);
      dynamicLabel.classList.add("black-font");
    }

    if (rating != null) {
      stars.forEach((star, index) => {
        dynamicLabel.classList.add("black-font");
        if (index < rating) {
          star.classList.add("selected");
        }
      });
    }
    stars.forEach((star) => {
      if (!star.classList.contains("selected")) {
        star.classList.remove("active");
      }
    });
  });

  // Click event
  item.addEventListener("click", () => {
    rating = index1 + 1;
    dynamicLabel.textContent = getRatingText(rating);
    dynamicLabel.classList.add("black-font");

    stars.forEach((star, index2) => {
      if (index1 >= index2) {
        star.classList.add("selected");
      } else {
        star.classList.remove("selected");
      }
    });
    // Update hover states based on selected stars
    updateHoverStates();
    updateButtonStatus();
  });
});

function updateHoverStates() {
  stars.forEach((star) => {
    if (!star.classList.contains("selected")) {
      star.classList.remove("active");
    }
  });
}

// code for title name
const getRestroomNameFromUrl = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return decodeURIComponent(urlParams.get("id"));
};

const ratePart = document.getElementById("rate-part");
const restroomNamePart = document.getElementById("restroom-name-part");

restroomNamePart.textContent = `${getRestroomNameFromUrl()} Restrooms`;

// get word count as you type
const textBox = document.getElementById("review-text");
const wordCount = document.getElementById("word-count");
length = 0;
wordCount.textContent = `${length}/255`;
textBox.addEventListener("input", (e) => {
  length = e.target.value.length;
  wordCount.textContent = `${length}/255`;
  if (length > 255) {
    wordCount.classList.add("red");
  }
  updateButtonStatus();
});

const mensBtn = document.getElementById("mens-btn");
const womensBtn = document.getElementById("womens-btn");
const allGenderBtn = document.getElementById("all-gender-btn");

let selectedGender = "";

const selectMens = function () {
  if (selectedGender === "Mens") {
    selectedGender = "";
    mensBtn.classList.remove("selected");
    womensBtn.classList.remove("selected");
    allGenderBtn.classList.remove("selected");
  } else {
    selectedGender = "Mens";
    mensBtn.classList.add("selected");
    womensBtn.classList.remove("selected");
    allGenderBtn.classList.remove("selected");
  }
  updateButtonStatus();
};

const selectWomens = function () {
  if (selectedGender === "Womens") {
    selectedGender = "";
    mensBtn.classList.remove("selected");
    womensBtn.classList.remove("selected");
    allGenderBtn.classList.remove("selected");
  } else {
    selectedGender = "Womens";
    mensBtn.classList.remove("selected");
    womensBtn.classList.add("selected");
    allGenderBtn.classList.remove("selected");
  }
  updateButtonStatus();
};

const selectAllGender = function () {
  if (selectedGender === "All Gender") {
    selectedGender = "";
    mensBtn.classList.remove("selected");
    womensBtn.classList.remove("selected");
    allGenderBtn.classList.remove("selected");
  } else {
    selectedGender = "All Gender";
    mensBtn.classList.remove("selected");
    womensBtn.classList.remove("selected");
    allGenderBtn.classList.add("selected");
  }
  updateButtonStatus();
};

mensBtn.addEventListener("click", selectMens);
womensBtn.addEventListener("click", selectWomens);
allGenderBtn.addEventListener("click", selectAllGender);

const wheelChair = document.querySelector("#wheelchair-icon");
const allGender = document.querySelector("#gender-neutral");

let wheelChairAccess = false;
let allGenderAccess = false;

wheelChair.addEventListener("click", function () {
  if (wheelChairAccess == false) {
    wheelChairAccess = true;
    wheelChair.classList.add("selected");
  } else {
    wheelChairAccess = false;
    wheelChair.classList.remove("selected");
  }
});

allGender.addEventListener("click", function () {
  if (allGenderAccess == false) {
    allGenderAccess = true;
    allGender.classList.add("selected");
  } else {
    allGenderAccess = false;
    allGender.classList.remove("selected");
  }
});

// tags
const busyTag = document.querySelector("#busy-tag");
const noisyTag = document.querySelector("#noisy-tag");
const dirtyTag = document.querySelector("#dirty-tag");

let isBusy = "";
let isNoisy = "";
let isDirty = "";

const usuallyEmptyTag = document.querySelector("#usually-empty-tag");
const quietTag = document.querySelector("#quiet-tag");
const cleanTag = document.querySelector("#clean-tag");

let isUsuallyEmpty = "";
let isQuiet = "";
let isClean = "";

usuallyEmptyTag.addEventListener("click", function () {
  if (isUsuallyEmpty.length == 0) {
    isUsuallyEmpty = "Usually Empty";
    usuallyEmptyTag.classList.add("selected");
    isBusy = "";
    busyTag.classList.remove("selected");
  } else {
    isUsuallyEmpty = "";
    usuallyEmptyTag.classList.remove("selected");
  }
});

quietTag.addEventListener("click", function () {
  if (isQuiet.length == 0) {
    isQuiet = "Quiet";
    quietTag.classList.add("selected");
    isNoisy = "";
    noisyTag.classList.remove("selected");
  } else {
    isQuiet = "";
    quietTag.classList.remove("selected");
  }
});

cleanTag.addEventListener("click", function () {
  if (isClean.length == 0) {
    isClean = "Clean";
    cleanTag.classList.add("selected");
    isDirty = "";
    dirtyTag.classList.remove("selected");
  } else {
    isClean = "";
    cleanTag.classList.remove("selected");
  }
});

busyTag.addEventListener("click", function () {
  if (isBusy.length == 0) {
    isBusy = "Busy";
    busyTag.classList.add("selected");
    isUsuallyEmpty = "";
    usuallyEmptyTag.classList.remove("selected");
  } else {
    isBusy = "";
    busyTag.classList.remove("selected");
  }
});

noisyTag.addEventListener("click", function () {
  if (isNoisy.length == 0) {
    isNoisy = "Noisy";
    noisyTag.classList.add("selected");
    isQuiet = "";
    quietTag.classList.remove("selected");
  } else {
    isNoisy = "";
    noisyTag.classList.remove("selected");
  }
});

dirtyTag.addEventListener("click", function () {
  if (isDirty.length == 0) {
    isDirty = "Really Dirty";
    dirtyTag.classList.add("selected");
    isClean = "";
    cleanTag.classList.remove("selected");
  } else {
    isDirty = "";
    dirtyTag.classList.remove("selected");
  }
});

postBtn.addEventListener("click", function () {
  const postData = {
    restroom_name: getRestroomNameFromUrl(),
    rating: rating,
    comment: textBox.value,
    gender: selectedGender,
    wheelChair: wheelChairAccess,
    allGender: allGenderAccess,
    tag1: isBusy || isUsuallyEmpty,
    tag2: isNoisy || isQuiet,
    tag3: isDirty || isClean,
  };

  axios
    .post("https://restroomrater.org/api/v1/reviews", postData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      window.location.href = `review.html?id=${getRestroomNameFromUrl()}`;
    });
});
