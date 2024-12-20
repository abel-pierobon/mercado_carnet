import React from 'react';
import gorro from './img/gorro.png';
function CallEnd({ turno, esUltimo }) {
    const clases = esUltimo ? 'call-end-destacado' : '';
    const turnoLlamado = turno.apellido + ' ' + turno.nombre;
    return (
        <div
            key={turno.id}
            className={`grid md:grid-cols-1  card shadow-md p-4 ${clases} ultimoLlamado text-white shadow-md shadow-blue-300`}
        >
            <div className="flex 2xl:flex-col justify-center items-center">
                <div className="flex justify-center items-center">
                    <h2
                        className={
                            turnoLlamado.length > 24
                                ? 'text-center font-black uppercase m-2  text-sm md:text-2xl 2xl:text-8xl text-shadow'
                                : 'text-center font-black uppercase m-2  text-sm md:text-2xl 2xl:text-9xl text-shadow'
                        }
                    >
                        {turnoLlamado}
                    </h2>
                </div>
                <div className="flex justify-center items-center w-full">
                <img
                        src={gorro}
                        width={100}
                        alt="Gorro"
                        className="w-24 h-24 flex justify-end"
                    />
                    <h2 className="text-center mdtext-start font-black uppercase m-3  text-sm md:text-2xl 2xl:text-8xl text-shadow">
                        {turno.puesto}
                    </h2>
                    <img
                        src={gorro}
                        width={100}
                        alt="Gorro"
                        className="w-24 h-24 flex justify-end"
                    />
                </div>
            </div>
        </div>
    );
}

export default CallEnd;
