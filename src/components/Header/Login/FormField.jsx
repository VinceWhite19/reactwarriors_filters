import React from "react";

const Field = props => {
  const {
    id,
    labelText,
    type,
    placeholder,
    name,
    value,
    onChange,
    onBlur,
    error
  } = props;

  return (
    <div className="form-group">
      <label htmlFor={id}>{labelText}</label>
      <input
        type={type}
        className={error ? "form-control is-invalid" : "form-control"}
        id={id}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        error={error}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default Field;
