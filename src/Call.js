import React from 'react';

function Call({ turno }) {
    // const horaFormateada = turno.timestamp ? new Date(turno.timestamp.toDate()).toLocaleTimeString() : '';

    return (
        <div key={turno.id} className="border border-black card shadow-md p-4 rounded-md llamados">
            <div className="flex justify-between">
                <h2 className="text-start font-black uppercase m-3 text-base md:text-xl">
                {turno.apellido} {turno.nombre}
                </h2>
                <h2 className="text-start font-black uppercase m-3  text-base md:text-xl">{turno.puesto}</h2>
                {/* <h2 className="text-start font-black uppercase m-3">{horaFormateada}</h2> */}
            </div>
        </div>
    );
}

export default Call;
