import React, { Component, Fragment } from "react";
import LoginForm from "./LoginForm";
import { Modal, ModalBody } from "reactstrap";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false
    };
  }

  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal
    }));
  };

  render() {
    return (
      <Fragment>
        <button
          className="btn btn-success"
          type="button"
          onClick={this.toggleModal}
        >
          Login
        </button>
        <Modal isOpen={this.state.showModal} toggle={this.toggleModal}>
          <ModalBody>
            <LoginForm
              updateUser={this.props.updateUser}
              updateSessionId={this.props.updateSessionId}
            />
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}
