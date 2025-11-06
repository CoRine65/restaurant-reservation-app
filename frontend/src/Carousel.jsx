import { useState } from "react";

export default function Carousel() {
  const images = [
    "/src/assets/images/img1.jpg",
    "/src/assets/images/img2.jpg",
    "/src/assets/images/img3.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeModal, setActiveModal] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");

  const timeSlotsByDate = {
    "2025-11-15": ["5:00 PM", "6:30 PM", "8:00 PM"],
    "2025-11-30": ["4:30 PM", "7:00 PM"],
    "2025-11-29": ["6:00 PM", "8:30 PM", "9:00 PM"],
    "2025-11-10": ["5:00 PM", "6:30 PM", "8:00 PM"],
    "2025-11-19": ["5:00 PM", "6:30 PM", "8:00 PM"],
    "2025-11-25": ["5:00 PM", "6:30 PM", "8:00 PM"],
    "2025-12-15": ["5:00 PM", "6:30 PM", "8:00 PM"],
    "2025-12-30": ["4:30 PM", "7:00 PM"],
    "2025-12-29": ["6:00 PM", "8:30 PM", "9:00 PM"],
    "2025-12-10": ["5:00 PM", "6:30 PM", "8:00 PM"],
    "2025-12-19": ["5:00 PM", "6:30 PM", "8:00 PM"],
    "2025-12-25": ["5:00 PM", "6:30 PM", "8:00 PM"],
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    setAvailableTimes(timeSlotsByDate[date] || []);
    setSelectedTime("");
    const times = timeSlotsByDate[date] || [];
    setAvailableTimes(times);
    setSelectedTime('');

    if (times.length === 0) {
      alert('No available times for this date. Please select another.');
    }
  };

  const openModal = (type) => setActiveModal(type);
  const closeModal = () => setActiveModal(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="carousel">
      <div className="carousel-buttons">
        <button onClick={() => openModal("About")}>About</button>
        <button onClick={() => openModal("Reservations")}>Reservations</button>
        <button onClick={() => openModal("Menu")}>Menu</button>
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

      {/* About Modal */}
      {activeModal === "About" && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>
              x
            </button>
            <h2>About Us</h2>
            <p>
              At our restaurant, every dish tells a story. From locally sourced
              ingredients to time-honored recipes, we bring warmth and flavor to
              every plate. Whether you’re joining us for a quick bite or a slow
              evening with friends, our table is always set for you.
            </p>
          </div>
        </div>
      )}

      {/* Menu Modal */}
      {activeModal === "Menu" && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>
              x
            </button>
            <h2>Menu</h2>
            <ul>
              <li>Emberwood Soup — $8.00</li>
              <li>Ashen Bread & Herb Butter — $8.00</li>
              <li>Firelight Pasta — $15.00</li>
              <li>Molten Honey Cake — $10.00</li>
            </ul>
          </div>
        </div>
      )}

      {/* Reservations Modal */}
      {activeModal === "Reservations" && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>
              x
            </button>
            <h2>Make a Reservation</h2>

            <form className="reservation-form">
              <label htmlFor="date">Select Date:</label>
              <input
                type="date"
                id="date"
                value={selectedDate}
                onChange={handleDateChange}
              />

              {availableTimes.length > 0 && (
                <>
                  <label htmlFor="time">Select Time:</label>
                  <select
                    id="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                  >
                    <option value="">-- Choose a time --</option>
                    {availableTimes.map((time, i) => (
                      <option key={i} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </>
              )}

              <button
                type="button"
                disabled={!selectedDate || !selectedTime}
                onClick={() =>
                  alert(
                    `Reservation confirmed for ${selectedDate} at ${selectedTime}`
                  )
                }
              >
                Reserve
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
