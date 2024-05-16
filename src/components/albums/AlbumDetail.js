import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; 

function AlbumDetail() {
  const [album, setAlbum] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState({
    username: '',
    texto: ''
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    console.log(id)
    axios.get(`http://localhost:5000/api/albums/${id}/comentarios/`)
      .then(res => {
        console.log(res);
        setComentarios(res.data);
      })
      .catch(err => console.log(err));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(id)
    axios.get(`http://localhost:5000/api/albums/${id}`)
      .then(res => {
        console.log(res);
        setAlbum(res.data);
      })
      .catch(err => console.log(err));
  }, [id]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoComentario(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    axios.post(`http://localhost:5000/api/albums/${id}/comentarios`, nuevoComentario, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        setComentarios([...comentarios, res.data]);
        setNuevoComentario({ username: '', texto: '' });
      })
      .catch(err => console.log(err));
  };


  if (!album) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-6">
          <img src={album.imagen || "https://via.placeholder.com/300"} className="img-fluid mb-4" alt={`${album.nombre} Album Cover`} />
        </div>
        <div className="col-md-6">
          <h1 className="display-4">{album.nombre}</h1>
          <h2>{album.artista}</h2>
          <p className="lead">Género: {album.genero}</p>
          <p>{album.descripcion}</p>
          <p>Duración: {album.duracion}</p>
          <div>
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
      <div className="row mt-5">
        {!loggedIn && (
          <div className="alert alert-warning" role="alert">
            Debes iniciar sesión para dejar un comentario.
          </div>
        )}
        {loggedIn && (
          <div>
            <h4>Crear Comentario</h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="texto" className="form-label">Comentario</label>
                <textarea className="form-control" id="texto" name="texto" value={nuevoComentario.texto} onChange={handleChange} required></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Enviar Comentario</button>
            </form>
          </div>
        )}
      </div>
      <div className="row mt-5">
        <h2 className='my-5'>Comentarios:</h2>
        {comentarios.map((comentario, index) => (
          <div className="col-md-4 mb-3" key={index}>
            <div className="card">
            <div className="card-body">
                <h5 className="card-title" style={{ fontWeight: 'bold' }}>{comentario.username}</h5>
                <p className="card-text">{comentario.texto}</p>
                <p className="card-text"><small className="text-muted"> {comentario.creadoEn}</small></p>
            </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AlbumDetail;