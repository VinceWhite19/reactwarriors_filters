import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";

export default class Pagination extends PureComponent {
  static propTypes = {
    page: PropTypes.number.isRequired,
    onChangePagination: PropTypes.func.isRequired,
    total_pages: PropTypes.number.isRequired
  };

  render() {
    const { page, onChangePagination, total_pages, resetFilters } = this.props;
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
            onClick={onChangePagination.bind(null, {
              name: "page",
              value: page - 1
            })}
          >
            Назад
          </button>
          <button
            type="button"
            className="btn btn-light"
            onClick={onChangePagination.bind(null, {
              name: "page",
              value: page + 1
            })}
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
