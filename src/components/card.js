function deleteCard(event) {
    const eventTarget = event.target;
    eventTarget.closest('.card').remove();
}

function likeCard(event) {
    const eventTarget = event.target;
    eventTarget.classList.toggle('card__like-button_is-active');
}

function createCard(cardData, deleteCard, likeCard, openPopupCard) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardItem = cardTemplate.querySelector('.card').cloneNode(true);

    const cardImage = cardItem.querySelector('.card__image');
    const cardTitle = cardItem.querySelector('.card__title');

    cardTitle.textContent = cardData.name;
    cardImage.src = cardData.link;
    cardImage.alt = cardData.alt;

    const deleteButton = cardItem.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', deleteCard);

    const likeButton = cardItem.querySelector('.card__like-button');
    likeButton.addEventListener('click', likeCard);

    cardImage.addEventListener('click', function(evt) {
        openPopupCard(cardData);
    })

    return cardItem;
}

export { deleteCard, createCard, likeCard };