//component 
import { useState } from "react";

export default function Carousel () {
    //storing the images
    const images = ["/src/assets/images/img1.jpg", "/src/assets/images/img2.jpg", "/src/assets/images/img3.jpg"];


const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="carousel">
      <button className="prev-button" onClick={prevSlide}>
        ❮
      </button>

      <img
        src={images[currentIndex]}
        alt={`slide ${currentIndex}`}
        className="carousel-image"
      />

      <button className="next-button" onClick={nextSlide}>
        ❯
      </button>
    </div>
  );
}

