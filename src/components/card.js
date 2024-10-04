import { deleteMyCard, likeCardApi, deleteLikeApi } from "./api";

function deleteCard(event, cardData) {
    const eventTarget = event.target;

    deleteMyCard(cardData._id)
        .then(() => {
            eventTarget.closest('.card').remove();
        })
        .catch((err) => {
            console.log(err);
        })
}

function likeCard(event, cardData, cardItem) {
    const eventTarget = event.target;
    const counterLike = cardItem.querySelector('.card__like-counter');

    if (eventTarget.classList.contains('card__like-button_is-active')) {
        deleteLikeApi(cardData._id)
        .then((data) => {
            eventTarget.classList.remove('card__like-button_is-active');

            counterLike.textContent = data.likes.length;
        })
        .catch((err) => {
            console.log(err);
        })
    } else {
        likeCardApi(cardData._id)
        .then((data) => {
            eventTarget.classList.add('card__like-button_is-active');
            console.log(data);

            counterLike.textContent = data.likes.length;
        })
        .catch((err) => {
            console.log(err);
        })
    }
}

function createCard(cardData, openPopupCard, profInfo) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardItem = cardTemplate.querySelector('.card').cloneNode(true);

    const cardImage = cardItem.querySelector('.card__image');
    const cardTitle = cardItem.querySelector('.card__title');

    cardTitle.textContent = cardData.name;
    cardImage.src = cardData.link;
    cardImage.alt = `${cardData.name}`;


    const deleteButton = cardItem.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', (event) => {
        deleteCard(event, cardData);
    })

    const likeButton = cardItem.querySelector('.card__like-button');
    likeButton.addEventListener('click', (event) => {
        likeCard(event, cardData, cardItem);
    });
    cardData.likes.some((item) => {
       if (item._id === profInfo._id) {
        likeButton.classList.add('card__like-button_is-active');
       }
    })

    const counterLike = cardItem.querySelector('.card__like-counter');
    counterLike.textContent = cardData.likes.length;

    cardImage.addEventListener('click', (event) => {
        openPopupCard(cardData);
    })

    return cardItem;
}

export { createCard };