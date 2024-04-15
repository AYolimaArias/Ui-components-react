import styles from "./header.module.css";
import english from "../../assets/english.svg";
import spanish from "../../assets/spanish.svg";
import { I18nContext } from "../../context/I18nContext";
import { useContext } from "react";

const Header = ({showCards}) => {
  const { lang, setLanguage, t } = useContext(I18nContext);
  return (
    <div className={styles.container}>
      <div className={styles.info_content}>
        <h1 className={styles.title} onClick={()=>showCards()}>React Showcase</h1>
        <div className={styles.buttons}>
          <button
            onClick={() => setLanguage("US")}
            className={`${styles.button_language} ${lang === "US" && styles.isActive}`}
          >
            {" "}
            <img src={english} alt="US-Lang" />
          </button>
          <button
            onClick={() => setLanguage("ES")}
            className={`${styles.button_language} ${lang === "ES" && styles.isActive}`}
          >
            {" "}
            <img src={spanish} alt="ES-Lang" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
