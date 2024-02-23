"use strict";

// const openButton = document.querySelector(".open-modal");
const closingButton = document.querySelector('.close-modal');
// const sendingButton = document.querySelector('.send-button');

closingButton.setAttribute('tabindex', '0');

/**
 * Display the contact modal and set up event listeners.
 *
 * @param {} - No parameters
 * @return {} - No return value
 */
function displayContactModal() {
    console.log("displayModal() called");
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
    keepFocusWithinModal();
    closeModalOnEscape();
    closeModalOnEnterForSvg();
}

/**
 * Closes the contact modal by setting its display style to "none" and removing focus trap.
 *
 */
function closeContactModal() {
    console.log("closeModal() called");
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    removeFocusTrap();
}

/**
 * Listens for the 'Escape' key press and closes the contact modal if detected.
 *
 * @param {event} event - The keyboard event object
 * @return {void} 
 */
function closeModalOnEscape() {
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            closeContactModal();
        }
    });
}

/**
 * Listens for keydown events on the closing button and closes the contact modal when the 'Enter' key is pressed.
 *
 */
function closeModalOnEnterForSvg() {
    closingButton.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            closeContactModal();
        }
    });
}

/**
 * Asynchronously displays the names of photographers based on the URL parameter.
 *
 * @return {Object} The matching photographer object.
 */
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

/**
 * Keep the focus within the modal to prevent it from moving outside.
 * @param {type} event - the focus event object
 * @return {void} 
*/
function keepFocusWithinModal() {
    const contactModal = document.querySelector('#contact_modal');  
    const allFocusableElements = '.send-button, #prenom, #nom, #email, #message, .close-modal[tabindex]:not([tabindex="-1"])';
    let focusableElements = contactModal.querySelectorAll(allFocusableElements);
    
    document.addEventListener('focus', function (event) {
        if (contactModal.contains(event.target)) {
        } else {
            event.stopPropagation();
            focusableElements[0].focus();     
        }
    }, true); 
}

/**
 * Remove the focus event listener when the modal is closed or not needed.
*/
function removeFocusTrap() {
    // Remove the focus event listener when the modal is closed or not needed
    document.removeEventListener('focus', keepFocusWithinModal, true);
}

document.querySelector('.contact_button').addEventListener('click', displayNames);

document.querySelector('.send-button').addEventListener('click', (event) => {
  event.preventDefault();
  const firstName = document.getElementById('prenom').value;
  const name = document.getElementById('nom').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  
  console.log(`First Name: ${firstName}, Name: ${name}, Email: ${email}, Message: ${message}`);
});

 