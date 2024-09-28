import { collection, doc, deleteDoc } from 'firebase/firestore';
import { query, onSnapshot, orderBy } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { db } from './db/datos';
import { useParams } from 'react-router-dom';
import cestoBasura from './img/cestoBasura.png';

function Pendientes() {
    const { id } = useParams();
    const [dataPendientes, setDataPendientes] = useState([]);

    useEffect(() => {
        const turnosCollection = collection(db, 'pendientes');
        const q = query(turnosCollection, orderBy('fecha', 'asc'));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const aux = querySnapshot.docs.map((doc) => {
                const turno = doc.data();
                turno.id = doc.id;
                return turno;
            });
            setDataPendientes(aux);

        });

        return () => {
            unsubscribe();
        };
    }, [id]);
    const quitarPendiente = async (id) => {
        try {
            const turnoDocRef = doc(db, 'pendientes', id);
            await deleteDoc(turnoDocRef);
        } catch (error) {
            console.error('Error al eliminar el turno:', error);
        }
    };
    return (
        <div>
            <h2 className="text-center font-bold uppercase m-3 text-sm md:text-2xl">
                Trámites Pendientes
            </h2>
            <table className="table-auto w-full border-collapse border border-black shadow-2xl mt-6">
                <thead>
                    <tr>
                        <th className="border border-black p-2 bg-gray-200">Apellido</th>
                        <th className="border border-black p-2 bg-gray-200">Nombre</th>
                        <th className="border border-black p-2 bg-gray-200">Tramite</th>
                        <th className="border border-black p-2 bg-gray-200">Fecha</th>
                        <th className="border border-black p-2 bg-gray-200">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {dataPendientes.map((pendiente, index) => (
                        <tr key={pendiente.id} className="text-center">
                            <td className="border border-black p-2 font-bold uppercase text-start">
                                {pendiente.apellido}
                            </td>
                            <td className="border border-black p-2 font-bold uppercase text-start">
                                {pendiente.nombre}
                            </td>
                            <td className="border border-black p-2">
                                <p className="font-bold">{pendiente.tramite}</p>
                            </td>
                            <td className="border border-black p-2">
                                <p className="font-bold">
                                    {pendiente.fecha.toDate().toLocaleDateString()}
                                </p>
                            </td>
                            <td className="border border-black p-2">
                                <div className="flex justify-around items-center">
                                    <button className="flex justify-start items-start mt-2" onClick={() => quitarPendiente(pendiente.id)}>
                                        <img
                                            src={cestoBasura}
                                            alt="cesto"
                                            className="w-10 h-10 border border-black bg-gray-200 rounded-md p-1 shadow-2xl hover:bg-gray-500"
                                        />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}

export default Pendientes;
