import '../pages/index.css';
import { createCard } from './card.js';
import { openModal, closeModal, closeByEsc } from './modal.js';
import { enableValidation, clearValidation, validationConfig } from './validation';
import { patchUserInfo, getUserInfo, getAllCards, createNewCard, patchAvatar } from './api.js';

const placesList = document.querySelector('.places__list');

const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');

const popupContainer = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupEditAvatar = document.querySelector('.popup_type_edit-avatar')
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

const formEdit = document.forms['edit-profile'];
const nameInput = formEdit.elements.name;
const employmentInput = formEdit.elements.description;

const profTitle = document.querySelector('.profile__title');
const profDescription = document.querySelector('.profile__description');
const profAvatar = document.querySelector('.profile__image');

const formCard = document.forms['new-place'];
const placeNameInput = formCard.elements['place-name'];
const linkInput = formCard.elements.link;

const formEditAvatar = document.forms['edit-profile-avatar'];
const avatarLinkInput = formEditAvatar.elements['avatar-link'];

// функция открытия изображения карточки
function openPopupImage(cardItem) {
    popupImage.src = cardItem.link;
    popupImage.alt = cardItem.alt;
    popupCaption.textContent = cardItem.name;

    openModal(popupTypeImage);

    document.addEventListener('keydown', closeByEsc);
}

// открытие модального окна для изменения профиля
buttonEdit.addEventListener('click', function(evt) {
    openModal(popupEdit);

    nameInput.value = profTitle.textContent;
    employmentInput.value = profDescription.textContent;

    clearValidation(formEdit, validationConfig);
})

// открытие модального окна для добавления карточки
buttonAdd.addEventListener('click', function(evt) {
    openModal(popupNewCard);

    placeNameInput.value = '';
    linkInput.value = '';

    clearValidation(formCard, validationConfig);
})

profAvatar.addEventListener('click', function(evt) {
    openModal(popupEditAvatar);
})

// слушатель для закрытия модальных окон
popupContainer.forEach(function(popup) {
    popup.addEventListener('click', function(evt) {
        if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) {
            const popupClose = evt.target.closest('.popup');
            closeModal(popupClose);
        }
    })
})

// обработчик отправки формы редактора профиля и обновление данных на сервере
function handleEditFormSubmit(evt) {
    evt.preventDefault();

    const profInfo = {};

    profInfo.name = nameInput.value;
    profInfo.about = employmentInput.value;

    patchUserInfo(profInfo)
        .then((data) => {
            profTitle.textContent = data.name;
            profDescription.textContent = data.about;
            console.log(data);
            closeModal(popupEdit);
        })
        .catch((error) => {
            console.error('Ошибка!', error);
        })
}

// слушатель отправки формы редактора профиля
formEdit.addEventListener('submit', handleEditFormSubmit)

// обработчик отправки формы добавления карточки и добавление карточки на сервере
function handleAddFormSubmit(evt) {
    evt.preventDefault();
    const newCard = {
        name: '',
        link: '',
        alt: ''
    }
    newCard.name = placeNameInput.value;
    newCard.link = linkInput.value;
    newCard.alt = `${placeNameInput.value}`;

    createNewCard(newCard)
        .then((data) => {
            const cardItem = createCard(data, openPopupImage);
            placesList.prepend(cardItem);
            
            closeModal(popupNewCard);
        })
        .catch((err) => {
            console.log(err);
        })
}

// слушатель отправки формы добавления карточки
formCard.addEventListener('submit', handleAddFormSubmit);

// валидация форм
enableValidation(validationConfig);

// отображение карточек с сервера на странице
Promise.all([getUserInfo(), getAllCards()])
.then(([profInfo, cards]) => {
    profTitle.textContent = profInfo.name;
    profDescription.textContent = profInfo.about;

    cards.forEach((item) => {
        const cardItem = createCard(item, openPopupImage, profInfo);
    
        const ownerId = item.owner._id;
        const userId = profInfo._id;

        if (ownerId !== userId) {
            const deleteButton = cardItem.querySelector('.card__delete-button');
            deleteButton.style.display = 'none';
        }

        placesList.append(cardItem);
  });
})
.catch((err) => {
    console.log(err);
})