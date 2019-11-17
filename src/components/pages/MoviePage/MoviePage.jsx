import React, { Component } from "react";
import CallApi from "../../../api/api";
import FavoriteBtn from "../../Movies/FavoriteBtn";
import WatchlistBtn from "../../Movies/WatchlistBtn";
import Tabs from "./Tabs";

export default class MoviePage extends Component {
  state = {
    movie: {}
  };
  getMovieData = async () => {
    try {
      const data = await CallApi.get(`/movie/${this.props.match.params.id}`, {
        params: { language: "ru-RU" }
      });
      this.setState({
        movie: data
      });
    } catch (err) {
      console.log(err);
    }
  };

  componentDidMount() {
    this.getMovieData();
  }
  render() {
    const {
      backdrop_path,
      poster_path,
      title,
      overview,
      vote_average
    } = this.state.movie;
    const movie = this.state.movie;
    return (
      <div className="container">
        <div className="row mt-3">
          <div className="col-12 col-md-4">
            <img
              className="poster"
              src={`https://image.tmdb.org/t/p/w500${backdrop_path ||
                poster_path}`}
              alt=""
            />
          </div>
          <div className="col-12 col-md-8">
            <h2 className="movie-title">{title}</h2>
            <div className="movie-text pr-5">{overview}</div>
            <div className="mt-2"> Рейтинг Пользователей: {vote_average} </div>

            <div className="action-buttons mt-2  p-1 col-sm-2 d-flex justify-content-between">
              <FavoriteBtn item={movie} />
              <WatchlistBtn item={movie} />
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <Tabs movie={movie} />
        </div>
      </div>
    );
  }
}
