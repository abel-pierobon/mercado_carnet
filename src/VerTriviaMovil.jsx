import webTrivia from './img/webTrivia.png';

function VerTriviaMovil() {
    return (
        <div className="flex justify-center items-center  rounded-lg mt-10 ">
            <div className="mx-6 border border-blue-500 rounded-lg">
                <img src={webTrivia} width={100} alt="Trivia" />
            </div>
            <p className="text-2xl font-bold ">
                Seguí los turnos y repasá el examen teórico en nuestra web.
            </p>
        </div>
    );
}
export default VerTriviaMovil;
