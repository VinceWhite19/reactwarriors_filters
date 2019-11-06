import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import CallApi from "../../../api/api";

export default Component =>
  class GenresHOC extends PureComponent {
    state = {
      genres: []
    };
    static propTypes = {
      with_genres: PropTypes.array.isRequired,
      onChangeFilters: PropTypes.func.isRequired
    };
    getGenres = () => {
      CallApi.get("/genre/movie/list", { params: { language: "ru-RU" } }).then(
        data => {
          this.setState({
            genres: data.genres
          });
        }
      );
    };
    componentDidMount() {
      this.getGenres();
    }

    onChangeGenres = e => {
      const value = +e.target.value;
      const name = e.target.name;
      const { with_genres, onChangeFilters } = this.props;

      onChangeFilters({
        target: {
          name,
          value: with_genres.includes(value)
            ? with_genres.filter(item => item !== value)
            : [...with_genres, value]
        }
      });
    };

    render() {
      return (
        <Component
          genres={this.state.genres}
          with_genres={this.props.with_genres}
          onChangeGenres={this.onChangeGenres}
        />
      );
    }
  };
