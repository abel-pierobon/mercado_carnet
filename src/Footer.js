import React from 'react';
import instagram from './instagram.png';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="flex flex-col bg-gray-300">
            <div className="flex justify-center h-6 text-[#004381] font-bold font-[Maven Pro]  text-sm">
                <p>
                    &copy; copyright 2023 -Realizado por Personal del CPC
                    Mercado de la Ciudad
                </p>
            </div>
        </footer>
    );
}

export default Footer;
