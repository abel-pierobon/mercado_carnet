import cancelar from './img/cancelar.png';
function ModalCalificar({ aprobado, desaprobado, setModalCalificar }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
            <div className="bg-white rounded-lg p-6 flex flex-col">
                <button className="flex justify-end mb-2" onClick={() => setModalCalificar(false)}>
                    <img src={cancelar} alt="cancelar" className="w-8 h-8 " />
                </button>
                <div className="flex justify-center">
                    <h3 className="text-center font-bold">
                        ¿Estas seguro que deseas calificar el turno?
                    </h3>
                </div>
                <div className="flex justify-center space-x-6">
                    <button
                        className="rounded-md border border-radius border-black bg-green-500 font-bold p-2 mt-2 hover:bg-green-700"
                        onClick={aprobado}
                    >
                        Aprobar
                    </button>
                    <button
                        className="rounded-md border border-radius border-black bg-red-500 font-bold p-2 mt-2 hover:bg-red-700"
                        onClick={desaprobado}
                    >
                        Desaprobar
                    </button>
                </div>
            </div>
        </div>
    );
}
export default ModalCalificar;
