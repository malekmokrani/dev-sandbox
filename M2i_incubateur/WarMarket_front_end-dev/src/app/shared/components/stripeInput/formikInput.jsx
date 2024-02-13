import React from "react";
import { isNil } from "ramda";

const FormikInput = ({
  label,
  placeholder,
  type,
  className,
  classes,
  errComponent,
  error,
  helperText,
  field: { name, validateField, value },
  form: { setFieldValue, setFieldTouched, errors, touched },
  ...props
}) => {
  // const fieldError = getIn(errors, name);
  // const showError = getIn(touched, name) && !!fieldError;
  // console.log({ fieldError, showError });

  return (
    <div className="field">
      <label className="label">{label}</label>
      <input
        validate={validateField}
        className={className}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={e => {
          setFieldTouched(name, true, true);
          setFieldValue(name, e.target.value);
        }}
        onBlur={e => {
          setFieldTouched(name, true, true);
          setFieldValue(name, e.target.value);
        }}
        type={isNil(type) ? `text` : type}
      />
      {/* <span className="icon is-medium is-left">
        <i className="fas fa-envelope" />
      </span> */}
      {helperText ? <p className="help is-info">{helperText}</p> : null}
      {errors[name] && touched[name] ? (
        <p className="help is-error">{errors[name]}</p>
      ) : null}
    </div>
  );
};

export default  FormikInput