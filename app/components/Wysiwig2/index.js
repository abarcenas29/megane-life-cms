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
import mediaBlockRender from './blockrender/blockRenderFn'

import {
  AtomicBlockUtils,
  Editor,
  EditorState,
  Modifier,
  RichUtils,
  convertToRaw
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

import ModalQuoteBoxSettings from './tools/modals/QuoteBox'

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

class Wysiwig2 extends Component { // eslint-disable-line react/prefer-stateless-function
  constructor (props) {
    super(props)

    this.state = {
      activeTab: 'editor',
      editorState: EditorState.createEmpty(decorators),
      readOnly: false,
      sideToolbarOffsetTop: 0,
      quoteBoxModalState: false,
      inLineStyle: fromJS({
        show: false,
        top: 0,
        left: 0
      }),
      entityToolBox: false,
      entityName: '',
      entityData: fromJS({}),
      entityInstance: null
    }

    this.handleActiveTab = this.handleActiveTab.bind(this)

    this.handleEditorOnChange = this.handleEditorOnChange.bind(this)
    this.handleInlineToolbar = this.handleInlineToolbar.bind(this)
    this.handleEntityToolbar = this.handleEntityToolbar.bind(this)
    this.handleBlockStyleChange = this.handleBlockStyleChange.bind(this)
    this.handleInlineModal = this.handleInlineModal.bind(this)
    this.handleKeyCommand = this.handleKeyCommand.bind(this)

    this.updateBlockPosition = this.updateBlockPosition.bind(this)
    this.updateInlineStyle = this.updateInlineStyle.bind(this)
    this.createEntity = this.createEntity.bind(this)
    this.removeEntity = this.removeEntity.bind(this)

    // Entity Controls
    this.handleEntityModals = this.handleEntityModals.bind(this)

    this.createAtomicBlock = this.createAtomicBlock.bind(this)
    this.editAtomicBlock = this.editAtomicBlock.bind(this)
    // this.removeAtomicBlock = this.removeAtomicBlock.bind(this)
    this.focusEditor = () => setTimeout(() => this.editor.focus(), 0)
  }

  handleEditorOnChange (editorState) {
    this.handleInlineToolbar(editorState)
    this.handleEntityToolbar(editorState)

    this.setState({
      editorState
    },
      this.updateBlockPosition
    )
  }

  handleInlineToolbar (editorState) {
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
      inLineStyle: fromJS(inLineStyle)
    })
  }

  handleEntityToolbar (editorState) {
    const selectionState = editorState.getSelection()
    const contentState = editorState.getCurrentContent()
    const blockKey = selectionState.getStartKey()

    const contentBlock = contentState.getBlockForKey(blockKey)

    if (contentBlock.getEntityAt(0) !== null) {
      const entity = contentState.getEntity(contentBlock.getEntityAt(0))
      const data = entity.getData()
      const type = entity.getType()

      this.setState({
        entityToolBox: true,
        entityData: fromJS(data),
        entityName: type,
        entityKey: contentBlock.getEntityAt(0)
      })
    } else {
      this.setState({
        entityToolBox: false,
        entityData: fromJS({}),
        entityName: '',
        entityKey: null
      })
    }
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
          entityName
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

  createAtomicBlock (entityName, data) {
    const { editorState } = this.state
    const contentState = editorState.getCurrentContent()

    const contentStateWithEntity = contentState.createEntity(
      entityName,
      'IMMUTABLE',
      data
    )

    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
    const newEditorState = EditorState.set(
      editorState,
      {currentContent: contentStateWithEntity}
    )

    this.setState({
      editorState: AtomicBlockUtils.insertAtomicBlock(
        newEditorState,
        entityKey,
        ' '
      )
    }, this.focusEditor)
  }

  editAtomicBlock (state) {
    const contentState = this.state.editorState.getCurrentContent()
    const { entityKey } = this.state

    contentState.mergeEntityData(
      entityKey,
      { ...state }
    )
  }

  removeAtomicBlock () {
    /**
     * This function doesn't work. Will need to revisit later.
     */
    const { editorState } = this.state
    const selectionState = editorState.getSelection()

    const contentState = editorState.getCurrentContent()

    const newContentState = Modifier.applyEntity(
      contentState,
      selectionState,
      null
    )

    const newEditorState = EditorState.set(
      this.state.editorState,
      {currentContent: newContentState}
    )
    this.handleEditorOnChange(newEditorState)
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

  handleKeyCommand (command) {
    const { editorState } = this.state
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      this.handleEditorOnChange(newState)
      return true
    }
    return false
  }

  /**
   * Entity Controls
   */
  handleEntityModals (modal, status) {
    const state = {}
    state[modal] = status
    this.setState({
      ...state
    })
  }

  render () {
    const {
      activeTab,
      editorState,
      entityData,
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
                entityToolBox={this.state.entityToolBox}
                entityType={this.state.entityName}
                handleEntityModals={this.handleEntityModals}
                top={sideToolbarOffsetTop}
              />
            }
            {
              show &&
              <InlineToolbar
                entityData={entityData}
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
              blockRendererFn={mediaBlockRender}
              blockRenderMap={blockRenderMap}
              handleKeyCommand={this.handleKeyCommand}
              spellCheck
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
        <ModalQuoteBoxSettings
          open={this.state.quoteBoxModalState}
          onClose={() => this.handleEntityModals('quoteBoxModalState', false)}
          entityData={entityData}
          editAtomicBlock={this.editAtomicBlock}
          createAtomicBlock={this.createAtomicBlock}
        />
      </Container>
    )
  }
}

export default Wysiwig2
