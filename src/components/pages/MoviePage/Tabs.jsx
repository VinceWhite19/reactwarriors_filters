import React from "react";
import MovieDetail from "./MovieDetail";
import MovieVideos from "./MovieVideos";
import MovieCredits from "./MovieCredits";
import NavTabs from "./NavTabs";

import { TabContent } from "reactstrap";
import { Route, Switch } from "react-router-dom";

const Tabs = ({ movie }) => {
  return (
    <div className="col-12">
      <NavTabs />
      <TabContent>
        <Switch>
          <Route
            path="/movie/:id/details"
            render={props => <MovieDetail {...props} movie={movie} />}
          />
          <Route path="/movie/:id/videos" component={MovieVideos} />
          <Route path="/movie/:id/actors" component={MovieCredits} />
        </Switch>
      </TabContent>
    </div>
  );
};

export default Tabs;
