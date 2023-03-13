import React, { useState, useEffect } from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import useQuery from "../utils/useQuery"
import { today } from "../utils/date-time";
import ReservationCreate from "./Reservations/ReservationCreate";
import ReservationSeat from "./Reservations/ReservationSeat";
import TableCreate from "./Tables/TableCreate"

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  const [date, setDate] = useState(today());

  const url = useRouteMatch();
  const query = useQuery();

  function loadDate() {
    const newDate = query.get('date');
    if (newDate) {
      setDate(newDate);
    }
  }

  useEffect(loadDate, [url, query]);

  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact path="/tables">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations/new">
        <ReservationCreate />
      </Route>
      <Route exact path="/reservations/:reservation_id/seat">
        <ReservationSeat />
      </Route>
      <Route exact path="/tables/new">
        <TableCreate />
      </Route>
      <Route path="/dashboard">
        <Dashboard date={date} />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
