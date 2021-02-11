const speciesDescriptions = [
  "This pet is very playful and needs lots of variety to be happy.\r\nRecommended for those who use 5+ programming languages a week.",
  "This one is shy and requires plenty of attention to not get lonely.\r\nEasily cared for, but can't go more than 3 days without ❤s.",
  "This one has an apetite, be sure to feed it code contributions more frequently!\r\nRecommended for those who program 5-7 days a week.",
];
const speciesCaption = document.getElementById("species-caption");
const carousel = [...document.getElementById("carousel-images").children];
const maxCarouselItems = carousel.length;
let carouselCurrent = 1;

const updateCarousel = () =>
  carousel.forEach((item, idx) => {
    if (idx !== carouselCurrent - 1) item.style.setProperty("display", "none");
    else item.style.setProperty("display", "");
    speciesCaption.textContent = speciesDescriptions[carouselCurrent - 1];
    document.getElementById("species").setAttribute("value", carouselCurrent);
  });

document.getElementById("carousel-left").addEventListener("click", () => {
  carouselCurrent =
    carouselCurrent > 1 ? carouselCurrent - 1 : maxCarouselItems;
  updateCarousel();
});

document.getElementById("carousel-right").addEventListener("click", () => {
  carouselCurrent =
    carouselCurrent < maxCarouselItems ? carouselCurrent + 1 : 1;
  updateCarousel();
});

updateCarousel();
