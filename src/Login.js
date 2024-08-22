import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useState,useContext } from 'react';
import { ContextTurnero } from "./ContextTurnero";
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {updateUsuario}= useContext(ContextTurnero);
  const navigate= useNavigate()
  const [error, setError]=useState('')
  const handleLogin = async () => {
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('Usuario autenticado con éxito', user);
      updateUsuario({ uid: user.uid, displayName: user.displayName, email: user.email });
      navigate('/');
      localStorage.setItem('userId', user.uid);
      localStorage.setItem('userDisplayName', user.displayName);
      localStorage.setItem('userEmail', user.email);
      
    } catch (error) {
      console.error('Error al autenticar el usuario', error);
      setError('Usuario y/o contraseña inválida');
      setTimeout(() => {
        setError('');
      }, 5000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita el comportamiento de envío de formulario por defecto
    handleLogin();
  };


  return (
    <>
      <div className=' flex justify-center'>
        <form onSubmit={handleSubmit} className='max-w-md mx-auto my-8 font-black'>
        {error && <p className="text-red-500 uppercase">{error}</p>}

          <label className='block text-black-900 text-sm font-black mb-2'>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} 
          className='shadow appearance-none border rounded w-full py-2 px-3 text-black-500 leading-tight focus:outline-none focus:shadow-outline'/>

          <label className='block text-black-900 text-sm font-black mb-2'>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            className='shadow appearance-none border rounded w-full py-2 px-3 text-black-500 leading-tight focus:outline-none focus:shadow-outline'
          />
          
          <button type="submit" className="bg-green-600 hover:bg-green-400 text-black font-black border border-black py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-3">Iniciar sesión</button>
        </form>
      </div>
    </>
  );
}

export default Login;