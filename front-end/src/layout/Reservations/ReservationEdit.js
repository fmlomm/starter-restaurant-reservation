import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { getReservation, updateReservation } from "../../utils/api";
import ErrorAlert from "../ErrorAlert";
import ReservationForm from "./ReservationForm";

function ReservationEdit() {
  const { reservation_id } = useParams();
  const history = useHistory();
  const [error, setError] = useState(null);
  const [currentReservation, setCurrentReservation] = useState({ reservation_id });


  useEffect(() => {
    getReservation(reservation_id)
    .then((response) => {
      setCurrentReservation({
        ...response,
        people: Number(response.people),
      })
    })
    .catch(setError);
  }, [reservation_id]);



  const handleChange = ({ target }) => {
    setCurrentReservation({
      ...currentReservation,
      [target.name]: target.value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    updateReservation({
      ...currentReservation,
      people: Number(currentReservation.people),
    })
    .then((response) => {
      setCurrentReservation({...response})
      history.push(`/dashboard?date=${currentReservation.reservation_date}`)
    })

    .catch(setError)
  }
   return (
    <div className="reservationForm-form">
      <ErrorAlert error={error} />
      <h4> Edit </h4>
      <ReservationForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        history={history}
        reservation={currentReservation}
        />
    </div>
    )
  }


export default ReservationEdit;