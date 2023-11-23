"use strict";

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