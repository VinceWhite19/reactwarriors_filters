import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { Nav, NavItem } from "reactstrap";

const NavTabs = ({
  match: {
    params: { id }
  }
}) => {
  return (
    <Nav tabs>
      <NavItem>
        <NavLink to={`/movie/${id}/details`} className="nav-link">
          Детали
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink to={`/movie/${id}/videos`} className="nav-link">
          Видео
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink to={`/movie/${id}/actors`} className="nav-link">
          Актеры
        </NavLink>
      </NavItem>
    </Nav>
  );
};

export default withRouter(NavTabs);
