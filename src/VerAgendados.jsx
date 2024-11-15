import { useEffect, useState } from 'react';
import { db } from './db/datos';
import { collection, query, onSnapshot, orderBy, addDoc, serverTimestamp } from 'firebase/firestore';
import { NavLink, useParams } from 'react-router-dom';
import AgendadosVer from './AgendadosVer';
import  cesto from './img/cesto.png';
import { toast } from "sonner";

function VerAgendados() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingTime, setLoadingTime] = useState('');
    const { id } = useParams();
    const [dateFiltered, setDateFiltered] = useState('');

    useEffect(() => {
        const turnosCollection = collection(db, 'turnosAgenda');
        const q = query(turnosCollection, orderBy('fecha', 'asc'));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const aux = querySnapshot.docs.map((doc) => {
                const turno = doc.data();
                turno.id = doc.id;
                return turno;
            });

            setData(aux);
            setLoading(false);

            const now = new Date();
            const formattedTime = now.toLocaleTimeString();
            setLoadingTime(formattedTime);
        });

        return () => {
            unsubscribe();
        };
    }, [id]);

    const filteredData = dateFiltered
        ? data.filter((turno) => turno.datos.fechaTurno === dateFiltered)
        : data;

        const [persona, setPersona] = useState({
            nombre: '',
            apellido: '',
            tramite: '',
            horaTurno: '',
        });
    const agregar = (id) => {
        const agregarTurno = collection(db, 'turnos');
        const turno = {
            datos: {
                nombre: filteredData[0].datos.nombre,
                apellido: filteredData[0].datos.apellido,
                tramite: filteredData[0].datos.tramite,
                horaTurno: "",
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
    }
    return (
        <div className="grid grid-cols-1">
            <div className="flex justify-between items-center mb-6">
                <div className='flex justify-center items-center space-x-2'>
                    <input
                        id="date-filter"
                        type="date"
                        className="bg-gray-50 border border-black text-gray-900 font-bold py-2 px-4 rounded flex justify-center items-center"
                        value={dateFiltered}
                        onChange={(e) => setDateFiltered(e.target.value)}
                    />
                    <button
                        className=" flex justify-center items-center"
                        onClick={() => setDateFiltered('')}
                    >
                        <img src={cesto} alt="cesto" className="w-8 h-8" />
                    </button>
                </div>
                <NavLink
                    to={'/disponibles'}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex justify-center items-center"
                >
                    Volver a turnos
                </NavLink>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 ">
                {loading ? (
                    <div className="flex justify-center">
                        <p className="font-bold text-center">
                            Cargando turnos...
                        </p>
                    </div>
                ) : filteredData.length === 0 ? (
                    <div className="flex justify-center">
                        <p className="font-bold text-center">
                            No hay turnos disponibles
                        </p>
                    </div>
                ) : (
                    filteredData.map((item) => (
                        <AgendadosVer key={item.id} turnoAgendado={item} agregar={agregar}/>
                    ))
                )}
            </div>
        </div>
    );
}

export default VerAgendados;
