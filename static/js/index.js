// fetch('/api/pests')
// .then(response => response.json())
// .then(data => console.log(data))
console.log(screen.width);
/* Mobile Detection */
const cameraInput = document.getElementsByClassName("camera-input");

if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  // mobile
  console.log("Viewing on mobile device...");
  //cameraInput.classList.add("hidden");
} else {
  // Not mobile
  console.log("Viewing on desktop device...");
  //cameraInput.classList.remove("hidden");
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
