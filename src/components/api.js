const URL = 'https://nomoreparties.co/v1/wff-cohort-23';
const token = '91785191-9aad-4817-a44a-03e8caf140ed';

// обработка статуса ответа от сервера
function handleResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

// запрос с проверкой ответа
function request(url, option) {
    return fetch(url, option).then(handleResponse);
}

// запрос информации о профиле
function getUserInfo() {
    return request(URL + '/users/me', {
        method: 'GET',
        headers: {
            authorization: token
        }
    })
}

// запрос с внесением изменений информации профиля
function patchUserInfo(data) {
    return request(URL + '/users/me', {
        method: 'PATCH',
        headers: {
            authorization: token,
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

// запрос карточек
function getAllCards() {
    return request(URL + '/cards', {
        method: 'GET',
        headers: {
            authorization: token
        }
    })
}

// запрос отправки карточки
function createNewCard(data) {
    return request(URL + '/cards', {
        method: 'POST',
        headers: {
            authorization: token,
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

// запрос удаления карточки
function deleteMyCard(cardId) {
    return request(URL + '/cards/' + cardId, {
        method: 'DELETE',
        headers: {
            authorization: token
        }
    })
}

// запрос отправки лайка карточки
function likeCardApi(cardId) {
    return request(URL + '/cards/likes/' + cardId, {
        method: 'PUT',
        headers: {
            authorization: token
        }
    })
}

// запрос удаления лайка карточки
function deleteLikeApi(cardId) {
    return request(URL + '/cards/likes/' + cardId, {
        method: 'DELETE',
        headers: {
            authorization: token
        }
    })
}

// запрос изменения аватара профиля
function patchAvatar(avatarURL) {
    return request(URL + '/users/me/avatar', {
        method: 'PATCH',
        headers: {
            authorization: token,
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            avatar: avatarURL
        })
    })
}

export { getUserInfo, patchUserInfo, getAllCards, createNewCard, deleteMyCard, likeCardApi, deleteLikeApi, patchAvatar };