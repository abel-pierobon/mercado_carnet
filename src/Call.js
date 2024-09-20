import React from 'react';
import { db } from './db/datos';
import { doc, deleteDoc } from 'firebase/firestore';
import { useContext } from 'react';
import { ContextTurnero } from './ContextTurnero';
import { toast } from 'sonner';
import cesto from './img/cesto.png';
function Call({ turno }) {
    // const horaFormateada = turno.timestamp ? new Date(turno.timestamp.toDate()).toLocaleTimeString() : '';
    const { usuario } = useContext(ContextTurnero);
    const eliminarLLamado = async () => {
        try {
            const turnoDocRef = doc(db, 'llamados', turno.id);
            await deleteDoc(turnoDocRef);
            toast.success('Llamado eliminado correctamente');
        } catch (error) {
            console.error('Error al eliminar el turno:', error);
        }
    };
    return (
        <div
            key={turno.id}
            className="border border-gray-800 border-x-2 border-y-2 card shadow-xl py-2 px-2 rounded-md llamados "
        >
            <div className="flex justify-between py-2 px-2 space-y-2">
                <h2 className="text-start font-black uppercase m-1 text-base md:text-lg xl:text-4xl  ">
                    {turno.apellido} {turno.nombre}
                </h2>
                <div className="flex justify-center items-start">
                    <h2 className="text-end  font-black uppercase m-1  text-base md:text-lg xl:text-4xl">
                        {turno.puesto}
                    </h2>
                    {usuario && (
                        <button
                            onClick={eliminarLLamado}
                            className=" flex justify-start items-start  mt-2 "
                        >
                            <img src={cesto} alt="cesto" className="w-8 h-8" />
                        </button>
                    )}
                </div>
            </div>
            {/* <p className="hidden  md:text-start uppercase m-3">{horaFormateada}</p> */}
        </div>
    );
}

export default Call;
