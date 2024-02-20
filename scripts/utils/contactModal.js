"use strict";

// const openButton = document.querySelector(".open-modal");
const closingButton = document.querySelector('.close-modal');
// const sendingButton = document.querySelector('.send-button');

closingButton.setAttribute('tabindex', '0');

function displayContactModal() {
    console.log("displayModal() called");
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
    keepFocusWithinModal();
    closeModalOnEscape();
    closeModalOnEnterForSvg();
}

function closeContactModal() {
    console.log("closeModal() called");
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    removeFocusTrap();
}

function closeModalOnEscape() {
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            closeContactModal();
        }
    });
}

function closeModalOnEnterForSvg() {
    closingButton.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            closeContactModal();
        }
    });
}

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

document.querySelector('.send-button').addEventListener('click', (event) => {
  event.preventDefault();
  console.log('Send button clicked');
});

function keepFocusWithinModal() {
    // Define the modal and its focusable elements
    const contactModal = document.querySelector('#contact_modal');  
    const focusableElementsString = 'button, input, textarea, .close-modal[tabindex]:not([tabindex="-1"])';
    let focusableElements = contactModal.querySelectorAll(focusableElementsString);

    document.addEventListener('focus', function (event) {
        if (contactModal.contains(event.target)) {
            // If focus is within modal, do nothing
        } else {
            // If focus moved outside modal, redirect it back to the modal
            event.stopPropagation();
            focusableElements[0].focus();
            // console.log('event.stopPropagation() called');
            // console.log('focusableElements[0].focus() called');	            
        }
    }, true); // Use capture phase to ensure the check happens before focus is set
}

function removeFocusTrap() {
    // Remove the focus event listener when the modal is closed or not needed
    document.removeEventListener('focus', keepFocusWithinModal, true);
}
