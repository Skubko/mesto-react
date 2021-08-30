import React from 'react';
import Card from './Card';

function Main(props) {// сюда должны прийти {info, cards, onEditProfile, onAddPlace , onEditAvatar, handleCardClick, handleConfirmPlaceClick}

    return (
        <main className="main">
            <section className="profile">
                <div style={{ backgroundImage: `url(${props.info.avatar})` }} alt="Фото Жак-Ив Кусто" className="profile__foto" onClick={props.onEditAvatar} ></div>
                <div className="profile-info">
                    <div className="form">
                        <h1 className="form__name">{props.info.name}</h1>
                        <p className="form__profession">{props.info.about}</p>
                    </div>
                    <button type="button" aria-label="кнопка редактирования" className="profile-info__edit-button" onClick={props.onEditProfile}></button>
                </div>
                <button type="button" aria-label="кнопка добавления" className="profile__add-button" onClick={props.onAddPlace}></button>
            </section>



            <section className="elements">
                {props.cards.map((card) => <Card key={card._id} onCardClick={props.handleCardClick} card={card} handleConfirmPlaceClick={props.handleConfirmPlaceClick} />)}
            </section>

        </main>
    );
}

export default Main;