import React, { Component } from "react";
import { Spinner } from "reactstrap";
import CallApi from "../../../api/api";

export default class MovieVideos extends Component {
  state = {
    videos: [],
    loading: true
  };
  getMovieVideos = async () => {
    try {
      const data = await CallApi.get(
        `/movie/${this.props.match.params.id}/videos`,
        {
          params: { language: "ru-RU" }
        }
      );
      const result = data.results;
      this.setState({
        videos: result,
        loading: false
      });
    } catch (err) {
      console.log(err);
    }
  };

  componentDidMount() {
    this.getMovieVideos();
  }
  render() {
    const { videos, loading } = this.state;
    return (
      <div className="mt-4 d-flex flex-wrap">
        {loading ? (
          <Spinner
            style={{ width: "5rem", height: "5rem", margin: "0 auto" }}
          />
        ) : videos.length === 0 ? (
          <h2>Видео отсутствуют</h2>
        ) : (
          videos.map(video => (
            <div className="video col-6" key={video.id}>
              <iframe
                width="420"
                height="315"
                title={video.name}
                allowFullScreen="1"
                src={`https://www.youtube.com/embed/${video.key}`}
              ></iframe>
            </div>
          ))
        )}
      </div>
    );
  }
}
