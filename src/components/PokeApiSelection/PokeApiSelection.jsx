import styles from "./styles.module.css"
import typeColors from "../../locales/typeColors.json"
import { capitalizeFirstLetter } from "../../utils/Utils"
import weightSVG from "../../assets/PokeApi/weight.svg"
import heightSVG from "../../assets/PokeApi/height.svg"
import { useContext } from "react"
import { I18nContext } from "../../context/I18nContext"

const PokeApiSelection = ({ newPokemon }) => {

    const { t } = useContext(I18nContext);

    return (
        <div className={styles.pokeapiselection} >
            <header className={styles.pokeapiselection__header}>
                <h4 className={styles.pokeapiselection__name}>{newPokemon.name === "" ? t("what-pokemon") : capitalizeFirstLetter(newPokemon.name)}</h4>
                <span className={styles.pokeapiselection__id}>{newPokemon.id >= 100 ? `#${newPokemon.id}` : newPokemon.id >= 10 ? `#0${newPokemon.id}` : `#00${newPokemon.id}`}</span>
            </header>
            <img src={newPokemon.avatarUrl} alt={newPokemon.name} width={140} height={140} />
            <div className={styles.pokeapiselection__types}>
                {newPokemon.types.map((type) =>
                    <span key={type} className={styles.pokeapiselection__type} style={{ backgroundColor: typeColors[type.toLowerCase()] }}>{t(type)}</span>
                )}
            </div>
            <div className={styles.pokeapiselection__stats}>
                <div className={styles.pokeapiselection__weight}>
                    <div className={styles.pokeapiselection__weight__content}>
                        <img className={styles.pokeapiselection__weightSVG} src={weightSVG} alt="pokemon_weight" />
                        <span className={styles.pokeapiselection__weight_data}>{`${(newPokemon.weight).toFixed(1)} kg`}</span>
                    </div>
                    <span className={styles.pokeapiselection__weight__title}>{t("weight")}</span>
                </div>
                <div className={styles.pokeapiselection__height}>
                    <div className={styles.pokeapiselection__height__content}>
                        <img className={styles.pokeapiselection__heightSVG} src={heightSVG} alt="pokemon_height" />
                        <span className={styles.pokeapiselection__height_data}>{`${(newPokemon.height).toFixed(1)} m`}</span>
                    </div>
                    <span className={styles.pokeapiselection__height__title}>{t("height")}</span>
                </div>
            </div>
        </div>
    )
}

export default PokeApiSelection