function EditAvatarFormContent() {
    return (
        <>
            <input id="linkAvatar" type="url" placeholder="Ссылка на аватар" className="popup__input" required="" pattern="https://.*" />
            <span className="popup__input-error linkAvatar-placeholder" />
        </>
    )
}

export default EditAvatarFormContent;