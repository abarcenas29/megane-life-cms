import React from 'react'
import { Input as SemanticInput } from 'semantic-ui-react'

function Input ({input, meta: { touched, error, valid }, ...props}) {
  return (
    <SemanticInput
      error={touched && valid}
      {...input}
      {...props}
    />
  )
}

export default Input
