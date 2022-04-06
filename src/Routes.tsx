import React, { Fragment, useEffect, useState } from "react";
import {
  Redirect,
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Layout from "./modules/Layout";
import { AuthPage, Logout } from "./modules/Auth";
import BasePage from "./BasePage";
import ErrorsPage from "./modules/Errors/ErrorPage";
import { useDispatch, useSelector } from "react-redux";
import { isMeAuth } from "./reducers/authReducer";
import { me } from "./helpers/auth";
import { RootState } from "./app/store";
import tickets from "./ticket.json";

export function MainRoutes() {
  const { isAuth } = useSelector((state: RootState) => state.Users);
  const [auth, setAuth] = useState<object>({});
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();

  useEffect(() => {
    let data = localStorage.getItem("tickets");
    let user = localStorage.getItem("user");
    if (user !== null) {
      setAuth(JSON.parse(user));
    }

    if (data === null || data === undefined) {
      localStorage.setItem("tickets", JSON.stringify(tickets));
    }
  }, []);

  useEffect(() => {
    handleMe();
  }, []);

  const handleMe = () => {
    setLoading(true);
    try {
      me().then((data) => {
        if (data?.message !== "unAuthorized") {
          dispatch(isMeAuth({ data }));
          setLoading(false);
        } else {
          setLoading(false);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Router>
      <Switch>
        {!loading ? (
          <>
            {!isAuth ? (
              /*Render auth page when user at `/login` and not authorized.*/
              <Route>
                <AuthPage />
              </Route>
            ) : (
              /*Otherwise redirect to root page (`/`)*/
              <Redirect to="/" />
            )}
            {!isAuth ? (
              /*Redirect to `/` when user is not authorized*/
              <Redirect to="/login" />
            ) : (
              <Layout>
                <BasePage />
              </Layout>
            )}
            <Route path="/logout" component={Logout} />
            <Route path="/error" component={ErrorsPage} />
          </>
        ) : (
          "Loading"
        )}
      </Switch>
    </Router>
  );
}
