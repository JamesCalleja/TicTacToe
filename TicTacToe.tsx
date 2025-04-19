import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface GameState {
    board: (string | null)[];
    currentPlayer: 'X' | 'O';
    winner: string | null;
    isDraw: boolean;
}

const TicTacToe: React.FC = () => {
    const [gameState, setGameState] = useState<GameState>({
        board: Array(9).fill(null),
        currentPlayer: 'X',
        winner: null,
        isDraw: false,
    });

    const calculateWinner = (squares: (string | null)[]): string | null => {
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
                return squares[a];
            }
        }
        return null;
    };

    const isBoardFull = (squares: (string | null)[]): boolean => {
        return squares.every(square => square !== null);
    };

    const handleCellClick = (index: number) => {
        if (gameState.board[index] || gameState.winner) {
            return;
        }

        const newBoard = [...gameState.board];
        newBoard[index] = gameState.currentPlayer;
        const winner = calculateWinner(newBoard);
        const isDraw = isBoardFull(newBoard) && !winner;

        setGameState({
            board: newBoard,
            currentPlayer: gameState.currentPlayer === 'X' ? 'O' : 'X',
            winner: winner,
            isDraw: isDraw,
        });
    };

    const resetGame = () => {
        setGameState({
            board: Array(9).fill(null),
            currentPlayer: 'X',
            winner: null,
            isDraw: false,
        });
    };

    const renderCell = (index: number) => {
        return (
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={cn(
                    "w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 border border-gray-400 flex items-center justify-center text-4xl sm:text-5xl md:text-6xl font-bold cursor-pointer transition-all duration-200",
                    gameState.board[index] === 'X' ? 'text-blue-500' : 'text-red-500',
                    index < 3 && 'border-b-0',
                    index % 3 !== 0 && 'border-r-0',
                    'focus:outline-none'
                )}
                onClick={() => handleCellClick(index)}
                disabled={gameState.board[index] !== null || gameState.winner !== null}
            >
                {gameState.board[index]}
            </motion.button>
        );
    };

    let status;
    if (gameState.winner) {
        status = `Winner: ${gameState.winner}`;
    } else if (gameState.isDraw) {
        status = 'Draw!';
    } else {
        status = `Next Player: ${gameState.currentPlayer}`;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 text-gray-800">Tic Tac Toe</h1>
            <div
                className={cn(
                    "grid grid-cols-3",
                    "border-l border-t border-gray-400"
                )}
            >
                {gameState.board.map((_, index) => renderCell(index))}
            </div>
            <div className="mt-8 text-2xl sm:text-3xl font-semibold text-gray-700">{status}</div>
            <Button
                onClick={resetGame}
                className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Play Again
            </Button>
        </div>
    );
};

export default TicTacToe;
