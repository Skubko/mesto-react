import { useEffect, useState, useContext } from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';


function EditProfilePopup(props) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const currentUser = useContext(CurrentUserContext); // Подписка на контекст

    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
        //currentUser.name = name;
        //currentUser.about = description;
        props.onUpdateUser(name, description);
    }

    return (
        <PopupWithForm // попап изменения имени и профессии
            name={"edit-popup"}
            title={"Редактировать профиль"}
            onClose={props.onClose}
            isOpen={props.isOpen}
            buttonText={"Сохранить"}
            onSubmit={handleSubmit}
        >
            <>
                <input id="name" type="text" placeholder="Имя" className="popup__input" required minLength="2" maxLength="40" value={name || ""} onChange={(e) => { setName(e.target.value) }} />
                <span className="popup__input-error name-placeholder" ></span>
                <input id="job" type="text" placeholder="О себе" className="popup__input" required minLength="2" maxLength="200" value={description || ""} onChange={(e) => { setDescription(e.target.value) }} />
                <span className="popup__input-error job-placeholder" ></span>
            </>
        </PopupWithForm>
    );
}

export default EditProfilePopup;