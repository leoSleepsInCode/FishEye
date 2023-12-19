"use strict";

const openButton = document.querySelector(".open-modal");
const closeButton = document.querySelector(".close-modal");

function displayModal() {
    console.log("displayModal() called");
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
}

function closeModal() {
    console.log("closeModal() called");
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
    console.log("DOMContentLoaded() called");

    if (openButton) {
        openButton.addEventListener("click", displayModal);
    }

    if (closeButton) {
        closeButton.addEventListener("click", closeModal);
    }
});

