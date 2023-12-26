"use strict";

const openButton = document.querySelector(".open-modal");
const closeButton = document.querySelector(".close-modal");

function displayContactModal() {
    console.log("displayModal() called");
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
}

function closeContactModal() {
    console.log("closeModal() called");
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
    console.log("DOMContentLoaded() called");

    if (openButton) {
        openButton.addEventListener("click", displayContactModal);
    }

    if (closeButton) {
        closeButton.addEventListener("click", closeContactModal);
    }
});

async function displayNames() {

    const urlParams = new URLSearchParams(window.location.search);
    const matchingPhotographerId = parseInt(urlParams.get('id'), 10);

    const response = await fetch('data/photographers.json');

    const data = await response.json();

    const photographers = data.photographers;

    const matchingPhotographer = photographers.find(photographer => photographer.id === matchingPhotographerId);

    if (matchingPhotographer) {
        const { name } = matchingPhotographer;
        const nameElement = document.querySelector('.modal-names');
        nameElement.textContent = name;
        console.log('nameElement:', nameElement);
    } else {
        throw new Error('Matching photographer not found');
    }

    return matchingPhotographer;

}

document.querySelector('.contact_button').addEventListener('click', displayNames);

document.querySelector('.send-button').addEventListener('click', console.log('Send button clicked'));