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


/**
 * Asynchronously displays prices and likes.
 *
 * @return {Promise<void>} Promise that resolves when the function is complete.
 */
async function displayPricesAndLikes() {
  const likesBox = document.querySelector(".likes-box");

  const urlParams = new URLSearchParams(window.location.search);
  const matchingPhotographerId = parseInt(urlParams.get('id'), 10);

  const response = await fetch('data/photographers.json');
  const data = await response.json();

  const photographers = data.photographers;
  const media = data.media;

  const matchingPhotographer = photographers.find((photographer) => photographer.id === matchingPhotographerId);

  if (matchingPhotographer) {
    const { price } = matchingPhotographer;
    const likes = media
      .filter((mediaObj) => mediaObj.photographerId === matchingPhotographer.id)
      .reduce((totalLikes, mediaObj) => totalLikes + mediaObj.likes, 0);

    const priceBoxObj = priceBox({ price, likes });
    const priceBoxDOM = priceBoxObj.getPriceBoxDOM();
    likesBox.appendChild(priceBoxDOM);
  }
}

/**
 * Adds event listeners to like buttons and updates the number of likes.
 *
 * @return {Promise} - A promise that resolves when the function completes.
 */
async function addLikes() {
  console.log('addLikes() called');

  const likeButtons = document.querySelectorAll('.fa-heart');
  console.log('likeButtons:', likeButtons);

  likeButtons.forEach((likeButton) => {
    likeButton.addEventListener('click', async () => {
      console.log('Button clicked');

      let likesElement = likeButton.parentElement.querySelector('.likes');
      let numberOfLikes = parseInt(likesElement.textContent, 10);
      let isLiked = likeButton.classList.contains('liked');

      if (!likeButton.disabled) {
        likeButton.disabled = true;

        if (!isLiked) {
          numberOfLikes++;
          console.log('Incremented numberOfLikes:', numberOfLikes);
          likeButton.classList.add('liked');
        } else {
          numberOfLikes--;
          console.log('Decremented numberOfLikes:', numberOfLikes);
          likeButton.classList.remove('liked');
        }

        likesElement.textContent = numberOfLikes;

        await new Promise(resolve => setTimeout(resolve, 1000));

        likeButton.disabled = false;
      }
    });
  });
}

init();

displayPricesAndLikes();
