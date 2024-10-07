import React, { useState, useEffect, useRef } from 'react';
import './header.css'
import { FaGithub, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import Controls from './controls';

const Header = () => {
    const [ windowWidth, setWindowWidth ] = useState(window.innerWidth);
    const [ iconSize, setIconSize] = useState(0);
    const [containerHeight, setContainerHeight] = useState(0);
    const containerRef = useRef(null);

    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        if (containerRef.current) {
            setContainerHeight(containerRef.current.offsetHeight);
            console.log(containerHeight);
        }   
    })

    useEffect(() => {
        window.addEventListener('resize', handleResize)
        const vw = windowWidth / 100;
        setIconSize(vw * 3)
        
        if (containerRef.current) {
            setContainerHeight(containerRef.current.offsetHeight);
            console.log(containerHeight);
        }

    }, [windowWidth]);

    return(
        <div className='header-main-wrapper'>
            <div className='header-main' ref={containerRef}>
                <div className='header-title'>
                    <h1>GAME OF LIFE</h1>
                </div>
                <div className='header-socials'>
                    <a href='https://github.com/mcincura' target='blank'><FaGithub color='#fff' size={40}/></a>
                    <a href='https://www.instagram.com/catomincura/' target='blank'><FaInstagram color='#fff' size={40}/></a>
                    <a href='https://x.com/MartinCincura' target='blank'><FaXTwitter color='#fff' size={40}/></a>
                </div>
            </div>
            <div className='controls-wrapper'>
                <Controls containerHeight={containerHeight}/>
            </div>
        </div>


    )
};

export default Header