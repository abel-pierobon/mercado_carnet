import dengue from './img/dengue.jpeg'
import masterclasss from './img/masterclass.jpeg'
import atencion from './img/atencion.jpeg'
import React, { useState, useEffect } from 'react';
function EventosNuevos() {
    const componentes = [dengue, masterclasss, atencion];
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
        <div className="flex justify-center mx-1">
                <img
                    src={componentes[indiceActivo]}
                    alt="eventos"
                    className="w-96 h-96 border border-black rounded-lg p-1"
                />
        </div>
    );
}
export default EventosNuevos;
