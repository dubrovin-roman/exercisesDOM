"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

//слайдер
const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotsContainer = document.querySelector(".dots");

let currentSlide = 0;
const maxCountSlides = slides.length;
createDots();

function goToSlide(slide) {
  slides.forEach((element, i) => {
    element.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
}

function nextSlide() {
  if (currentSlide === maxCountSlides - 1) currentSlide = 0;
  else currentSlide++;
  goToSlide(currentSlide);
  activeDot(currentSlide);
}

function prevSlide() {
  if (currentSlide === 0) currentSlide = maxCountSlides - 1;
  else currentSlide--;
  goToSlide(currentSlide);
  activeDot(currentSlide);
}

function createDots() {
  slides.forEach((element, i) =>
    dotsContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${i}"></button>`
    )
  );
}

function activeDot(slide) {
  document.querySelectorAll(".dots__dot").forEach((element) => {
    element.classList.remove("dots__dot--active");
  });
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
}

goToSlide(0);
activeDot(0);

btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);
dotsContainer.addEventListener("click", (ev) => {
  if (ev.target.classList.contains("dots__dot")) {
    goToSlide(ev.target.dataset.slide);
    activeDot(ev.target.dataset.slide);
  }
});

// начтройка кнопки "Узнать больше"
btnScrollTo.addEventListener("click", () => {
  section1.scrollIntoView({ behavior: "smooth" });
});
/*
document.querySelectorAll(".nav__link").forEach((element) => {
  element.addEventListener("click", (ev) => {
    ev.preventDefault();
    const id = element.getAttribute("href");
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  });
});
*/

// настройка ссылок в меню
document.querySelector(".nav__links").addEventListener("click", (ev) => {
  ev.preventDefault();
  if (ev.target.classList.contains("nav__link")) {
    const id = ev.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

//настройка табов в секции 2
const tabContainer = document.querySelector(".operations__tab-container");
const operationsTab = document.querySelectorAll(".operations__tab");
const operationsContent = document.querySelectorAll(".operations__content");

tabContainer.addEventListener("click", (ev) => {
  ev.preventDefault();
  const elementBtn = ev.target.closest(".operations__tab");

  if (!elementBtn) return;

  operationsTab.forEach((el) => el.classList.remove("operations__tab--active"));
  elementBtn.classList.add("operations__tab--active");

  operationsContent.forEach((el) =>
    el.classList.remove("operations__content--active")
  );
  document
    .querySelector(`.operations__content--${elementBtn.dataset.tab}`)
    .classList.add("operations__content--active");
});

//настройка прозрачности меню при наведении
const nav = document.querySelector(".nav");

function hover(ev) {
  ev.preventDefault();
  const logo = nav.querySelector(".nav__logo");
  const targetLink = ev.target;
  const navLinks = nav.querySelectorAll(".nav__link");
  if (targetLink.classList.contains("nav__link")) {
    logo.style.opacity = this;
    navLinks.forEach((el) => (el.style.opacity = this));
    targetLink.style.opacity = 1;
  }
}

nav.addEventListener("mouseover", hover.bind(0.5));
nav.addEventListener("mouseout", hover.bind(1));

//настройка автоматического появления меню при прокрутке страницы
const optionsObserverNav = {
  root: null,
  threshold: 0,
  rootMargin: "-90px",
};

function stickyNav(entries, observer) {
  if (!entries[0].isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
}

const observerNav = new IntersectionObserver(stickyNav, optionsObserverNav);
observerNav.observe(document.querySelector(".header"));

//настраиваем всплытие секций, когда до них дойдет просмотр
const sections = document.querySelectorAll(".section");
const sectionsObserver = new IntersectionObserver(surfacingSections, {
  threshold: 0.15,
});
sections.forEach((element) => {
  element.classList.add("section--hidden");
  sectionsObserver.observe(element);
});

function surfacingSections(entries, observer) {
  if (
    entries[0].isIntersecting
    //&& entries[0].target.classList.contains("section--hidden")
  ) {
    entries[0].target.classList.remove("section--hidden");
    //переключение слайдера кнопками
    if (entries[0].target.id == "section--3") {
      document.addEventListener("keydown", (ev) => {
        if (ev.key == "ArrowLeft") prevSlide();
        if (ev.key == "ArrowRight") nextSlide();
      });
    }
    observer.unobserve(entries[0].target);
  }
}

//подгрузка фотографий
const featuresImgs = document.querySelectorAll(".features__img");
const imgsObserver = new IntersectionObserver(uploadingPhotos, {
  threshold: 0.5,
});
featuresImgs.forEach((element) => imgsObserver.observe(element));

function uploadingPhotos(entries, observer) {
  const tempEl = entries[0].target;
  if (entries[0].isIntersecting) {
    tempEl.setAttribute("src", tempEl.dataset.src);
    tempEl.addEventListener("load", () => tempEl.classList.remove("lazy-img"));
    observer.unobserve(tempEl);
  }
}
/*
//слайдер
const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");

let currentSlide = 0;
const maxCountSlides = slides.length;

function goToSlide(slide) {
  slides.forEach((element, i) => {
    element.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
}

function nextSlide() {
  if (currentSlide === maxCountSlides - 1) currentSlide = 0;
  else currentSlide++;
  goToSlide(currentSlide);
}

function prevSlide() {
  if (currentSlide === 0) currentSlide = maxCountSlides - 1;
  else currentSlide--;
  goToSlide(currentSlide);
}

goToSlide(0);

btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);

//переключение слайдера кнопками
let isSection3 = false;
const observerSlider = new IntersectionObserver(
  (entries, observer) => {
    isSection3 = entries[0].isIntersecting;
  },
  { threshold: 0.5 }
);
observerSlider.observe(slider);

document.addEventListener("keydown", (ev) => {
  if (isSection3 && ev.key == "ArrowLeft") prevSlide();
  if (isSection3 && ev.key == "ArrowRight") nextSlide();
});
*/
