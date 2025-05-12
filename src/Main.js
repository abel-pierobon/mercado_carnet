import Carga from './Carga';
import Disponibles from './Disponibles';
import { Route, Routes } from 'react-router-dom';
import Vista from './Vista';
import Login from './Login';
import Teorico from './Teorico';
import { useContext } from 'react';
import { ContextTurnero } from './ContextTurnero';
import Pendientes from './Pendientes';
import VerAgendados from './VerAgendados';
import Mantenimiento from './Mantenimiento';
function Main() {
    const { usuario } = useContext(ContextTurnero);

    // Función para verificar la autenticación del usuario
    function verificarAutenticacion(componente) {
        if (usuario) {
            return componente;
        } else {
            // Si no hay usuario autenticado, redirigir a la página de inicio de sesión
            return <Login />;
        }
    }

    return (
        <main className="p-2 grow mx-10 fondoMain ">
            <Routes>
                {/* <Route path="/" element={<Vista />} /> */}
                <Route path="/" element={<Mantenimiento />} /> 
                {/* <Route
                    path="/carga"
                    element={verificarAutenticacion(<Carga />)}
                />
                <Route
                    path="/disponibles"
                    element={verificarAutenticacion(<Disponibles />)}
                />
                <Route
                    path="/teorico"
                    element={verificarAutenticacion(<Teorico />)}
                />
                <Route
                    path="/pendientes"
                    element={verificarAutenticacion(<Pendientes />)}
                />
                <Route
                    path="/agendados"
                    element={verificarAutenticacion(<VerAgendados />)}
                />

                <Route path="/login" element={<Login />} /> */}
                <Route path="/login" element={<Mantenimiento />} /> 
            </Routes>
        </main>
    );
}

export default Main;
