class Api {
    constructor(config) {
        this._config = config;
        this._url = this._config.baseUrl;
        this._headers = this._config.headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    //загружаем с сервера массив данных по карточкам
    getCardList() {
        return fetch(`${this._url}/cards`, {
            method: "GET",
            headers: this._headers
        })
            .then(this._checkResponse);
    }

    //-----------------------------------------------------------

    //загружаем с сервера массив данных по пользователю
    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            method: "GET",
            headers: this._headers
        })
            .then(this._checkResponse);
    }

    setUserInfo(name, about) {
 //       console.log(' setUserInfo(name, about) ==  ', name, about);
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
            .then(this._checkResponse);
    }

    recordNewCard(name, link) {
        return fetch(`${this._url}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then(this._checkResponse);
    }

    deleteCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
            method: "DELETE",
            headers: this._headers,
        })
            .then(this._checkResponse);
    }

    changeLikeCardStatus(id, isLiked) {
        if (isLiked === true) {
            return fetch(`${this._url}/cards/likes/${id}`, {
                method: "PUT",
                headers: this._headers,
            })
                .then(this._checkResponse);
        } else {
            return fetch(`${this._url}/cards/likes/${id}`, {
                method: "DELETE",
                headers: this._headers,
            })
                .then(this._checkResponse);
        }
    }

    setUserAvatar(src) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: src.avatar
            })
        })
            .then(this._checkResponse);
    }

};

const api = new Api({ //Создаем экземпляр класса Api для скачивания с сервера карточек
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-26',
    headers: {
        authorization: '0e068af8-88a5-4ce4-b9ce-65414eeaa755',
        'Content-Type': 'application/json'
    }
});

export default api;