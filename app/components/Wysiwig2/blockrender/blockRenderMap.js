import React from 'react'
import Immutable from 'immutable'
import {
  Header as SemanticHeader
} from 'semantic-ui-react'

function Header ({children, h, ...props}) {
  return (<SemanticHeader as={h} {...props}>{children}</SemanticHeader>)
}

const blockRenderMap = Immutable.Map({
  'header-one': {
    element: 'header',
    wrapper: <Header h='h1' {...this.props} />
  },
  'header-two': {
    element: 'header',
    wrapper: <Header h='h2' {...this.props} />
  },
  'header-three': {
    element: 'header',
    wrapper: <Header h='h3' {...this.props} />
  },
  'header-four': {
    element: 'header',
    wrapper: <Header h='h4' {...this.props} />
  },
  'header-five': {
    element: 'header',
    wrapper: <Header h='h5' {...this.props} />
  },
  'header-six': {
    element: 'header',
    wrapper: <Header h='h6' {...this.props} />
  },
  'unordered-list-item': {
    element: 'ul'
  },
  'ordered-list-item': {
    element: 'ol'
  },
  'blockquote': {
    element: 'blockquote'
  },
  atomic: {
    element: 'figure'
  },
  unstyled: {
    element: 'p'
  }
})

export default blockRenderMap
