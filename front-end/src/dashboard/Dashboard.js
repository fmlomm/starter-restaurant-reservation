import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { previous, next } from "../utils/date-time";
import { useLocation, useHistory, useRouteMatch } from "react-router-dom";
import ReservationDetail from "./ReservationDetail";
import TableDetail from "./TableDetail";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [currentDate, setCurrentDate] = useState(date);
  const [reservationsError, setReservationsError] = useState(null);

  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);

  const url = useRouteMatch();
  const history = useHistory();
  const location = useLocation();
  const searchedDate = location.search.slice(-10);

  

  function loadTables() {
    const abortController = new AbortController();
    setTablesError(null);
    listTables(abortController.signal)
      .then(setTables)
      .catch(setTablesError);
  }

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    if (currentDate === date) {
      listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    } else {
      listReservations({ currentDate }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError)
    }
    if (searchedDate && searchedDate !== '') {
      setCurrentDate(searchedDate)
    }
    
    return () => abortController.abort();
  }

  useEffect(loadDashboard, [date, currentDate, location.search, searchedDate, url]);
  useEffect(loadTables, [date, currentDate]);
  console.log(reservations);
  console.log('tables', tables);

  const previousHandler = (event) => {
    event.preventDefault();
    history.push('/dashboard');
    setCurrentDate(previous(date));
  }
  
  const todayHandler = (event) => {
    event.preventDefault();
    history.push('/dashboard');
    setCurrentDate(date);
  }

  const nextHandler = (event) => {
    event.preventDefault();
    history.push('/dashboard');
    setCurrentDate(next(currentDate));
  }

  if (reservations) {
    return (
<main>
        <div className="mb-3">
          <h1>Dashboard</h1>
        </div>
        
        <div className="d-md-flex mb-3">
          <div className="row mb-3">
          <h4 className="ml-3">Reservations for date: {currentDate} </h4>
            <div className="">
              <button className="btn btn-primary ml-3" onClick={previousHandler}> Previous Day </button>
            </div>
            <div className="">
              <button className="btn btn-primary ml-3" onClick={todayHandler}> Today </button>
            </div>
            <div className="">
              <button className="btn btn-primary ml-3" onClick={nextHandler}> Next Day </button>
            </div>
            
          </div>
        </div>
        <ErrorAlert error={reservationsError} />
        <div>
          <h4> Reservation List </h4>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col"> ID </th>
                <th scope="col"> First Name </th>
                <th scope="col"> Last Name </th>
                <th scope="col"> Party Size </th>
                <th scope="col"> Phone Number </th>
                <th scope="col"> Reservation Date </th>
                <th scope="col"> Reservation Time </th>
               </tr>
             </thead>
            <tbody>
              {reservations && reservations.map((res) => (
                <ReservationDetail reservation={res} />
              ))}
            </tbody>
         </table>
        </div>
        {/* {JSON.stringify(reservations)} */}

        <ErrorAlert error={tablesError} />
        <div>
          <h4> Tables List </h4>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col"> ID </th>
                <th scope="col"> Table Name </th>
                <th scope="col"> Capacity </th>
                <th scope="col"> Reservation ID </th>
                <th scope="col"> Free / Occupied </th>
               </tr>
             </thead>
            <tbody>
              {tables && tables.map((table) => (
                <TableDetail table={table} />
              ))}
            </tbody>
         </table>
        </div>
      </main>
    )
  } else {
    return (
      <div>
        <h4> Dashboard Loading... </h4>
      </div>
    )
  }
}

export default Dashboard;
