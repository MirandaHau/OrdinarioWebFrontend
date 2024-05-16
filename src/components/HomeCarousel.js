import React from 'react';
import { Carousel } from 'react-bootstrap';

function HomeCarousel() {
    return (
        <Carousel>
            <Carousel.Item>
                <img src="/imagenes/carusel1.png" className="d-block w-100" alt="First slide" />
            </Carousel.Item>
            <Carousel.Item>
                <img src="/imagenes/carrusel3.png" className="d-block w-100" alt="Second slide" />
            </Carousel.Item>
            <Carousel.Item>
                <img src="/imagenes/carusel2.png" className="d-block w-100" alt="Third slide" />
            </Carousel.Item>
        </Carousel>
    );
}

export default HomeCarousel;