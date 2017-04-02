import { QuoteBox } from './../entities/entityHTML.js'

function mediaBlockRender (block) {
  if (block.getType() === 'atomic') {
    return {
      component: QuoteBox,
      editable: false
    }
  }
  return null
}

export default mediaBlockRender
