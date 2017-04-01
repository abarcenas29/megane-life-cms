import React from 'react'
import css from 'styled-components'

import {
  Rail,
  Button
} from 'semantic-ui-react'

const QuoteBoxContainer = css.div`
  float: ${props => props.align};
  width: ${props => `${props.width}%`}
  margin: 1em;
  position: relative;
`

export function Link ({contentState, entityKey, children}) {
  const url = contentState.getEntity(entityKey).getData()
  return (
    <a href={url}>{children}</a>
  )
}

export function QuoteBox ({contentState, block, ...props}) {
  const entity = contentState.getEntity(
    block.getEntityAt(0)
  )

  const data = entity.getData()
  const type = entity.getType()
  const {alignment, widthRange, quote} = data

  console.log(type)
  console.log(props)

  console.log('I am clicked')

  return (
    <QuoteBoxContainer
      align={alignment}
      width={widthRange}
      className='quotebox'
    >
      <Rail position={alignment}>
        <Button icon='trash' />
      </Rail>
      <p>{quote}</p>
    </QuoteBoxContainer>
  )
}
