import {
  Link,
  QuoteBox
} from './entityHTML.js'

import {
  CompositeDecorator
} from 'draft-js'

const decorators = new CompositeDecorator([
  {
    strategy: entityStrategy('LINK'),
    component: Link
  },
  {
    strategy: entityStrategy('QUOTE'),
    component: QuoteBox
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
