function PopupWithForm(props) {

    return (
        <section className={`popup  ${props.isOpen ? "popup_opened" : ""}   popup_type_${props.name}`}>
            <div className="popup__container">
                <button className="close-icon" type="button" onClick={props.onClose} />
                <h2 className="edit-profile">{props.title}</h2>
                <form className="popup__form" name={`${props.name}`} noValidate>
                    {props.children}
                    <button className="submit-button" type="submit">{`${props.buttonText}`}</button>
                </form>
            </div>
        </section>
    )
}

export default PopupWithForm;