import { useState, useEffect } from "react";

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
  const [loading, setLoading] = useState(false);

  // Hardcoded times per date (fallback if needed)
  const timeSlotsByDate = {
    "2025-11-15": ["5:00 PM", "6:30 PM", "8:00 PM"],
    "2025-11-30": ["4:30 PM", "7:00 PM"],
    "2025-11-29": ["6:00 PM", "8:30 PM", "9:00 PM"],
  };

  const openModal = (type) => setActiveModal(type);
  const closeModal = () => setActiveModal(null);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  // Fetch available times based on selected date
  useEffect(() => {
    if (!selectedDate) return;

    setLoading(true);

    fetch(`http://localhost:3000/reservations?date=${selectedDate}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch reservations");
        return res.json();
      })
      .then((reservations) => {
        // Extract already booked times
        const bookedTimes = reservations.map((r) => r.reservation_time);
        const allTimes = timeSlotsByDate[selectedDate] || [];
        const openSlots = allTimes.filter((t) => !bookedTimes.includes(t));
        setAvailableTimes(openSlots);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to retrieve available times. Using default slots.");
        setAvailableTimes(timeSlotsByDate[selectedDate] || []);
      })
      .finally(() => setLoading(false));
  }, [selectedDate]);

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    setSelectedTime("");
  };

  const handleReserve = async () => {
    if (!selectedDate || !selectedTime) return;

    const [hours, minutesPart] = selectedTime.split(":");
    let [minutes, meridian] = minutesPart.split(" ");
    let hour24 = meridian === "PM" && hours !== "12" ? parseInt(hours) + 12 : parseInt(hours);
    hour24 = meridian === "AM" && hours === "12" ? 0 : hour24;

const reservationTime = `${selectedDate}T${hour24.toString().padStart(2,'0')}:${minutes}:00`;

    // Hardcoded user_id and table_id for now
    const payload = {
      reservation: {
        reservation_time: reservationTime,
        user_id: 4,
        table_id: 4,
      },
    };
  
    try {
      const res = await fetch("http://localhost:3000/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.errors?.join(", ") || "Failed to reserve");
      }

      alert(`Reservation confirmed for ${selectedDate} at ${selectedTime}`);
      setAvailableTimes((prev) => prev.filter((t) => t !== selectedTime));
      setSelectedTime("");
    } catch (err) {
      console.error(err);
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div className="carousel">
      {/* Navigation Buttons */}
      <div className="carousel-buttons">
        <button onClick={() => openModal("About")}>About</button>
        <button onClick={() => openModal("Reservations")}>Reservations</button>
        <button onClick={() => openModal("Menu")}>Menu</button>
      </div>

      {/* Image Carousel */}
      <button className="prev-button" onClick={prevSlide}>❮</button>
      <img
        src={images[currentIndex]}
        alt={`slide ${currentIndex}`}
        className="carousel-image"
      />
      <button className="next-button" onClick={nextSlide}>❯</button>

      {/* About Modal */}
      {activeModal === "About" && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>x</button>
            <h2>About Us</h2>
            <p>
              At our restaurant, every dish tells a story. From locally sourced
              ingredients to time-honored recipes, we bring warmth and flavor to
              every plate.
            </p>
          </div>
        </div>
      )}

      {/* Menu Modal */}
      {activeModal === "Menu" && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>x</button>
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
            <button className="close-button" onClick={closeModal}>x</button>
            <h2>Make a Reservation</h2>

            <form className="reservation-form" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="date">Select Date:</label>
              <input
                type="date"
                id="date"
                value={selectedDate}
                onChange={handleDateChange}
              />

              {loading && <p>Loading available times...</p>}

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
                      <option key={i} value={time}>{time}</option>
                    ))}
                  </select>
                </>
              )}

              <button
                type="button"
                disabled={!selectedDate || !selectedTime}
                onClick={handleReserve}
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
