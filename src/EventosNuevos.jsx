import { Link } from 'react-router-dom';
import instagram from './instagram.png';
import facebook from '../src/img/facebook.png';
function EventosNuevos() {
    return (
        <div className="flex flex-col justify-center mt-16 border border-gray-500 p-4 rounded-lg shadow-lg bg-gradient-to-t from-white to-[#59a0e7]   ">
            <h2 className="text-center font-bold">Seguinos en nuestras redes..</h2>
            <div className="flex justify-center space-x-3">

            <Link
                to="https://www.instagram.com/cpc.mercado?igsh=MWc5ZGpuZmdvaDRlZw=="
                target="_blank"
                className='flex items-center justify-center p-2 '
            >
                <img
                    className="w-10 h-10 md:w-16 xs:h-15 md:h-16 ml-2"
                    src={instagram}
                    alt="instagram cpc mercado"
                    title="instagram"
                ></img>
            </Link>
            <Link
                to="https://www.facebook.com/cpcmercado?mibextid=ZbWKwL"
                target="_blank"
                className='flex items-center justify-center p-2 '
            >
                <img
                    className="w-15 h-15 md:w-20 md:h-20 ml-2"
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
