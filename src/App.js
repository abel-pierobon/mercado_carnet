import { BrowserRouter } from 'react-router-dom';
import { ContextTurneroProvider } from './ContextTurnero';
import { Toaster } from 'sonner';
import Main from './Main';
import NavBar from './NavBar';
import Footer from './Footer';

function App() {
    return (
        <BrowserRouter>
            <ContextTurneroProvider>
                <div id="root" className="flex flex-col">
                    <NavBar />
                    <Toaster
                        position="bottom-right"
                        expand={false}
                        autoClose={200}
                        duration={1500}
                        closeOnClick={true}
                        richColors
                    />
                        <Main />
                    {/* <Footer /> */}
                </div>
            </ContextTurneroProvider>
        </BrowserRouter>
    );
}

export default App;
