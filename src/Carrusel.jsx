import React, { useState, useEffect } from 'react';
import nueva1 from './img/1.png';
import nueva2 from './img/2.png';
import nueva3 from './img//4.png';
import horario from './img/septiembre.png';
import noche from './img/noche.png';

const Carrusel = () => {
    const componentes = [nueva1, nueva2, nueva3, horario, noche];
    const [indiceActivo, setIndiceActivo] = useState(0);

    useEffect(() => {
        const intervalo = setInterval(() => {
            setIndiceActivo((prevIndice) =>
                prevIndice === componentes.length - 1 ? 0 : prevIndice + 1
            );
        }, 20000); 

        return () => clearInterval(intervalo); 
    }, [componentes.length]);

    return (
        <div className="border border-black  rounded-xl shadow-lg shadow-gray-500 h-full w-full">
            <img src={componentes[indiceActivo]} alt="Carrusel" className="border rounded-xl h-full w-full"/>
        </div>
    );
};

export default Carrusel;
