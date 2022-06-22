import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'
import { FormGroup } from '@material-ui/core'

function Textarea (props) {
  const { label, name, ...rest } = props
  return (
    <FormGroup>
      <label htmlFor={name} className="text-bold">{label}</label>
      <Field as='textarea' id={name} name={name} {...rest} className="form-control"/>
      <ErrorMessage component={TextError} name={name} />
    </FormGroup>
  )
}

export default Textarea
