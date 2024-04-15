import { useContext, useEffect, useRef, useState } from "react"
import styles from "./styles.module.css"
import { PokeApiContext } from "../../context/PokeApiContext/PokeApiContext"
import PokeApiCard from "../PokeApiCard"
import PokeApiSeleccion from "../PokeApiSelection"
import { GetFavorites, PostFavorites, DeleteFavorites, GetPokemon } from "../../services/PokeApiService"
import startOut from "../../assets/PokeApi/star_out.svg"
import star from "../../assets/PokeApi/star.svg"
import { I18nContext } from "../../context/I18nContext"

const PokeApiApp = ({ handleLogin }) => {

    const { t } = useContext(I18nContext);

    let defaultSeleccion = {
        id: 0,
        name: "",
        types: ["type"],
        avatarUrl: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/71c53526-2e45-4937-a97f-7b6924ff3e16/dfqgab9-6f94950b-59f4-43c7-b3c9-ce32f90f8d0f.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzcxYzUzNTI2LTJlNDUtNDkzNy1hOTdmLTdiNjkyNGZmM2UxNlwvZGZxZ2FiOS02Zjk0OTUwYi01OWY0LTQzYzctYjNjOS1jZTMyZjkwZjhkMGYuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.nix0c9gPuap3fM51GuxBHkqxUz0tk94JDYW6VQPqCxY",
        weight: 0,
        height: 0
    }
    const [searchPokemon, setSearchPokemon] = useState("");
    const [newPokemon, setNewPokemon] = useState(defaultSeleccion);
    const [isFavorite, setIsFavorite] = useState(false);
    const [favorites, setFavorites] = useState([]);

    const { user, handleUser } = useContext(PokeApiContext)

    const searchInput = useRef()

    const logout = () => {
        localStorage.removeItem("user");
        handleUser()
        handleLogin()
        setFavorites([])
    }

    const loadFavorites = async user => {
        try {
            const { data } = await GetFavorites(user);
            setFavorites(data)
        } catch (error) {
            console.error(t("error-loadPokemon"), error)
        }
    }

    const handleSeleccion = async pokemon => {
        if (pokemon === "") return
        try {
            const { id, name, types, sprites, weight, height } = await GetPokemon(pokemon.trim().toLocaleLowerCase())
            const newPokemon = {
                id,
                name,
                types: types.map(tp => tp.type.name),
                avatarUrl: sprites.other["official-artwork"].front_default,
                weight,
                height
            }
            setNewPokemon(newPokemon)
            setSearchPokemon("")
            searchInput.current.focus()
            if (favorites.find(pokemon => pokemon.id === id)) setIsFavorite(true)
            else setIsFavorite(false)
        } catch (error) {
            setNewPokemon(defaultSeleccion)
            console.error(t("error-selectPokemon"), error)
        }
    }

    const addFavorite = async () => {
        if (newPokemon.id === 0) return
        try {
            const user = localStorage.getItem("user");
            const { ok } = await PostFavorites(user, {
                id: newPokemon.id,
                name: newPokemon.name,
                types: newPokemon.types,
                avatarUrl: newPokemon.avatarUrl
            })
            if (ok) setIsFavorite(true)
            await loadFavorites(user);
        } catch (error) {
            console.error(t("error-addPokemon"), error)
        }
    }

    const deleteFavorite = async () => {
        try {
            const user = localStorage.getItem("user");
            await DeleteFavorites(user, newPokemon.id)
            await loadFavorites(user);
            setIsFavorite(false);
        } catch (error) {
            console.error(t("error-deletePokemon"), error)
        }
    }

    useEffect(() => {
        loadFavorites(localStorage.getItem("user"))
    }, [])

    return (
        <div className={styles.pokeapiapp}>
            <div className={styles.pokeapiapp__search}>
                <div className={`${styles.pokeapiapp__search__buttons}`}>
                    <input type="text" placeholder="ej. Bulbasaur" value={searchPokemon} onChange={(e) => setSearchPokemon(e.target.value)} ref={searchInput}/>
                    <button onClick={() => handleSeleccion(searchPokemon)} >{t("button-search")}</button>
                </div>
                <PokeApiSeleccion newPokemon={newPokemon} />
                <button className={styles.pokeapiapp__addFavorite} onClick={isFavorite ? () =>
                    deleteFavorite() : () => addFavorite()}><img src={isFavorite ? star : startOut} alt={isFavorite ? "star" : "star_out"} />{isFavorite ? t("button-removeFavorite") : t("button-addFavorite")}</button>
            </div>
            <div className={styles.pokeapiapp__favorites}>
                <header className={styles.pokeapiapp__favorites__header}>
                    <h3 className={styles.pokeapiapp__favorites__title}>{t("text-favorite")}</h3>
                    <div className={styles.pokeapiapp__favorites__buttons}>
                        <span className={styles.pokeapiapp__favorites__welcome}>{user || localStorage.getItem("user") ? `${t("welcome")} ${user || localStorage.getItem("user")}` : ""}</span>
                        <button onClick={() => logout()}>{t("button-exit")}</button>
                    </div>
                </header>
                <div className={styles.pokeapiapp__favorites__pokemons}>
                    {favorites.map(pokemon => <PokeApiCard key={pokemon.id} id={pokemon.id} name={pokemon.name} img={pokemon.avatarUrl} types={pokemon.types} handleSeleccion={handleSeleccion} setIsFavorite={setIsFavorite} />)}
                </div>
            </div>
        </div>
    )
}

export default PokeApiApp