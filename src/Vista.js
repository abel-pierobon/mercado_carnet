import React, { useState, useEffect, useContext } from 'react';
import {
    collection,
    query,
    orderBy,
    onSnapshot,
    limit,
    deleteDoc,
    getDocs,
} from 'firebase/firestore';
import { db } from './db/datos';
import Call from './Call';
import CallEnd from './CallEnd';
import { ContextTurnero } from './ContextTurnero';
import Requisitos from './Requisitos';
import EventosNuevos from './EventosNuevos';
import Descargas from './Descargas';
import Carrusel from './Carrusel';
import WebMunicipalidad from './WebMunicipalidad';

function Vista() {
    const [data, setData] = useState([]);
    const [dataLlamado, setDataLlamado] = useState([]);
    const { reproducirSonido } = useContext(ContextTurnero);
    const { usuario } = useContext(ContextTurnero);

    useEffect(() => {
        const llamadoCollection = collection(db, 'llamados');
        const q = query(
            llamadoCollection,
            orderBy('timestamp', 'desc'),
            limit(8),
        );

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
    }, []);

    useEffect(() => {
        const llamadoCollection = collection(db, 'llamados');
        const qu = query(
            llamadoCollection,
            orderBy('timestamp', 'desc'),
            limit(1),
        );

        const unsubscribe = onSnapshot(qu, (querySnapshot) => {
            const aux = querySnapshot.docs.map((doc) => {
                const turno = doc.data();
                turno.id = doc.id;
                return turno;
            });
            setDataLlamado(aux);
            reproducirSonido();
            if (aux.length > 0) {
                const { nombre, apellido, puesto } = aux[0];
                const voz = new SpeechSynthesisUtterance(
                    `Atencion, ${nombre} ${apellido},dirigirse a , ${puesto}`,
                );
                voz.lang = 'es-LA';
                voz.volume = 1;
                voz.rate = 1;
                voz.pitch = 1;
                setTimeout(() => {
                    window.speechSynthesis.speak(voz);
                }, 2000);

                setTimeout(() => {
                    window.speechSynthesis.speak(voz);
                }, 10000);
            }
        });
        return () => {
            unsubscribe();
        };
    }, [reproducirSonido]);

    const eliminarTodosLosLlamados = async () => {
        const llamadosCollection = collection(db, 'llamados');
        const llamadosQuery = query(llamadosCollection);
        const llamadosSnapshot = await getDocs(llamadosQuery);

        llamadosSnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
        });
        setData([]);
    };

    return (
        <section className="flex flex-col md:flex-row justify-center items-start space-x-5">
            <div className=" flex flex-col w-full md:w-2/3">
                {dataLlamado.length === 0 ? (
                    <div className="flex justify-center">
                        <p className="font-bold texto-aparecer-desaparecer">
                            No se ha llamado ningún turno
                        </p>
                    </div>
                ) : (
                    dataLlamado.map((item2, i) => {
                        const esUltimo = item2.id === data[0]?.id;
                        return (
                            <CallEnd
                                key={i}
                                turno={item2}
                                esUltimo={esUltimo}
                            />
                        );
                    })
                )}
                {!usuario && (
                    <div className="hidden xl:flex justify-center  items-center mt-12 space-x-5">
                        <div className=" w-1/2 ">
                            <Carrusel />
                        </div>
                        <div className="w-1/2 ">
                            <Requisitos />
                        </div>
                    </div>
                )}
                <div className='flex justify-center xs:hidden'>
                    <EventosNuevos />
                </div>
                <div>
                    {usuario ? (
                        <div className="">
                            {data.length === 0 ? (
                                <div className="flex justify-center">
                                    <p></p>
                                </div>
                            ) : (
                                <button
                                    onClick={eliminarTodosLosLlamados}
                                    className="rounded-md border border-radius border-black-500 bg-red-500 text-white p-1 mt-2"
                                >
                                    Limpiar Turnero
                                </button>
                            )}
                        </div>
                    ) : (
                        <p></p>
                    )}
                </div>
            </div>
            <div className="hidden 2xl:flex flex-col justify-center">
                <div className=" w-1/1 ">
                    {data.length === 0 ? (
                        <div className="flex justify-center">
                            <p className="font-bold texto-aparecer-desaparecer"></p>
                        </div>
                    ) : data.length === 1 ? (
                        <p></p>
                    ) : (
                        data.map((item, i) => {
                            return <Call key={i} turno={item} />;
                        })
                    )}
                </div>
            </div>
            {/* <WebMunicipalidad /> */}
        </section>
    );
}

export default Vista;
