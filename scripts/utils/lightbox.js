"use strict";

// const openingLightbox = document.querySelector(".open-lightbox");
// const closingLightbox = document.querySelector(".close-lightbox");

const lightboxModal = document.querySelector(".lightbox");
const images = document.querySelectorAll('img');



function displayLightbox() {
    console.log("displayLightbox() called");
    const lightboxContainer = document.getElementById("lightbox-container");
    lightboxContainer.style.display = "block";
}

function closeLightbox() {
    console.log("closeLightbox() called");
    const lightboxContainer = document.getElementById("lightbox-container");
    lightboxContainer.style.display = "none";
}

// document.addEventListener("DOMContentLoaded", function () {
//     console.log("DOMContentLoaded() called");

//     if (openingLightbox) {
//         openingLightbox.addEventListener("click", displayLightbox);
//         console.log("openingLightbox:", openingLightbox);
//     }

//     if (closingLightbox) {
//         closingLightbox.addEventListener("click", closeLightbox);
//         console.log("closingLightbox:", closingLightbox);
//     }
// });

// let currentImageIndex = -1;
// Add click event listeners to each image
// images.forEach((image, index) => {
//     image.addEventListener('click', () => {
//         console.log(`Image ${index} clicked`);
//         // Set the modal content to the clicked image
//         const clickedImage = image.cloneNode();
//         // lightboxModal.innerHTML = '';
//         lightboxModal.appendChild(clickedImage);
//         currentImageIndex = index;
//     });
// });

// // Function to navigate to the previous image
// function navigatePrevious() {
//     currentImageIndex--;
//     if (currentImageIndex < 0) {
//         currentImageIndex = images.length - 1;
//     }
//     const previousImage = images[currentImageIndex].cloneNode();
//     lightboxModal.innerHTML = '';
//     lightboxModal.appendChild(previousImage);
// }

// // Function to navigate to the next image
// function navigateNext() {
//     currentImageIndex++;
//     if (currentImageIndex >= images.length) {
//         currentImageIndex = 0;
//     }
//     const nextImage = images[currentImageIndex].cloneNode();
//     lightboxModal.innerHTML = '';
//     lightboxModal.appendChild(nextImage);
// }

// // Add navigation event listeners to the modal (e.g., chevrons)


// images.forEach((image, index) => {
//     image.addEventListener('click', () => {
//         console.log(`Image ${index} clicked`);

//         // Create a new image element
//         const newImage = document.createElement('img');
//         newImage.src = image.src;  // Set the source of the new image

//         // Clear the previous content and append the new image
//         lightboxModal.innerHTML = '';
//         lightboxModal.appendChild(newImage);

//         currentImageIndex = index;
//     });
// });

// function navigatePrevious() {
//     currentImageIndex = (currentImageIndex > 0) ? currentImageIndex - 1 : images.length - 1;

//     const newImage = document.createElement('img');
//     newImage.src = images[currentImageIndex].src;

//     lightboxModal.innerHTML = '';
//     lightboxModal.appendChild(newImage);
// }

// function navigateNext() {
//     currentImageIndex = (currentImageIndex < images.length - 1) ? currentImageIndex + 1 : 0;

//     const newImage = document.createElement('img');
//     newImage.src = images[currentImageIndex].src;

//     lightboxModal.innerHTML = '';
//     lightboxModal.appendChild(newImage);
// }

// function initializeLightbox() {
//     const previousButton = document.querySelector('.fa-chevron-left');
//     const nextButton = document.querySelector('.fa-chevron-right');

//     if (previousButton) {
//         previousButton.addEventListener('click', navigatePrevious);
//     }

//     if (nextButton) {
//         nextButton.addEventListener('click', navigateNext);
//     }
// }

// document.addEventListener("DOMContentLoaded", initializeLightbox);

