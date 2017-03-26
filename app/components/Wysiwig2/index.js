/**
*
* Wysiwig2
*
*/

import React, { Component } from 'react'
import { fromJS } from 'immutable'
import css from 'styled-components'
import { stateToHTML } from 'draft-js-export-html'

import decorators from './entities/decorators'

import {
  Editor,
  EditorState,
  convertToRaw,
  convertFromRaw,
  RichUtils
} from 'draft-js'

import {
  getSelectionRange,
  getSelectionCoords,
  getSelectedBlockElement
} from './utils/getSelection'

import {
  Menu
} from 'semantic-ui-react'

import {
  BlockToolbar,
  InlineToolbar
} from './tools/toolbars'

import blockRenderMap from './blockrender/blockRenderMap'

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

/** DEMO */

const RawEntity = {
  'entityMap': {
    '0': {
      'type': 'LINK',
      'mutability': 'MUTABLE',
      'data': {
        'url': 'asdasd'
      }
    }
  },
  'blocks': [
    {
      'key': '9f8oa',
      'text': 'saasd',
      'type': 'unstyled',
      'depth': 0,
      'inlineStyleRanges': [],
      'entityRanges': [
        {
          'offset': 0,
          'length': 5,
          'key': 0
        }
      ],
      'data': {}
    }
  ]
}

class Wysiwig2 extends Component { // eslint-disable-line react/prefer-stateless-function
  constructor (props) {
    super(props)

    const blocks = convertFromRaw(RawEntity)

    this.state = {
      activeTab: 'editor',
      editorState: EditorState.createEmpty(decorators),
      readOnly: false,
      sideToolbarOffsetTop: 0,
      inLineStyle: fromJS({
        show: false,
        top: 0,
        left: 0
      })
    }

    this.handleActiveTab = this.handleActiveTab.bind(this)

    this.handleEditorOnChange = this.handleEditorOnChange.bind(this)
    this.handleBlockStyleChange = this.handleBlockStyleChange.bind(this)
    this.handleInlineModal = this.handleInlineModal.bind(this)

    this.updateBlockPosition = this.updateBlockPosition.bind(this)
    this.updateInlineStyle = this.updateInlineStyle.bind(this)
    this.createEntity = this.createEntity.bind(this)
    this.removeEntity = this.removeEntity.bind(this)
    this.focusEditor = () => setTimeout(() => this.editor.focus(), 0)
  }

  handleEditorOnChange (editorState) {
    const selection = editorState.getSelection()
    const inLineStyle = this.state.inLineStyle.toJS()
    const selectionRange = getSelectionRange()
    if (!selection.isCollapsed()) {
      const coords = getSelectionCoords(selectionRange, 'editor')

      inLineStyle.show = true
      inLineStyle.top = (coords) ? coords.offsetTop : 0
      inLineStyle.left = (coords) ? coords.offsetLeft : 0
    } else {
      inLineStyle.show = false
      inLineStyle.top = 0
      inLineStyle.left = 0
    }
    this.setState({
      editorState,
      inLineStyle: fromJS(inLineStyle)
    },
      this.updateBlockPosition
    )
  }

  handleBlockStyleChange (e, dropdown) {
    const { value } = dropdown
    const { editorState } = this.state
    this.handleEditorOnChange(
      RichUtils.toggleBlockType(
        editorState,
        value
      )
    )
  }

  updateBlockPosition () {
    const selectionRange = getSelectionRange()
    let sideToolbarOffsetTop = this.state.sideToolbarOffsetTop
    let selectedBlock
    if (selectionRange) {
      selectedBlock = getSelectedBlockElement(selectionRange)
    }

    if (selectedBlock) {
      const editorBounds = document.getElementById('editor').getBoundingClientRect()
      const blockBounds = selectedBlock.getBoundingClientRect()

      sideToolbarOffsetTop = (blockBounds.bottom - editorBounds.top) - 30
    }

    this.setState({
      selectedBlock,
      selectionRange,
      sideToolbarOffsetTop
    })
  }

  updateInlineStyle (style) {
    const { editorState } = this.state
    this.handleEditorOnChange(RichUtils.toggleInlineStyle(editorState, style))
    this.focusEditor()
  }

  createEntity (entityName, data) {
    const { editorState } = this.state
    const contentState = editorState.getCurrentContent()

    const contentStateWithEntity = contentState.createEntity(
      entityName,
      'MUTABLE',
      data
    )

    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity
    })

    if (entityName === 'LINK') {
      this.setState({
        editorState: RichUtils.toggleLink(
          newEditorState,
          newEditorState.getSelection(),
          entityKey
        )
      }, this.focusEditor)
    } else {
      this.setState({
        editorState: RichUtils.toggleInlineStyle(
          newEditorState,
          entityKey
        )
      }, this.focusEditor)
    }
  }

  removeEntity (e) {
    e.preventDefault()
    const { editorState } = this.state
    const selection = editorState.getSelection()
    if (!selection.isCollapsed()) {
      this.setState({
        editorState: RichUtils.toggleLink(editorState, selection, null)
      }, this.focusEditor)
    }
  }

  handleActiveTab (activeTab, callback) {
    this.setState({
      activeTab
    }, callback)
  }

  handleInlineModal (readOnly) {
    this.setState({readOnly}, () => {
      if (!readOnly) {
        this.focusEditor()
      }
    })
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
    const HTML = stateToHTML(contentState)

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
          <Menu.Item
            link
            onClick={() => this.handleActiveTab('debug-html')}
            active={(activeTab === 'debug-html')}>
            Debug HTML
          </Menu.Item>
        </Menu>
        {
          activeTab === 'editor' &&
          <EditorContainer className='article-body' id='editor'>
            {
              selectedBlock && !show &&
              <BlockToolbar
                blockOnChange={this.handleBlockStyleChange}
                editorState={editorState}
                top={sideToolbarOffsetTop}
              />
            }
            {
              show &&
              <InlineToolbar
                handleInlineModal={this.handleInlineModal}
                inLineStyle={this.updateInlineStyle}
                createEntity={this.createEntity}
                removeEntity={this.removeEntity}
                top={top}
                left={left}
              />
            }
            <Editor
              editorState={editorState}
              onChange={this.handleEditorOnChange}
              blockRenderMap={blockRenderMap}
              ref={editor => { this.editor = editor }}
              onFocus={() => this.setState({readOnly: false}, this.focusEditor)}
              onBlur={() => this.setState({readOnly: true})}
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
        {
          activeTab === 'debug-html' &&
          <pre>{HTML}</pre>
        }
      </Container>
    )
  }
}

export default Wysiwig2
