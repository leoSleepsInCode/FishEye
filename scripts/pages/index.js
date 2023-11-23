"use strict";
    
async function getPhotographers() {
    const response = await fetch("data/photographers.json");
    const { photographers } = await response.json();

    return ({
        photographers: [...photographers, ...photographers, ...photographers]
    })
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographersGallery(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();
    
