"use strict";

function profileHeader(data) {
    const {name, city, country, tagline, portrait} = data;

    const PICTURE = `assets/photographers/${portrait}`;
    
    function getMediaInformationsDOM() {

        const section = document.querySelector('.photograph-header');
        const img = document.createElement('img');
        const figcaption = document.createElement('figcaption');
        const h2 = document.createElement('h2');
        const strong = document.createElement('strong');
        const pElt = document.createElement('p');

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
  
    return { name, PICTURE, getMediaInformationsDOM }
}


