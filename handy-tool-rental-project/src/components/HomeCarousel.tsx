import React from "react";
import { Carousel } from "react-bootstrap";
import "../App.css";

const HomeCarousel: React.FC = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-img"
          src="/ht-rental-image1.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3 className="carousel-text">Tooling made simple.</h3>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100 carousel-img"
          src="/ht-rental-image2.jpg"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3 className="carousel-text">Rent. Use. Return. Repeat.</h3>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100 carousel-img"
          src="/ht-rental-image3.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3 className="carousel-text">HT Rental</h3>
          <p className="carousel-text">Your Project Partner.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default HomeCarousel;
