import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { Routes } from "../routes";

// pages
// import Presentation from "./Presentation";
import Upgrade from "./Upgrade";
import DashboardOverview from "./dashboard/DashboardOverview";
import Tickets from "./Tickets";
import { ViewTicket } from './ViewTicket';
import Categories from "./Categories";
import Nps from "./Nps";
import Signin from "./examples/Signin";
import Signup from "./examples/Signup";
import Lock from "./examples/Lock";
import NotFoundPage from "./examples/NotFound";
import ServerError from "./examples/ServerError";


// // components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";


const RouteWithLoader = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route {...rest} render={props => ( <> <Preloader show={loaded ? false : true} /> <Component {...props} /> </> ) } />
  );
};

const RouteWithSidebar = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const localStorageIsSettingsVisible = () => {
    return localStorage.getItem('settingsVisible') === 'false' ? false : true
  }

  const [showSettings, setShowSettings] = useState(localStorageIsSettingsVisible);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    localStorage.setItem('settingsVisible', !showSettings);
  }

  return (
    <Route {...rest} render={props => (
      <>
        <Preloader show={loaded ? false : true} />
        <Sidebar />

        <main className="content">
          <Navbar />
          <Component {...props} />
          <Footer toggleSettings={toggleSettings} showSettings={showSettings} />
        </main>
      </>
    )}
    />
  );
};

export default () => (
  <Switch>
      {/* pages */}
      {/* <Redirect from="/" to={Routes..path} component={DashboardOverview} /> */}
    
    
    <Route exact path={'/'} component={Signin} />


    {/* <Route exaxt path={Routes.Signin.path} component={Signin} /> */}
    <RouteWithSidebar exact path={Routes.Tickets.path} component={Tickets} />
    <RouteWithSidebar exact path={Routes.DashboardOverview.path} component={DashboardOverview} />
    {/* <RouteWithSidebar exact path={Routes.Upgrade.path} component={Upgrade} /> */}
    <RouteWithSidebar exact path={Routes.ViewTicket.path + "/:id"} component={ViewTicket} />    
    <RouteWithSidebar exact path={Routes.Categories.path} component={Categories} />
    <RouteWithSidebar exact path={Routes.Nps.path} component={Nps} />
    <Redirect to={Routes.NotFound.path} />
  </Switch>
);
