import React, { Fragment } from "react";

const FormButton = props => {
  const { submitting, onLogin, error } = props;

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

export default FormButton;
