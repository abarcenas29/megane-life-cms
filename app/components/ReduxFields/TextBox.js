import React from 'react'
import { TextArea } from 'semantic-ui-react'

function TextBox ({input, meta: { touched, error, valid }, ...props}) {
  return (
    <TextArea
      name={input.name}
      value={input.value}
      {...props}
    />
  )
}

export default TextBox
