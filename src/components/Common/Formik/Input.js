import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { FormGroup} from 'reactstrap';
import TextError from './TextError';

export default function Input (props) {
  const { label, name, ...rest } = props
  return (
    <FormGroup>
      <label htmlFor={name} className="text-bold">{label}</label>
      <Field className="form-control" id={name} name={name} {...rest} />
      <ErrorMessage component={TextError} name={name} />
    </FormGroup>
  )
}