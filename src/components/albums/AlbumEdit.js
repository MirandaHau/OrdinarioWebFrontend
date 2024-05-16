import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AlbumEdit() {
  const [album, setAlbum] = useState(null);
  const [id, setId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleIdSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/api/albums/${id}`);
      setAlbum(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching album:', error);
      setError('Álbum no encontrado');
      setAlbum(null);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAlbum(prevAlbum => ({
      ...prevAlbum,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`http://localhost:5000/api/albums/${id}`, album)
      .then(() => {
        navigate('/albums');
      })
      .catch(error => {
        console.error('Error updating album:', error);
        setError('Error al actualizar el álbum');
      });
  };

  return (
    <div className="container mt-5">
      <h2>{album ? 'Editar Álbum' : 'Cargar Álbum para Editar'}</h2>
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      <form onSubmit={handleIdSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="albumId">ID del Álbum:</label>
          <input
            type="text"
            className="form-control"
            id="albumId"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="Ingrese el ID del álbum"
            required
          />
          <button type="submit" className="btn btn-primary mt-2">Cargar Álbum</button>
        </div>
      </form>
      {album && (
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
          <button type="submit" className="btn btn-success">Actualizar Álbum</button>
        </form>
      )}
    </div>
  );
}

export default AlbumEdit;