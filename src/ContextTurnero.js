import React, { createContext, useEffect, useState } from 'react';
import Timbre from './Timbre.mp3';
import { collection, query, onSnapshot, getDoc  } from 'firebase/firestore';
import { db } from './db/datos';
import { doc, updateDoc } from 'firebase/firestore';

const ContextTurnero = createContext();
const { Provider } = ContextTurnero;

function ContextTurneroProvider(props) {
    const [puestoDeAtencion, setPuestoDeAtencion] = useState(() => {
        return localStorage.getItem('puestoDeAtencion') || 'Carnet';
    });

    const [turnoActual, setTurnoActual] = useState('');
    const [usuario, setUsuario] = useState('');
    const [modalTriviaActive, setModalTriviaActive] = useState(false); 
    const [modalTriviaMovil, setModalTriviaMovil] = useState(false);

    useEffect(() => {
        localStorage.setItem('puestoDeAtencion', puestoDeAtencion);
    }, [puestoDeAtencion]);

    const updateTurnoActual = (data) => {
        setTurnoActual(data);
    };

    const reproducirSonido = () => {
        const audio = new Audio(Timbre);
        audio.play();
    };

    const updateUsuario = (user) => {
        setUsuario(user);
    };

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const userDisplayName = localStorage.getItem('userDisplayName');
        const userEmail = localStorage.getItem('userEmail');

        if (userId && userDisplayName && userEmail) {
            updateUsuario({ uid: userId, displayName: userDisplayName, email: userEmail });
        }
    }, []);

    const [clickButton, setClickButton] = useState('');

    useEffect(() => {
        const modalCollection = collection(db, 'modal');
        const q = query(modalCollection);
        
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                if (data.isActive !== undefined) {
                    setModalTriviaActive(data.isActive); // Acceder a 'isActive' correctamente
                }
            });
        });

        return () => {
            unsubscribe();
        };
    }, []);


    function activarModal() {
        const modalDocRef = doc(db, 'modal', 'UNJNSw1fnY8A6lA3Fvxz'); 
    
        updateDoc(modalDocRef, {
            isActive: true
        })
        .then(() => {
            console.log('Modal activado');
        })
        .catch((error) => {
            console.error('Error al activar el modal: ', error);
        });
    }
    function desactivarModal() {
        const modalDocRef = doc(db, 'modal', 'UNJNSw1fnY8A6lA3Fvxz'); 
    
        updateDoc(modalDocRef, {
            isActive: false
        })
        .then(() => {
            console.log('Modal desactivado');
        })
        .catch((error) => {
            console.error('Error al desactivar el modal: ', error);
        });
    }
    const activarTriviaMovil = () => {
        setModalTriviaMovil(true);
    };
    const desactivarTriviaMovil = () => {
        setModalTriviaMovil(false);
    };
    async function sumarVistas() {
        const countDocRef = doc(db, 'count', '54vNIEzGTwDhXWeYO8EK'); 
        
        try {
            // Obtener el documento actual
            const countDocSnap = await getDoc(countDocRef);
            
            if (countDocSnap.exists()) {
                // Obtener el valor actual de countTrivia
                const currentCount = countDocSnap.data().countTrivia;
    
                // Actualizar el valor de countTrivia en el documento
                await updateDoc(countDocRef, {
                    countTrivia: parseInt(currentCount) + 1 // Asegúrate de que el valor sea un número
                });
    
                console.log('Sumado correctamente');
            } else {
                console.log('El documento no existe');
            }
        } catch (error) {
            console.error('Error al sumar: ', error);
        }
    }
    
    
    return (
        <Provider value={{
            turnoActual,
            updateTurnoActual,
            reproducirSonido,
            updateUsuario,
            usuario,
            puestoDeAtencion,
            setPuestoDeAtencion,
            clickButton,
            setClickButton,
            modalTriviaActive, // Este ahora contiene el valor de isActive
            activarModal,
            desactivarModal,
            activarTriviaMovil,
            desactivarTriviaMovil,
            modalTriviaMovil,
            sumarVistas
        }}>
            {props.children}
        </Provider>
    );
}

export { ContextTurnero, ContextTurneroProvider };
