import React, { useState } from "react";
import { useHistory } from "react-router";
import { createReservation } from "../../utils/api";
import ErrorAlert from "../ErrorAlert";
import ReservationForm from "./ReservationForm";

function ReservationCreate({ date }) {

  const history = useHistory();
  const [error, setError] = useState(null);

  const [reservation, setReservation] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: date,
    reservation_time: "",
    people: "1",
  })

  // TODO Create Change Handler √
  const handleChange = ({ target }) => {
    setReservation({
      ...reservation,
      [target.name]: target.value,
    });
  }

  // TODO Create Submit Handler √
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

  function createForm() {
    return (
      <div className="reservationForm=form">
        <ErrorAlert error={error} />
        <h4>Create</h4>
        <ReservationForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          history={history}
          />
      </div>
    )
  }

}

export default ReservationCreate;