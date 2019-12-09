import React, { Component } from "react";
import { Spinner } from "reactstrap";
import CallApi, { IMG_URL } from "../../../api/api";

export default class MovieCredits extends Component {
  state = {
    credits: [],
    loading: true
  };
  getMovieCredits = async () => {
    try {
      const data = await CallApi.get(
        `/movie/${this.props.match.params.id}/credits`
      );
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
          <Spinner />
        ) : (
          credits.map(
            credit =>
              credit.profile_path && (
                <div className="actor" key={credit.id}>
                  <img
                    src={`${IMG_URL}${credit.profile_path}`}
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
