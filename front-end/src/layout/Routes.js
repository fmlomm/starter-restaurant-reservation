import React, { useState, useEffect } from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import useQuery from "../utils/useQuery";
import ReservationCreate from "./Reservations/ReservationCreate";
import ReservationSeat from "./Reservations/ReservationSeat";
import TableCreate from "./Tables/TableCreate";
import ReservationEdit from "./Reservations/ReservationEdit";
import ReservationSearch from "./ReservationSearch";

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
      <Route exact path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact path="/tables">
        <Dashboard date={date} />
      </Route>
      <Route path="/search">
        <ReservationSearch />
      </Route>
      <Route path="/reservations/new">
        <ReservationCreate date={date} />
      </Route>
      <Route path="/reservations/:reservation_id/seat">
        <ReservationSeat />
      </Route>
      <Route path="/reservations/:reservation_id/edit">
        <ReservationEdit date={date} />
      </Route>
      <Route path="/tables/new">
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
