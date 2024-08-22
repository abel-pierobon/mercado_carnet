import { db } from "./db/datos";
import { getDocs, collection, deleteDoc, query, orderBy } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { toast } from "sonner";
import VerDisponibles from "./VerDisponibles";
import EliminarTurnos from "./EliminarTurnos";

function Disponibles() {
    const [data, setData] = useState([]);
    const [loadingTime, setLoadingTime] = useState('');
    const { id } = useParams();

    useEffect(() => {
        const turnosCollection = collection(db, "turnos");
        const turnosQuery = query(turnosCollection, orderBy("datos.horaTurno", "asc"));

        const consulta = getDocs(turnosQuery);

        toast.promise(consulta, {
            loading: 'Cargando turnos',
            success: (resultado) => {
                const aux = resultado.docs.map((doc) => {
                    const turnos = doc.data();
                    turnos.id = doc.id;
                    return turnos;
                });
                setData(aux);
                const now = new Date();
                const formattedTime = now.toLocaleTimeString();
                setLoadingTime(formattedTime);
                return 'Turnos cargados correctamente';
                
            },
            error: (error) => {
                return "error en carga de Turnos";
            },
        });
    }, [id]);

    const eliminarTodosLosTurnos = async (e) => {
        const llamadosCollection = collection(db, 'turnos');
        const llamadosQuery = query(llamadosCollection);
        const llamadosSnapshot = await getDocs(llamadosQuery);

        llamadosSnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
            window.location.reload();
        });
    };
    
    return (
        <div className="grid grid-cols-1">
            {loadingTime && <p className="text-center">Turnos cargados a las {loadingTime}</p>}
            <section className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {data.length === 0 ? (
                    <div className='flex justify-center'>
                        <p className="font-bold texto-aparecer-desaparecer"> No hay turnos disponibles</p>
                    </div>
                ) : (
                    data.map((item, i) => {
                        return <VerDisponibles key={i} turnos={item} />;
                    })
                )}                                  
            </section>
            <section className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {data.length === 0 ? (
                    <div className='flex justify-center'>
                        <p className="font-bold texto-aparecer-desaparecer"></p>
                    </div>
                ) : (
                    <EliminarTurnos eliminar={eliminarTodosLosTurnos} />
                )}
            </section>
        </div>
    );
}
export default Disponibles;
