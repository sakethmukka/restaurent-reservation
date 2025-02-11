import React, { useState } from "react";

const RestaurantReservation = () => {
  const totalSeats = 20;
  const [seatsLeft, setSeatsLeft] = useState(totalSeats);
  const [reservations, setReservations] = useState([]);
  const [form, setForm] = useState({ name: "", phone: "", guests: "" });

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, phone, guests } = form;
    const guestCount = parseInt(guests, 10);

    if (!name || !phone || !guestCount) {
      alert("All fields are required.");
      return;
    }

    if (guestCount > seatsLeft) {
      alert("Not enough seats available.");
      return;
    }

    if (reservations.some((res) => res.name === name)) {
      alert("Duplicate name detected!");
      return;
    }

    const newReservation = {
      id: Date.now(),
      name,
      phone,
      guests: guestCount,
      checkInTime: new Date().toLocaleTimeString(),
      checkOutTime: null,
    };

    setReservations([...reservations, newReservation]);
    setSeatsLeft(seatsLeft - guestCount);
    setForm({ name: "", phone: "", guests: "" });
  };

  const handleCheckout = (id) => {
    setReservations(
      reservations.map((res) =>
        res.id === id ? { ...res, checkOutTime: new Date().toLocaleTimeString() } : res
      )
    );
  };

  const handleDelete = (id) => {
    const reservation = reservations.find((res) => res.id === id);
    if (!reservation) return;

    if (!reservation.checkOutTime) {
      setSeatsLeft(seatsLeft + reservation.guests);
    }

    setReservations(reservations.filter((res) => res.id !== id));
  };

  return (
    <div style={{ fontFamily: "Arial", padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2 style={{ textAlign: "center" }}>Restaurant Reservation</h2>
      <p style={{ textAlign: "center" }}>Seats Left: {seatsLeft} / {totalSeats}</p>
      
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input
          type="text"
          name="name"
          placeholder="Customer Name"
          value={form.name}
          onChange={handleInputChange}
          style={{ padding: "8px" }}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleInputChange}
          style={{ padding: "8px" }}
        />
        <input
          type="number"
          name="guests"
          placeholder="Number of Guests"
          value={form.guests}
          onChange={handleInputChange}
          style={{ padding: "8px" }}
        />
        <button type="submit" style={{ padding: "10px", backgroundColor: "green", color: "white", border: "none", cursor: "pointer" }}>
          Reserve
        </button>
      </form>

      <table style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ borderBottom: "2px solid black" }}>Name</th>
            <th style={{ borderBottom: "2px solid black" }}>Phone</th>
            <th style={{ borderBottom: "2px solid black" }}>Guests</th>
            <th style={{ borderBottom: "2px solid black" }}>Check-in</th>
            <th style={{ borderBottom: "2px solid black" }}>Checkout</th>
            <th style={{ borderBottom: "2px solid black" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((res) => (
            <tr key={res.id}>
              <td>{res.name}</td>
              <td>{res.phone}</td>
              <td>{res.guests}</td>
              <td>{res.checkInTime}</td>
              <td>{res.checkOutTime || "-"}</td>
              <td>
                {!res.checkOutTime && (
                  <button
                    onClick={() => handleCheckout(res.id)}
                    style={{ marginRight: "5px", padding: "5px", backgroundColor: "blue", color: "white", border: "none", cursor: "pointer" }}
                  >
                    Checkout
                  </button>
                )}
                <button
                  onClick={() => handleDelete(res.id)}
                  style={{ padding: "5px", backgroundColor: "red", color: "white", border: "none", cursor: "pointer" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantReservation;
