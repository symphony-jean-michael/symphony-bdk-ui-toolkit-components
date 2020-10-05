import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

const ValidationPropTypes = {
  validator: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.arrayOf(PropTypes.func),
  ]),
  errorMessage: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  onValidationChanged: PropTypes.func,
};

const Validation = ({
  validator,
  errorMessage,
  onValidationChanged,
  children,
}) => {
  const [errors, setErrors] = useState([]);
  const validate = async (value: string): Promise<string[]> => {
    let errors;
    let valid = true;
    const errorMessages = [];
    if (validator) {
      if (validator instanceof Array) {
        const errorsMap = await Promise.all(
          validator.map((validator) => validator(value))
        );
        errors = errorsMap.reduce((prev, curr) => ({ ...prev, ...curr }), {});
      } else {
        errors = await validator(value);
      }
      valid = !errors || isEmpty(errors);
      if (onValidationChanged) {
        onValidationChanged(valid);
      }
    }
    if (!valid && errorMessage) {
      Object.entries(errors).forEach(([errorId, errorVal]) => {
        if (errorVal) {
          errorMessages.push(errorMessage[errorId]);
        }
      });
    }
    setErrors(errorMessages);
    return errorMessages;
  };

  const childrenWithValidation = React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      onChange: validate,
    });
  });

  return (
    <>
      {childrenWithValidation}
      {errors ? (
        <div className="tk-error">
          <ul>
            {errors.map((error, index) => (
              <li key={index} className="tk-error__item">
                {error}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  );
};

Validation.prototype = ValidationPropTypes;

export default Validation;
