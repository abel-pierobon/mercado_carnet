import React from 'react'

function Requisitos() {
    return (
        <div className='border border-black card shadow-lg shadow-gray-500 rounded-md p-3  bg-gradient-to-t from-blue-400 to-[#59a0e7]   '>
            <h2 className='font-extrabold text-xs 2xl:text-lg'> DOCUMENTACIÓN A PRESENTAR PARA RENOVACIÓN CARNET DE CONDUCIR</h2>
            <ul className='font-semibold text-xs 2xl:text-lg'>
                <li>Informe médico psico-físico para mayores de 70 años (tiene una validez de 6 meses).</li>
                <li>Declaración Jurada de Salud.</li>
                <li>Boleta de Pago Tasa Vial CENAT.</li>
                <li>DNI con domicilio actualizado en la ciudad de Córdoba.</li>
                <li>Licencia de conducir vencida (no más de 2 años) o próxima a vencer.</li>
                <li>Comprobante de pago de tasa municipal correspondiente al trámite.</li>
                <li>Examen teórico aprobado.</li>
            </ul>
            {/* <h2 className='font-extrabold' >¿Cómo se debe presentar la documentación?</h2>
            <p className='font-semibold ' >
                La documentación requerida debe presentarse presencialmente en el Centro de Emisión de Licencias al momento de realizar el trámite (a excepción de comprobante de pago de tasa municipal, certificado REPAT y examen teórico, los cuales se obtienen el día del trámite)
            </p> */}
        </div>
    )
}

export default Requisitos