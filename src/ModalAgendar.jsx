import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './db/datos';
import { toast } from 'sonner';
function ModalAgendar({ setModalAgendar }) {
    const [persona, setPersona] = useState({
        nombre: '',
        apellido: '',
        tramite: '',
        fechaTurno: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPersona({
            ...persona,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const agregarTurno = collection(db, 'turnosAgenda');
        const turno = {
            datos: {
                nombre: persona.nombre,
                apellido: persona.apellido,
                tramite: persona.tramite,
                fechaTurno: persona.fechaTurno,
            },
            consultorioMedico: false,
            fecha: serverTimestamp(),
        };
        toast.success('Turno cargado correctamente');
        const nuevoTurno = addDoc(agregarTurno, turno);
        nuevoTurno
            .then((resultado) => {
                setPersona({
                    nombre: '',
                    apellido: '',
                    tramite: 'Renovación',
                    fechaTurno: '',
                });

            })
            .catch((error) => {
                console.error(error);
            });
        setModalAgendar(false);
    };
    return (
        <div className="fixed inset-0 flex-col items-center justify-center z-50 bg-gray-900 bg-opacity-50">
            <form className="max-w-md mx-auto my-8 font-black bg-white rounded-lg p-6">
                <h2 className="flex justify-center text-2xl font-black mb-4">
                    Completa el formulario para agendar un turno
                </h2>
                <div className="mb-4">
                    <label className="block text-black-900 text-sm font-black mb-2">
                        Nombre
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-black-500 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Ingresa el nombre"
                        name="nombre"
                        value={persona.nombre}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-black-900 text-sm font-black  mb-2">
                        Apellido
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-black-900 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Ingresa el apellido"
                        name="apellido"
                        value={persona.apellido}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-black-900 text-sm font-black  mb-2">
                        Fecha de turno
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-black-900 leading-tight focus:outline-none focus:shadow-outline"
                        type="date"
                        placeholder="Ingresa la hora del turno"
                        name="fechaTurno"
                        value={persona.fechaTurno}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <select
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-black-900 leading-tight focus:outline-none focus:shadow-outline"
                        name="tramite"
                        value={persona.tramite}
                        onChange={handleInputChange}
                    >
                        <option value="sin trámite asignado">
                            Seleccione un trámite
                        </option>
                        <option value="Renovacion">Renovación</option>
                        <option value="Duplicado">Duplicado</option>
                        <option value="Teórico pendiente">
                            Teórico pendiente
                        </option>
                        <option value="Antecedentes">Antecedentes</option>
                    </select>
                </div>
                <div className="flex justify-center space-x-3">
                    <button
                        onClick={handleSubmit}
                        className="bg-green-600 hover:bg-green-400 text-white font-black border border-black py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Agendar Turno
                    </button>
                    <button
                        onClick={() => setModalAgendar(false)}
                        className="bg-red-600 hover:bg-red-400 text-white font-black border border-black py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}
export default ModalAgendar;
