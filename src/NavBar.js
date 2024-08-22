import { NavLink,Link } from "react-router-dom";
import { useContext, useState } from "react";
import { ContextTurnero } from "./ContextTurnero";
import menu from './menu.png'
import Logo from './logo.jsx'
function NavBar() {
    const { usuario, updateUsuario } = useContext(ContextTurnero);
    const [desplegar,setDesplegar] = useState(false)
    const handleLogout = () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("userDisplayName");
        localStorage.removeItem("userEmail");
        updateUsuario(false);
    };
    const handleToggleMenu = () => {
        setDesplegar(!desplegar);
    };

    return (
        <div className="flex justify-start font-bold nav">
            <NavLink to={"/"}>
                <Logo />
            </NavLink>
            <div className={`flex content-center mt-3 burger`} onClick={handleToggleMenu}>
                <button className="menu">
                    <img src={menu} alt="menu hamburguesa" className="w-16 flex justify-end" />
                </button>
                <div className={`${desplegar ? 'abierto' : 'cerrado'}`}>
                <NavLink to={"/"} className="mx-6 text-xl p-2 ">
                    Inicio
                    </NavLink>
                    {usuario ? (
                    <>
                        <NavLink to={"/carga"} className="mx-6 text-xl p-2 ">
                        Cargar turno
                        </NavLink>
                        <NavLink to={"/disponibles"} className="mx-6 text-xl p-2 ">
                        Llamar turno
                        </NavLink>
                        <Link onClick={handleLogout} className="mx-6 text-xl p-2">
                        Cerrar Sesión
                        </Link>
                    </>
                    ) : (
                    <NavLink to={"/login"} className="mx-6 text-xl p-2">
                        Iniciar Sesión
                    </NavLink>
                    )}
                </div>
            </div>
        </div>
    );
}

export default NavBar;
