import React, { useState, useEffect, useCallback } from 'react';
import './grid.css';

const Grid = ({ gridSize, simSpeed, isRunning, clear }) => {
    const [grid, setGrid] = useState([]);
    const [rows, setRows] = useState(50);
    const [cols, setCols] = useState(50);
    const [cellSize, setCellSize] = useState(0);
    const [isDrawing, setIsDrawing] = useState(false);

    const createEmptyGrid = useCallback(() => {
        const grid = [];
        for (let i = 0; i < rows; i++) {
            grid.push(Array.from(Array(cols), () => 0));
        }
        return grid;
    }, [rows, cols]);

    useEffect(() => {
        const size = parseInt(gridSize, 10) || 50;
        setRows(size);
        setCols(size);
        setGrid(createEmptyGrid());
        
        setCellSize(80 / size);
    }, [gridSize, createEmptyGrid]);

    useEffect(() => {
        if (clear) {
            setGrid(createEmptyGrid());
        }
    }, [clear, createEmptyGrid]);

    const toggleCellState = (row, col) => {
        const newGrid = grid.map((r, i) =>
            r.map((cell, j) => (i === row && j === col ? (cell ? 0 : 1) : cell))
        );
        setGrid(newGrid);
    };

    const handleMouseDown = (row, col) => {
        setIsDrawing(true);
        toggleCellState(row, col);
    };

    const handleMouseOver = (row, col) => {
        if (isDrawing) {
            toggleCellState(row, col);
        }
    };

    const handleMouseUp = () => {
        setIsDrawing(false);
    };

    useEffect(() => {
        window.addEventListener('mouseup', handleMouseUp);
        return () => {
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    const renderGrid = () => {
        return grid.map((row, rowIndex) => (
            <div className="grid-row" key={rowIndex}>
                {row.map((cell, colIndex) => (
                    <div
                        key={colIndex}
                        className={`grid-cell ${cell ? 'alive' : 'dead'}`}
                        style={{
                            width: `${cellSize}vh`,
                            height: `${cellSize}vh`,
                        }}
                        onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                        onMouseOver={() => handleMouseOver(rowIndex, colIndex)}
                    ></div>
                ))}
            </div>
        ));
    };

    useEffect(() => {
        if (!isRunning) return;

        const runSimulation = () => {
            setGrid((g) => {
                const newGrid = g.map((row, i) =>
                    row.map((cell, j) => {
                        const neighbors = [
                            [i - 1, j - 1],
                            [i - 1, j],
                            [i - 1, j + 1],
                            [i, j - 1],
                            [i, j + 1],
                            [i + 1, j - 1],
                            [i + 1, j],
                            [i + 1, j + 1],
                        ];

                        let aliveNeighbors = 0;
                        neighbors.forEach(([x, y]) => {
                            if (x >= 0 && x < rows && y >= 0 && y < cols) {
                                aliveNeighbors += g[x][y];
                            }
                        });

                        if (cell === 1 && (aliveNeighbors < 2 || aliveNeighbors > 3)) {
                            return 0;
                        } else if (cell === 0 && aliveNeighbors === 3) {
                            return 1;
                        }
                        return cell;
                    })
                );
                return newGrid;
            });
        };

        const interval = setInterval(runSimulation, parseInt(simSpeed, 10) || 100);
        return () => clearInterval(interval);
    }, [isRunning, grid, rows, cols, simSpeed]);

    return <div className="grid">{renderGrid()}</div>;
};

export default Grid;
