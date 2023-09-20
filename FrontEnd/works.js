const reponse = await fetch('http://localhost:5678/api/works');
const works = await reponse.json();

function genererGallery(works) {
    for (let i = 0; i < works.length; i++) {

        const projet = works[i];
        // Récupération de l'élément du DOM qui accueillera les projets
        const sectionGallery = document.querySelector(".gallery");
        // Création balise dédiée à un projet
        const projetElement = document.createElement("figure");
        // Création des balises
        const imageElement = document.createElement("img");
        imageElement.src = projet.imageUrl;
        const nomElement = document.createElement("figcaption");
        nomElement.innerText = projet.title;

        // On rattache la balise figure a la section Gallery
        sectionGallery.appendChild(projetElement);
        // On rattache les balises img et figcaption à la balise figure
        projetElement.appendChild(imageElement);
        projetElement.appendChild(nomElement);

    };
};

genererGallery(works);

//Gestion des boutons
const boutonTous = document.querySelector(".btn-tous");
boutonTous.addEventListener("click", function () {
    document.querySelector(".gallery").innerHTML = "";
    genererGallery(works);
});

const boutonObjets = document.querySelector(".btn-objets");
boutonObjets.addEventListener("click", function () {
    const worksObjets = works.filter(function (work) {
        return work.category.id === 1;
    });
    document.querySelector(".gallery").innerHTML = "";
    genererGallery(worksObjets);
});

const boutonAppartements = document.querySelector(".btn-appartements");
boutonAppartements.addEventListener("click", function () {
    const worksAppartements = works.filter(function (work) {
        return work.category.id === 2;
    });
    document.querySelector(".gallery").innerHTML = "";
    genererGallery(worksAppartements);
});

const boutonHotels = document.querySelector(".btn-hotels");
boutonHotels.addEventListener("click", function () {
    const worksHotels = works.filter(function (work) {
        return work.category.id === 3;
    });
    document.querySelector(".gallery").innerHTML = "";
    genererGallery(worksHotels);
});

console.log(localStorage);

const editionBar = document.querySelector(".editionMode");
const btnLogin = document.querySelector(".btn-login");
const btnLogout = document.querySelector(".btn-logout");
const btnModify = document.querySelector(".portfolio-modify");
const filters = document.querySelector(".filters")

let tokenOk = window.localStorage.getItem("sophieBluelToken");
console.log(tokenOk);
if (tokenOk !== null) {
    editionBar.style.display = "flex";
    btnLogin.style.display = "none";
    btnLogout.style.display = "flex";
    btnModify.style.display = "flex";
    filters.style.display = "none";
};

btnLogout.addEventListener('click', function () {
    window.localStorage.removeItem("sophieBluelToken");
});