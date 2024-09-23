import React, { createContext, useEffect, useState } from 'react';
import Timbre from './Timbre.mp3';

const ContextTurnero = createContext();
const { Provider } = ContextTurnero;

function ContextTurneroProvider(props) {
    const [puestoDeAtencion, setPuestoDeAtencion] = useState(() => {
        // Intenta obtener el valor guardado en localStorage al inicializar el estado
        return localStorage.getItem('puestoDeAtencion') || 'Carnet';
    });

    const [turnoActual, setTurnoActual] = useState('');
    const [usuario, setUsuario] = useState('');
    const [modalTrivia, setModalTrivia] = useState('');

    useEffect(() => {
        // Guarda el valor de puestoDeAtencion en localStorage cada vez que cambie
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
        console.log(usuario);
    };

    useEffect(() => {
        // Verifica la existencia de la información del usuario en el localStorage al cargar la aplicación
        const userId = localStorage.getItem('userId');
        const userDisplayName = localStorage.getItem('userDisplayName');
        const userEmail = localStorage.getItem('userEmail');

        if (userId && userDisplayName && userEmail) {
            // Si hay información del usuario, actualiza el estado del usuario en el contexto
            updateUsuario({ uid: userId, displayName: userDisplayName, email: userEmail });
        }
    }, []);
    const [clickButton, setClickButton] = useState('');


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
            modalTrivia,
            setModalTrivia
        }}>
            {props.children}
        </Provider>
    );
}

export { ContextTurnero, ContextTurneroProvider };
