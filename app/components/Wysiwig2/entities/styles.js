import css from 'styled-components'

export const LinkStyle = css.a`
  color: pink;
  background-color: blue;
`
export const QuoteBoxContainer = css.div`
  float: ${props => props.align};
  width: ${props => `${props.width}%`}
  margin: 1em;
  position: relative;
`

export const QuoteBoxParagraph = css.p`
  margin: 0.5em 0;
`
