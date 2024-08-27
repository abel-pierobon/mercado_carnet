import dengue from './img/dengue.jpeg';
import masterclasss from './img/masterclass.jpeg';
import atencion from './img/atencion.jpeg';
import requisitos from './requisitosImagen.png';

import React, { useState, useEffect } from 'react';
function EventosNuevos() {
    // const componentes = [dengue, masterclasss, atencion];
    // const [indiceActivo, setIndiceActivo] = useState(0);

    // useEffect(() => {
    //     const intervalo = setInterval(() => {
    //         setIndiceActivo((prevIndice) =>
    //             prevIndice === componentes.length - 1 ? 0 : prevIndice + 1
    //         );
    //     }, 15000);

    //     return () => clearInterval(intervalo);
    // }, [componentes.length]);
    return (
        <div className="flex justify-center">
            {/* <img
                    src={componentes[indiceActivo]}
                    alt="eventos"
                    className=" border border-black rounded-lg p-1 h-96"
                /> */}
            {/* <img
                    src={requisitos}
                    alt="eventos"
                    className=" border border-black rounded-lg p-1 h-full w-full"
                /> */}
            <div style={{ width: '100%', height: '100vh' }}>
                <iframe
                    src="https://cordoba.gob.ar/novedades/"
                    style={{ width: '100%', height: '60%', border: 'rounded' }}
                    title="Página Ejemplo"
                    
                />
            </div>
        </div>
    );
}
export default EventosNuevos;
