import React from 'react'

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

  console.log(data)
  console.log(entity.toJS())
  console.log(type)
  console.log(props)

  return (
    <div className='quotebox'>
      <p>This is a quote box</p>
    </div>
  )
}
