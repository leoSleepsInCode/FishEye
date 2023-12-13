"use strict";

/**
 * Generates a photographers gallery.
 *
 * @param {object} data - The data object containing information about the photographer.
 * @param {string} data.id - The ID of the photographer.
 * @param {string} data.name - The name of the photographer.
 * @param {string} data.city - The city where the photographer is located.
 * @param {string} data.country - The country where the photographer is located.
 * @param {string} data.tagline - The tagline of the photographer.
 * @param {string} data.price - The price of the photographer's services.
 * @param {string} data.portrait - The filename of the photographer's portrait image.
 * @return {object} - An object containing the photographer's name, the filename of the photographer's portrait image, and a function to get the user card DOM element.
 */
function photographersGallery(data) {
    const { id, name, city, country, tagline, price, portrait } = data;

    const PICTURE = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const a           = document.createElement( 'a' );
        const figure      = document.createElement( 'figure' );
        const img         = document.createElement( 'img' );
        const figcaption  = document.createElement( 'figcaption' );
        const h2          = document.createElement( 'h2' );
        const strong      = document.createElement( 'strong' );
        const pElt        = document.createElement( 'p' );
        const bElt        = document.createElement( 'b' );

        a.href             = `photographer.html?id=${id}`;
        img.src            = PICTURE;
        h2.textContent     = name;
        strong.textContent = `${city}, ${country}`;
        pElt.textContent   = tagline;
        bElt.textContent   = `${price}€/jour`;

        a.focus();

        a.appendChild(figure);
        figure.appendChild(img);
        figure.appendChild(figcaption);
        figcaption.appendChild(h2);
        figcaption.appendChild(strong);
        figcaption.appendChild(pElt);
        figcaption.appendChild(bElt);

        return (a);
    }

    return { name, PICTURE, getUserCardDOM }
}