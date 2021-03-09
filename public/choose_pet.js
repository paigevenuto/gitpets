const speciesCaptions = [
  ...document.getElementById("species-captions").children,
];
const carousel = [...document.getElementById("carousel-images").children];
const maxCarouselItems = carousel.length;
let currentPet = 1;

const updateCurrentPet = () => {
  carousel.forEach((item, idx) => rotateCarousel(item, idx));
  speciesCaptions.forEach((item, idx) => rotateCarousel(item, idx));
};

const rotateCarousel = (item, idx) => {
  if (idx !== currentPet - 1) item.style.setProperty("display", "none");
  else item.style.setProperty("display", "");
  document.getElementById("species").setAttribute("value", currentPet);
};

document.getElementById("carousel-left").addEventListener("click", () => {
  currentPet = currentPet > 1 ? currentPet - 1 : maxCarouselItems;
  updateCurrentPet();
});

document.getElementById("carousel-right").addEventListener("click", () => {
  currentPet = currentPet < maxCarouselItems ? currentPet + 1 : 1;
  updateCurrentPet();
});

updateCurrentPet();
