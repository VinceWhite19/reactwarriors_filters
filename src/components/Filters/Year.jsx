import React, { PureComponent } from "react";
import UISelect from "../UIComponents/UISelect";
import PropTypes from "prop-types";

export default class Year extends PureComponent {
  static propTypes = {
    onChangeFilters: PropTypes.func.isRequired,
    years: PropTypes.array.isRequired
  };

  static defaultProps = {
    years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019]
  };
  render() {
    const { primary_release_year, onChangeFilters, years } = this.props;

    return (
      <UISelect
        id="primary_release_year"
        name="primary_release_year"
        value={primary_release_year}
        onChange={onChangeFilters}
        labelText="Год выпуска:"
      >
        {years.map(year => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </UISelect>
    );
  }
}
