import React, { Fragment } from "react";
import LoginForm from "./LoginForm";
import { Modal, ModalBody } from "reactstrap";
import AppContextHOC from "../../HOC/AppContextHOC";

const Login = ({ toggleModal, showModal }) => {
  return (
    <Fragment>
      <button className="btn btn-success" type="button" onClick={toggleModal}>
        Login
      </button>
      <Modal isOpen={showModal} toggle={toggleModal}>
        <ModalBody>
          <LoginForm />
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default AppContextHOC(Login);
