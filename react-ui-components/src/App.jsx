import TicTacToe from "./pages/TicTacToe";
import Cards from "./components/Main-page/Cards";
import { useState } from "react";
import I18nProvider from "./context/I18nContext";
import Header from "./components/Header/Header";

export default function App() {
  const currentApp = localStorage.getItem("currentApp");
  const [showApp, setShowApp] = useState(currentApp === null ? "" : currentApp);

  function handleShow(app) {
    localStorage.setItem("currentApp", app);
    setShowApp(app);
  }
  function showCards() {
    localStorage.setItem("currentApp", "");
    setShowApp("");
  }
  return (
    <div>
      <I18nProvider>
        <Header showCards={showCards} />
        {showApp === "" && <Cards handleShow={handleShow} />}
        {showApp === "ReactDev Tic-Tac-Toe" && <TicTacToe />}
      </I18nProvider>
    </div>
  );
}
