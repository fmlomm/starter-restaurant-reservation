import React, { useState } from "react";
import { createReservation } from "../../utils/api";
import { useHistory } from "react-router";
import ErrorAlert from "../ErrorAlert";
import ReservationForm from "../Reservations/ReservationForm";

function ReservationCreate() {
  const [reservation, setReservation] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 1,
  });

  const [error, setError] = useState(null);
  const history = useHistory();
  
  const handleChange = ({ target }) => {
    setReservation({
      ...reservation,
      [target.name]: target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    createReservation({
      ...reservation,
      people: Number(reservation.people),
    })
      .then(() => {
        history.push(`/dashboard?date=${reservation.reservation_date}`);
      })
      .catch(setError);
  } 

  return (
    <div className="new-reservation">
      <ErrorAlert error={error} />
      <h4>New Reservation</h4>
      <ReservationForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        history={history}
        reservation={reservation}
      />
    </div>
  );
}


export default ReservationCreate;