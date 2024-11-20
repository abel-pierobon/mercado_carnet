import { useState } from "react";
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from "./db/datos";
import { toast } from "sonner";
import ModalAgendar from "./ModalAgendar";

function Carga() {
    const [modalAgendar, setModalAgendar] = useState(false);
    const [persona, setPersona] = useState({
        nombre: '',
        apellido: '',
        tramite: '',
        horaTurno: '',
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
        const agregarTurno = collection(db, 'turnos');
        const turno = {
            datos: {
                nombre: persona.nombre,
                apellido: persona.apellido,
                tramite: persona.tramite,
                horaTurno: persona.horaTurno,
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
                    horaTurno: '',
                });
            })
            .catch((error) => {
                console.error(error);
            });
    };
    
    return (
        <div className='formulario'>
            {/* <div className='flex justify-end'>
                <button className='rounded-md border border-radius border-black bg-green-500 font-bold p-2 mt-2 hover:bg-green-700'
                onClick={() => setModalAgendar(true)}>
                    Agendar Turno
                </button>
            </div> */}
            <h2 className='flex justify-center text-2xl font-black'>Completa el formulario para cargar un turno</h2>
            <form className="max-w-md mx-auto my-8 font-black ">
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
                        Hora de turno
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-black-900 leading-tight focus:outline-none focus:shadow-outline"
                        type="time"
                        placeholder="Ingresa la hora del turno"
                        name="horaTurno" 
                        value={persona.horaTurno}  
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
                        <option value="sin trámite asignado">Seleccione un trámite</option>
                        <option value="Renovacion">Renovación</option>
                        <option value="Duplicado">Duplicado</option>
                        <option value="Teórico pendiente">Teórico pendiente</option>
                        <option value="Antecedentes">Antecedentes</option>
                    </select>
                </div>
                
                <button
                    onClick={handleSubmit}
                    className="bg-green-600 hover:bg-green-400 text-black font-black border border-black py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit" 
                >
                    Cargar
                </button>
            </form>
            {modalAgendar && <ModalAgendar setModalAgendar={setModalAgendar} />}
            
        </div>
    );
}

export default Carga;
