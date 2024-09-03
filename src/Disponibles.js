import { db } from './db/datos';
import {
    getDocs,
    collection,
    deleteDoc,
    query,
    orderBy,
    onSnapshot,
} from 'firebase/firestore';
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import VerDisponibles from './VerDisponibles';
import EliminarTurnos from './EliminarTurnos';
import { ContextTurnero } from './ContextTurnero';
import ModalTodosLosTurnos from './ModalTodosLosTurnos';
function Disponibles() {
    const [data, setData] = useState([]);
    const [loadingTime, setLoadingTime] = useState('');
    const { id } = useParams();
    const { puestoDeAtencion, setPuestoDeAtencion } =
        useContext(ContextTurnero);
        const [modalTodos, setModalTodos] = useState(false);
        const handleModalTodos = () => {
            setModalTodos(true);
        }

        const handleCloseModalTodos = () => {
            setModalTodos(false);
        }
    useEffect(() => {
        const turnosCollection = collection(db, 'turnos');
        const q = query(turnosCollection, orderBy('datos.horaTurno', 'asc'));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const aux = querySnapshot.docs.map((doc) => {
                const turno = doc.data();
                turno.id = doc.id;
                return turno;
            });
            setData(aux);

            const now = new Date();
            const formattedTime = now.toLocaleTimeString();
            setLoadingTime(formattedTime);
        });

        return () => {
            unsubscribe();
        };
    }, [id]);

    const eliminarTodosLosTurnos = async () => {
        const llamadosCollection = collection(db, 'turnos');
        const llamadosSnapshot = await getDocs(llamadosCollection);

        llamadosSnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
        });
        setData([]);
        setModalTodos(false);
        
    };

    return (
        <div className="grid grid-cols-1">
            <div className="flex justify-center space-x-8 mb-3">
                {puestoDeAtencion === 'select' ? (
                    <h3 className="text-center font-bold text-lg">
                        Elige sección
                    </h3>
                ) : (
                    <h3 className="text-center font-bold text-xl">
                        {' '}
                        Estas en la sección{' '}
                        <span className=" text-2xl font-bold text-green-500">
                            {puestoDeAtencion}
                        </span>
                    </h3>
                )}
                <select
                    onChange={(e) => setPuestoDeAtencion(e.target.value)}
                    className="  border border-black rounded-md max-w-xs"
                >
                    <option value="select">Elige sección</option>
                    <option value="Ventanilla 1">Ventanilla 1</option>
                    <option value="Ventanilla 2">Ventanilla 2</option>
                    <option value="Emisión de Licencias">
                        Emisión Licencias
                    </option>
                    <option value="Consultorio Medico">
                        Consultorio Médico
                    </option>
                </select>
            </div>

            {loadingTime && (
                <p className="text-center mb-3">
                    Turnos cargados a las {loadingTime}
                </p>
            )}
            <section className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {data.length === 0 ? (
                    <div className="flex justify-center">
                        <p className="font-bold texto-aparecer-desaparecer">
                            No hay turnos disponibles
                        </p>
                    </div>
                ) : (
                    data.map((item, i) => (
                        <VerDisponibles
                            key={i}
                            turnos={item}
                            puestoDeAtencion={puestoDeAtencion}
                        />
                    ))
                )}
            </section>
            <section className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {data.length > 0 && (
                    <EliminarTurnos eliminar={handleModalTodos} />
                )}
            </section>
            {modalTodos && <ModalTodosLosTurnos eliminarTodosLosTurnos={eliminarTodosLosTurnos} handleCloseModalTodos={handleCloseModalTodos}/>}
            
        </div>
    );
}

export default Disponibles;
