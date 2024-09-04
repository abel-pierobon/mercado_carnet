import {  useState } from 'react';
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

function VerDisponibles({ turnos, puestoDeAtencion }) {
    const [modalEliminar, setModalEliminar] = useState(false);
    const [mensaje, setMensaje] = useState('');

    const llamar = () => {
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
            setClickedTurnoId(turnos.id); // Guardar el ID del turno clickeado
            setMensaje('Atención marcada con éxito');
            setTimeout(() => {
                setMensaje('');
            }, 12000);
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
                        ? 'bg-gray-500'
                        : ''
                }`}
            >
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
                            Selecciona un puesto de atención para llamar
                        </button>
                    )
                ) : (
                    <p className="font-semibold flex justify-center text-center text-black border border-black bg-sky-600 rounded-md p-1 mt-2 llamadoTurno">
                        {mensaje}
                    </p>
                )}

                {puestoDeAtencion !== 'Consultorio Medico' ? (
                    <button
                        className="rounded-md border border-radius border-black bg-red-500 text-white p-1 mt-2 hover:bg-red-600"
                        onClick={handleModalizar}
                    >
                        Trámite finalizado
                    </button>
                ) : turnos.consultorioMedico ? (
                    <p className="text-center font-bold mt-2 ">
                        Turno atendido
                    </p>
                ) : (
                    <button
                        className="rounded-md border border-radius border-black bg-red-500 text-white p-1 mt-2 hover:bg-red-600"
                        onClick={changeConsultorioMedico}
                    >
                        Marcar atención
                    </button>
                )}
                {modalEliminar && (
                    <ModalEliminar
                        handleModalizar={handleModalizar}
                        handleCloseModalizar={handleCloseModalizar}
                        eliminarTurno={eliminarTurno}
                    />
                )}
            </div>
        </section>
    );
}

export default VerDisponibles;
