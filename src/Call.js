import React from 'react';

function Call({ turno }) {
    const horaFormateada = turno.timestamp ? new Date(turno.timestamp.toDate()).toLocaleTimeString() : '';

    return (
        <div key={turno.id} className="border border-gray-800 border-x-2 border-y-2 card shadow-md py-2 px-2 rounded-md llamados">
            <div className="flex justify-between">
                <h2 className="text-start font-black uppercase m-1 text-base md:text-lg 2xl:text-2xl">
                {turno.apellido} {turno.nombre}
                </h2>
                <h2 className="text-end font-semibold uppercase m-1  text-base md:text-lg 2xl:text-2xl">{turno.puesto}</h2>
            </div>
                {/* <p className="hidden  md:text-start uppercase m-3">{horaFormateada}</p> */}
        </div>
    );
}

export default Call;
