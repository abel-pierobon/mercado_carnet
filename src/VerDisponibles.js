import React, { useContext, useState } from 'react';
import {
    collection,
    addDoc,
    serverTimestamp,
    doc,
    deleteDoc,
    updateDoc,
} from 'firebase/firestore';
import { db } from './db/datos';
import ModalEliminar from './ModalEliminar';
import ModalEditarTurno from './ModalEditarTurno';
import editar from './img/editar.png';
import { ContextTurnero } from './ContextTurnero';
function VerDisponibles({ turnos, puestoDeAtencion }) {
    const [modalEliminar, setModalEliminar] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const [modalEditar, setModalEditar] = useState(false);
    const { activarModal, desactivarModal } = useContext(ContextTurnero);
    const llamar = () => {
        desactivarModal();
        const llamadoCollection = collection(db, 'llamados');
        const llamado = {
            nombre: turnos.datos.nombre,
            apellido: turnos.datos.apellido,
            puesto: puestoDeAtencion,
            timestamp: serverTimestamp(),
        };
        addDoc(llamadoCollection, llamado)
            .then((resultado) => {
                console.log(resultado);
            })
            .catch((error) => {
                console.error(error);
            });
            setTimeout(() => {
                activarModal();
            }, 1800000);
        setMensaje('Llamado realizado con éxito');
        setTimeout(() => {
            setMensaje('');
        }, 12000);
    };
    
    const handleModalizar = () => {
        setModalEliminar(true);
    };

    const handleCloseModalizar = () => {
        setModalEliminar(false);
    };

    const handleElegirPuesto = () => {
        setMensaje('Elige primero una sección');
        setTimeout(() => {
            setMensaje('');
        }, 3000);
    };

    const eliminarTurno = async () => {
        try {
            const turnoDocRef = doc(db, 'turnos', turnos.id);
            await deleteDoc(turnoDocRef);
            setModalEliminar(false);
        } catch (error) {
            console.error('Error al eliminar el turno:', error);
        }
    };

    const changeConsultorioMedico = async () => {
        try {
            const turnoDocRef = doc(db, 'turnos', turnos.id);
            await updateDoc(turnoDocRef, { consultorioMedico: true });
        } catch (error) {
            console.error('Error al actualizar el turno:', error);
        }
    };

    const editarTurno = async (nuevosDatos) => {
        try {
            const turnoDocRef = doc(db, 'turnos', turnos.id);
            await updateDoc(turnoDocRef, { datos: nuevosDatos });
            setModalEditar(false);
        } catch (error) {
            console.error('Error al actualizar el turno:', error);
        }
    };

    return (
        <section>
            <div
                key={turnos.id}
                className={`grid md:grid-cols-1 border border-black shadow-xl p-4 rounded-md bg-gray-200 ${
                    turnos.consultorioMedico === true &&
                    puestoDeAtencion === 'Consultorio Medico'
                        ? 'hidden'
                        : ''
                }`}
            >
                {puestoDeAtencion !== 'Consultorio Medico' ? (
                    <button className="px-1 flex justify-end ">
                        <img
                            src={editar}
                            alt="Editar"
                            onClick={() => setModalEditar(true)}
                            className=" border border-black rounded-md p-1 hover:bg-gray-300"
                        />
                    </button>
                ) : null}
                <div className="flex justify-center">
                    <h2 className="text-start font-black uppercase m-3 text-lg">
                        {turnos.datos.apellido}
                    </h2>
                    <h2 className="text-start font-black uppercase m-3 text-lg">
                        {turnos.datos.nombre}
                    </h2>
                </div>
                <div className="flex justify-center space-x-6">
                    <p className="font-semibold">
                        Hora: {turnos.datos.horaTurno}
                    </p>
                    <p className="font-semibold">{turnos.datos.tramite}</p>
                </div>
                {mensaje === '' ? (
                    puestoDeAtencion !== 'select' ? (
                        <button
                            className="rounded-md border border-radius border-black bg-green-500 p-1 mt-2 hover:bg-green-600"
                            onClick={llamar}
                        >
                            Llamar a {puestoDeAtencion}
                        </button>
                    ) : (
                        <button
                            className="rounded-md border border-radius border-black bg-green-500 hover:bg-green-600 p-1 mt-2"
                            onClick={handleElegirPuesto}
                        >
                            Elige una sección
                        </button>
                    )
                ) : (
                    <p className="text-black text-center font-black p-2 llamadoTurno">
                        {mensaje}
                    </p>
                )}
                {puestoDeAtencion === 'Consultorio Medico' ? (
                    turnos.consultorioMedico === false ? (
                        <button
                            className="rounded-md border border-radius border-black bg-purple-500 text-white p-2 mt-2 hover:bg-purple-700"
                            onClick={changeConsultorioMedico}
                        >
                            Marcar como atendido
                        </button>
                    ) : (
                        <p className="text-black text-center font-black p-2 llamadoTurno">
                            {' '}
                            Turno atendido
                        </p>
                    )
                ) : (
                    <button
                        className="rounded-md border border-radius border-black bg-red-500 text-white p-2 mt-2 hover:bg-red-700"
                        onClick={handleModalizar}
                    >
                        Finalizar atención
                    </button>
                )}
                {modalEliminar && (
                    <ModalEliminar
                        eliminarTurno={eliminarTurno}
                        setModalEliminar={setModalEliminar}
                    />
                )}
                {modalEditar && (
                    <ModalEditarTurno
                        setModalEditar={setModalEditar}
                        turnos={turnos}
                        editarTurno={editarTurno}
                    />
                )}
                
            </div>
        </section>
    );
}

export default VerDisponibles;
