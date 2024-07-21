const placesList = document.querySelector('.places__list');

function deleteCard(event) {
    const eventTarget = event.target;
    eventTarget.closest('.card').remove();
}

function addCard(cardName, cardImage, cardDelete) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardItem = cardTemplate.querySelector('.card').cloneNode(true);

    cardItem.querySelector('.card__title').textContent = cardName;
    cardItem.querySelector('.card__image').src = cardImage;

    const deleteButton = cardItem.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', cardDelete);

    return cardItem;
}

initialCards.forEach(function (item) {
    cardItem = addCard(item.name, item.link, deleteCard);

    placesList.append(cardItem);
})