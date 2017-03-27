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

export function mediaBlockRenderExport () {
  return {
    atomic: block => {
      let data = block.getData()
      console.log(data)
      return QuoteBox
    }
  }
}

export default mediaBlockRender
