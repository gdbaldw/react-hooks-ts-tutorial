import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

function Square(props: { value: string; onClick: () => void }) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function Board(props: {
  squares: Array<string>;
  onClick: (i: number) => void;
}) {
  function renderSquare(i: number) {
    return <Square value={props.squares[i]} onClick={() => props.onClick(i)} />;
  }
  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

function Game() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const squares = history[history.length - 1].squares.slice();
  const winner = calculateWinner(squares);
  function handleClick(i: number) {
    if (winner || squares[i]) return;
    squares[i] = stepNumber % 2 === 0 ? "X" : "O";
    setHistory(history.concat({ squares: squares }));
    setStepNumber(stepNumber + 1);
  }
  const status = winner
    ? "Winner: " + winner
    : "Next player: " + (stepNumber % 2 === 0 ? "X" : "O");
  const moves = history.map((step, move) => {
    const desc = move ? "Go to move #" + move : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });
  function jumpTo(move: number) {
    setStepNumber(move);
    setHistory(history.slice(0, move + 1));
  }
  return (
    <div className="game">
      <div className="game-board">
        <Board squares={squares} onClick={(i: number) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div className="status">{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares: Array<string>) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
