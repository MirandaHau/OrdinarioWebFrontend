import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import HomeCarousel from './components/HomeCarousel';
import AlbumList from './components/albums/AlbumList';
import AlbumDetail from './components/albums/AlbumDetail';
import AlbumForm from './components/albums/AlbumForm';
import AlbumDelete from './components/albums/AlbumDelete';
import AlbumEdit from './components/albums/AlbumEdit';
import Login from './components/auth/Login';
import './App.css';
import Register from './components/auth/Register';

function App() {
    return (
      <Router>
        <Navbar />  
        <main>
          <Routes>
            <Route path="/" element={
              <>
                <HomeCarousel />
                <div id="QuienesSomos" className="container mt-5 d-flex flex-column flex-md-row align-items-center">
                    <div className="text-center text-md-start flex-grow-1 me-md-3">
                        <h2>¿Quiénes somos?</h2>
                        <hr />
                        <p>Somos un equipo apasionado por la música, comprometido en compartir los mejores álbumes del año con nuestra audiencia. En nuestro espacio, descubrirás lo último y más destacado del mundo musical, donde la pasión por la música se une con la búsqueda constante de lo más innovador y emocionante en el panorama musical actual. ¡Acompáñanos en este viaje sonoro y descubre junto a nosotros lo mejor de la música del 2023!</p>
                      </div>
                      <img src="/imagenes/eco-musical-high-resolution-logo (1).png" className="img-fluid img-thumbnail my-3 my-md-0" alt="DescripcionImagen" style={{ maxWidth: "40%", height: "auto" }} />
                    </div>
              </>
            } />
            <Route path="/albums" element={<AlbumList />} />
            <Route path="/albums/:id" element={<AlbumDetail />} />
            <Route path="/albums/edit/:id" element={<AlbumForm />} />
            <Route path="/create-album" element={<AlbumForm />} />
            <Route path="/albums/edit/:id" element={<AlbumEdit />} />
            <Route path="/edit-album" element={<AlbumEdit />} />
            <Route path="/albums/delete/:id" element={<AlbumDelete />} />
            <Route path="/delete-album" element={<AlbumDelete />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    );
  }
  
  export default App;