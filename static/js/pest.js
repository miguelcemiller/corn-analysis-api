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
  const elements = document.getElementsByClassName("slider-image-container");
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
  const elements = document.getElementsByClassName("slider-image-container");
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


/* Slider Mobile */
// Source: https://stackoverflow.com/questions/58353280/prevent-click-when-leave-drag-to-scroll-in-js/58353989#58353989
// https://stackabuse.com/how-to-create-a-draggable-carousel-using-vanilla-javascript/
const sliderMobile = document.querySelector(".slider.mobile");

sliderMobile.addEventListener("mousedown", (e) => {
  isDown = true;
  startX = e.pageX - sliderMobile.offsetLeft;
  scrollLeft = sliderMobile.scrollLeft;
  sliderMobile.style.cursor = "grabbing";
});
sliderMobile.addEventListener("touchstart", (e) => {
  isDown = true;
  startX = e.changedTouches[0].pageX - sliderMobile.offsetLeft;
  scrollLeft = sliderMobile.scrollLeft;
  sliderMobile.style.cursor = "grabbing";
});

sliderMobile.addEventListener("mouseenter", () => {
  sliderMobile.style.cursor = "grab";
});

sliderMobile.addEventListener("mouseleave", () => {
  isDown = false;
  sliderMobile.style.cursor = "default";
});
sliderMobile.addEventListener("touchleave", () => {
  isDown = false;
  sliderMobile.style.cursor = "default";
});

sliderMobile.addEventListener("mouseup", (e) => {
  isDown = false;
  const elements = document.getElementsByClassName("slider-image-container");
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
  sliderMobile.style.cursor = "grab";
});
sliderMobile.addEventListener("touchend", (e) => {
  isDown = false;
  const elements = document.getElementsByClassName("slider-image-container");
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
  sliderMobile.style.cursor = "grab";
});

sliderMobile.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  isDragged = true;
  e.preventDefault();
  const x = e.pageX - sliderMobile.offsetLeft;
  const walk = (x - startX) * 2;
  sliderMobile.scrollLeft = scrollLeft - walk;
});
sliderMobile.addEventListener("touchmove", (e) => {
  if (!isDown) return;
  isDragged = true;
  e.preventDefault();
  const x = e.changedTouches[0].pageX - sliderMobile.offsetLeft;
  const walk = (x - startX) * 2;
  sliderMobile.scrollLeft = scrollLeft - walk;
});