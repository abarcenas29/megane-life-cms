/**
*
* Wysiwig2
*
*/

import React, { Component } from 'react'
import Immutable from 'immutable'
import css from 'styled-components'
import draftToHtml from 'draftjs-to-html'

import Draft, {
  Editor,
  EditorState,
  convertToRaw
} from 'draft-js'

import {
  getSelectionRange,
  getSelectionCoords
} from './utils/getSelection'

import {
  Menu
} from 'semantic-ui-react'

const Container = css.div`
  display: flex;
  flex-direction: column;
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
      editorState: EditorState.createEmpty()
    }

    this.handleActiveTab = this.handleActiveTab.bind(this)
    this.handleEditorOnChange = this.handleEditorOnChange.bind(this)
    this.focusEditor = () => setTimeout(() => this.editor.focus(), 0)
  }

  handleEditorOnChange (editorState) {
    const selection = editorState.getSelection()
    if (!selection.isCollapsed()) {
      const selectionRange = getSelectionRange()
      const selectionCoords = getSelectionCoords(selectionRange)

      console.log(selectionCoords)
    }
    this.setState({editorState})
  }

  handleActiveTab (activeTab, callback) {
    this.setState({
      activeTab
    }, callback)
  }

  render () {
    const {activeTab, editorState} = this.state
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
          <div className='article-body' id='editor'>
            <Editor
              editorState={editorState}
              onChange={this.handleEditorOnChange}
              blockRenderMap={extBlockRenderMap}
              ref={editor => { this.editor = editor }}
            />
          </div>
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
