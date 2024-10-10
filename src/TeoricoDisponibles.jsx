import { collection, doc, updateDoc, addDoc } from 'firebase/firestore';
import { useState } from 'react';
import ModalCalificar from './ModalCalificar';
import { db } from './db/datos';
function TeoricoDisponibles({ turnos }) {
    const [modalCalificar, setModalCalificar] = useState(false);

    const aprobado = async () => {
        try {
            const turnoDocRef = doc(db, 'turnos', turnos.id);
            await updateDoc(turnoDocRef, { nota: 'Aprobado', examen: true });
        } catch (error) {
            console.error('Error al actualizar el turno:', error);
        }
        setModalCalificar(false);
    };

    const desaprobado = async () => {
        try {
            const turnoDocRef = doc(db, 'turnos', turnos.id);
            await updateDoc(turnoDocRef, { nota: 'Desaprobado', examen: true });
            const agregarPendiente = collection(db, 'pendientes');
            await addDoc(agregarPendiente, {
                nombre: turnos.datos.nombre,
                apellido: turnos.datos.apellido,
                tramite: turnos.datos.tramite,
                horaTurno: turnos.datos.horaTurno,
                fecha: turnos.fecha,
            })
        } catch (error) {
            console.error('Error al actualizar el turno:', error);
        }
        setModalCalificar(false);
    };

    return (
        <tr className={ turnos.examen === true || turnos.datos.tramite === 'Teórico pendiente'? "bg-gray-200 text-center" : " text-center"}>
            <td className="border border-black p-2 font-bold uppercase text-start">{turnos.datos.apellido}</td>
            <td className="border border-black p-2 font-bold uppercase text-start">{turnos.datos.nombre}</td>
            <td className="border border-black p-2">
                {turnos.datos.tramite === 'Teórico pendiente' ? (
                    <h3 className="font-black uppercase ">Trámite pendiente Aprobado</h3>
                ): (
                    turnos.examen === true ? (
                        <span className={turnos.nota === 'Aprobado' ? "font-black uppercase text-green-700" : "font-black uppercase text-red-500"}>{turnos.nota}</span>
                    ) : (
                        <span className="font-black uppercase text-orange-500">Pendiente</span>
                    )
                )}
            </td>
            <td className="border border-black p-2 h-full">
                {turnos.datos.tramite === 'Teórico pendiente' ? (
                    <h3 className="font-black uppercase ">Trámite pendiente realizado</h3>
                ): (
                    turnos.examen === true ? (
                        <p className="font-black uppercase ">Examen Realizado</p>
                    ) : (
                        <button
                            className="rounded-md border border-radius border-black bg-green-500 font-bold p-2 hover:bg-green-700 hover:text-white"
                            onClick={() => setModalCalificar(true)}
                        >
                            Calificar
                        </button>
                    )
                )}
            </td>
            {modalCalificar && (
                <ModalCalificar
                    aprobado={aprobado}
                    desaprobado={desaprobado}
                    setModalCalificar={setModalCalificar}
                    turnos={turnos}
                />
            )}
        </tr>
    );
}

export default TeoricoDisponibles;
