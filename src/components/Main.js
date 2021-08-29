import React from 'react';
//import foto from '../images/image.jpg';
import Card from './Card';

function Main(props) {// сюда должны прийти {info, cards, onEditProfile, onAddPlace , onEditAvatar, handleCardClick, handleConfirmPlaceClick}

    return (
        <main className="main">
            <section className="profile">
                <img src={props.info.avatar} alt="Фото Жак-Ив Кусто" className="profile__foto" onClick={props.onEditAvatar} />
                <div className="profile-info">
                    <div className="forma">
                        <h1 className="forma__name">{props.info.name}</h1>
                        <p className="forma__profession">{props.info.about}</p>
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