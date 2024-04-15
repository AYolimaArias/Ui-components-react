import styles from "./styles.module.css"
import typeColors from "../../locales/typeColors.json"
import { capitalizeFirstLetter } from "../../utils/Utils"
import { useContext } from "react";
import { I18nContext } from "../../context/I18nContext";

const PokeApiCard = ({ id, name, img, types, handleSeleccion, setIsFavorite }) => {

    const { t } = useContext(I18nContext);

    return (
        <div className={styles.pokeapicard} onClick={() => {
            handleSeleccion(name)
            setIsFavorite(true)
        }}>
            <header className={styles.pokeapicard__header}>
                <h4 className={styles.pokeapicard__name}>{capitalizeFirstLetter(name)}</h4>
                <span className={styles.pokeapicard__id}>{id >= 100 ? `#${id}` : id >= 10 ? `#0${id}` : `#00${id}`}</span>
            </header>
            <img src={img} alt={name} width={100} height={100} />
            <div className={styles.pokeapicard__types}>
                {types.map((type) =>
                    <span key={type} className={styles.pokeapicard__type} style={{ backgroundColor: typeColors[type.toLowerCase()] }}>{t(type)}</span>
                )}
            </div>
        </div>
    )
}

export default PokeApiCard;