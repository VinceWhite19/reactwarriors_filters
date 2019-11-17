import React from "react";
import MovieDetail from "./MovieDetail";
import MovieVideos from "./MovieVideos";
import MovieCredits from "./MovieCredits";

import { TabContent, Nav, NavItem } from "reactstrap";
import { Route, Switch, NavLink } from "react-router-dom";

const Tabs = ({ movie }) => {
  const url = `/movie/${movie.id}`;
  return (
    <div className="col-12">
      <Nav tabs>
        <NavItem>
          <NavLink to={`${url}/details`} className="nav-link">
            Детали
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to={`${url}/videos`} className="nav-link">
            Видео
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to={`${url}/actors`} className="nav-link">
            Актеры
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent>
        <Switch>
          <Route
            path={`${url}/details`}
            render={props => <MovieDetail {...props} movie={movie} />}
          />
          <Route
            path={`${url}/videos`}
            render={props => <MovieVideos {...props} movie={movie} />}
          />
          <Route
            path={`${url}/actors`}
            render={props => <MovieCredits {...props} movie={movie} />}
          />
        </Switch>
      </TabContent>
    </div>
  );
};

export default Tabs;
