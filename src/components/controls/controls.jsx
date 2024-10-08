import React, { useState, useEffect, useRef } from 'react';
import './controls.css';

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

    // State for tracking dragging
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const offset = useRef({ x: 0, y: 0 });

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

    // Mouse down event - start dragging
    const handleMouseDown = (e) => {
        setIsDragging(true);
        offset.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        };
    };

    // Mouse move event - move the controls
    const handleMouseMove = (e) => {
        if (isDragging) {
            const newX = e.clientX - offset.current.x;
            const newY = e.clientY - offset.current.y;
            setPosition({ x: newX, y: newY });
        }
    };

    // Mouse up event - stop dragging
    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        // Add mouse move and mouse up listeners when dragging
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        } else {
            // Cleanup listeners
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    return (
        <div className='main-controls'>
            <div
                className='left-column'
                ref={controlsRef}
                style={{ 
                    transform: `translate(${position.x}px, ${position.y}px)`, 
                    position: 'absolute', cursor: isDragging ? 'grabbing' : 'grab' 
                }}
                onMouseDown={handleMouseDown}
            >
                <div className='controls-header' ref={headerRef} style={{ width: `${headerWidth}px` }}>
                    <p>CONTROLS</p>
                    <div className='controls-arrow'></div>
                </div>

                <div className='controls-input' style={{ marginTop: `${marginTop}px` }}>
                    <label>GRID SIZE</label>
                    <input
                        ref={inputRef}
                        placeholder='50 - 2000'
                        value={gridSize}
                        onChange={(e) => setGridSize(e.target.value)}
                    />
                </div>
                <div className='controls-input'>
                    <label>SIMULATION SPEED</label>
                    <input
                        placeholder='10ms - 500ms'
                        value={simSpeed}
                        onChange={(e) => setSimSpeed(e.target.value)}
                    />
                </div>
                <div className='controls-hr-line'></div>
                <div className='controls-buttons'>
                    <button style={{ width: `${buttonWidth}px` }}>CLEAR GRID</button>
                    <button
                        onClick={() => setIsRunning(!isRunning)}
                        style={{ color: isRunning ? '#de0b0b' : 'rgb(43, 43, 43)', width: `${buttonWidth}px` }}
                    >
                        {isRunning ? 'STOP SIMULATION' : 'START SIMULATION'}
                    </button>
                </div>
            </div>

            <div className='right-column'></div>
        </div>
    );
};

export default Controls;
