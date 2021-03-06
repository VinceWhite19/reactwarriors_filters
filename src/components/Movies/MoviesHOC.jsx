import React, { PureComponent } from "react";
import CallApi from "../../api/api";
import _ from "lodash";

export default Component =>
  class MoviesHOC extends PureComponent {
    state = {
      movies: [],
      loading: false
    };
    getMovies = page => {
      const { sort_by, primary_release_year, with_genres } = this.props.filters;
      const queryStringParams = {
        sort_by: sort_by,
        page: page,
        primary_release_year: primary_release_year
      };

      if (with_genres.length > 0)
        queryStringParams.with_genres = with_genres.join(",");
      this.setState({
        loading: true
      });
      CallApi.get("/discover/movie", {
        params: queryStringParams
      }).then(data => {
        this.setState({
          movies: data.results,
          loading: false
        });
        this.props.onChangePagination({
          page: data.page,
          total_pages: data.total_pages
        });
      });
    };

    componentDidMount() {
      this.getMovies(this.props.page);
    }

    componentDidUpdate(prevProps) {
      const { filters, onChangePagination, page } = this.props;

      if (!_.isEqual(filters, prevProps.filters)) {
        onChangePagination({
          name: "page",
          value: 1
        });
        this.getMovies(1);
      }
      if (page !== prevProps.page) {
        this.getMovies(page);
      }
    }

    render() {
      const { movies, loading } = this.state;
      return <Component {...this.props} movies={movies} loading={loading} />;
    }
  };
