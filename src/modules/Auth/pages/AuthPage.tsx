/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import Login from "./Login";

export function AuthPage() {
  return (
    <>
      <Switch>
        <Route path="/login" component={Login} />
        <Redirect from="/" exact={true} to="/login" />
        <Redirect to="/login" />
      </Switch>
    </>
  );
}
