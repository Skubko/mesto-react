import { useRef } from "react";
import PopupWithForm from './PopupWithForm';


function EditAvatarPopup(props) {

    const avatarRef = useRef(); // записываем объект, возвращаемый хуком, в переменную

    function handleSubmit(e) {
        e.preventDefault();  // Запрещаем браузеру переходить по адресу формы
        props.onUpdateAvatar({
            avatar: avatarRef.current.value/* Значение инпута, полученное с помощью рефа */
        });
    }

    return (
        < PopupWithForm // попап изменения аватара
            name={"update-popup"}
            title={"Обновить аватар"}
            onClose={props.onClose}
            isOpen={props.isOpen}
            buttonText={"Сохранить"}
            onSubmit={handleSubmit}
        >
            <>
                <input ref={avatarRef} id="linkAvatar" type="url" placeholder="Ссылка на аватар" className="popup__input" required="" pattern="https://.*" />
                <span className="popup__input-error linkAvatar-placeholder" />
            </>

        </PopupWithForm>
    );
}

export default EditAvatarPopup;