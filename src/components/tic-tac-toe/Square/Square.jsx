/* eslint-disable react/prop-types */
import styles from "./square.module.css";

const Square = ({ value, onSquareClick,id }) => {
  return (
    <button id={id} onClick={onSquareClick} className={styles.square}>
      {value}
    </button>
  );
};

export default Square;
