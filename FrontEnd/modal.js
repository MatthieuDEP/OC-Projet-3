// Affichage/fermeture de la modale 
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const openModalBtn = document.querySelector(".modalOpenButton");
const closeModalBtn = document.querySelector(".modalCloseButton");

const openModal = function () {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
};

openModalBtn.addEventListener("click", openModal);

const closeModal = function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
};

closeModalBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

const reponseModal = await fetch('http://localhost:5678/api/works');
const worksModal = await reponseModal.json();

function generateGalleryModal(worksModal) {
    for (let i = 0; i < worksModal.length; i++) {

        const projetModal = worksModal[i];
        const sectionGalleryModal = document.querySelector(".modalGallery");
        const projetElementModal = document.createElement("figure");
        const imageElementModal = document.createElement("img");
        imageElementModal.src = projetModal.imageUrl;
        const deleteWorkButton = document.createElement("button");
        const iconDeleteWorkButton = document.createElement("i");
        iconDeleteWorkButton.classList.add("fa-solid", "fa-trash-can");

        sectionGalleryModal.appendChild(projetElementModal);
        projetElementModal.appendChild(imageElementModal);
        projetElementModal.appendChild(deleteWorkButton);
        deleteWorkButton.appendChild(iconDeleteWorkButton);
    };
};

generateGalleryModal(worksModal);