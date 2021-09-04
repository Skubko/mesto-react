import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {

    const currentUser = React.useContext(CurrentUserContext);

    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }


    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = props.card.owner._id === currentUser._id;
    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = (`element__button-delete ${!isOwn ? 'element__hidden' : ''}`);

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);
    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (`element__heart ${isLiked ? 'element__heart_active' : ''}`);

    return (
        <article className="element">
            <div style={{ backgroundImage: `url(${props.card.link})` }} onClick={handleClick} alt={props.card.name} className="element__img" ></div>
            <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
            <div className="element__text">
                <h2 className="element__name">{props.card.name}</h2>
                <div className="element__heart-namber">
                    <button type="button" aria-label="сердце" className={cardLikeButtonClassName} onClick={handleLikeClick} />
                    <div className="element__likeChecker">{props.card.likes.length}</div>
                </div>
            </div>
        </article>
    )
}

export default Card;