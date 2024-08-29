import { db } from "./db/datos";
import { getDocs, collection, deleteDoc, query, orderBy, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import VerDisponibles from "./VerDisponibles";
import EliminarTurnos from "./EliminarTurnos";

function Disponibles() {
    const [data, setData] = useState([]);
    const [loadingTime, setLoadingTime] = useState('');
    const { id } = useParams();

    useEffect(() => {
        const turnosCollection = collection(db, "turnos");
        const q = query(turnosCollection, orderBy("datos.horaTurno", "asc"));

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
        setData([]); // Actualiza el estado después de eliminar
    };

    return (
        <div className="grid grid-cols-1">
            {loadingTime && <p className="text-center">Turnos cargados a las {loadingTime}</p>}
            <section className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {data.length === 0 ? (
                    <div className='flex justify-center'>
                        <p className="font-bold texto-aparecer-desaparecer">No hay turnos disponibles</p>
                    </div>
                ) : (
                    data.map((item, i) => (
                        <VerDisponibles key={i} turnos={item} />
                    ))
                )}
            </section>
            <section className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {data.length > 0 && (
                    <EliminarTurnos eliminar={eliminarTodosLosTurnos} />
                )}
            </section>
        </div>
    );
}

export default Disponibles;
