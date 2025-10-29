//component 
import { useState } from "react";

export default function Carousel () {
    //storing the images
  const images = ["/src/assets/images/img1.jpg", "/src/assets/images/img2.jpg", "/src/assets/images/img3.jpg"];
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (type) => setActiveModal(type);
  const closeModal = () => setActiveModal(null);

const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="carousel">
      <div className="carousel-buttons">
        <button onClick={() => openModal('about')}>About</button>
        <button>Reservations</button>
        <button onClick={() => openModal('Menu')}>Menu</button>
      </div>
      
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


        {/*modal*/}
        { activeModal === 'about' && (
          <div className="modal-overlay" onClick={closeModal}> 
            <div className="modal-content" onClick={(e) => e.stopPropagation()}> 
              <button className="close-button" onClick={closeModal}> x </button>
              <h2>About Us</h2>
              <p>
                At our restaurant, every dish tells a story. From locally sourced
                ingredients to time-honored recipes, we bring warmth and flavor to
                every plate. Whether you’re joining us for a quick bite or a slow
                evening with friends, our table is always set for you.
              </p>
            </div>
          </div>
        )    
        }

        { activeModal === 'Menu' && (
          <div className="modal-overlay" onClick={closeModal}> 
            <div className="modal-content" onClick={(e) => e.stopPropagation()}> 
              <button className="close-button" onClick={closeModal}> x </button>
              <h2>Menu</h2>
              <ul>
                <li>Emberwood Soup $8.00</li>
                <li>Ashen Bread & Herb Butter $8.00</li>
                <li>Firelight Pasta $15.00</li>
                <li>Molten Honey Cake $10.00</li>
              </ul>
            </div>
          </div>
        )    
        }







    </div>
  );
}

