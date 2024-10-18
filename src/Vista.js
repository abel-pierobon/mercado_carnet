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
import EventosNuevos from './EventosNuevos';
import Carrusel from './Carrusel';
import ModalLLamados from './ModalLLamados';
import ModalTrivia from './ModalTrivia';
import VerTriviaMovil from './VerTriviaMovil';
import TriviaMovil from './TriviaMovil';
function Vista() {
    const [data, setData] = useState([]);
    const [dataLlamado, setDataLlamado] = useState([]);
    const {
        usuario,
        reproducirSonido,
        modalTriviaActive,
        activarModal,
        desactivarModal,
        activarTriviaMovil,
        desactivarTriviaMovil,
        modalTriviaMovil,
        sumarVistas,
    } = useContext(ContextTurnero);
    const [modalTodos, setModalTodos] = useState(false);

    useEffect(() => {
        const llamadoCollection = collection(db, 'llamados');
        const q = query(
            llamadoCollection,
            orderBy('timestamp', 'desc'),
            limit(5),
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
                // const { nombre, apellido, puesto } = aux[0];
                // const voz = new SpeechSynthesisUtterance(
                //     Atencion, ${nombre} ${apellido},dirigirse a , ${puesto},
                // );
                // voz.lang = 'es-LA';
                // voz.volume = 1;
                // voz.rate = 1;
                // voz.pitch = 1;
                // setTimeout(() => {
                //     window.speechSynthesis.speak(voz);
                // }, 2000);
                // setTimeout(() => {
                //     window.speechSynthesis.speak(voz);
                // }, 10000);
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
        setModalTodos(false);
    };
    return (
        <section className="flex flex-col justify-center items-start ">
            <div className=" flex flex-col w-full ">
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
            </div>
            <div
                className={
                    usuario
                        ? 'flex justify-center items-start space-x-6 w-full'
                        : ' flex justify-center items-start space-x-2'
                }
            >
                {!usuario ? (
                    // cambiar w-1/2
                    <div className="hidden lg:flex justify-start lg:w-1/2 items-center mt-6 ">
                        <div className=" w-4/4 ">
                            <Carrusel />
                        </div>
                    </div>
                ) : (
                    <div className=" flex flex-col justify-center mt-4 ">
                        {modalTriviaActive === true ? (
                            <button
                                className="rounded-md border border-radius border-black-500 bg-red-500 text-white p-2 mt-2"
                                onClick={desactivarModal}
                            >
                                Desactivar trivia
                            </button>
                        ) : (
                            <button
                                className="rounded-md border border-radius border-black-500 bg-green-700 text-white p-2 mt-2"
                                onClick={activarModal}
                            >
                                Activar trivia
                            </button>
                        )}
                       
                    </div>
                )}
                <div className="flex flex-col mt-4 justify-center items-center w-full lg:hidden ">
                    {!modalTriviaMovil ? (
                        <button
                            onClick={() => [
                                activarTriviaMovil(),
                                sumarVistas(),
                            ]}
                            className="rounded-md border border-radius border-black-500 bg-green-700 text-white p-2 mt-2"
                        >
                            ActivarTrivia
                        </button>
                    ) : (
                        <button
                            onClick={desactivarTriviaMovil}
                            className="rounded-md border border-radius border-black-500 bg-green-700 text-white p-2 mt-2"
                        >
                            {' '}
                            Finalizar Trivia
                        </button>
                    )}
                    {!modalTriviaMovil && <EventosNuevos />}
                    {modalTriviaMovil && <TriviaMovil />}
                </div>
                <section className=" mt-5 lg:w-1/2">
                    <div className="hidden xl:flex flex-col justify-center">
                        <div className=" w-1/1 space-y-1 ">
                            {data.length === 0 ? (
                                <div className="flex justify-center">
                                    <p className="font-bold texto-aparecer-desaparecer"></p>
                                </div>
                            ) : data.length === 1 ? (
                                <p></p>
                            ) : (
                                data.map((item, i) => {
                                    return (
                                        i > 0 && <Call key={i} turno={item} />
                                    );
                                })
                            )}
                            {usuario ? (
                                data.length > 0 &&
                                <button
                                    className="rounded-md border border-radius border-black-500 bg-red-500 text-white p-2 mt-2"
                                    onClick={eliminarTodosLosLlamados}
                                >
                                    Eliminar todos los llamados
                                </button>
                            ): (
                                <div className=" xl:flex mt-10">
                                <VerTriviaMovil />
                            </div>
                            )}
                            
                        </div>
                    </div>
                </section>
            </div>
            {modalTodos && (
                <ModalLLamados
                    eliminarTodosLosLlamados={eliminarTodosLosLlamados}
                    setModalTodos={setModalTodos}
                />
            )}

            {modalTriviaActive && !usuario && <ModalTrivia />}
        </section>
    );
}

export default Vista;
