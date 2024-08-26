import React, { useState, useEffect } from 'react';
import guia from './qrguia.png';
import requisitos from './requisitosImagen.png';
import redes from './qrImagen.png';

const Carrusel = () => {
    const componentes = [guia, requisitos, redes];
    const [indiceActivo, setIndiceActivo] = useState(0);

    useEffect(() => {
        const intervalo = setInterval(() => {
            setIndiceActivo((prevIndice) =>
                prevIndice === componentes.length - 1 ? 0 : prevIndice + 1
            );
        }, 5000); 

        return () => clearInterval(intervalo); 
    }, [componentes.length]);

    return (
        <div className="border border-black rounded-xl shadow-lg shadow-gray-500">
            <img src={componentes[indiceActivo]} alt="Carrusel" className="w-full h-full object-cover border rounded-xl"/>
        </div>
    );
};

export default Carrusel;
