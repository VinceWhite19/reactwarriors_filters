import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";

export default class Pagination extends PureComponent {
  static propTypes = {
    page: PropTypes.number.isRequired,
    onChangePagination: PropTypes.func.isRequired,
    total_pages: PropTypes.number.isRequired
  };

  nextPage = () => {
    this.props.onChangePagination({
      page: this.props.page + 1,
      total_pages: this.props.total_pages
    });
  };

  prevPage = page => event => {
    this.props.onChangePagination({
      page: this.props.page - 1,
      total_pages: this.props.total_pages
    });
  };

  render() {
    const { page, total_pages, resetFilters } = this.props;
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
            onClick={this.prevPage(page)}
          >
            Назад
          </button>
          <button
            type="button"
            className="btn btn-light"
            onClick={this.nextPage}
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
