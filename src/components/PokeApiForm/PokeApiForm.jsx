
import { useContext } from "react";
import logoPokeApi from "../../assets/PokeApi/logo_pokeapi.svg"
import styles from "./styles.module.css";
import { PokeApiContext } from "../../context/PokeApiContext/PokeApiContext";
import { I18nContext } from "../../context/I18nContext";

const PokeApiForm = ({ handleLogin }) => {

    const { user, handleUser } = useContext(PokeApiContext)
    const { t } = useContext(I18nContext);

    function handleSubmit(e) {
        e.preventDefault()
        if (user.trim()) {
            localStorage.setItem("user", user)
            handleLogin(true)
        }
    }

    return (
        <div className={`${styles.pokeapi__form}`}>
            <img className={`${styles.pokeapi__form__logo}`} src={logoPokeApi} alt="logo_pokeapi" width={320} height={160} />
            <form className={`${styles.pokeapi__formContent}`} onSubmit={handleSubmit} >
                <input type="text" placeholder={t("text-form-placeholder")} value={user} onChange={(e) => handleUser(e.target.value)} required />
                <button type="submit">{t("login")}</button>
            </form>
        </div>
    )
}

export default PokeApiForm