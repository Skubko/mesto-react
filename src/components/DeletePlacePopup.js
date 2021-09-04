import PopupWithForm from './PopupWithForm';

function DeletePlacePopup(props) {
    function handleSubmit(e) {
        e.preventDefault();  // Запрещаем браузеру переходить по адресу формы
        props.deletePlace();
    }

    return (
        <PopupWithForm // попап удаления своей картинки по клику на корзину
            name={"confirm-popup"}
            title={"Вы уверены?"}
            onClose={props.onClose}
            isOpen={props.isOpen}
            buttonText={"Да"}
            onSubmit={handleSubmit}>

        </PopupWithForm >
    );
}
export default DeletePlacePopup;