import React from "react";
import { useEffect } from "react";

import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import api from '../utils/Api.js';
import PopupWithForm from './PopupWithForm.js';
import EditAvatarFormContent from './EditAvatarFormContent.js';
import EditProfileFormContent from './EditProfileFormContent.js';
import EditAddFormContent from './EditAddFormContent.js';
import ImagePopup from './ImagePopup.js';


function App() {

    const [cards, setCards] = React.useState([]);
    const [info, setInfo] = React.useState({});
    const [selectedCard, setSelectedCard] = React.useState(null);
    function handleCardClick(card) {
        setSelectedCard(card);
    }

    useEffect(() => {
        api
            .getInitialCards()
            .then((cards) => {
                setCards(cards);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        api
            .getUserInfo()
            .then((info) => {
                setInfo(info);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const [isEditAvatarPopupOpen, setStateAvatar] = React.useState(false);
    function handleEditAvatarClick() {
        setStateAvatar(true);
    }

    const [isEditProfilePopupOpen, setStateProfile] = React.useState(false);
    function handleEditProfileClick() {
        setStateProfile(true);
    }

    const [isAddPlacePopupOpen, setStatePlace] = React.useState(false);
    function handleAddPlaceClick() {
        setStatePlace(true);
    }

    const [isAddConfirmPopupOpen, setStateConfirm] = React.useState(false);

    function handleConfirmPlaceClick() {
        setStateConfirm(true);
    }

  //  const [, setClosePopups] = React.useState(false);
    function closeAllPopups() {
       // setClosePopups(true);
        setStateProfile(false);
        setStatePlace(false);
        setStateAvatar(false);
        setSelectedCard(null);
        setStateConfirm(false);
    }


    return (
        <div className="page">
            <Header />
            <Main  // сюда должны прийти {info, cards, handleEditProfileClick, handleAddPlaceClick, handleEditAvatarClick, handleCardClick, handleConfirmPlaceClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                handleCardClick={handleCardClick}
                handleConfirmPlaceClick={handleConfirmPlaceClick}
                info={info}
                cards={cards} ></Main>
            <Footer />

            <ImagePopup // попап полноразмерной картинки
                handleCardClick={handleCardClick}
                onClose={closeAllPopups}
                card={selectedCard} />

            <PopupWithForm // попап изменения аватара
                name={"update-popup"}
                title={"Обновить аватар"}
                onClose={closeAllPopups}
                isOpen={isEditAvatarPopupOpen}
                buttonText={"Сохранить"}
            >
                <EditAvatarFormContent />
            </PopupWithForm>

            <PopupWithForm // попап изменения имени и профессии
                name={"edit-popup"}
                title={"Редактировать профиль"}
                onClose={closeAllPopups}
                isOpen={isEditProfilePopupOpen}
                buttonText={"Сохранить"}
            >
                <EditProfileFormContent />
            </PopupWithForm>

            <PopupWithForm // попап добавления новой картинки
                name={"add-popup"}
                title={"Новое место"}
                onClose={closeAllPopups}
                isOpen={isAddPlacePopupOpen}
                buttonText={"Сохранить"}
            >
                <EditAddFormContent />
            </PopupWithForm>

            <PopupWithForm // попап удаления своей картинки по клику на корзину
                name={"confirm-popup"}
                title={"Вы уверены?"}
                onClose={closeAllPopups}
                isOpen={isAddConfirmPopupOpen}
                buttonText={"Да"}
            >
            </PopupWithForm>

        </div>
    );
}

export default App;