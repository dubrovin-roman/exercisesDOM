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