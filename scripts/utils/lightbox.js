/* eslint-disable no-unused-vars */
"use strict";

const lightboxModal = document.querySelector(".lightbox-content");
const lightboxContainer = document.getElementById("lightbox-container");
const leftChevron = document.querySelector('.fa-chevron-left');
const rightChevron = document.querySelector('.fa-chevron-right');
const closingIcon = document.querySelector('.close-lightbox');

closingIcon.setAttribute('tabindex', '0');

let mediaItems = [];
let currentIndex = 0; 

/**
 * Displays a lightbox with media content and an optional title.
 *
 * @param {string} source - The source of the media content.
 * @param {string} type - The type of the media content ('image' or 'video').
 * @param {string} title - The title to be displayed (optional).
 */
function displayLightbox(source, type, title) {
    // console.log("displayLightbox() called with source:", source, "type:", type, "title:", title);

    lightboxModal.innerHTML = '';

    let mediaToShow = null;
    let titleToShow = null; // Correctly declare titleToShow

    if (type === 'image') {
        mediaToShow = document.createElement('img');
        mediaToShow.src = source;
        mediaToShow.setAttribute('alt', 'Version agrandie de la photo ' + title );
        mediaToShow.setAttribute('tabindex', '1');
    } else if (type === 'video') {
        mediaToShow = document.createElement('video');
        mediaToShow.src = source;
        mediaToShow.setAttribute('controls', '');
    }

    if (title) {
        titleToShow = document.createElement('p');
        titleToShow.textContent = title;
        titleToShow.classList.add('lightbox-title');
    }

    if (mediaToShow) {
        mediaToShow.classList.add('lightbox-media');
        lightboxModal.appendChild(mediaToShow);
        if (titleToShow) {
            lightboxModal.appendChild(titleToShow); // Append the title if it exists
        }
        lightboxContainer.style.display = "block";
    } else {
        console.error("Invalid media type or source");
    }

    maintainFocusWithinModal();
    setupCloseModalOnEscape();
    setupCloseModalOnEnterForIcon();
}

/**
 * Closes the lightbox by hiding the lightbox container and logging a message.
 *
 * @param {type} paramName - description of parameter
 * @return {type} description of return value
 */
function closeLightbox() {
    console.log("closeLightbox() called");
    lightboxContainer.style.display = "none";
    deactivateFocusTrap();
}

/**
 * Sets up the functionality to close a modal when the Escape key is pressed.
 *
 * @param {object} event - The keyboard event object.
 * @return {void} 
 */
function setupCloseModalOnEscape() {
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            closeLightbox();
        }
    });
}

/**
 * Sets up the event listener to close the modal when the Enter key is pressed on the closing icon.
 *
 */
function setupCloseModalOnEnterForIcon() {
    closingIcon.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            closeLightbox();
        }
    });
}

/**
 * Adds a media item to the mediaItems array.
 *
 * @param {type} source - the source of the media item
 * @param {type} type - the type of the media item
 * @param {type} title - the title of the media item
 * @return {type} undefined
 */
function addMediaItem(source, type, title) {
    // console.log("addMediaItem() called with source:", source, "and type:", type, "and title:", title);
    mediaItems.push({ source, type, title });
}

/**
 * Shows a specific media item in a lightbox.
 *
 * @param {number} index - The index of the media item to be shown.
 * @return {undefined} This function does not return a value.
 */
function showMedia(index) {
    if (index >= 0 && index < mediaItems.length) {
        currentIndex = index;
        const { source, type } = mediaItems[index];
        displayLightbox(source, type);
    }
}

/**
 * Shows the next media item in the list.
 *
 * @return {undefined} No return value.
 */
function showNextMedia() {
    const nextIndex = (currentIndex + 1) % mediaItems.length;
    const nextItem = mediaItems[nextIndex];
    if (nextItem) {
        currentIndex = nextIndex; // Update the current index
        displayLightbox(nextItem.source, nextItem.type, nextItem.title);
    }
}

/**
 * Displays the previous media item in the lightbox.
 *
 * @param {number} currentIndex - The index of the current media item.
 * @param {Array} mediaItems - An array of media items.
 * @return {void} This function does not return a value.
 */
function showPreviousMedia() {
    const previousIndex = (currentIndex - 1 + mediaItems.length) % mediaItems.length;
    const previousItem = mediaItems[previousIndex];
    if (previousItem) {
        currentIndex = previousIndex; // Update the current index
        displayLightbox(previousItem.source, previousItem.type, previousItem.title);
    }
}


/**
 * Sets event listeners for left and right chevrons and sets their tabindex.
 */
function setChevrons () {
    leftChevron.addEventListener('click', showPreviousMedia);
    leftChevron.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            showPreviousMedia();
        }
    })

    rightChevron.addEventListener('click', showNextMedia);
    rightChevron.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            showNextMedia();
        }
    })

    leftChevron.setAttribute('tabindex', '0');
    rightChevron.setAttribute('tabindex', '0');
}

setChevrons();

/**
 * Function to maintain focus within a modal.
 *
 * @param {event} event - The event object
 * @return {undefined} 
 */
function maintainFocusWithinModal() {
    // Define the modal and its focusable elements
    const modal = document.querySelector('#lightbox-container'); 
    const focusableElementsString = '.fa-chevron-left, .fa-chevron-right, .close-lightbox[tabindex]:not([tabindex="-1"])';
    let focusableElements = modal.querySelectorAll(focusableElementsString);

    document.addEventListener('focus', function (event) {
        if (modal.contains(event.target)) {
            // If focus is within modal, do nothing
        } else {
            // If focus moved outside modal, redirect it back to the modal
            event.stopPropagation();
            focusableElements[0].focus();
        }
    }, true); // Use capture phase to ensure the check happens before focus is set
}

/**
 * Remove the focus event listener when the modal is closed or not needed
 *
 * @param {Event} event - The event to be removed
 * @return {void} 
 */
function deactivateFocusTrap() {
    // Remove the focus event listener when the modal is closed or not needed
    document.removeEventListener('focus', maintainFocusWithinModal, true);
}

