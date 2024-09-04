import { useState } from 'react';
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
import { toast } from "sonner";


function VerDisponibles({ turnos, puestoDeAtencion }) {
    const [selectedPuesto, setSelectedPuesto] = useState('');
    const [modalEliminar, setModalEliminar] = useState(false);

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
    };
    const handleModalizar = () => {
        setModalEliminar(true);
    };

    const handleCloseModalizar = () => {
        setModalEliminar(false);
    };
    const handleElegirPuesto = () => {
        toast.success('Elige puesto de atención');
    }
    const eliminarTurno = async () => {
        try {
            const turnoDocRef = doc(db, 'turnos', turnos.id);
            await deleteDoc(turnoDocRef);
            setModalEliminar(false);
            // window.location.reload();
        } catch (error) {
            console.error('Error al eliminar el turno:', error);
        }
    };

    const changeConsultorioMedico = async () => {
        try {
            const turnoDocRef = doc(db, 'turnos', turnos.id);
            await updateDoc(turnoDocRef, { consultorioMedico: true });
            console.log('Turno actualizado correctamente.');
        } catch (error) {
            console.error('Error al actualizar el turno:', error);
        }
    };

    const handlePuestoChange = (event) => {
        setSelectedPuesto(event.target.value);
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
                {/* <select onChange={handlePuestoChange}>
                    <option value="select">Elige lugar</option>
                    <option value="Ventanilla 1">Ventanilla 1</option>
                    <option value="Ventanilla 2">Ventanilla 2</option>
                    <option value="Emisión de Licencias">Emisión Licencias</option>
                    <option value="Consultorio Médico">Consultorio Médico</option>
                </select> */}
                {puestoDeAtencion !== 'select' ? (
                    <button
                    className="rounded-md border border-radius border-black bg-green-500 p-1 mt-2"
                    onClick={llamar}
                >
                    Llamar a {puestoDeAtencion}
                </button>
                ) : (
                    <button
                        className="rounded-md border border-radius border-black bg-green-500 p-1 mt-2"
                        onClick={handleElegirPuesto}
                    >
                        Selecciona un puesto de atención para llamar
                    </button>
                )}
                {puestoDeAtencion !== 'Consultorio Medico' ? (
                    <button
                        className="rounded-md border border-radius border-red-500 bg-red-500 text-white p-1 mt-2"
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
                        className="rounded-md border border-radius border-red-500 bg-red-500 text-white p-1 mt-2"
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
