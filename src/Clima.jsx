import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Clima() {
    const [climaData, setClimaData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'https://api.openweathermap.org/data/2.5/weather?lat=-31.4173391&lon=-64.183319&appid=05fde56e965e8ba7e643a7077f08b52c',
        };

        const getData = async () => {
            try {
                const response = await axios.request(options);
                setClimaData(response.data); // Guardar los datos en el estado
            } catch (error) {
                setError('Error al obtener los datos del clima');
                console.error(error);
            }
        };

        getData();
    }, []); // Ejecutar solo una vez al montar el componente

    // Función para convertir Kelvin a Celsius y formatear el valor con 2 decimales
    const kelvinToCelsius = (kelvin) => (kelvin - 273.15).toFixed(0);

    // Mapeo de condiciones climáticas en inglés a español
    const weatherTranslations = {
        Clear: 'Despejado',
        Clouds: 'Nublado',
        Rain: 'Lluvia',
        Drizzle: 'Llovizna',
        Thunderstorm: 'Tormenta',
        Snow: 'Nieve',
        Mist: 'Niebla',
        Fog: 'Niebla',
        Sand: 'Arena',
        Ash: 'Ceniza',
        Squall: 'Ráfaga',
        Tornado: 'Tornado',
    };

    return (
        <div className="hidden lg:flex justify-center items-center bg-gradient-to-t from-[#59a0e7] to-[#004b81] mt-2 shadow-xl shadow-[#004b81] rounded-lg border border-gray-700 p-4 opacity-90">
            {error && <p>{error}</p>}
            {climaData ? (
                <div className="flex flex-col items-center justify-center border-black">
    
                    <div className="grid grid-cols-4 gap-5">
                        <div className="flex flex-col justify-center items-center p-2 ">
                            <img
                                src={`http://openweathermap.org/img/wn/${climaData.weather[0].icon}.png`}
                                alt={climaData.weather[0].description}
                                className="w-20 h-20"
                            />
                            {/* Mostrar la descripción en español */}
                            <p className="text-xl text-white font-bold text-shadow">
                                {weatherTranslations[
                                    climaData.weather[0].main
                                ] || climaData.weather[0].main}
                            </p>
                        </div>
                        <div className="flex flex-col justify-center items-center p-2 ">
                            <p className="text-2xl font-bold text-white text-shadow">
                                Temperatura
                            </p>
                            <p className="text-2xl font-bold text-white text-shadow">
                                {kelvinToCelsius(climaData.main.temp)} °C{' '}
                            </p>
                        </div>
                        <div className="flex flex-col justify-center items-center p-2">
                            <p className="text-2xl font-bold text-white text-shadow">
                                S. Térmica
                            </p>
                            <p className="text-2xl font-bold text-white text-shadow">
                                {kelvinToCelsius(climaData.main.feels_like)} °C{' '}
                            </p>
                        </div>
                        <div className="flex flex-col justify-center items-center p-2">
                            <p className="text-2xl font-bold text-white text-shadow">
                                Humedad
                            </p>
                            <p className="text-2xl font-bold text-white text-shadow">
                                {climaData.main.humidity} %
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Cargando...</p>
            )}
        </div>
    );
}

export default Clima;
