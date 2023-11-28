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
