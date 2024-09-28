import { useEffect, useState } from 'react';
import { db } from './db/datos';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import TeoricoDisponibles from './TeoricoDisponibles';

function Teorico() {
    const [data, setData] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const turnosCollection = collection(db, 'turnos');
        const q = query(turnosCollection, orderBy('fecha', 'asc'));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const aux = querySnapshot.docs.map((doc) => {
                const turno = doc.data();
                turno.id = doc.id;
                return turno;
            });
            setData(aux);
        });
        return () => {
            unsubscribe();
        };
    }, [id]);
    
    const fechaHoy = new Date();

    return (
        <section className="flex flex-col gap-2 mt-6">
            <h2 className="text-center font-bold uppercase m-3  text-sm md:text-2xl ">{`Trámites del día ${fechaHoy.toLocaleDateString()}`}</h2>
            {data.length === 0 ? (
                <div className="flex justify-center">
                    <p className="font-bold text-center">
                        No hay turnos disponibles
                    </p>
                </div>
            ) : (
                <table className="table-auto w-full border-collapse border border-black shadow-2xl ">
                    <thead >
                        <tr>
                            <th className="border border-black p-2 bg-blue-400">
                                Apellido
                            </th>
                            <th className="border border-black p-2 bg-blue-400">
                                Nombre
                            </th>
                            <th className="border border-black p-2 bg-blue-400">
                                Estado
                            </th>
                            <th className="border border-black p-2 bg-blue-400">
                                Acción
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, i) => (
                            <TeoricoDisponibles key={i} turnos={item} />
                        ))}
                    </tbody>
                </table>
            )}
            
        </section>
    );
}

export default Teorico;
