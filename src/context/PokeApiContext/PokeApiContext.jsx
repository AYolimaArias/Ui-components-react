import { createContext, useState } from 'react'

export const PokeApiContext = createContext({
    user: "",
    handleUser: () => { }
});

const PokeApiProvider = ({ children }) => {

    const [user, setUser] = useState("");

    function handleUser(newName) {
        if (newName) {
            setUser(newName)
            return
        }
        setUser("")
    }

    return (
        <PokeApiContext.Provider value={{ user, handleUser }}>{children}</PokeApiContext.Provider>
    )
}

export default PokeApiProvider