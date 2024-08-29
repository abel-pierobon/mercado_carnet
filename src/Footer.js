import React from 'react';
import instagram from './instagram.png';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="flex justify-around bg-gray-200 h-[10%] xl:h-[10%]  ">
            <div className="flex justify-start ">
                <img
                    className=" hidden lg:flex justify-center items-center lg:w-16 lg:h-16 2xl:w-20 2xl:h-20  "
                    src="https://cordoba.gob.ar/wp-content/uploads/2023/12/cropped-Logo-Color_Mesa-de-trabajo-1-80x80.png"
                    alt="cropped-Logo-Color_Mesa-de-trabajo-1.png"
                    title="cropped-Logo-Color_Mesa-de-trabajo-1.png"
                ></img>
            </div>
            
            <div className="flex justify-center items-center h-6 text-black font-bold font-[Maven Pro]  text-xs   lg:text-base">
                <p className='mt-10 text-center' >
                    &copy; copyright 2024 -Desarrollado por Personal del CPC
                    Mercado de la Ciudad
                </p>
            </div>
            <div className="hidden lg:flex justify-start  ">
                <img
                    src="https://cordoba.gob.ar/wp-content/uploads/2020/08/logo-celeste-txt.svg"
                    classname="w-28 h-28"
                    alt=""
                    decoding="async"
                ></img>
            </div>
        </footer>
    );
}

export default Footer;
