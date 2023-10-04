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

// Affichage de la galerie dans la modale
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

// Passage de vue "galerie" de la modale à la vue "ajout de photo" et retour à la vue précédente
const modalReturnButton = document.querySelector(".modalReturnButton");
const modalTitleGallery = document.querySelector(".modalTitleGallery");
const modalTitleAddPhoto = document.querySelector(".modalTitleAddPhoto");
const modalGallery = document.querySelector(".modalGallery");
const modalForm = document.querySelector(".modalForm");
const modalAddButton = document.querySelector(".modalAddButton");

const openAddPhotoModal = function () {
    modalReturnButton.classList.remove("hidden");
    modalTitleAddPhoto.classList.remove("hidden");
    modalForm.classList.remove("hidden");
    modalTitleGallery.classList.add("hidden");
    modalGallery.classList.add("hidden");
    modalAddButton.classList.add("hidden");
    modalGallery.innerHTML = "";
};

modalAddButton.addEventListener("click", openAddPhotoModal);

const returnToGalleryModal = function () {
    modalReturnButton.classList.add("hidden");
    modalTitleAddPhoto.classList.add("hidden");
    modalForm.classList.add("hidden");
    modalTitleGallery.classList.remove("hidden");
    modalGallery.classList.remove("hidden");
    modalAddButton.classList.remove("hidden");
    generateGalleryModal(worksModal);
};

modalReturnButton.addEventListener("click", returnToGalleryModal);

// SUPPRIMER UN PROJET


// AJOUTER UN PROJET

const form = document.getElementById("form");
const fileInput = document.getElementById("fileUpload");
const tokenJeton = window.localStorage.getItem('sophieBluelToken');

// Prévisualisation de l'image
fileInput.addEventListener("change", event => {
    const file = event.target.files[0];
    if (file) {
        const previewImg = document.createElement("img");
        const previewContainer = document.createElement("div");
        previewContainer.classList.add("modalPreviewContainer");
        const formWrapper = document.querySelector(".formWrapper");
        const formImage = document.querySelector(".formImage");

        const reader = new FileReader();

        reader.onload = event => {
            previewImg.setAttribute("src", event.target.result);
            previewContainer.appendChild(previewImg);
            formWrapper.insertBefore(previewContainer, formWrapper.childNodes[0]);
            formImage.classList.add("hidden");
        };

        reader.readAsDataURL(file);
    };
});

async function addWork() {

    const title = document.getElementById("title").value;
    const category = document.getElementById("category").value;
    const file = document.getElementById("fileUpload").files[0];

    
    let formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("image", file);

    const response = await fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {
            "Authorization" : `Bearer ${tokenJeton}`,
        },
        body: formData
    });

    const data = await response.json();
    console.log(data);
};

form.addEventListener("submit", event => {
    event.preventDefault();
    addWork();
});