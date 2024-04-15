import styles from "./cards.module.css";
import michi from "../../../assets/tic-tac.svg";
import pokemon from "../../../assets/poke-api.svg";
import wordle from "../../../assets/wordle.svg";
import youtube from "../../../assets/youtube.svg";

const cardsData = [
  { id: 1, imageUrl: michi, name: "ReactDev Tic-Tac-Toe" },
  { id: 2, imageUrl: pokemon, name: "Poke Collection" },
  { id: 3, imageUrl: wordle, name: "React Wordle" },
  { id: 4, imageUrl: youtube, name: "Video Feed" },
];

const Cards = ({ handleShow }) => {
  return (
    <div className={styles.card_container}>
      {cardsData.map((card) => (
        <div
          className={styles.container}
          key={card.id}
          onClick={() => handleShow(card.name)}
        >
          <img src={card.imageUrl} alt={`Card ${card.id}`} />
          <div className={styles.info_card}>
            <h2>{card.name}</h2>
            <div className={styles.content}>
              <div className={styles.content_info}>
                <p className={styles.feature}>useSate</p>
                <p className={styles.feature}>useEffect</p>
                <p className={styles.feature}>Custom Hooks</p>
              </div>
              <div className={styles.content_info}>
                <p className={styles.feature}>LocalStorage</p>
                <p className={styles.feature}>CSS Modules</p>
              </div>
              <div className={styles.content_info}>
                <p className={styles.feature}>otherFeature</p>
                <p className={styles.feature}>otherFeature</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
