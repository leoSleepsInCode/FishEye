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
    const { id, photographerId, title, image, likes } = data;

    const PICTURE = `assets/media/${photographerId}/${image}`;

    function getMainMediasDOM() {

        const article = document.querySelector('.photograph-medias');
        const figure = document.createElement('figure');
        const img = document.createElement('img');
        const figcaption = document.createElement('figcaption');
        const titleElement = document.createElement('h2');
        const likesElement = document.createElement('b');

        img.src = PICTURE;
        titleElement.textContent = title;
        likesElement.textContent = `${likes}`;

        article.appendChild(figure);
        figure.appendChild(img);
        figure.appendChild(figcaption);
        figcaption.appendChild(titleElement);
        figcaption.appendChild(likesElement);

        return figure;
    }

    return { id, photographerId, title, PICTURE, likes, getMainMediasDOM };
}
