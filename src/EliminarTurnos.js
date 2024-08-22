import React from 'react'

function EliminarTurnos({eliminar}) {
    return (
        <div className=''>
                <button onClick={eliminar} className="rounded-md border border-radius border-red-500 bg-red-500 text-white p-1 mt-2" >Limpiar Turnos</button>
        </div>
    )
}

export default EliminarTurnos