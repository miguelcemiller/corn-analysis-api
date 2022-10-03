/* Carousel */
/* Source: https://stackabuse.com/how-to-create-a-draggable-carousel-using-vanilla-javascript/ */

let carouselContainer = document.querySelector(".carousel-container");
let innerCarouselContainer = document.querySelector(
  ".inner-carousel-container"
);

let pressed = false;
let startX;
let x;

carouselContainer.addEventListener("mousedown", (e) => {
  pressed = true;
  startX = e.offsetX - innerCarouselContainer.offsetLeft;
  carouselContainer.style.cursor = "grabbing";
});

carouselContainer.addEventListener("mouseenter", () => {
  carouselContainer.style.cursor = "grab";
});

carouselContainer.addEventListener("mouseleave", () => {
  carouselContainer.style.cursor = "default";
});

carouselContainer.addEventListener("mouseup", () => {
  carouselContainer.style.cursor = "grab";
  pressed = false;
});

window.addEventListener("mouseup", () => {
  // pressed = false;
});

carouselContainer.addEventListener("mousemove", (e) => {
  if (!pressed) return;
  e.preventDefault();

  x = e.offsetX;

  innerCarouselContainer.style.left = `${x - startX}px`;

  checkBoundary();
});

const checkBoundary = () => {
  let outer = carouselContainer.getBoundingClientRect();
  let inner = innerCarouselContainer.getBoundingClientRect();

  if (parseInt(innerCarouselContainer.style.left) > 0) {
    innerCarouselContainer.style.left = "0px";
  }

  if (inner.right < outer.right) {
    innerCarouselContainer.style.left = `-${inner.width - outer.width}px`;
  }
};
