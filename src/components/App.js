import React from "react";
import { useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import api from '../utils/Api.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import DeletePlacePopup from './DeletePlacePopup.js';
import ImagePopup from './ImagePopup.js';


function App() {

    const [cards, setCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [isImagePopupOpen, setStateImage] = React.useState(false);// стейт открытие и закрытие попапа с картинкой

    function handleCardClick(card) {
        setSelectedCard(card);
        setStateImage(true);
    }

    useEffect(() => {// загрузка с сайта карточек и данных пользователя
        Promise.all([
            api.getCardList(),
            api.getUserInfo()
        ])
            .then(res => {
                setCards(res[0]);
                setCurrentUser(res[1]);
            })
            .catch(error => console.log(error))
    }, [])


    useEffect(() => {
        const closeByEscape = (event) => {
            if (event.key === 'Escape') {
                closeAllPopups();
            }
        }
        document.addEventListener('keydown', closeByEscape)
        return () => document.removeEventListener('keydown', closeByEscape)
    }, [])

    const [isEditAvatarPopupOpen, setStateAvatar] = React.useState(false);
    function handleEditAvatarClick() {
        setStateAvatar(true);
    }

    const [isEditProfilePopupOpen, setStateProfile] = React.useState(false);
    function handleEditProfileClick() {
        setStateProfile(true);
    }

    const [isAddPlacePopupOpen, setStatePlace] = React.useState(false);
    function handleAddPlaceClick(cardName, cardUrl) {
        setStatePlace(true);
    }


    const [isAddConfirmPopupOpen, setStateConfirm] = React.useState(false);//// стейт открытия попапа удаления карточки

    function handleConfirmPlaceClick(card) {// обработчик открытия попапа удаления карточки
        setSelectedCard(card);
        setStateConfirm(true);

    }

    function closeAllPopups() {
        setStateProfile(false);
        setStatePlace(false);
        setStateAvatar(false);
        setSelectedCard(null);
        setStateConfirm(false);
        setStateImage(false);
    }

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch(error => console.log(error))
    }

    function handleCardDelete() {
        api.deleteCard(selectedCard._id)
            .then(() => { setCards((state) => state.filter(cardItem => cardItem._id !== selectedCard._id)); closeAllPopups(); })

            .catch(err => console.log(err))
            .finally(() => { setStateConfirm(false) });
    }


    function handleUpdateUser() {
        api.setUserInfo(currentUser.name, currentUser.about)
            .then()
            .catch(error => console.log(error))
            .finally(() => { setStateProfile(false) });
    }


    function handleUpdateAvatar(avatar) {
        api.setUserAvatar(avatar)
            .then((res) => { setCurrentUser(res) })
            .catch(error => console.log(error))
            .finally(() => { setStateAvatar(false); });
    }


    function handleAddPlaceSubmit(name, link) {
        api.recordNewCard(name, link)
            .then((newCard) => { setCards([newCard, ...cards]); })
            .catch(error => console.log(error))
            .finally(setStatePlace(false));
    }

    return (
        <div className="page">
            <CurrentUserContext.Provider value={currentUser}>
                <Header />
                <Main  // сюда должны прийти {currentUser, cards, handleEditProfileClick, handleAddPlaceClick, handleEditAvatarClick, handleCardClick, handleConfirmPlaceClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    handleCardClick={handleCardClick}
                    handleConfirmPlaceClick={handleConfirmPlaceClick}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleConfirmPlaceClick}
                    onClose={closeAllPopups}
                >
                </Main>
                <Footer />

                <ImagePopup // попап полноразмерной картинки
                    handleCardClick={handleCardClick}
                    isOpen={isImagePopupOpen}
                    onClose={closeAllPopups}
                    card={selectedCard}
                />


                <EditAvatarPopup // попап изменения аватара
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                />

                <EditProfilePopup // попап изменения профайла
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                />

                <AddPlacePopup // попап добавления карточки
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                />

                <DeletePlacePopup // попап удаления своей картинки по клику на корзину
                    isOpen={isAddConfirmPopupOpen}
                    onClose={closeAllPopups}
                    deletePlace={handleCardDelete}>
                </DeletePlacePopup>

            </CurrentUserContext.Provider>


        </div>
    );
}

export default App;