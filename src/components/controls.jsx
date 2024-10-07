import React, { useState, useEffect } from 'react';
import './controls.css'

const Controls = ({containerHeight}) => {
    return(
        <div className='main-controls' style={{height: `${containerHeight}px`}}>
            <div className='rigth-column'>
                <input></input>
                <button>RANDOMIZE GRID</button>
            </div>
            <div className='left-column'>
                <input></input>
                <button>START SIMULATION</button>
            </div>
        </div>
    )
};

export default Controls