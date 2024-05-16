import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function AlbumForm() {
  const [album, setAlbum] = useState({
    nombre: '',
    artista: '',
    genero: '',
    duracion: '',
    descripcion: '',
    imagen: '',
    spotify: '',
    appleMusic: '',
    genius: ''
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/api/albums/${id}`)
        .then(response => {
          setAlbum(response.data);
        })
        .catch(error => console.error('Error fetching album:', error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAlbum(prevAlbum => ({
      ...prevAlbum,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = id ? 'put' : 'post';
    const url = id ? `http://localhost:5000/api/albums/${id}` : 'http://localhost:5000/api/albums';

    axios[method](url, album)
      .then(() => {
        navigate('/albums');
      })
      .catch(error => console.error('Error saving album:', error));
  };

  return (
    <div className="container mt-5">
      <h2>{id ? 'Editar Album' : '♫ Crear Álbum Musical ♫'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" className="form-control" id="nombre" name="nombre" value={album.nombre} onChange={handleChange} required />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="artista">Artista:</label>
          <input type="text" className="form-control" id="artista" name="artista" value={album.artista} onChange={handleChange} required />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="genero">Género:</label>
          <input type="text" className="form-control" id="genero" name="genero" value={album.genero} onChange={handleChange} required />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="duracion">Duración:</label>
          <input type="text" className="form-control" id="duracion" name="duracion" value={album.duracion} onChange={handleChange} required />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="descripcion">Descripción:</label>
          <textarea className="form-control" id="descripcion" name="descripcion" value={album.descripcion} onChange={handleChange} required></textarea>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="imagen">Imagen del Álbum:</label>
          <input type="text" className="form-control" id="imagen" name="imagen" value={album.imagen} onChange={handleChange} required />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="spotify">Enlace de Spotify:</label>
          <input type="text" className="form-control" id="spotify" name="spotify" value={album.spotify} onChange={handleChange} required />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="appleMusic">Enlace de Apple Music:</label>
          <input type="text" className="form-control" id="appleMusic" name="appleMusic" value={album.appleMusic} onChange={handleChange} required />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="genius">Enlace de Genius:</label>
          <input type="text" className="form-control" id="genius" name="genius" value={album.genius} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">{id ? 'Update' : 'Agregar'}</button>
      </form>
    </div>
  );
}

export default AlbumForm;