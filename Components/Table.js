import React, { useState } from "react";
import Box from "./Box";
import './Table.css';

const Table = () => {
  const player1Logo = 'player1.png';
  const player2Logo = 'player2.png';
  const [player1Logos, setPlayer1Logos] = useState(Array(5).fill(player1Logo));
  const [player2Logos, setPlayer2Logos] = useState(Array(5).fill(player2Logo));
  const [draggedLogo, setDraggedLogo] = useState();
  const [board, setBoard] = useState(Array(9).fill(null));

  const handleDragStart = (logo, index, player) => {
    setDraggedLogo({ logo, index, player });
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    const newBoard = [...board];
    newBoard[index] = draggedLogo.logo;
    setBoard(newBoard);
    if (draggedLogo.player === 'player1') {
      const newPlayer1Logos = [...player1Logos];
      newPlayer1Logos[draggedLogo.index] = null;
      setPlayer1Logos(newPlayer1Logos);
    } else {
      const newPlayer2Logos = [...player2Logos];
      newPlayer2Logos[draggedLogo.index] = null;
      setPlayer2Logos(newPlayer2Logos);
    }
    setDraggedLogo(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleRefresh = () => {
    setBoard(Array(9).fill(null));
    setPlayer1Logos(Array(5).fill(player1Logo));
    setPlayer2Logos(Array(5).fill(player2Logo));
  };

  return (
    <div className="game-container">
      <div className="player-logos">
        {player1Logos.map((logo, index) => (
          logo && (
            <img
              key={index}
              src={logo}
              alt="Player 1 Logo"
              className="logo"
              draggable
              onDragStart={() => handleDragStart(logo, index, 'player1')}
            />
          )
        ))}
      </div>
      <div className="board">
        {board.map((logo, index) => (
          <div
            key={index}
            className="cell"
            onDrop={(e) => handleDrop(e, index)}
            onDragOver={handleDragOver}
          >
            <Box logo={logo} />
          </div>
        ))}
      </div>
      <div className="player-logos">
        {player2Logos.map((logo, index) => (
          logo && (
            <img
              key={index}
              src={logo}
              alt="Player 2 Logo"
              className="logo"
              draggable
              onDragStart={() => handleDragStart(logo, index, 'player2')}
            />
          )
        ))}
      </div>
      <button className="refresh-button" onClick={handleRefresh}>Refresh</button>
    </div>
  );
};

export default Table;
