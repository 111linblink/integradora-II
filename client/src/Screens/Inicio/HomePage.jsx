import React from 'react';
import { Link } from 'react-router-dom'; // Importa el componente Link
import './Home.css'; // Importa los estilos CSS específicos para la página de inicio

const Home = () => {
    return (
        <div className="home-page-container">
            <div className="home-page-content">
                <div className="texto">Bienvenido a Integrantt</div>
                {/* Utiliza el componente Link para dirigir al usuario a la raíz de la aplicación */}
                <Link to="/loge" className="login-link">Inicia Sesión</Link>
            </div>
        </div>
    );
}

export default Home;
