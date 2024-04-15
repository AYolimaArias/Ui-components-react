import { useContext, useEffect, useState } from "react";
import styles from "./game.module.css";
import Board from "../Board";
import { I18nContext } from "../../../context/I18nContext";
import useLocalStorage from "../../../hooks/useLocalStorage";

const Game = () => {
  const [currentMove, setCurrentMove] = useState(0);
  const currentHistory = localStorage.getItem("history")
  const currentLocalMove = localStorage.getItem("currentMove")
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const { t } = useContext(I18nContext);
  const xIsNext = currentMove % 2 === 0;
  const [initailValue, setValue] = useLocalStorage("history",history)
  const [localMove, setLocalMove] = useLocalStorage("currentMove", currentMove)

  let currentSquares = (currentHistory !==null && currentLocalMove !==null) ? JSON.parse(currentHistory)[JSON.parse(currentLocalMove)] :history[currentMove];
  
  //  console.log(currentSquares)
  useEffect(() => {
    if (currentHistory !==null && currentLocalMove !==null){
      setHistory(JSON.parse(currentHistory))
      setLocalMove(JSON.parse(currentLocalMove))
      
    }
    
  }, [])
  

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setValue(nextHistory)
    setHistory(nextHistory);
    setLocalMove(nextHistory.length - 1);
    setCurrentMove(nextHistory.length - 1);
  }
  function jumpTo(nextMove) {
    setLocalMove(nextMove);
    setCurrentMove(nextMove);
  }
  function handleReset() {
    setValue([Array(9).fill(null)])
    setHistory([Array(9).fill(null)]);
    setLocalMove(0);
    setCurrentMove(0);
    //currentSquares = history[currentMove];
  }
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = t("move") + move;
    } else {
      description = t("move-0");
    }
    return (
      <li className={styles.list_history} key={move}>
        <button className={styles.button_history} onClick={() => jumpTo(move)}>
          {description}{" "}
        </button>
      </li>
    );
  });
  return (
    <div className={styles.principal_container}>
      <div className={styles.container}>
        <div className={styles.game}>
          <div className={styles.game_board}>
            <Board
              xIsNext={xIsNext}
              squares={currentSquares}
              onPlay={handlePlay}
              history={history}
            />
          </div>

          <div className={styles.game_info}>
            <button onClick={handleReset} className={styles.button}>
              {t("reset-button")}
            </button>
            <p className={styles.text}>{t("go-to")}:</p>
            <ol className={styles.list_moves}>{moves}</ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
