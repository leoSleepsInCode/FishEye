"use strict";

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


function profileMedias(data) {
    const { id, photographerId, title, image, video, likes } = data;

    const PICTURE = `assets/media/${photographerId}/${image}`;
    const VIDEO = `assets/media/${photographerId}/${video}`;

    function getMainMediasDOM() {

        const ul = document.querySelector('.photograph-medias');
        const li = document.createElement('li');
        const figure = document.createElement('figure');
        const figcaption = document.createElement('figcaption');
        const titleElement = document.createElement('h2');
        const likesElement = document.createElement('b');
        const hearts = document.createElement('i');

        titleElement.textContent = title;
        likesElement.textContent = `${likes}`;
        hearts.classList.add('fa-solid', 'fa-heart');
        
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
        figcaption.appendChild(likesElement);
        likesElement.appendChild(hearts);

        return li;
    }

    return { id, photographerId, title, PICTURE, VIDEO, likes, getMainMediasDOM };
}

function priceBox(data) {
    const { price, likes } = data;

    function getPriceBoxDOM() {
        const likesBox = document.createElement('div');
        const likesElement = document.createElement('b');
        const heartsElement = document.createElement('i');
        const priceElement = document.createElement('p');

        likesElement.textContent = `${likes}`;
        heartsElement.classList.add('fa-solid', 'fa-heart');
        priceElement.textContent = `${price}€ / jour`;
        likesBox.classList.add('pricesBox');

        likesBox.appendChild(likesElement);
        likesElement.appendChild(heartsElement);
        likesBox.appendChild(priceElement);

        return likesBox;
    }

    return { getPriceBoxDOM };
}