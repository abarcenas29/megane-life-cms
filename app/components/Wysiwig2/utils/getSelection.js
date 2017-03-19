export function getSelectionRange () {
  const selection = window.getSelection()
  if (selection.rangeCount === 0) return null
  // select at the first line?
  return selection.getRangeAt(0)
}

export function getSelectedBlockElement (range) {
  let node = range.startContainer
  do {
    const nodeIsDataBlock = node.getAttribute
      ? node.getAttribute('data-block')
      : null
    if (nodeIsDataBlock) return node
    node = node.parentNode
  } while (node !== null)

  return null
}

export function getSelectionCoords (selectionRange, id) {
  // if (!selectionRange) return null

  const editorBounds = document.getElementById(id).getBoundingClientRect()
  const rangeBounds = selectionRange.getBoundingClientRect()

  const rangeWidth = rangeBounds.right - rangeBounds.left

  // const rangeHeight= rangeBounds.bottom - rangeBounds.top
  const offsetLeft = (rangeBounds.left - editorBounds.left) + (rangeWidth / 2) - 80
  const offsetTop = rangeBounds.top - editorBounds.top + 20

  return { offsetLeft, offsetTop }
}
