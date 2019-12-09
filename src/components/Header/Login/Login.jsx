import React, { Fragment, useState } from "react";
import LoginForm from "./LoginForm";
import { Modal, ModalBody } from "reactstrap";
import AppContextHOC from "../../HOC/AppContextHOC";

const Login = props => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Fragment>
      <button
        className="btn btn-success"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        Login
      </button>
      <Modal isOpen={isOpen} toggle={() => setIsOpen(!isOpen)}>
        <ModalBody>
          <LoginForm />
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default AppContextHOC(Login);
