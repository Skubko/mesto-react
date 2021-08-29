function EditProfileFormContent() {
    return (
        <>
            <input id="name" type="text" placeholder="Имя" className="popup__input" required="" minLength="2" maxLength="40" />
            <span className="popup__input-error name-placeholder" />
            <input id="job" type="text" placeholder="О себе" className="popup__input" required="" minLength="2" maxLength="200" />
            <span className="popup__input-error job-placeholder" /> 
        </>
    )
}

export default EditProfileFormContent;