import React, { Fragment } from "react";
import PropTypes from "prop-types";

const FormButton = ({ submitting, onLogin, error }) => {
  return (
    <Fragment>
      <button
        type="submit"
        className="btn btn-lg btn-primary btn-block"
        onClick={onLogin}
        disabled={submitting}
      >
        Вход
      </button>
      {error && <div className="invalid-feedback text-center">{error}</div>}
    </Fragment>
  );
};

FormButton.propTypes = {
  submitting: PropTypes.bool.isRequired,
  onLogin: PropTypes.func.isRequired,
  error: PropTypes.string
};
export default FormButton;
