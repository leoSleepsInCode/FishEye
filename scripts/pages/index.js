"use strict";
    
/* global photographersGallery*/

/**
 * Retrieves the list of photographers from the server.
 *
 * @return {object} The list of photographers.
 */
async function getPhotographers() {
    const response = await fetch("data/photographers.json");
    const { photographers } = await response.json();

    return { photographers }
}

/**
 * Displays the data of photographers.
 *
 * @param {Array} photographers - An array of photographer objects.
 * @return {Promise} - A promise that resolves when the data is displayed.
 */
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographersGallery(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

/**
 * Initializes the function.
 *
 * @return {Promise<void>} The function does not return anything.
 */
async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();
    
