import React from 'react';

function CallEnd({ turno, esUltimo }) {
    const clases = esUltimo ? 'call-end-destacado' : '';

    return (
        <div
            key={turno.id}
            className={`grid md:grid-cols-1 border border-black card shadow-md p-4 rounded-md ${clases} ultimoLlamado text-white shadow-md shadow-blue-700 flex`}
        >
            <div className="flex flex-col justify-center items-center">
                <div className="flex justify-center items-center">
                    <h2 className="text-center font-black uppercase m-3  text-sm md:text-2xl lg:text-7xl">
                        {turno.apellido} <span className='ml-2'>{turno.nombre}</span>
                    </h2>

                </div>
                <h2 className="text-center mdtext-start font-black uppercase m-3  text-sm md:text-2xl lg:text-6xl">
                    {turno.puesto}
                </h2>
            </div>
        </div>
    );
}

export default CallEnd;
