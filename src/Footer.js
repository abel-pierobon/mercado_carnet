import React from 'react';
import instagram from './instagram.png';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="flex flex-col bg-[#59a0e7] h-[5%]">
            <div className="flex justify-center items-center h-6 text-black font-bold font-[Maven Pro]  text-sm">
                <p className='mt-4'>
                    &copy; copyright 2024 -Realizado por Personal del CPC
                    Mercado de la Ciudad
                </p>
            </div>
        </footer>
    );
}

export default Footer;
