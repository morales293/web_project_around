const butEdit = document.querySelector(".main__button_edit");
const butAdd = document.querySelector(".main__button_add");
const butClose = document.querySelector(".popup__button_close");
const popButSave = document.querySelector(".popup__button_save");
const popButAdd = document.querySelector(".popup__button_add");
const popup = document.querySelector(".popup");
const form = document.querySelector(".popup__container");
const popimg = document.querySelector(".popup__image");
const gallery = document.querySelector(".main__elements");
const inName = document.querySelector(".main__paragraph_name");
const inAbout = document.querySelector(".main__paragraph_about");
const inpName = document.querySelector(".popup__input_name");
const inpAbout = document.querySelector(".popup__input_about");
const title = document.querySelector(".popup__subtitle");

const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "./images/image1.png",
  },
  {
    name: "Lago Louise",
    link: "./images/image2.png",
  },
  {
    name: "Montañas Calvas",
    link: "./images/image3.png",
  },
  {
    name: "Latemar",
    link: "./images/image4.png",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "./images/image5.png",
  },
  {
    name: "Lago di Braies",
    link: "./images/image6.png",
  },
];

// Abrir el popup //
inpName.addEventListener("input", validarCampos);
inpAbout.addEventListener("input", validarCampos);
function openEditAdd(e) {
  const butClass = e.target.classList;
  if (butClass.contains("main__button_edit")) {
    inpName.value = inName.textContent;
    inpAbout.value = inAbout.textContent;
    title.textContent = "Editar perfil";
    inpName.placeholder = "Nombre";
    inpAbout.placeholder = "Acerca de mí";
    popup.classList.add("popup_opened");
    popButSave.style.display = "block";
    popButAdd.style.display = "none";
    popimg.style.display = "none";
  } else if (butClass.contains("main__button_add")) {
    inpName.value = "";
    inpAbout.value = "";
    title.textContent = "Nuevo lugar";
    inpName.placeholder = "Título";
    inpAbout.placeholder = "Enlace a la imagen";
    popup.classList.add("popup_opened");
    popButSave.style.display = "none";
    popButAdd.style.display = "block";
    popimg.style.display = "none";
    validarCampos();
  }
}

function close() {
  popup.classList.remove("popup_opened");
  popimg.removeAttribute("style");
  form.removeAttribute("style");
}

function validarCampos() {
  popButAdd.disabled = !(inpName.value && inpAbout.value);
}

butEdit.addEventListener("click", openEditAdd);
butAdd.addEventListener("click", openEditAdd);
butClose.addEventListener("click", close);

// Guardar edición de perfil
function saveChangeEdit(e) {
  e.preventDefault();
  inName.textContent = inpName.value;
  inAbout.textContent = inpAbout.value;
  close();
}
form.addEventListener("submit", saveChangeEdit);

// Crear una tarjeta
function createCard(name, link) {
  const cardTemplate = document.querySelector(".main__template").content;
  const cardElement = cardTemplate
    .querySelector(".main__elements-card")
    .cloneNode(true);

  const cardImage = cardElement.querySelector(".main__elements-image");
  const likeButton = cardElement.querySelector(".main__button_like");
  const deleteButton = cardElement.querySelector(".main__button_trash");

  cardImage.src = link;
  cardImage.alt = name;

  // Imagen de "like"
  const likeIcon = document.createElement("img");
  likeIcon.src = "./images/Vector.svg"; // Icono del corazón
  likeIcon.alt = "like";
  likeIcon.classList.add("main__element-like");
  likeButton.appendChild(likeIcon);

  const trashIcon = document.createElement("img");
  trashIcon.src = "./images/Trash.svg";
  trashIcon.alt = "borrar";
  trashIcon.classList.add("main__element-trash");
  deleteButton.appendChild(trashIcon);

  cardElement.querySelector(".main__element-paragraph").textContent = name;

  likeButton.addEventListener("click", function (e) {
    e.currentTarget.classList.toggle("main__button_like_active");
  });

  deleteButton.addEventListener("click", function () {
    cardElement.remove();
  });

  cardImage.addEventListener("click", function () {
    imagePopup(name, link);
  });

  return cardElement;
}

// Inicializar las tarjetas iniciales
function cardsInitials() {
  initialCards.forEach((item) => {
    const cardElement = createCard(item.name, item.link);
    gallery.append(cardElement);
  });
}
cardsInitials();

// Agregar nueva tarjeta
popButAdd.addEventListener("click", function () {
  const cardElement = createCard(inpName.value, inpAbout.value);
  gallery.prepend(cardElement);
  close();
});

// Abrir imagen en popup
function imagePopup(name, link) {
  const popimag = popimg.querySelector(".popup__image");
  const poptxt = popimg.querySelector(".popup__paragraph");

  popimag.src = link;
  popimag.alt = name;
  poptxt.textContent = name;

  popup.classList.add("popup_opened");
  form.style.display = "none";
  popimg.style.display = "block";
}
