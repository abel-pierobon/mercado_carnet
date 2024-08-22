import { useState } from "react";
import { collection, addDoc, serverTimestamp, doc, deleteDoc } from 'firebase/firestore';
import { db } from "./db/datos";

function VerDisponibles({ turnos }) {
    const [selectedPuesto, setSelectedPuesto] = useState("");

    const llamar = () => {
        const llamadoCollection = collection(db, "llamados");
        const llamado = {
            nombre: turnos.datos.nombre,
            apellido: turnos.datos.apellido,
            puesto: selectedPuesto,
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

    const eliminarTurno = async () => {
        try {
            const turnoDocRef = doc(db, "turnos", turnos.id);
            await deleteDoc(turnoDocRef);
            console.log("Turno eliminado correctamente.");
            window.location.reload();
        } catch (error) {
            console.error("Error al eliminar el turno:", error);
        }
    };

    const handlePuestoChange = (event) => {
        setSelectedPuesto(event.target.value);
    };

    return (
        <section>
            <div key={turnos.id} className="grid  md:grid-cols-1 border border-black card shadow-xl p-4 rounded-md bg-gray-200">
                <div className="flex justify-center">
                    <h2 className=" text-start font-black uppercase m-3 text-lg">
                        {turnos.datos.apellido}
                    </h2>
                    <h2 className=" text-start font-black uppercase m-3 text-lg">
                        {turnos.datos.nombre}
                    </h2>
                </div>
                <div className="flex justify-center space-x-6">
                    <p className=" font-semibold">Hora: {turnos.datos.horaTurno}</p>
                    <p className=" font-semibold">{turnos.datos.tramite}</p>
                </div>
                <select onChange={handlePuestoChange}>
                    <option value="select">Elige lugar</option>
                    <option value="Puesto 1">Puesto 1</option>
                    <option value="Puesto 2">Puesto 2</option>
                    <option value="Puesto 3">Puesto 3</option>
                    <option value="Consultorio Médico">Consultorio Médico</option>
                </select>
                <button className="rounded-md border border-radius border-black bg-green-500 p-1 mt-2" onClick={llamar}>
                    Llamar
                </button>
                <button className="rounded-md border border-radius border-red-500 bg-red-500 text-white p-1 mt-2" onClick={eliminarTurno}>
                    Trámite finalizado
                </button>
            </div>
        </section>
    );
}

export default VerDisponibles;
