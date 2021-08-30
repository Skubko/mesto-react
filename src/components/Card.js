function Card(props) {

    function handleClick() {
        props.onCardClick(props.card);
    }

    return (
        <article className="element">
            <div style={{ backgroundImage: `url(${props.card.link})` }} onClick={handleClick} alt={props.card.name} className="element__img" ></div>
            <button type="button" className="element__button-delete" onClick={props.handleConfirmPlaceClick}></button>
            <div className="element__text">
                <h2 className="element__name">{props.card.name}</h2>
                <div className="element__heart-namber">
                    <button type="button" aria-label="сердце" className="element__heart" />
                    <div className="element__likeChecker">{props.card.likes.length}</div>
                </div>
            </div>
        </article>
    )
}

export default Card;