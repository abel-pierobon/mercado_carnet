import React, { useState, useEffect } from 'react';
import EventosNuevos from './EventosNuevos';
import Descargas from './Descargas';

const Carrusel = () => {
    const componentes = [<EventosNuevos />, <Descargas />];
    const [indiceActivo, setIndiceActivo] = useState(0);

    useEffect(() => {
        const intervalo = setInterval(() => {
            setIndiceActivo((prevIndice) =>
                prevIndice === componentes.length - 1 ? 0 : prevIndice + 1
            );
        }, 15000); 

        return () => clearInterval(intervalo); // Limpia el intervalo al desmontar el componente
    }, [componentes.length]);

    return (
        <div className="w-full h-full">
            {componentes[indiceActivo]}
        </div>
    );
};

export default Carrusel;
