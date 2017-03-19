/**
*
* Wysiwig2
*
*/

import React, { Component } from 'react'
import Immutable, { fromJS } from 'immutable'
import css from 'styled-components'
import draftToHtml from 'draftjs-to-html'

import Draft, {
  Editor,
  EditorState,
  convertToRaw
} from 'draft-js'

import {
  getSelectionRange,
  getSelectionCoords,
  getSelectedBlockElement
} from './utils/getSelection'

import {
  Button,
  Menu
} from 'semantic-ui-react'

import {
  BlockToolbar,
  InlineToolbar
} from './tools/toolbars'

const Container = css.div`
  display: flex;
  flex-direction: column;
`

const EditorContainer = css.div`
  position: relative;
`

const TextArea = css.textarea`
  min-height: 50em;
`

// replace generic style to p instead of div
const blockRenderMap = Immutable.Map({
  unstyled: {
    element: 'p'
  }
})

const extBlockRenderMap = Draft.DefaultDraftBlockRenderMap.merge(blockRenderMap)

class Wysiwig2 extends Component { // eslint-disable-line react/prefer-stateless-function
  constructor (props) {
    super(props)

    this.state = {
      activeTab: 'editor',
      editorState: EditorState.createEmpty(),
      inLineStyle: fromJS({
        show: false,
        top: 0,
        left: 0
      })
    }

    this.handleActiveTab = this.handleActiveTab.bind(this)
    this.handleEditorOnChange = this.handleEditorOnChange.bind(this)
    this.updateBlockPosition = this.updateBlockPosition.bind(this)
    this.focusEditor = () => setTimeout(() => this.editor.focus(), 0)
  }

  handleEditorOnChange (editorState) {
    const selection = editorState.getSelection()
    const inLineStyle = this.state.inLineStyle.toJS()
    if (selection && !selection.isCollapsed()) {
      const selectionRange = getSelectionRange()
      const {offsetLeft, offsetTop} = getSelectionCoords(selectionRange, 'editor')

      inLineStyle.show = true
      inLineStyle.top = offsetTop
      inLineStyle.left = offsetLeft
    } else {
      inLineStyle.show = false
    }
    this.setState({
      editorState,
      inLineStyle: fromJS(inLineStyle)
    },
      this.updateBlockPosition
    )
  }

  updateBlockPosition () {
    const selectionRange = getSelectionRange()
    let sideToolbarOffsetTop = 0
    let selectedBlock
    if (selectionRange) {
      selectedBlock = getSelectedBlockElement(selectionRange)
    }

    if (selectedBlock) {
      const editorBounds = document.getElementById('editor').getBoundingClientRect()
      const blockBounds = selectedBlock.getBoundingClientRect()

      sideToolbarOffsetTop = (blockBounds.bottom - editorBounds.top) - 31
    }

    this.setState({
      selectedBlock,
      selectionRange,
      sideToolbarOffsetTop
    })
  }

  handleActiveTab (activeTab, callback) {
    this.setState({
      activeTab
    }, callback)
  }

  render () {
    const {
      activeTab,
      editorState,
      inLineStyle,
      selectedBlock,
      sideToolbarOffsetTop
    } = this.state
    const { top, left, show } = inLineStyle.toJS()

    const contentState = editorState.getCurrentContent()
    const JSONEntity = JSON.stringify(convertToRaw(contentState), null, 2)
    const HTML = draftToHtml(convertToRaw(contentState))
    return (
      <Container>
        <Menu tabular>
          <Menu.Item
            link
            active={(activeTab === 'editor')}
            onClick={() => {
              this.handleActiveTab('editor', this.focusEditor)
            }}>
            Editor
          </Menu.Item>
          <Menu.Item
            link
            onClick={() => this.handleActiveTab('preview')}
            active={(activeTab === 'preview')}>
            Preview
          </Menu.Item>
          <Menu.Item
            link
            onClick={() => this.handleActiveTab('debug')}
            active={(activeTab === 'debug')}>
            Debug
          </Menu.Item>
        </Menu>
        {
          activeTab === 'editor' &&
          <EditorContainer className='article-body' id='editor'>
            {
              selectedBlock &&
              <BlockToolbar
                top={sideToolbarOffsetTop}
              />
            }
            {
              show &&
              <InlineToolbar top={top} left={left} />
            }
            <Editor
              editorState={editorState}
              onChange={this.handleEditorOnChange}
              blockRenderMap={extBlockRenderMap}
              ref={editor => { this.editor = editor }}
            />
          </EditorContainer>
        }
        {
          activeTab === 'preview' &&
          <div className='article-body' dangerouslySetInnerHTML={{__html: HTML}} />
        }
        {
          activeTab === 'debug' &&
          <TextArea value={JSONEntity} disabled />
        }
      </Container>
    )
  }
}

export default Wysiwig2
