"use strict";

/* global  displayLightbox, addMediaItem, clickLikesPhotos,*/

const contentBox = document.createElement('div');
contentBox.classList.add('display-content');

/**
 * Generates the profile header for a photographer.
 *
 * @param {Object} data - The data object containing information about the photographer.
 * @param {string} data.name - The name of the photographer.
 * @param {string} data.city - The city of the photographer.
 * @param {string} data.country - The country of the photographer.
 * @param {string} data.tagline - The tagline of the photographer.
 * @param {string} data.portrait - The filename of the photographer's portrait image.
 * @return {Object} - An object containing the name, picture URL, and the DOM element for the header.
 */
// eslint-disable-next-line no-unused-vars
function profileHeader(data) {
    const {name, city, country, tagline, portrait} = data;

    const PICTURE = `assets/photographers/${portrait}`;
    
    function getHeaderMediasDOM() {

        const section = document.querySelector( '.photograph-header' );
        const img = document.createElement( 'img' );
        const figcaption = document.createElement( 'figcaption' );
        const h1 = document.createElement( 'h1' );
        const strong = document.createElement( 'strong' );
        const pElt = document.createElement( 'p' );

        img.src = PICTURE;
        img.alt = 'Photo de profil de ' + name;
        h1.textContent = name;
        strong.textContent = `${city}, ${country}`;
        pElt.textContent = tagline;

        section.appendChild(img);
        section.appendChild(figcaption);
        figcaption.appendChild(h1);
        figcaption.appendChild(strong);
        figcaption.appendChild(pElt);

        return section;
    }
  
    return { name, PICTURE, getHeaderMediasDOM }
}


/**
 * Generates the function comment for the given function body.
 *
 * @param {object} data - The data object containing information about the media.
 * @param {string} data.id - The ID of the media.
 * @param {string} data.photographerId - The ID of the photographer.
 * @param {string} data.title - The title of the media.
 * @param {string} data.image - The image filename.
 * @param {string} data.video - The video filename.
 * @param {number} data.likes - The number of likes for the media.
 * @return {object} - An object containing the ID, photographer ID, title, PICTURE, VIDEO, likes, and getMainMediasDOM function.
 */
// eslint-disable-next-line no-unused-vars
function profileMedias(data) {
    const { id, photographerId, title, image, video, likes } = data;

    const PICTURE = `assets/media/${photographerId}/${image}`;
    const VIDEO = `assets/media/${photographerId}/${video}`;

    function getMainMediasDOM() {

        const ul = document.querySelector('.photograph-medias');
        const li = document.createElement('li');
        const figure = document.createElement('figure');
        const figcaption = document.createElement('figcaption');
        const pElement = document.createElement('p');
        const titleElement = document.createElement('h2');
        const likesElement = document.createElement('b');
        const hearts = document.createElement('i');

        titleElement.textContent = title;
        likesElement.textContent = `${likes}`;
        hearts.classList.add('fa-solid', 'fa-heart');
        hearts.setAttribute('tabindex', '0');
        hearts.setAttribute('aria-label', 'likes');
        likesElement.classList.add('likes');

        if (image) {
            const img = document.createElement('img');
            img.src = PICTURE;
            figure.appendChild(img);
            img.classList.add('open-lightbox');
            img.setAttribute('tabindex', '0');
            img.addEventListener('click', function () {
                displayLightbox(PICTURE, 'image', title);
            });
            img.addEventListener('keydown', function (event) {
                if (event.key === 'Enter') {
                    displayLightbox(PICTURE, 'image', title);
                }
            })
            img.setAttribute('alt', 'Photo ' + title + ', cliquez pour agrandir' );
            addMediaItem(PICTURE, 'image', title);
        }

        if (video) {
            const video = document.createElement('video');
            video.src = VIDEO;
            video.setAttribute('controls', '');
            figure.appendChild(video);
            video.addEventListener('click', function () {
                displayLightbox(VIDEO, 'video', title);
            });
            addMediaItem(VIDEO, 'video', title);
        }

        ul.appendChild(li);
        li.appendChild(figure);
        figure.appendChild(figcaption);
        figcaption.appendChild(titleElement);
        figcaption.appendChild(pElement);
        pElement.appendChild(likesElement);
        pElement.appendChild(hearts);
        
        clickLikesPhotos();
        

        return li;
    }

    return { id, photographerId, title, PICTURE, VIDEO, likes, getMainMediasDOM };

}
/**
 * Creates and appends a DOM element representing the likes of a post.
 *
 * @param {number} likes - The number of likes.
 * @return {HTMLElement} The DOM element representing the likes.
 */
// eslint-disable-next-line no-unused-vars
function getLikesDOM( likes ) {
    
    const likesElement = document.createElement('b');
    const likesNumber = document.createElement('span');
    const heartsElement = document.createElement('i');
    
    likesNumber.textContent = `${likes}`;
    likesElement.classList.add('likes');
    likesNumber.classList.add('likes-number');
    heartsElement.classList.add('fa-solid', 'fa-heart');

    contentBox.appendChild(likesElement);
    likesElement.appendChild(likesNumber);
    likesElement.appendChild(heartsElement);

    return contentBox;
}

/**
 * Creates a DOM element to display a price and adds it to the content box.
 *
 * @param {number} price - The price to be displayed.
 * @return {Element} The content box element with the added price element.
 */
// eslint-disable-next-line no-unused-vars
function getPriceDOM( price ) {
    
    const priceElement = document.createElement('p');
    
    priceElement.textContent = `${price}€ / jour`;
    
    contentBox.appendChild(priceElement);
    
    return contentBox;
}


