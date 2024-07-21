const placesList = document.querySelector('.places__list');
let cardData = {
    name: '',
    link: '',
    alt: '',
}

function deleteCard(event) {
    const eventTarget = event.target;
    eventTarget.closest('.card').remove();
}

function createCard(cardData, cardDelete) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardItem = cardTemplate.querySelector('.card').cloneNode(true);

    cardItem.querySelector('.card__title').textContent = cardData.name;
    cardItem.querySelector('.card__image').src = cardData.link;
    cardItem.querySelector('.card__image').alt = cardData.alt;

    const deleteButton = cardItem.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', cardDelete);

    return cardItem;
}

initialCards.forEach(function (item) {
    cardItem = createCard(item, deleteCard);

    placesList.append(cardItem);
})