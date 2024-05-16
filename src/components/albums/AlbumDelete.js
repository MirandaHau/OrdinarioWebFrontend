import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AlbumDelete() {
  const [id, setId] = useState('');
  const [album, setAlbum] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!id) {
      setError('Por favor, ingresa un ID válido.');
      return;
    }
    axios.get(`http://localhost:5000/api/albums/${id}`)
      .then(response => {
        setAlbum(response.data);
        setError('');
      })
      .catch(() => {
        setError('Álbum no encontrado.');
        setAlbum(null);
      });
  };

  const handleDelete = () => {
    axios.delete(`http://localhost:5000/api/albums/${id}`)
      .then(() => {
        navigate('/albums');
        setError('');
      })
      .catch(error => {
        console.error('Error deleting album:', error);
        setError('Error al eliminar el álbum.');
      });
  };

  return (
    <div className="container mt-5">
      <h2>Eliminar Álbum</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="mb-3">
        <label htmlFor="albumId" className="form-label">ID del Álbum:</label>
        <input
          type="text"
          className="form-control"
          id="albumId"
          value={id}
          onChange={e => setId(e.target.value)}
          placeholder="Ingresa el ID del álbum"
        />
        <button onClick={handleSearch} className="btn btn-primary mt-2">Buscar Álbum</button>
      </div>
      {album && (
        <>
          <p>¿Estás seguro de que deseas eliminar el siguiente álbum?</p>
          <div>
            <strong>Nombre:</strong> {album.nombre}<br />
            <strong>Artista:</strong> {album.artista}<br />
            <strong>Género:</strong> {album.genero}<br />
            <strong>Duración:</strong> {album.duracion}
          </div>
          <button onClick={handleDelete} className="btn btn-danger mt-3">Eliminar Álbum</button>
        </>
      )}
    </div>
  );
}

export default AlbumDelete;