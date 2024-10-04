const URL = 'https://nomoreparties.co/v1/wff-cohort-23';
const token = '91785191-9aad-4817-a44a-03e8caf140ed';

function handleResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

function getUserInfo() {
    return fetch(URL + '/users/me', {
        method: 'GET',
        headers: {
            authorization: token
        }
    })
    .then(handleResponse);
}

function patchUserInfo(data) {
    return fetch(URL + '/users/me', {
        method: 'PATCH',
        headers: {
            authorization: token,
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(handleResponse);
}

function getAllCards() {
    return fetch(URL + '/cards', {
        method: 'GET',
        headers: {
            authorization: token
        }
    })
    .then(handleResponse);
}

function createNewCard(data) {
    return fetch(URL + '/cards', {
        method: 'POST',
        headers: {
            authorization: token,
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(handleResponse);
}

function deleteMyCard(cardId) {
    return fetch(URL + '/cards/' + cardId, {
        method: 'DELETE',
        headers: {
            authorization: token
        }
    })
    .then(handleResponse);
}

function likeCardApi(cardId) {
    return fetch(URL + '/cards/likes/' + cardId, {
        method: 'PUT',
        headers: {
            authorization: token
        }
    })
    .then(handleResponse);
}

function deleteLikeApi(cardId) {
    return fetch(URL + '/cards/likes/' + cardId, {
        method: 'DELETE',
        headers: {
            authorization: token
        }
    })
    .then(handleResponse);
}

function patchAvatar(avatar) {
    return fetch(URL + '/users/me/avatar', {
        method: 'PATCH',
        headers: {
            authorization: token,
            'Content-type': 'application/json'
        },
        body: JSON.stringify(avatar)
    })
    .then(handleResponse);
}

export { getUserInfo, patchUserInfo, getAllCards, createNewCard, deleteMyCard, likeCardApi, deleteLikeApi, patchAvatar };