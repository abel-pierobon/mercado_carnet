
function WebMunicipalidad() {
    return (
        <div  className='border border-black rounded-lg'>
            <div style={{ width: '100%', height: '60vh' }} >
                <iframe
                    src="https://cordoba.gob.ar/novedades/"
                    style={{ width: '100%', height: '100%', border: 'rounded' }}
                    title="Página Municipalidad"
                />
            </div>
        </div>
    );
}

export default WebMunicipalidad;
