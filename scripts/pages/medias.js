"use strict";


const displayBox = document.querySelector('.display-box');
/**
 * Retrieves the media from the "photographers.json" file.
 *
 * @return {Array} An array of media objects.
 */
async function getMedias() {
    const response = await fetch("data/photographers.json");
    const { media} = await response.json();

    return media ;
}

/**
 * Display the photographer's medias on the webpage.
 *
 * @param {Array} medias - An array of media objects.
 * @return {void} This function does not return a value.
 */
async function displayPhotographerMedias(medias) {
    const photographersWorksSection = document.querySelector(".photograph-medias");

    const urlParams = new URLSearchParams(window.location.search);
    const matchingPhotographerId = parseInt(urlParams.get('id'), 10);

    medias.forEach((media) => {
        if (media.photographerId === matchingPhotographerId) {
            const photographerWorks = profileMedias(media);
            const worksInformations = photographerWorks.getMainMediasDOM();

            photographersWorksSection.appendChild(worksInformations); 
        }
    });
}

/**
 * Initializes the function.
 *
 * @return {Promise<void>} - A Promise that resolves with no value.
 */
async function init() {
    const media = await getMedias();
    displayPhotographerMedias(media);
}

async function getMatchingPhotographer() {

    const urlParams = new URLSearchParams(window.location.search);
    const matchingPhotographerId = parseInt(urlParams.get('id'), 10);

    const response = await fetch('data/photographers.json');
    const data = await response.json();

    const photographers = data.photographers;

    const matchingPhotographer = photographers.find(photographer => photographer.id === matchingPhotographerId);

    if (matchingPhotographer) {
      return matchingPhotographer;
    } else {
      throw new Error('Matching photographer not found');
    }
}

async function displayLikes() {
  console.log('displayLikes() called');
  try {

    const matchingPhotographer = await getMatchingPhotographer();

    if (matchingPhotographer) {
      const response = await fetch('data/photographers.json');
      const data = await response.json();
      const media = data.media;

      const likes = media
        .filter(mediaObj => mediaObj.photographerId === matchingPhotographer.id)
        .reduce((totalLikes, mediaObj) => totalLikes + mediaObj.likes, 0);

      const likesBoxObj = getLikesDOM( likes );
      displayBox.appendChild(likesBoxObj);
    }
  } catch (error) {
    console.error('Error displaying likes:', error);
  }
}

async function displayPrices() {
  console.log('displayPrices() called');
  try {
    const matchingPhotographer = await getMatchingPhotographer();

    if (matchingPhotographer) {
      const response = await fetch('data/photographers.json');
      const data = await response.json();
      const photographers = data.photographers;

      const price = photographers
        .filter(photographer => photographer.id === matchingPhotographer.id)
        .reduce((totalPrice, photographer) => totalPrice + photographer.price, 0);
        
      const priceBoxObj = getPriceDOM( price );
      displayBox.appendChild(priceBoxObj);
    }
  } catch (error) {
    console.error('Error displaying prices:', error);
  }
}

async function controlLikesPhotos(likeButton) {
  let likesElement = likeButton.parentElement.querySelector('.likes');
  let numberOfLikes = parseInt(likesElement.textContent, 10);
  let isLiked = likeButton.classList.contains('liked');

  if (!likeButton.disabled) {
    likeButton.disabled = true;

    if (!isLiked) {
      numberOfLikes++;
      likeButton.classList.add('liked');
      updateLikesDisplay(1);
    } else {
      numberOfLikes--;
      likeButton.classList.remove('liked');
      updateLikesDisplay(-1);
    }

    likesElement.textContent = numberOfLikes;

    await new Promise(resolve => setTimeout(resolve, 100));

    likeButton.disabled = false;
  }
}

function clickLikesPhotos() {
  // console.log('addLikes() called');

  const likeButtons = document.querySelectorAll('.fa-heart');
  // console.log('likeButtons:', likeButtons);

  likeButtons.forEach((likeButton) => {
    likeButton.addEventListener('click', () => controlLikesPhotos(likeButton));
    // console.log('likeButton:', likeButton);
    likeButton.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      controlLikesPhotos(likeButton);
    }
    });    
  });
}

function updateLikesDisplay(delta) {
  const likesNumber = document.querySelector('.likes-number');
  let totalLikes = parseInt(likesNumber.textContent, 10); // Récupère la valeur actuelle

  totalLikes += delta; // Ajuste le total basé sur le delta

  likesNumber.textContent = totalLikes; // Met à jour l'affichage
}

init();

displayLikes();

displayPrices();

// document.addEventListener('DOMContentLoaded', () => {
//   const dropdownIcon = document.querySelector('.sort-icon');
//   const sortOptions = document.querySelector('.sort-menu');

//   // Toggle the display of the sortOptions
//   dropdownIcon.addEventListener('click', () => {
//     const isHidden = sortOptions.hidden;
//     sortOptions.hidden = !isHidden;
//   });

//   // Hide the sortOptions when clicking outside
//   document.addEventListener('click', (event) => {
//     if (!event.target.matches('.sort-icon') && !event.target.matches('#sort-button')) {
//       sortOptions.hidden = true;
//     }

//   });

//   // Update button text and hide options on selection
//   document.querySelectorAll('.sort-option').forEach(option => {
//     option.addEventListener('click', function () {
//       document.getElementById('sort-button').textContent = this.textContent;
//       sortOptions.hidden = true;
//     });
//   });
// });


function updateSortMenuVisibility() {
  const sortButtonText = document.getElementById('sort-button').textContent.trim();

  document.querySelectorAll('.sort-option').forEach(option => {
    if (option.textContent.trim() === sortButtonText) {
      option.style.display = 'none';
    } else {
      option.style.display = 'block';
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const dropdownIcon = document.querySelector('.sort-icon');
  const sortOptions = document.querySelector('.sort-menu');

  dropdownIcon.addEventListener('click', () => {
    const isHidden = sortOptions.hidden;
    sortOptions.hidden = !isHidden;
    updateSortMenuVisibility(); 

  });

  document.addEventListener('click', (event) => {
    if (!event.target.matches('.sort-icon') && !event.target.matches('#sort-button')) {
      sortOptions.hidden = true;
    }
  });

  document.querySelectorAll('.sort-option').forEach(option => {
    option.addEventListener('click', function () {
      document.getElementById('sort-button').textContent = this.textContent.trim();
      sortOptions.hidden = true;
      updateSortMenuVisibility(); 
    });
  });

  updateSortMenuVisibility();
});
