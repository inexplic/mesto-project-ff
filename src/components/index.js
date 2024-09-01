import '../pages/index.css';
import { initialCards } from './cards';
import { deleteCard, createCard, likeCard } from './card';
import { openModal, closeModal, closeByEsc } from './modal';

const placesList = document.querySelector('.places__list');

const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');

const popupContainer = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

const formEdit = document.forms['edit-profile'];
const nameInput = formEdit.elements.name;
const employmentInput = formEdit.elements.description;

const profTitle = document.querySelector('.profile__title');
const profDescription = document.querySelector('.profile__description');

const formCard = document.forms['new-place'];
const placeNameInput = formCard.elements['place-name'];
const linkInput = formCard.elements.link;

// функция открытия изображения карточки
function openPopupImage(cardItem) {
    popupImage.src = cardItem.link;
    popupImage.alt = cardItem.alt;
    popupCaption.textContent = cardItem.name;

    openModal(popupTypeImage);

    document.addEventListener('keydown', closeByEsc);
}

// 6 карточек при загрузке страницы
initialCards.forEach(function (item) {
    const cardItem = createCard(item, deleteCard, likeCard, openPopupImage);
    placesList.append(cardItem);
})

// открытие модального окна для изменения профиля
buttonEdit.addEventListener('click', function(evt) {
    openModal(popupEdit);

    nameInput.value = profTitle.textContent;
    employmentInput.value = profDescription.textContent;
})

// открытие модального окна для добавления карточки
buttonAdd.addEventListener('click', function(evt) {
    openModal(popupNewCard);

    placeNameInput.value = '';
    linkInput.value = '';
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

// обработчик отправки формы редактора профиля
function handleEditFormSubmit(evt) {
    evt.preventDefault();

    profTitle.textContent = nameInput.value;
    profDescription.textContent = employmentInput.value;

    closeModal(popupEdit);
}

// слушатель отправки формы редактора профиля
formEdit.addEventListener('submit', handleEditFormSubmit)

// обработчик отправки формы добавления карточки
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

    const cardItem = createCard(newCard, deleteCard, likeCard, openPopupImage);
    placesList.prepend(cardItem);

    closeModal(popupNewCard);
}

// слушатель отправки формы добавления карточки
formCard.addEventListener('submit', handleAddFormSubmit);

