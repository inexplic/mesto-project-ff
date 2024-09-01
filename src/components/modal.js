function openModal(modalWindow) {
    modalWindow.classList.add('popup_is-opened')
}

function openPopupImage(cardItem) {
    const popupImage = document.querySelector('.popup__image');
    popupImage.src = cardItem.link;

    const popupCaption = document.querySelector('.popup__caption');
    popupCaption.textContent = cardItem.name;

    popupImage.closest('.popup_type_image').classList.add('popup_is-opened');
}

function closeModal(modalWindow) {
    modalWindow.classList.remove('popup_is-opened')
}

export { openModal, closeModal, openPopupImage };