import { useEffect, useState } from "react";
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {

    const [cardUrl, setUrl] = useState('');
    const [cardName, setName] = useState('');

    useEffect(() => {
        setUrl('');
        setName('')
    }, []);


    function handleSubmit(e) {
        e.preventDefault();  // Запрещаем браузеру переходить по адресу формы
        props.onAddPlace(cardName, cardUrl);
    }


    return (
        < PopupWithForm // попап добавления новой картинки
            name={"add-popup"}
            title={"Новое место"}
            onClose={props.onClose}
            isOpen={props.isOpen}
            buttonText={"Сохранить"}
            onSubmit={handleSubmit}
        >
            <>
                <input id="nameCard" type="text" placeholder="Название" className="popup__input"
                    required="" minLength="2" maxLength="30" value={cardName} onChange={(e) => setName(e.target.value)} />
                <span className="popup__input-error nameCard-placeholder"></span>
                <input id="linkCard" type="url" placeholder="Ссылка на картинку" className="popup__input"
                    required="" value={cardUrl} onChange={(e) => setUrl(e.target.value)} />
                <span className="popup__input-error linkCard-placeholder"></span>
            </>
        </PopupWithForm >
    );
}
export default AddPlacePopup;