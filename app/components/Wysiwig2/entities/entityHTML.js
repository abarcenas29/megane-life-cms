import React from 'react'
import css from 'styled-components'

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
  const {alignment, widthRange, quote} = data

  return (
    <QuoteBoxContainer
      align={alignment}
      width={widthRange}
      className='quotebox'
    >
      <p>{quote}</p>
    </QuoteBoxContainer>
  )
}
