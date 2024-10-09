import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './controls.css';
import Grid from '../grid/grid';
import arrow from './arrow.png'

const Controls = () => {
    const inputRef = useRef(null);
    const controlsRef = useRef(null);
    const headerRef = useRef(null);
    const [buttonWidth, setButtonWidth] = useState(0);
    const [headerWidth, setHeaderWidth] = useState(0);
    const [marginTop, setMarginTop] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [gridSize, setGridSize] = useState('');
    const [simSpeed, setSimSpeed] = useState('');
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const offset = useRef({ x: 0, y: 0 });
    const [clear, setClear] = useState(false);

    useEffect(() => {
        if (inputRef.current) {
            setButtonWidth(inputRef.current.offsetWidth);
        }

        if (controlsRef.current) {
            setHeaderWidth(controlsRef.current.offsetWidth);
        }

        if (headerRef.current) {
            setMarginTop(headerRef.current.offsetHeight);
        }
    }, []);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        offset.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        };
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            const newX = e.clientX - offset.current.x;
            const newY = e.clientY - offset.current.y;
            setPosition({ x: newX, y: newY });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        } else {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    const handleClearGrid = () => {
        setClear(true);
        setTimeout(() => setClear(false), 100);
    };

    return (
        <div className="main-controls">
            <motion.div
                animate={{
                    height: isCollapsed ? '0px' : `295px`,
                    backgroundColor: isCollapsed ? '#fff' : '#2b2b2b',
                }}
                className="left-column"
                ref={controlsRef}
                style={{
                    transform: `translate(${position.x}px, ${position.y}px)`,
                    position: 'absolute',
                    cursor: isDragging ? 'grabbing' : 'grab',
                }}
                onMouseDown={handleMouseDown}
            >
                <div
                    className="controls-header"
                    ref={headerRef}
                    style={{
                        width: `${headerWidth}px`,
                        borderRadius: isCollapsed ? '20px' : '20px 20px 0 0',
                    }}
                >
                    <div className="controls-header-text">
                        <p>CONTROLS</p>
                    </div>
                    <motion.div
                        animate={{ rotate: isCollapsed ? '270deg' : '90deg' }}
                        className="controls-arrow"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                    >
                        <img src={arrow}/>
                    </motion.div>
                </div>

                {!isCollapsed && (
                    <motion.div
                        className="controls-content"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="controls-input" style={{ marginTop: `${marginTop}px` }}>
                            <label>GRID SIZE</label>
                            <input
                                ref={inputRef}
                                placeholder="50 - 100"
                                value={gridSize}
                                onChange={(e) => setGridSize(e.target.value)}
                            />
                        </div>
                        <div className="controls-input">
                            <label>SIMULATION SPEED</label>
                            <input
                                placeholder="10ms - 500ms"
                                value={simSpeed}
                                onChange={(e) => setSimSpeed(e.target.value)}
                            />
                        </div>
                        <div className="controls-hr-line"></div>
                        <div className="controls-buttons">
                            <button
                                style={{ width: `${buttonWidth}px` }}
                                onClick={handleClearGrid}
                            >
                                CLEAR GRID
                            </button>
                            <button
                                onClick={() => setIsRunning(!isRunning)}
                                style={{
                                    color: isRunning ? '#de0b0b' : 'rgb(43, 43, 43)',
                                    width: `${buttonWidth}px`,
                                }}
                            >
                                {isRunning ? 'STOP SIMULATION' : 'START SIMULATION'}
                            </button>
                        </div>
                    </motion.div>
                )}
            </motion.div>
            <div className="right-column">
                <Grid
                    gridSize={gridSize}
                    simSpeed={simSpeed}
                    isRunning={isRunning}
                    clear={clear}
                />
            </div>
        </div>
    );
};

export default Controls;
