import React from 'react'
import { Dropdown } from 'semantic-ui-react'

function Select ({input, meta: { touched, error, valid }, ...props}) {
  let value = input.value

  if (props.multiple) {
    value = []

    if (input.value.size > 0) {
      value = input.value.toJS()
    }
  }

  return (
    <Dropdown
      {...props}
      value={value}
      onChange={(target, selected) => {
        input.onChange(selected.value)
      }}
      name={input.name}
      {...props}
    />
  )
}

export default Select
