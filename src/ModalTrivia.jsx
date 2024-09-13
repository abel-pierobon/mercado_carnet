import { useEffect, useState } from 'react';
import prueba from './db/prueba.json';

function ModalTrivia() {
    const [data, setData] = useState([]);
    const [indiceActivo, setIndiceActivo] = useState(0);
    const [respuestaCorrecta, setRespuestaCorrecta] = useState(null);

    useEffect(() => {
        const preguntasAleatorias = [...prueba.preguntas].sort(() => Math.random() - 0.5);
        setData(preguntasAleatorias);
    }, []);

    useEffect(() => {
        if (data.length > 0) {
            const timer = setInterval(() => {
                setRespuestaCorrecta(null);
                setIndiceActivo((prev) => (prev < data.length - 1 ? prev + 1 : 0));
            }, 35000); // Cambiar cada 15 segundos

            return () => clearInterval(timer); // Limpiar el intervalo
        }
    }, [data]);

    useEffect(() => {
        if (indiceActivo < data.length) {
            const correctOptionTimer = setTimeout(() => {
                setRespuestaCorrecta(data[indiceActivo].true);
            }, 25000); // Marcar opción correcta después de 10 segundos

            return () => clearTimeout(correctOptionTimer); // Limpiar el timeout
        }
    }, [indiceActivo, data]);

    const alternativas = () => {
        // Crear un array con todas las respuestas y mezclarlo
        const respuestas = [
            data[indiceActivo]?.true,
            data[indiceActivo]?.false_1,
            data[indiceActivo]?.false_2
        ].filter(Boolean); // Filtrar respuestas vacías

        // Mezclar respuestas
        return respuestas.sort(() => Math.random() - 0.5);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-95 ">
            <div className=" bg-gradient-to-t from-[#59a0e7] to-[#004b81] rounded-lg p-6 mx-48 shadow-lg shadow-[#97192f]">
                {/* <h3 className="text-center font-semibold text-7xl uppercase text-white text-shadow">Trivia Guia del buen conductor</h3> */}
                {data.length > 0 && (
                    <div>
                        <p className="text-center font-bold text-white text-shadow text-6xl">{data[indiceActivo].pregunta}</p>
                        <div className="mt-4 space-y-4">
                            {alternativas().map((respuesta, index) => (
                                <p
                                    key={index}
                                    className={`text-center text-5xl text-white  font-semibold px-4 py-2 w-2/3 mx-auto  ${
                                        respuesta === respuestaCorrecta
                                            ? "bg-green-500 mx-auto rounded-lg shadow-lg correcta"
                                            : null
                                    }`}
                                >
                                    {respuesta}
                                </p>
                            ))}
                        </div>
                    </div>
                )}
                <p className="text-start text-xl uppercase font-semibold mt-4">fuente: <span className="italic font-normal">Manual del buen conductor</span> </p>
            </div>
        </div>
    );
}

export default ModalTrivia;
