import React, { Component } from "react";
import { Spinner } from "reactstrap";
import CallApi from "../../../api/api";

export default class MovieCredits extends Component {
  state = {
    credits: [],
    loading: true
  };
  getMovieCredits = async () => {
    try {
      const data = await CallApi.get(`/movie/${this.props.movie.id}/credits`);
      const result = data.cast;
      this.setState({
        credits: result,
        loading: false
      });
    } catch (err) {
      console.log(err);
    }
  };

  componentDidMount() {
    this.getMovieCredits();
  }
  render() {
    const { credits, loading } = this.state;
    return (
      <div className="mt-4 d-flex flex-wrap">
        {loading ? (
          <Spinner
            style={{ width: "5rem", height: "5rem", margin: "0 auto" }}
          />
        ) : (
          credits.map(
            credit =>
              credit.profile_path && (
                <div className="actor" key={credit.id}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${credit.profile_path}`}
                    alt={credit.name}
                    title={credit.character}
                  ></img>
                </div>
              )
          )
        )}
      </div>
    );
  }
}
