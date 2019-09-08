import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

export default class Pagination extends Component {
  render() {
    const { page, onChangePage, total_pages, resetFilters } = this.props;
    return (
      <Fragment>
        <div className="pagination">
          страница {page} из {total_pages}
        </div>
        <div className="btn-group">
          <button
            type="button"
            className="btn btn-light"
            disabled={page === 1}
            onClick={onChangePage.bind(null, page - 1)}
          >
            Назад
          </button>
          <button
            type="button"
            className="btn btn-light"
            onClick={onChangePage.bind(null, page + 1)}
          >
            Вперед
          </button>
        </div>
        <div className="btn-group">
          <button
            type="button"
            className="btn btn-danger"
            onClick={resetFilters}
          >
            Сбросить Фильтры
          </button>
        </div>
      </Fragment>
    );
  }
}
Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  total_pages: PropTypes.number.isRequired
};
