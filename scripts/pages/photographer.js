"use strict";

async function getPhotographerById(id) {
    const response = await fetch("data/photographers.json");
    const { photographers } = await response.json();

    const photographer = photographers.find(p => p.id === parseInt(id, 10));

    return photographer;
}

async function displayPhotographerData() {
    const urlParams = new URLSearchParams(window.location.search);
    const photographerId = urlParams.get('id');

    const photographer = await getPhotographerById(photographerId);

    if (photographer) {
        const photographerModel = profileHeader(photographer);
        const mediaInformations = await photographerModel.getHeaderMediasDOM();

        const photographersSection = document.querySelector(".photograph-header");
        photographersSection.appendChild(mediaInformations);
    } else {
        console.error(`Photographer with id ${photographerId} not found.`);
    }
}

displayPhotographerData();

