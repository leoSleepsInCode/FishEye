"use strict";

// async function getPhotographers() {
//     const response = await fetch("data/photographers.json");
//     const { photographers } = await response.json();

//     return ({
//         photographers: [...photographers, ...photographers, ...photographers]
//     })
// }

// async function displayData(photographers) {
//     const photographersSection = document.querySelector(".photograph-header");

//     photographers.forEach((photographer) => {
//         const photographerModel = profileHeader(photographer);
//         const mediaInformations = photographerModel.getMediaInformationsDOM();
//         photographersSection.appendChild(mediaInformations);
//     });
// }

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
        const mediaInformations = await photographerModel.getMediaInformationsDOM();

        const photographersSection = document.querySelector(".photograph-header");
        photographersSection.appendChild(mediaInformations);
    } else {
        console.error(`Photographer with id ${photographerId} not found.`);
    }
}

// async function init() {
//     // Récupère les datas des photographes
//     const { photographers } = await getPhotographers();
//     displayData(photographers);
// }

// init();

displayPhotographerData();