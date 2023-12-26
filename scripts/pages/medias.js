"use strict";

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
  try {
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
  } catch (error) {
    console.error('Error fetching photographer:', error);
  }
}


async function displayPrices() {
  try {
    const matchingPhotographer = await getMatchingPhotographer();
    console.log('Photographer (for prices):', matchingPhotographer); // Log for debugging

    let priceBoxElement = document.querySelector(".price-box");
    if (!priceBoxElement) {
      // Attendre 100 millisecondes et réessayer
      await new Promise(resolve => setTimeout(resolve, 100));
      priceBoxElement = document.querySelector(".price-box");
    }

    if (matchingPhotographer && matchingPhotographer.price !== undefined && priceBoxElement) {
      const priceBoxObj = priceBox({ price: matchingPhotographer.price });
      const priceBoxDOM = priceBoxObj.getPriceBoxDOM();

      const priceElement = document.createElement("div");
      priceElement.textContent = `Price: ${matchingPhotographer.price}`;

      priceBoxDOM.appendChild(priceElement);

      priceBoxElement.appendChild(priceBoxDOM);
    }
  } catch (error) {
    console.error('Error displaying prices:', error);
  }
}

// Function to display the likes
async function displayLikes() {
  try {
    const matchingPhotographer = await getMatchingPhotographer();
    console.log('Photographer (for likes):', matchingPhotographer); // Log for debugging

    if (matchingPhotographer) {
      const response = await fetch('data/photographers.json');
      const data = await response.json();
      const media = data.media;

      const likes = media
        .filter(mediaObj => mediaObj.photographerId === matchingPhotographer.id)
        .reduce((totalLikes, mediaObj) => totalLikes + mediaObj.likes, 0);

      const priceBoxObj = priceBox({ likes });
      const priceBoxDOM = priceBoxObj.getPriceBoxDOM();
      document.querySelector(".likes-box").appendChild(priceBoxDOM);
    }
  } catch (error) {
    console.error('Error displaying likes:', error);
  }
}


/**
 * Manages the likes for a given like button.
 *
 * @param {Element} likeButton - The like button element.
 * @return {Promise} - A promise that resolves when the likes have been updated.
 */
async function likesManagement(likeButton) {
  let likesElement = likeButton.parentElement.querySelector('.likes');
  let numberOfLikes = parseInt(likesElement.textContent, 10);
  let isLiked = likeButton.classList.contains('liked');

  if (!likeButton.disabled) {
    likeButton.disabled = true;

    if (!isLiked) {
      numberOfLikes++;
      likeButton.classList.add('liked');
    } else {
      numberOfLikes--;
      likeButton.classList.remove('liked');
    }

    likesElement.textContent = numberOfLikes;

    await displayLikes();

    await new Promise(resolve => setTimeout(resolve, 100));

    likeButton.disabled = false;
  }
}


/**
 * Adds event listeners to like buttons and calls the likesManagement function when a like button is clicked.
 *
 */
async function addLikes() {
  console.log('addLikes() called');

  const likeButtons = document.querySelectorAll('.fa-heart');
  console.log('likeButtons:', likeButtons);

  likeButtons.forEach((likeButton) => {
    likeButton.addEventListener('click', () => likesManagement(likeButton));
    console.log('likeButton:', likeButton);
  });
}


init();

displayPrices();

displayLikes();