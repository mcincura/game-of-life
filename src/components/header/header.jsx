import React, { useState, useEffect, useRef } from 'react';
import './header.css'
import { FaGithub, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";

const Header = () => {
    return(
        <div className='header-main-wrapper'>
            <div className='header-main'>
                <div className='header-title'>
                    <h1>GAME OF LIFE</h1>
                </div>
                <div className='header-socials'>
                    <a href='https://github.com/mcincura' target='blank'><FaGithub color='#fff' size={40}/></a>
                    <a href='https://www.instagram.com/catomincura/' target='blank'><FaInstagram color='#fff' size={40}/></a>
                    <a href='https://x.com/MartinCincura' target='blank'><FaXTwitter color='#fff' size={40}/></a>
                </div>
            </div>
        </div>


    )
};

export default Header