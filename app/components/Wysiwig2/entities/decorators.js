import React from 'react'
import css from 'styled-components'
import {
  CompositeDecorator
} from 'draft-js'

const SpanPink = css.span`
  background-color: pink;
`

const decorators = new CompositeDecorator([
  {
    strategy: entityStrategy('LINK'),
    component: Link
  }
])

export default decorators

/**
 * Dependent Functions
 * */

function entityStrategy (strategy) {
  return function (contentBlock, callback, contentState) {
    contentBlock.findEntityRanges(
      character => {
        const entityKey = character.getEntity()
        return (entityKey !== null &&
          contentState.getEntity(entityKey).getType() === strategy)
      },
      callback
    )
  }
}

function Link ({contentState, entityKey, children}) {
  const url = contentState.getEntity(entityKey).getData()
  return (
    <a href={url}>{children}</a>
  )
}

function SpanColor ({children}) {
  return <SpanPink>{children}</SpanPink>
}