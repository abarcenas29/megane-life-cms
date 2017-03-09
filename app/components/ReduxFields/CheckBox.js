import React from 'react'
import { Checkbox } from 'semantic-ui-react'

function Toggle ({input, meta: { touched, error, valid }, ...props}) {
  return (
    <Checkbox
      checked={Boolean(input.value)}
      name={input.name}
      onChange={(event, value) => {
        input.value = !input.value
        input.onChange(input.value)
      }}
      {...props}
    />
  )
}

export default Toggle
