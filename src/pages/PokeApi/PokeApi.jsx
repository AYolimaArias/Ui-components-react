import React, { useState } from 'react';
import styles from "./styles.module.css";
import PokeApiForm from '../../components/PokeApiForm';
import PokeApiProvider, { PokeApiContext } from '../../context/PokeApiContext/PokeApiContext';
import PokeApiApp from '../../components/PokeApiApp';

const PokeApi = () => {

  const [isActive, setIsActive] = useState(false);
  const localUser = localStorage.getItem("user")

  function handleLogin() {
    setIsActive(!isActive)
  }

  return (
    <div className={`section`}>
      <div className={`container`}>
        <PokeApiProvider>

          {
            localUser !== null
              ?
              <PokeApiApp handleLogin={handleLogin} />
              :
              <PokeApiForm handleLogin={handleLogin} />
          }

        </PokeApiProvider>
      </div>
    </div>
  )
}

export default PokeApi