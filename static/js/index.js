// fetch('/api/pests')
// .then(response => response.json())
// .then(data => console.log(data))

/* Submit for Prediction */
// Data Validation
let data = {
  stage: "",
  category: "",
  image: null,
};

const dataValidation = () => {
  if (
    data.stage == "" ||
    data.category == "" ||
    document.querySelector(".image-container").classList.contains("hidden")
  ) {
    // Disable Primary Button
    document.querySelector(".predict-js").classList.add("disabled");
    return false;
  } else {
    // Enable Primary Button
    document.querySelector(".predict-js").classList.remove("disabled");
    return true;
  }
};

document.querySelector(".predict-js").addEventListener("click", function () {
  let formData = new FormData();
  formData.append("stage", data.stage);
  formData.append("category", data.category);
  formData.append("image", data.image);

  // Display the key/value pairs
  // for (var pair of formData.entries()) {
  //   console.log(pair[0] + ", " + pair[1]);
  // }

  fetch("/submit", {
    method: "POST",
    body: formData,
  });

  // fetch("/submit", {
  //   body: formData,
  //   method: "POST",
  //   headers: { "Content-Type": "multipart/form-data" },
  // });
});

/* Mobile Detection */
const cameraInput = document.querySelector(".sources-container > div");

if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  // mobile
  console.log("Viewing on mobile device...");
  cameraInput.classList.remove("hidden");
} else {
  // Not mobile
  console.log("Viewing on desktop device...");
  cameraInput.classList.add("hidden");
}

/* Toggle Icons */
const stageIcons = document.querySelectorAll(".stage-icon-container");
const categoryIcons = document.querySelectorAll(".category-icon-container");

const defaultColor = "#9BA29B";
const selectedColor = "#5CCA55";

const iconsListener = (icons) => {
  icons.forEach((icon) => {
    icon.addEventListener("click", () => {
      // Reset all icons
      icons.forEach((icon) => {
        icon.classList.remove("icon-selected");
        icon.querySelector("svg").setAttribute("fill", defaultColor);
        icon.querySelector("span").style.color = defaultColor;
        icon.classList.add("icon-hover");
      });

      // Selected
      icon.classList.add("icon-selected");
      icon.querySelector("svg").setAttribute("fill", selectedColor);
      icon.querySelector("span").style.color = selectedColor;
      icon.classList.remove("icon-hover");

      // Log selected icon
      temp = icon.querySelector("span").innerHTML;
      // Assign to declared variables for Pest, Category
      if (icons.length == 18) {
        data.stage = temp;
      } else {
        data.category = temp;
      }

      console.log(temp);
      // Data Validation
      dataValidation();
    });
  });
};

iconsListener(stageIcons);
iconsListener(categoryIcons);

/* Animate Sections */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show-section");
    }
  });
});

const hiddenElements = document.querySelectorAll(".hidden-section");
hiddenElements.forEach((el) => observer.observe(el));

/* Add Uploaded Image */
document
  .querySelector("#gallery-input")
  .addEventListener("change", previewImage);

document
  .querySelector("#camera-input")
  .addEventListener("change", previewImage);

function previewImage() {
  document.querySelector(".image-container").classList.remove("hidden");
  const preview = document.querySelector(".image-container > img");
  const file = this.files[0];
  // Update Image data object
  data.image = file;
  const reader = new FileReader();

  reader.onloadend = function () {
    preview.src = reader.result;
  };

  if (file.type.match("image.*")) {
    reader.readAsDataURL(file);
  } else {
    document.querySelector(".image-container").classList.add("hidden");
    preview.src = "";
  }

  // Data Validation
  dataValidation();
}

/* Slider */
// Source: https://stackoverflow.com/questions/58353280/prevent-click-when-leave-drag-to-scroll-in-js/58353989#58353989
// https://stackabuse.com/how-to-create-a-draggable-carousel-using-vanilla-javascript/
const slider = document.querySelector(".slider");

const preventClick = (e) => {
  e.preventDefault();
  e.stopImmediatePropagation();
};

let isDown = false;
var isDragged = false;
let startX;
let scrollLeft;

slider.addEventListener("mousedown", (e) => {
  isDown = true;
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
  slider.style.cursor = "grabbing";
});
slider.addEventListener("touchstart", (e) => {
  isDown = true;
  startX = e.changedTouches[0].pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
  slider.style.cursor = "grabbing";
});

slider.addEventListener("mouseenter", () => {
  slider.style.cursor = "grab";
});

slider.addEventListener("mouseleave", () => {
  isDown = false;
  slider.style.cursor = "default";
});
slider.addEventListener("touchleave", () => {
  isDown = false;
  slider.style.cursor = "default";
});

slider.addEventListener("mouseup", (e) => {
  isDown = false;
  const elements = document.getElementsByClassName("book");
  if (isDragged) {
    for (let i = 0; i < elements.length; i++) {
      elements[i].addEventListener("click", preventClick);
    }
  } else {
    for (let i = 0; i < elements.length; i++) {
      elements[i].removeEventListener("click", preventClick);
    }
  }
  isDragged = false;
  slider.style.cursor = "grab";
});
slider.addEventListener("touchend", (e) => {
  isDown = false;
  const elements = document.getElementsByClassName("stage-icon-container");
  if (isDragged) {
    for (let i = 0; i < elements.length; i++) {
      elements[i].addEventListener("click", preventClick);
    }
  } else {
    for (let i = 0; i < elements.length; i++) {
      elements[i].removeEventListener("click", preventClick);
    }
  }
  isDragged = false;
  slider.style.cursor = "grab";
});

slider.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  isDragged = true;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 2;
  slider.scrollLeft = scrollLeft - walk;
});
slider.addEventListener("touchmove", (e) => {
  if (!isDown) return;
  isDragged = true;
  e.preventDefault();
  const x = e.changedTouches[0].pageX - slider.offsetLeft;
  const walk = (x - startX) * 2;
  slider.scrollLeft = scrollLeft - walk;
});

/* Modal */
let moreInfo = document.querySelector(".more-info-js");
let modalContainer = document.querySelector(".modal-container");
let modalContent = document.querySelector(".modal-content");

moreInfo.addEventListener("click", () => {
  modalContainer.classList.remove("hidden");
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  console.log(event.target);
  if (event.target == modalContent) {
    modalContainer.classList.add("hidden");
  }
};
