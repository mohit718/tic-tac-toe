type PropType = {
    game: number[];
    setGame: (game: number[]) => void;
    activePlayer: number;
    setActivePlayer: (activePlayer: number) => void;
    history: number[];
    setHistory: (history: number[]) => void;
    players: string[];
    initGame: () => void;
    initRound: () => void;
}

const GameBoard = ({ game, activePlayer, setActivePlayer, history, setHistory, players, initGame, setGame, initRound }: PropType): JSX.Element => {
    const updateCell = (index: number) => {
        if (game[index] == -1) {
            const newGame = [...game];
            newGame[index] = activePlayer;
            if (gameWon(newGame, activePlayer)) {
                console.log('Game Won');
                setHistory([...history, activePlayer]);
                if (window.confirm(`${players[activePlayer]} Won! Do you want to play again?`)) {
                    initRound();
                } else {
                    initGame();
                }
            } else if (gameDraw(newGame)) {
                console.log('Game Draw');
                setHistory([...history, -1]);
                if (window.confirm('Game Draw! Do you want to play again?')) {
                    initRound();
                } else {
                    initGame();
                }
            } else {
                setGame(newGame);
                setActivePlayer(activePlayer == 0 ? 1 : 0);
            }
        }
    }


    const gameWon = (game: number[], player: number) => {
        const winningCombination = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
            [0, 4, 8], [2, 4, 6] // Diagonal
        ];
        for (let i = 0; i < winningCombination.length; i++) {
            const [a, b, c] = winningCombination[i];
            if (game[a] == player && game[b] == player && game[c] == player) {
                return true;
            }
        }
        return false;
    }

    const gameDraw = (game: number[]) => {
        return game.every(cell => cell !== -1);
    }
    return (<div className="grid grid-cols-3 gap-1" >
        {
            game.map((cell, index) => (
                <div key={index} onClick={() => updateCell(index)} className={`min-w-32 min-h-32 bg-gray-700 hover:bg-gray-600 hover:drop-shadow-xl select-none flex items-center justify-center text-6xl font-bold ${cell == 0 && 'text-primary'} ${cell == 1 && 'text-light'} ${index == 0 && 'rounded-tl-lg'} ${index == 2 && 'rounded-tr-lg'} ${index == 6 && 'rounded-bl-lg'} ${index == 8 && 'rounded-br-lg'}`}>
                    {cell == 0 ? 'X' : cell == 1 ? 'O' : ''}
                    {cell == -1 && (
                        <span className={`opacity-0 hover:opacity-40 w-full h-full flex justify-center items-center ${activePlayer == 0 && 'text-primary'} ${activePlayer == 1 && 'text-light'}`}>
                            {activePlayer == 0 ? 'X' : 'O'}
                        </span>
                    )}
                </div>
            ))
        }
    </div >)
}
export default GameBoard;