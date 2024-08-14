import "@babel/polyfill";
import './index.scss';
import './index.html';

import Swiper from 'swiper/bundle';

import 'swiper/css/bundle';

import { Navigation, Pagination } from 'swiper/modules';

// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

"use strict"
document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;

  const timeout = 300;

  function bodyLock() {
    body.classList.add("lock");
  }

  function bodyUnLock() {
    body.classList.remove("lock");
  }

  /* плавный скролл */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  /* HEADER */
  /* open/close menu */
  const headerMenu = document.getElementById("menu");
  const headerBurger = document.getElementById("burger");
  const headerMenuLinks = document.querySelectorAll(".header-menu__link");

  function openHeaderMenu() {
    headerBurger.classList.toggle("burger-open");
    if (headerBurger.classList.contains("burger-open")) {
      headerMenu.classList.add("menu-open");
      bodyLock();
    } else {
      headerMenu.classList.remove("menu-open");
      bodyUnLock();
    }
  }

  function closeHeaderMenu() {
    headerBurger.classList.remove("burger-open");
    headerMenu.classList.remove("menu-open");
    bodyUnLock();
  }

  headerBurger.addEventListener("click", openHeaderMenu);

  headerMenuLinks.forEach((e) => {
    e.addEventListener("click", closeHeaderMenu);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeHeaderMenu();
    }
  });

  /* open/close search */
  const searchForm = document.getElementById("search")
  const searchOpen = document.querySelector(".search__open");
  const searchClose = searchForm.querySelector('.search-form__close');

  searchOpen.addEventListener("click", function () {
    searchForm.classList.add("stretch");
  });

  searchClose.addEventListener("click", function (e) {
    e.preventDefault();
    searchForm.classList.remove("stretch");
  });

  document.addEventListener("click", function (e) {
    if (e.target !== searchOpen && e.target.closest(".search__open") === null && e.target !== search && e.target.closest(".search-form") === null) {
      searchForm.classList.remove("stretch");
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      searchForm.classList.remove("stretch");
    }
  });

  /* PODCASTS */
  const podcastsMore = document.getElementById("podcasts-more");
  const podcastsItemsLength = document.querySelectorAll(".podcasts-cards__item").length;
  const hideItems = document.querySelectorAll('.podcasts-cards__item');
  let podcastsItems;

  function setVariableValue(items) {
    if (window.innerWidth < 480) {
      items = 2;
    } else if (window.innerWidth >= 480 && window.innerWidth < 992) {
      items = 4;
    } else {
      items = 8;
    }
    return items;
  }

  // Вызываем функцию при загрузке страницы
  podcastsItems = setVariableValue(podcastsItems);

  // Вызываем функцию при изменении размера окна
  window.addEventListener('resize', () => {
    podcastsItems = setVariableValue(podcastsItems);
  });

  function updatePodcastItems() {
    if (podcastsMore.hasAttribute("data-stop")) {
      podcastsItems = setVariableValue(podcastsItems);
      hideItems.forEach((item) => {
        item.classList.remove("card-visible");
      });
      podcastsMore.innerHTML = "Ещё&nbsp;подкасты";
      podcastsMore.removeAttribute("data-stop");
    } else {
      podcastsItems += 2;

      const arrayPodcasts = Array.from(document.querySelector(".podcasts-cards").children);
      const visPodcastsItems = arrayPodcasts.slice(0, podcastsItems);

      visPodcastsItems.forEach((item) => item.classList.add("card-visible"));

      if (visPodcastsItems.length === podcastsItemsLength) {
        podcastsMore.innerHTML = "Скрыть";
        podcastsMore.setAttribute("data-stop", "");
      }
    }
  }

  podcastsMore.addEventListener("click", updatePodcastItems);

  /* TRANSFERS */
  /* dropdown transfers */
  const dropdown = document.getElementById("transfers-dropdown");

  const dropdownBtn = dropdown.querySelector('.transfers__dropdown-btn');
  const dropdownList = dropdown.querySelector('.transfers__dropdown-list');
  const dropdownItems = dropdown.querySelectorAll('.transfers__dropdown-item');
  const dropdownLists = document.querySelectorAll('.transfers__list');

  dropdownBtn.addEventListener("click", function () {
    dropdownList.classList.toggle('transfers__dropdown-list--open');
    this.classList.toggle('transfers__dropdown-btn--active');
  });

  for (let i = 0; i < dropdownItems.length; i++) {
    if (dropdownItems[i].hasAttribute('data-selected')) {
      dropdownBtn.innerText = dropdownItems[i].dataset.value;
    }
  }

  dropdownItems.forEach(function (listItem) {
    listItem.addEventListener('click', function (e) {
      e.stopPropagation();
      const path = e.currentTarget.dataset.path;

      for (let i = 0; i < dropdownItems.length; i++) {
        dropdownItems[i].removeAttribute('data-selected');
        dropdownItems[i].classList.remove("is-selected");
      }

      dropdownLists.forEach((list) => {
        list.classList.remove('transfers__list-active');
      });

      document.querySelector(`[data-target="${path}"]`).classList.add('transfers__list-active');

      this.setAttribute("data-selected", "true");
      this.classList.add("is-selected");

      dropdownBtn.innerText = this.innerText;
      dropdownList.classList.remove('transfers__dropdown-list--open');
      dropdownBtn.classList.remove('transfers__dropdown-btn--active');
    });
  });

  document.addEventListener("click", function (e) {
    if (e.target !== dropdownBtn) {
      dropdownBtn.classList.remove('transfers__dropdown-btn--active');
      dropdownList.classList.remove('transfers__dropdown-list--open');
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Tab" || e.key === "Escape") {
      dropdownBtn.classList.remove('transfers__dropdown-btn--active');
      dropdownList.classList.remove('transfers__dropdown-list--open');
    }
  });

  const transfersMore = document.getElementById("transfers-more");
  const transfersActiveList = document.querySelector(".transfers__list-active");
  const transfersLength = transfersActiveList.querySelectorAll('.transfers__item').length;
  const transfersHideItems = transfersActiveList.querySelectorAll('.transfers__item');
  let transfersItems;

  function setVariableValueTransfers(items) {
    if (window.innerWidth < 480) {
      items = 2;
    } else {
      items = 6;
    }
    return items;
  }

  // Вызываем функцию при загрузке страницы
  transfersItems = setVariableValueTransfers(transfersItems);

  // Вызываем функцию при изменении размера окна
  window.addEventListener('resize', () => {
    transfersItems = setVariableValueTransfers(transfersItems);
    // updateTransfersItems();
  });

  function updateTransfersItems() {
    if (transfersMore.hasAttribute("data-transfers-stop")) {
      transfersItems = setVariableValueTransfers(transfersItems);
      transfersHideItems.forEach((item) => {
        item.classList.remove("transfers-card-visible");
      });
      transfersMore.innerHTML = "Показать&nbsp;ещё";
      transfersMore.removeAttribute("data-transfers-stop");
    } else {
      transfersItems += 2;

      const arrayTransfers = Array.from(document.querySelector(".transfers__list-active").children);
      const visTransfersItems = arrayTransfers.slice(0, transfersItems);

      visTransfersItems.forEach((item) => item.classList.add("transfers-card-visible"));

      if (visTransfersItems.length === transfersLength) {
        transfersMore.innerHTML = "Скрыть";
        transfersMore.setAttribute("data-transfers-stop", "");
      }
    }
  }

  transfersMore.addEventListener("click", updateTransfersItems);


  /* GUESTS */
  const guestsAccordion = document.getElementById("guests-accordion");
  const guestsAccordionNames = guestsAccordion.querySelectorAll(
    ".guests-accordion__names"
  );
  const guestsAccordionBtns = guestsAccordion.querySelectorAll(
    ".guests-accordion__title-btn"
  );

  for (let i = 0; i < guestsAccordionBtns.length; i++) {
    const guestsAccordionItem = guestsAccordionBtns[i].closest(
      ".guests-accordion__item"
    );
    const guestsAccordionContent = guestsAccordionItem.querySelector(
      ".guests-accordion__names"
    );
    guestsAccordionBtns[i].addEventListener("click", function () {
      for (let j = 0; j < guestsAccordionNames.length; j++) {
        if (j !== i) {
          guestsAccordionNames[j].classList.remove("open-list");
          guestsAccordionBtns[j].setAttribute("aria-expanded", "false");
        }
      }

      if (this.getAttribute("aria-expanded") === "false") {
        this.setAttribute("aria-expanded", "true");
        guestsAccordionContent.classList.add("open-list");
      } else {
        this.setAttribute("aria-expanded", "false");
        guestsAccordionContent.classList.remove("open-list");
      }
    });
  }

  /* TABS */
  const guestsAccordionListBtns = document.querySelectorAll(
    ".guests-accordion__btn"
  );
  const guestsCards = document.querySelectorAll(".guests__card");

  guestsAccordionListBtns.forEach((el) => {
    el.addEventListener("click", function (elem) {
      for (let k = 0; k < guestsAccordionListBtns.length; k++) {
        guestsAccordionListBtns[k].classList.remove("selected-item");
      }
      for (let h = 0; h < guestsCards.length; h++) {
        guestsCards[h].classList.remove("guests__card--active");
      }

      const path = elem.currentTarget.dataset.guest;

      this.classList.add("selected-item");
      document
        .querySelector(`[data-guest-info="${path}"]`)
        .classList.add("guests__card--active");
    });
  });

  /* PLAYLISTS */
  const playlistsMore = document.querySelector(".playlists__more");
  const playlistsItemsLength = document.querySelectorAll('.playlists__item').length;
  const playlistsItemsHide = document.querySelectorAll('.playlists__item');
  let playlistsItems;

  function setVariableValuePlaylists(items) {
    if (window.innerWidth < 480) {
      items = 4;
    } else if (window.innerWidth >= 480 && window.innerWidth < 992) {
      items = 8;
    } else {
      items = 12;
    }
    return items;
  }

  playlistsItems = setVariableValuePlaylists(playlistsItems);

  function updatePlaylistsItems() {
    if (playlistsMore.hasAttribute("data-stop")) {
      playlistsItems = setVariableValuePlaylists(playlistsItems);
      playlistsItemsHide.forEach((item) => {
        item.classList.remove("is-visible");
      });
      playlistsMore.innerHTML = "Показать&nbsp;ещё";
      playlistsMore.removeAttribute("data-stop");
    } else {
      playlistsItems += 4;

      const array = Array.from(document.querySelector(".playlists__lists").children);
      const visItems = array.slice(0, playlistsItems);

      visItems.forEach((item) => item.classList.add("is-visible"));

      if (visItems.length === playlistsItemsLength) {
        playlistsMore.innerHTML = "Скрыть";
        playlistsMore.setAttribute("data-stop", "");
      }
    }
  }

  window.addEventListener("resize", () => {
    playlistsItems = setVariableValuePlaylists(playlistsItems);
    // updatePlaylistsItems(); // если запускать здесь функцию, то при изменении высоты добавятся ячейки один раз
  });

  playlistsMore.addEventListener("click", updatePlaylistsItems);

  /* AD */
  /* swiper */
  const adSwiper = new Swiper('.swiper', {
    // configure Swiper to use modules
    modules: [Navigation, Pagination],

    // кол-во слайдов для показа
    slidesPerView: 1,

    // кол-во перелистываемых слайдов
    slidesPerGroup: 1,

    // пагинация (ТОЧКИ)
    pagination: {
      el: '.swiper__pagination',
      clickable: true,
    },
  });
});