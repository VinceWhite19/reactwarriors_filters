import React, { PureComponent } from "react";
import PropTypes from "prop-types";

export default class User extends PureComponent {
  static propTypes = {
    user: PropTypes.object.isRequired
  };
  render() {
    const { user } = this.props;
    return (
      <div>
        <img
          className="rounded-circle"
          width="40"
          src={`https://secure.gravatar.com/avatar/${user.avatar.gravatar.hash}.jpg?s=64"`}
          alt=""
        />
      </div>
    );
  }
}
