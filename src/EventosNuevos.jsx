import { Link } from 'react-router-dom';
import instagram from './instagram.png';
import facebook from '../src/img/facebook.png';
function EventosNuevos() {
    return (
        <div className="flex flex-col justify-center mt-16 border border-gray-500 p-4 rounded-lg shadow-lg   ">
            <h2 className="text-center font-bold">Seguinos en nuestras redes..</h2>
            <div className="flex justify-center space-x-3">

            <Link
                to="https://www.instagram.com/accounts/login/?next=https%3A%2F%2Fwww.instagram.com%2Fc.p.c.10.mercadodelaciudad%2F%3Fhl%3Des&is_from_rle"
                target="_blank"
                className='flex items-center justify-center p-2 '
            >
                <img
                    className="w-10 h-10 ml-2"
                    src={instagram}
                    alt="instagram cpc mercado"
                    title="instagram"
                ></img>
            </Link>
            <Link
                to="https://www.instagram.com/accounts/login/?next=https%3A%2F%2Fwww.instagram.com%2Fc.p.c.10.mercadodelaciudad%2F%3Fhl%3Des&is_from_rle"
                target="_blank"
                className='flex items-center justify-center p-2 '
            >
                <img
                    className="w-15 h-15 ml-2"
                    src={facebook}
                    alt="facebook cpc mercado"
                    title="facebook"
                ></img>
            </Link>
            </div>

        </div>
    );
}
export default EventosNuevos;
