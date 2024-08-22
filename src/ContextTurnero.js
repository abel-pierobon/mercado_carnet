import React, { createContext, useEffect, useState } from 'react'
import Timbre from './Timbre.mp3'

const ContextTurnero=createContext();
const { Provider }= ContextTurnero;
function ContextTurneroProvider(props) {
    const [turnoActual,setTurnoActual]=useState('')
    const updateTurnoActual = (data) => {
        setTurnoActual(data);
    };
    const [usuario,setUsuario]=useState('')

    const reproducirSonido = () => {
        const audio = new Audio(Timbre);
        audio.play();
    };
    
    const updateUsuario = (user) => {
        setUsuario(user);
        console.log(usuario)
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
    return (
        <Provider value={{turnoActual, updateTurnoActual, reproducirSonido, updateUsuario,usuario}}>
            {props.children}
        </Provider>
    )
}
export {ContextTurnero,ContextTurneroProvider };