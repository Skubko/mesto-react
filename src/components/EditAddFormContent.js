function EditAddFormContent() {
    return (
        <>
            <input id="nameCard" type="text" placeholder="Название" className="popup__input" required="" minLength="2" maxLength="30" />
            <span className="popup__input-error nameCard-placeholder"></span>
            <input id="linkCard" type="url" placeholder="Ссылка на картинку" className="popup__input" required="" />
            <span className="popup__input-error linkCard-placeholder"></span>
        </>
    )
}

export default EditAddFormContent;