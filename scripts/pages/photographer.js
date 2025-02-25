"use strict";

/* global profileHeader */

/**
 * Fetches a photographer by their ID from the photographers.json data file.
 *
 * @param {number} id - The ID of the photographer to fetch.
 * @return {object} The photographer object matching the given ID.
 */
async function getPhotographerById(id) {
    const response = await fetch("data/photographers.json");
    const { photographers } = await response.json();

    const photographer = photographers.find(p => p.id === parseInt(id, 10));

    return photographer;
}

/**
 * Display the photographer data on the webpage.
 *
 * @return {Promise<void>} This function does not return anything.
 */
async function displayPhotographerData() {
    const urlParams = new URLSearchParams(window.location.search);
    const photographerId = urlParams.get('id');

    const photographer = await getPhotographerById(photographerId);

    if (photographer) {
        const photographerModel = profileHeader(photographer);
        await photographerModel.getHeaderMediasDOM();
        
    } else {
        console.error(`Photographer with id ${photographerId} not found.`);
    }
}

displayPhotographerData();

