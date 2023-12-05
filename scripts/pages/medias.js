"use strict";

async function getMedias() {
    const response = await fetch("data/photographers.json");
    const { media} = await response.json();

    return media ;
}

async function displayPhotographerMedias(medias) {
    const photographersWorksSection = document.querySelector(".photograph-medias");

    const urlParams = new URLSearchParams(window.location.search);
    const matchingPhotographerId = parseInt(urlParams.get('id'), 10);

    medias.forEach((media) => {
        if (media.photographerId === matchingPhotographerId) {
            const photographerWorks = profileMedias(media);
            const worksInformations = photographerWorks.getMainMediasDOM();

            photographersWorksSection.appendChild(worksInformations); 
        }
    });
}

async function init() {
    const media = await getMedias();
    displayPhotographerMedias(media);
}

init();

async function displayPricesAndLikes() {
  const likesBox = document.querySelector(".likes-box");

  const urlParams = new URLSearchParams(window.location.search);
  const matchingPhotographerId = parseInt(urlParams.get('id'), 10);

  const response = await fetch('data/photographers.json');
  const data = await response.json();

  const photographers = data.photographers;
  const media = data.media;

  const matchingPhotographer = photographers.find((photographer) => photographer.id === matchingPhotographerId);

  if (matchingPhotographer) {
    const { price } = matchingPhotographer;
    const likes = media
      .filter((mediaObj) => mediaObj.photographerId === matchingPhotographer.id)
      .reduce((totalLikes, mediaObj) => totalLikes + mediaObj.likes, 0);

    const priceBoxObj = priceBox({ price, likes });
    const priceBoxDOM = priceBoxObj.getPriceBoxDOM();
    likesBox.appendChild(priceBoxDOM);
  }
}


displayPricesAndLikes();