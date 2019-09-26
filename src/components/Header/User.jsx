import React, { PureComponent } from "react";

export default class User extends PureComponent {
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
