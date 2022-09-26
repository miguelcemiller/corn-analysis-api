// fetch('/api/pests')
// .then(response => response.json())
// .then(data => console.log(data))

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

      // Log selected stage
      console.log(icon.querySelector("span").innerHTML);
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
}
