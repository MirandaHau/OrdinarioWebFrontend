import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 

function AlbumList() {
  const [albums, setAlbums] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/albums/')
      .then(res => {
        console.log(res);
        setAlbums(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredAlbums = albums.filter(album => {
    return album.nombre.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="container my-5">
      <h2 style={{ marginBottom: '30px', textAlign: 'center' }}>{'♫ Álbumes Musicales ♫'}</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="🔎 Buscar álbum por nombre"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="row">
        {filteredAlbums.map((album, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card h-100">
              <Link to={`/albums/${album._id}`} style={{ textDecoration: 'none' }}>
                <img src={album.imagen || "https://via.placeholder.com/150"} className="card-img-top" alt={`${album.nombre} Album Cover`} />
              </Link>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{album.nombre} - {album.artista}</h5>
                <p className="card-text"><small className="text-muted">Género: {album.genero}</small></p>
                <p className="card-text"><small className="text-muted">Duración: {album.duracion}</small></p>
                <div className="mt-auto">
                  {album.appleMusic && (
                    <a href={album.appleMusic} className="btn btn-danger me-2 mb-2" role="button">
                      <i className="bi bi-apple"></i> Apple Music
                    </a>
                  )}
                  {album.spotify && (
                    <a href={album.spotify} className="btn btn-success me-2 mb-2" role="button">
                      <i className="bi bi-spotify"></i> Spotify
                    </a>
                  )}
                  {album.genius && (
                    <a href={album.genius} className="btn btn-warning mb-2" role="button">Genius</a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AlbumList;