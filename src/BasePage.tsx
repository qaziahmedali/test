import React, { Suspense, lazy } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import Spinner from "./modules/Partials/Spinner";

const HomePage = lazy(() => import("./pages/Home"));
const TicketPage = React.lazy(() => import("./pages/Tickets/Ticket"));
// const TicketPage = lazy(() =>
//   import("./pages/Tickets/Ticket").then(({ TicketPage }) => ({
//     default: TicketPage,
//   }))
// );

export default function BasePage() {
  return (
    <Suspense fallback={<Spinner />}>
      <Switch>
        <Route path="/ticket/:id" exact component={TicketPage} />
        <Route path="/" exact component={HomePage} />
        <Redirect to="/error" />
      </Switch>
    </Suspense>
  );
}
