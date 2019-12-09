import React, { Component } from "react";
import CallApi from "../../../api/api";
import { Spinner } from "reactstrap";
import Tabs from "./Tabs";
import MovieDescription from "./MovieDescription";

export default class MoviePage extends Component {
  state = {
    movie: {},
    loading: true
  };
  getMovieData = async () => {
    try {
      const data = await CallApi.get(`/movie/${this.props.match.params.id}`);
      this.setState({
        movie: data,
        loading: false
      });
    } catch (err) {
      console.log(err);
    }
  };

  componentDidMount() {
    this.getMovieData();
  }
  render() {
    const { movie, loading } = this.state;

    if (loading) {
      return <Spinner />;
    }

    return (
      <div className="container">
        <MovieDescription movie={movie} />
        <div className="row mt-4">
          <Tabs movie={movie} />
        </div>
      </div>
    );
  }
}
