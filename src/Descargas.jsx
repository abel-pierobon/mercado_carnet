import guia from './QR guía del buen conductor.png';
function Descargas() {
    return (
        <div className="flex flex-col items-center border border-black rounded-md justify-start p-4 mx-1 bg-[#59a0e7]">
            <h2 className="text-center text-2xl text-gray-900 mb-2 font-bold">
                Escaneá el código QR
            </h2>
            <div className="flex justify-center space-x-10">
                <img
                    src={guia}
                    alt="qrInstagram"
                    className="w-64 h-64 border border-black rounded-md bg-white"
                />
                {/* <img
                    src={guia}
                    alt="qrFacebook"
                    className="w-64 h-64 p-4 border border-black rounded-md bg-white"
                /> */}
            </div>
            <h2 className="text-center text-2xl mt-2 text-gray-900 font-bold">
                y descargá la guía del buen conductor
            </h2>
        </div>
    );
}
export default Descargas;
