import React, { useState, useEffect } from 'react';
import { db } from './db/datos';
import { collection, query, onSnapshot } from 'firebase/firestore';
import nueva1 from './img/nueva1.png'
const Carrusel = () => {
    const [componentes, setComponentes] = useState([]);
    const [indiceActivo, setIndiceActivo] = useState(0);

    useEffect(() => {
        const imgCollection = collection(db, 'eventos');
        const q = query(imgCollection);

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const aux = querySnapshot.docs.map((doc) => {
                const imagen = doc.data();
                imagen.id = doc.id; // Asignar el id
                return imagen; // Retornar el documento que contiene el campo 'imagen'
            });
            setComponentes(aux);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        const intervalo = setInterval(() => {
            setIndiceActivo((prevIndice) =>
                prevIndice === componentes.length - 1 ? 0 : prevIndice + 1
            );
        }, 20000); 

        return () => clearInterval(intervalo); 
    }, [componentes.length]);

    return (
        <div className="border border-black rounded-xl shadow-lg shadow-gray-500 h-full w-full">
            {componentes.length > 0 ? (
                <img
                    src={componentes[indiceActivo].imagen} // Usar el campo 'imagen' del documento
                    alt="Carrusel"
                    className="border rounded-xl h-full w-full"
                />
            ): (
                <img
                    src={nueva1}
                    alt="Carrusel"
                    className="border rounded-xl h-full w-full"
                />
            )}
        </div>
    );
};

export default Carrusel;
