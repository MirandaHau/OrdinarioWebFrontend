import React, { useState } from 'react';
import axios from 'axios';

function CommentForm({ albumId }) {
    const [comment, setComment] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!comment) return;
        try {
            const response = await axios.post(`http://tu-api/albums/${albumId}/comments`, {
                text: comment
            });
            console.log('Comentario añadido:', response.data);
            setComment('');
        } catch (error) {
            console.error('Error al añadir comentario:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder="Escribe un comentario..."
                rows="3"
            />
            <button type="submit">Enviar Comentario</button>
        </form>
    );
}

export default CommentForm;