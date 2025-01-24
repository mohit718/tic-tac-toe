import { useState } from "react";
import Navbar from "./components/Navbar";
import GameBoard from "./components/GameBoard";
import GameInfo from "./components/GameInfo";

function App() {
  const [game, setGame] = useState([-1, -1, -1, -1, -1, -1, -1, -1, -1]);
  const [players, setPlayers] = useState(['Player 1', 'Player 2']);
  const [activePlayer, setActivePlayer] = useState(0);
  const [history, setHistory] = useState<number[]>([]);


  const initGame = () => {
    setGame([-1, -1, -1, -1, -1, -1, -1, -1, -1]);
    setActivePlayer(0);
    setHistory([]);
  }

  const initRound = () => {
    setGame([-1, -1, -1, -1, -1, -1, -1, -1, -1]);
    setActivePlayer(0);
  }

  return (
      <div className="container bg-gray-800 text-gray-100 min-h-screen min-w-screen flex flex-col md:gap-20 gap-2 w-full">
        <Navbar />
        <main className="flex md:flex-row flex-col justify-evenly container mx-auto">
          <div className="my-4">
            <h4 className="mb-3 text-lg font-verdana font-semibold text-success">{players[activePlayer]} to play.</h4>
            <GameBoard game={game} activePlayer={activePlayer} setActivePlayer={setActivePlayer} history={history} setHistory={setHistory} players={players} initGame={initGame} setGame={setGame} initRound={initRound} />
          </div>
          <div className="flex flex-col gap-4 md:mt-14 mt-6 lg:max-w-md md:max-w-xs w-full">
            <GameInfo players={players} setPlayers={setPlayers} history={history} initGame={initGame} />
          </div>
        </main>
      </div>
  )
}

export default App

