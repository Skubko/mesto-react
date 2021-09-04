import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useContext } from "react";


function Main(props) {// сюда должны прийти {currentUser, cards, onEditProfile, onAddPlace , onEditAvatar, handleCardClick, handleConfirmPlaceClick}
    const currentUser = useContext(CurrentUserContext);
    return (
        <main className="main">

            <section className="profile">
                <div style={{ backgroundImage: `url(${currentUser.avatar})` }} alt="Фото Жак-Ив Кусто" className="profile__foto" onClick={props.onEditAvatar} ></div>
                <div className="profile-info">
                    <div className="form">
                        <h1 className="form__name">{currentUser.name}</h1>
                        <p className="form__profession">{currentUser.about}</p>
                    </div>
                    <button type="button" aria-label="кнопка редактирования" className="profile-info__edit-button" onClick={props.onEditProfile}></button>
                </div>
                <button type="button" aria-label="кнопка добавления" className="profile__add-button" onClick={props.onAddPlace}></button>
            </section>

            <section className="elements">
                {props.cards.map((card) => {
                    return (
                        <Card //прокидываем в Card данные пользователя и все карточки
                            key={card._id}
                            onCardClick={props.handleCardClick}
                            card={card}
                            onCardLike={props.onCardLike}
                            onCardDelete={props.onCardDelete}
                        />)
                }
                )}
            </section>

        </main>
    );
}

export default Main;