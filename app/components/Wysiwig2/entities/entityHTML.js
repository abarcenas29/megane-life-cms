import React from 'react'
import css from 'styled-components'
import aniListImage from 'images/aniList.png'

import {
  Icon,
  Image
} from 'semantic-ui-react'

import {
  QuoteBoxContainer,
  QuoteBoxParagraph
} from './styles'

const LinkStyle = css.a`
  display: inline;
  text-decoration-style: ''
`

export function Link ({contentState, entityKey, children}) {
  const {url, type} = contentState
    .getEntity(entityKey)
    .getData()

  let iconName = null
  let decorationStyle = 'underline'
  switch (type) {
    case 'aniList':
      decorationStyle = 'dashed'
      break
    case 'inside-link':
      iconName = 'linkify'
      break
    case 'twitter':
      iconName = 'twitter'
      break
    case 'facebook':
      iconName = 'facebook'
      break
    case 'outside-link':
      iconName = 'globe'
      break
  }

  return (
    <span>
      {
        iconName !== 'aniList' &&
        <Icon name={iconName} />
      }
      <LinkStyle linkStyle={decorationStyle} href={url}>
        {children}
      </LinkStyle>
    </span>
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
      <QuoteBoxParagraph>{quote}</QuoteBoxParagraph>
    </QuoteBoxContainer>
  )
}
