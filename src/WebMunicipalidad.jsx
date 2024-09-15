
function WebMunicipalidad() {
    return (
        <div  className='border border-black rounded-lg'>
            <div style={{ width: '100% ', height:'90%' }} >
                <iframe
                    src="https://cordoba.gob.ar/novedades/"
                    style={{ width: '600px', height: '600px', border: 'rounded' }}
                    title="Página Municipalidad"
                />
            </div>
        </div>
    );
}

export default WebMunicipalidad;
