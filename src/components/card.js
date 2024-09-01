function deleteCard(event) {
    const eventTarget = event.target;
    eventTarget.closest('.card').remove();
}

function likeCard(event) {
    const eventTarget = event.target;
    eventTarget.classList.toggle('card__like-button_is-active');
}

function createCard(cardData, cardDelete, cardLike, cardPopup) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardItem = cardTemplate.querySelector('.card').cloneNode(true);

    cardItem.querySelector('.card__title').textContent = cardData.name;
    cardItem.querySelector('.card__image').src = cardData.link;
    cardItem.querySelector('.card__image').alt = cardData.alt;

    const deleteButton = cardItem.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', cardDelete);

    const likeButton = cardItem.querySelector('.card__like-button');
    likeButton.addEventListener('click', cardLike);

    const popupImage = cardItem.querySelector('.card__image');
    popupImage.addEventListener('click', function(evt) {
        cardPopup(cardData);
    })

    return cardItem;
}

export { deleteCard, createCard, likeCard };