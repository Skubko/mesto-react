import React from "react";

function ImagePopup(props) {
    return (
        <div id="popupPicture" className={`popup popup_picture ${props.isOpen ? "popup_opened" : ""} `} >
            <figure className="popup__figure" >
                <button type="button" aria-label="крестик для закрытия попапа" className="close-icon" onClick={props.onClose}></button>
                <img src={props.card !== null ? props.card.link : "#"} alt="Увеличенная картинка" className="popup__image" />
                <figcaption className="popup__caption">{props.card !== null ? props.card.name : "#"}</figcaption>
            </figure>
        </div >
    )
}

export default ImagePopup;