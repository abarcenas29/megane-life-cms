export function getSelectionRange () {
  const selection = window.getSelection()
  if (selection.rangeCount === 0) return null
  // select at the first line?
  return selection.getRangeAt(0)
}

export function getSelectedBlockElement (range) {
  let node = range.start
  do {
    const nodeIsDataBlock = node.getAttribute
      ? node.getAttribute('data-block')
      : null
    if (nodeIsDataBlock) return node
    node = node.parentNode
  } while (node !== null)

  return null
}

export function getSelectionCoords (selectionRange) {
  const editorBounds = document.getElementById('editor').getBoundingClientRect()
  const rangeBounds = selectionRange.getBoundingClientRect()

  const rangeWidth = rangeBounds.right - rangeBounds.left

  // const rangeHeight= rangeBounds.bottom - rangeBounds.top
  const offsetLeft = (rangeBounds.left - editorBounds.left) + (rangeWidth / 2) - (72 / 2)
  const offsetTop = rangeBounds.top - editorBounds.top - 42

  return { offsetLeft, offsetTop }
}
