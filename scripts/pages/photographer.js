"use strict";

//Mettre le code JavaScript lié à la page photographer.html

function mediaHeaderTemplate(data) {
    const {name, city, country, tagline} = data;

    function getMediaInformationsDOM() {
        
    const picture = `assets/photographers/${portrait}`;

    const section = document.querySelector('photograph-header');
    const img = document.createElement('img');
    const figcaption = document.createElement('figcaption');
    const h1 = document.createElement('h1');
    const strong = document.createElement('strong');
    const p = document.createElement('p');

    img.src = picture;
    h1.textContent = name;
    strong.textContent = `${city}, ${country}`;
    p.textContent = tagline;

    section.appendChild(img);
    section.appendChild(figcaption);
    figcaption.appendChild(h1);
    figcaption.appendChild(strong);
    figcaption.appendChild(p);

    return section;
    }
  
     return {getMediaInformationsDOM }
}