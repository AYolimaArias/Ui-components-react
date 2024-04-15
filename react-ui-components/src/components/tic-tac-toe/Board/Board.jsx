/* eslint-disable react/prop-types */

import styles from "./board.module.css";
import Square from "../Square";
import { useContext, useEffect, useRef } from "react";
import { I18nContext } from "../../../context/I18nContext";

let lineWinner = [];
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      lineWinner = lines[i];
      return squares[a];
    }
  }
  return null;
}

const Board = ({ xIsNext, squares, onPlay, history }) => {
  const { t } = useContext(I18nContext);

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  // console.log(winner, lineWinner)

  let status;

  useEffect(() => {
    if (lineWinner.length > 0)
      lineWinner.map((num) => {
        const squarewinner = document.getElementById(`square_${num}`);
        squarewinner.style.color = "#16A34A";
      });
  }, []);

  if (winner) {
    if (lineWinner.length > 0)
      lineWinner.map((num) => {
        const squarewinner = document.getElementById(`square_${num}`);
        if (squarewinner === null) return;
        squarewinner.style.color = "#16A34A";
      });
    status = `${t("won-game")}: ${winner}`;
  } else {
    lineWinner = [];
    squares.map((num, index) => {
      if (num === null) return;
      const squarewinner = document.getElementById(`square_${index}`);
      if (squarewinner === null) return;
      squarewinner.style.color = "#0f172a";
    });
    if (history.length >= 9) {
      status = t("tied-game");
    } else {
      status = t("next-player") + ": " + (xIsNext ? "X" : "O");
    }
  }

  return (
    <div className={styles.contain}>
      <div className={styles.winner}>{status}</div>
      <div className={styles.container_game}>
        <div className={styles.board_row}>
          <Square
            id={"square_0"}
            value={squares[0]}
            onSquareClick={() => handleClick(0)}
          />
          <Square
            id={"square_1"}
            value={squares[1]}
            onSquareClick={() => handleClick(1)}
          />
          <Square
            id={"square_2"}
            value={squares[2]}
            onSquareClick={() => handleClick(2)}
          />
        </div>
        <div className={styles.board_row}>
          <Square
            id={"square_3"}
            value={squares[3]}
            onSquareClick={() => handleClick(3)}
          />
          <Square
            id={"square_4"}
            value={squares[4]}
            onSquareClick={() => handleClick(4)}
          />
          <Square
            id={"square_5"}
            value={squares[5]}
            onSquareClick={() => handleClick(5)}
          />
        </div>
        <div className={styles.board_row}>
          <Square
            id={"square_6"}
            value={squares[6]}
            onSquareClick={() => handleClick(6)}
          />
          <Square
            id={"square_7"}
            value={squares[7]}
            onSquareClick={() => handleClick(7)}
          />
          <Square
            id={"square_8"}
            value={squares[8]}
            onSquareClick={() => handleClick(8)}
          />
        </div>
      </div>
    </div>
  );
};

export default Board;
