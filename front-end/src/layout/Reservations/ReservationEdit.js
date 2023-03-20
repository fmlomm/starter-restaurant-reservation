import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getReservation, updateReservation } from "../../utils/api";
import ErrorAlert from "../ErrorAlert";
import ReservationForm from "./ReservationForm";

function ReservationEdit({ date }) {
  const { reservation_id } = useParams();
  const [currentReservation, setCurrentReservation] = useState({reservation_id});
  const [error, setError] = useState(null);
  const history = useHistory();
  
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

 function editForm() {
  return (
    <div className="reservationForm-form">
      <ErrorAlert error={error} />
      <h4> Edit </h4>
      <ReservationForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        history={history}
        />
    </div>
  )
 }
 return (
  <div>{Object.keys(ReservationForm).length ? editForm() : "Loading..."}</div>
 )

}

export default ReservationEdit;