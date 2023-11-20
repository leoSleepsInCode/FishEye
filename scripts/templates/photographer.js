"use strict";

function photographerTemplate(data) {
    const { id, name, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const a          = document.createElement( 'a' );
        const figure     = document.createElement( 'figure' );
        const img        = document.createElement( 'img' );
        const figcaption = document.createElement( 'figcaption' );
        const h2         = document.createElement( 'h2' );
        const strong     = document.createElement( 'strong' );
        const p          = document.createElement( 'p' );
        const b          = document.createElement( 'b' );

        a.href             = `photographer.html?id=${id}`;
        img.src            = picture;
        h2.textContent     = name;
        strong.textContent = `${city}, ${country}`;
        p.textContent      = tagline;
        b.textContent      = `${price}€/jour`;

        a.focus();

        a.appendChild(figure);
        figure.appendChild(img);
        figure.appendChild(figcaption);
        figcaption.appendChild(h2);
        figcaption.appendChild(strong);
        figcaption.appendChild(p);
        figcaption.appendChild(b);

        return (a);
    }

    return { name, picture, getUserCardDOM }
}