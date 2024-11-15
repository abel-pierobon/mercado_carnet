function AgendadosVer({ key, turnoAgendado, agregar }) {
    return (
        <div
            className="grid md:grid-cols-1 border border-black shadow-xl p-4 rounded-md mt-6 space-y-2 shadow-blue-300 bg-blue-100"
        >
            <div className="flex justify-center items-center">
                <h2 className="text-start font-black uppercase m-3 text-lg">
                    {turnoAgendado.datos.apellido}
                </h2>
                <h2 className="text-start font-black uppercase m-3 text-lg">
                    {turnoAgendado.datos.nombre}
                </h2>
            </div>
            <div className="flex justify-center space-x-6">
                <p className="font-semibold">Fecha: {turnoAgendado.datos.fechaTurno}</p>
                <p className="font-semibold">{turnoAgendado.datos.tramite}</p>
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => agregar(turnoAgendado.id)}>
                agregar
            </button>
        </div>
    );
}
export default AgendadosVer;
