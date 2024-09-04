import { BrowserRouter } from 'react-router-dom';
import { ContextTurneroProvider } from './ContextTurnero';
import { Toaster } from 'sonner';
import Main from './Main';
import NavBar from './NavBar';
import Footer from './Footer';

function App() {
    console.log(`Resolución de la pantalla: ${window.screen.width} x ${window.screen.height}`);

    return (
        <BrowserRouter>
            <ContextTurneroProvider>
                    <NavBar />
                    <Toaster
                        position="top-center"
                        expand={false}
                        autoClose={200}
                        duration={1500}
                        closeOnClick={true}
                        richColors
                    />
                    <Main />
                    <Footer />
            </ContextTurneroProvider>
        </BrowserRouter>
    );
}

export default App;
