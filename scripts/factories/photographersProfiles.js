"use strict";

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
function profileHeader(data) {
    const {name, city, country, tagline, portrait} = data;

    const PICTURE = `assets/photographers/${portrait}`;
    
    function getHeaderMediasDOM() {

        const section = document.querySelector( '.photograph-header' );
        const img = document.createElement( 'img' );
        const figcaption = document.createElement( 'figcaption' );
        const h2 = document.createElement( 'h2' );
        const strong = document.createElement( 'strong' );
        const pElt = document.createElement( 'p' );

        img.src = PICTURE;
        h2.textContent = name;
        strong.textContent = `${city}, ${country}`;
        pElt.textContent = tagline;

        section.appendChild(img);
        section.appendChild(figcaption);
        figcaption.appendChild(h2);
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
        likesElement.classList.add('likes');
        
        if (image) {
            const img = document.createElement('img');
            img.src = PICTURE;
            figure.appendChild(img);
        }

        if (video) {
            const video = document.createElement('video');
            video.src = VIDEO;
            video.setAttribute('controls', '');
            figure.appendChild(video);
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

function getPriceDOM( price ) {
    
    const priceElement = document.createElement('p');
    
    priceElement.textContent = `${price}€ / jour`;
    
    contentBox.appendChild(priceElement);
    
    return contentBox;
}


