import React, { useState } from "react";
import { useHistory } from "react-router";
import { createReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function ReservationCreate() {

    const history = useHistory();
    const [error, setError] = useState(null);

    const [reservation, setReservation] = useState({
        first_name:"",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: 1,
    })

    
}