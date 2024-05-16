import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="text-center mt-4">
            <p>© 2024 Eco Musical. Todos los derechos reservados.</p>
            <Link to="/" className="btn btn-secondary">Volver al Inicio</Link>
        </footer>
    );
}

export default Footer;