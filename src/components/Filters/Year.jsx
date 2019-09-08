import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Year extends Component {
  static defaultProps = {
    years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019]
  };
  render() {
    const { primary_release_year, onChangeFilters, years } = this.props;

    return (
      <div className="form-group">
        <label htmlFor="primary_release_year">Год выпуска:</label>
        <select
          id="primary_release_year"
          name="primary_release_year"
          className="form-control"
          value={primary_release_year}
          onChange={onChangeFilters}
        >
          {years.map(year => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

Year.propTypes = {
  onChangeFilters: PropTypes.func.isRequired,
  years: PropTypes.array.isRequired
};
