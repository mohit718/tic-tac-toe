import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiResetLeftLine } from "react-icons/ri";

type PropType = {
    players: string[];
    setPlayers: (players: string[]) => void;
    history: number[];
    initGame: () => void;
}
function GameInfo({ players, setPlayers, history, initGame }: PropType): JSX.Element {
    const [editingPlayer, setEditingPlayer] = useState<number | null>(null);
    const [newPlayerName, setNewPlayerName] = useState('');

    const handleEditPlayer = (index: number) => {
        setEditingPlayer(index);
        setNewPlayerName(players[index]);
    }

    const handleSavePlayerName = () => {
        if (editingPlayer !== null) {
            const updatedPlayers = [...players];
            updatedPlayers[editingPlayer] = newPlayerName;
            setPlayers(updatedPlayers);
            setEditingPlayer(null);
            setNewPlayerName('');
        }
    }

    const getOutstandingPlayer = () => {
        const player1Wins = history.filter(result => result === 0).length;
        const player2Wins = history.filter(result => result === 1).length;

        if (player1Wins > player2Wins) {
            return players[0];
        } else if (player2Wins > player1Wins) {
            return players[1];
        } else {
            return 'No one';
        }
    }

    return (
        <>
            <div className="flex justify-evenly items-center gap-2 mx-4">
                <div className="lg:p-4 p-2 bg-gray-700 rounded-lg text-center w-full lg:text-lg text-sm">
                    {getOutstandingPlayer()} is currently winning!
                </div>
                <button onClick={() => initGame()} className="rounded-lg font-verdana font-semibold text-semilight lg:text-3xl text-2xl hover:text-light" title="Reset Game"><RiResetLeftLine /></button>
            </div>
            <div className="flex flex-col items-center">
                <table className="table-auto border-collapse border-gray-500 text-gray-300 lg:text-lg text-sm">
                    <thead>
                        <tr>
                            <th className="border-r border-b border-gray-600 px-4 py-2 text-center">Round</th>
                            <th className="border-r border-b border-gray-600 px-4 py-2 text-center">
                                {editingPlayer === 0 ? (
                                    <input
                                        className="bg-gray-700 text-gray-100 px-2 py-1 rounded text-sm w-auto"
                                        value={newPlayerName}
                                        onChange={(e) => setNewPlayerName(e.target.value)}
                                        onBlur={handleSavePlayerName}
                                        autoFocus
                                    />
                                ) : (
                                    <span className="flex gap-2 items-center">
                                        {players[0]} <FaRegEdit onClick={() => handleEditPlayer(0)} />
                                    </span>
                                )}
                            </th>
                            <th className="border-b border-gray-600 px-4 py-2 text-center">
                                {editingPlayer === 1 ? (
                                    <input
                                        className="bg-gray-700 text-gray-100 px-2 py-1 rounded"
                                        value={newPlayerName}
                                        onChange={(e) => setNewPlayerName(e.target.value)}
                                        onBlur={handleSavePlayerName}
                                        autoFocus
                                    />
                                ) : (
                                    <span className="flex gap-2 items-center">
                                        {players[1]} <FaRegEdit onClick={() => handleEditPlayer(1)} />
                                    </span>
                                )}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((result, index) => (
                            <tr key={index}>
                                <td className={`${index < history.length - 1 && 'border-b'} border-r border-gray-600 px-4 py-2 text-center`}>{index + 1}</td>
                                <td className={`${index < history.length - 1 && 'border-b'} border-r border-gray-600 px-4 py-2 text-center ${result == 0 && 'text-success'} ${result == 1 && 'text-danger'} ${result == -1 && 'text-secondary'}`}>{result == 0 ? 'Won' : result == 1 ? 'Loss' : 'Draw'}</td>
                                <td className={`${index < history.length - 1 && 'border-b'} border-gray-600 px-4 py-2 text-center ${result == 1 && 'text-success'} ${result == 0 && 'text-danger'} ${result == -1 && 'text-secondary'}`}>{result == 1 ? 'Won' : result == 0 ? 'Loss' : 'Draw'}</td>
                            </tr>
                        ))}
                        {history.length == 0 && (
                            <tr>
                                <td colSpan={3} className="text-secondary text-center">No rounds played yet.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default GameInfo