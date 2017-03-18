/**
*
* DraftJs
*
*/

import React from 'react'
import css from 'styled-components'

import {
  Button,
  Modal,
  Input
} from 'semantic-ui-react'

import {
  CompositeDecorator,
  Editor,
  EditorState,
  Modifier,
  RichUtils,
  convertFromRaw,
  convertToRaw
} from 'draft-js'

const styles = {
  immutable: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: '2px 0'
  },
  mutable: {
    backgroundColor: 'rgba(204, 204, 255, 1.0)',
    padding: '2px 0'
  },
  segmented: {
    backgroundColor: 'rgba(248, 222, 126, 1.0)',
    padding: '2px 0'
  }
}

const Container = css.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const EditorContainer = css.div`
  min-height: 10em;

  &:focus {
    border: 1px solid #E0E0E0;
  }
`

const ToolbarContainer = css.div`
  display: flex;
  margin-bottom: 1em;
`

const TextArea = css.textarea`
  height: 20em;
`

const rawContent = {
  blocks: [
    {
      text: (
        'This is an "immutable" entity: Superman. Deleting any ' +
        'characters will delete the entire entity. Adding characters ' +
        'will remove the entity from the range.'
      ),
      type: 'unstyled',
      entityRanges: [{offset: 31, length: 8, key: 'first'}]
    },
    {
      text: '',
      type: 'unstyled'
    },
    {
      text: (
        'This is a "mutable" entity: Batman. Characters may be added ' +
        'and removed.'
      ),
      type: 'unstyled',
      entityRanges: [{offset: 28, length: 6, key: 'second'}]
    },
    {
      text: '',
      type: 'unstyled'
    },
    {
      text: (
        'This is a "segmented" entity: Green Lantern. Deleting any ' +
        'characters will delete the current "segment" from the range. ' +
        'Adding characters will remove the entire entity from the range.'
      ),
      type: 'unstyled',
      entityRanges: [{offset: 30, length: 13, key: 'third'}]
    }
  ],

  entityMap: {
    first: {
      type: 'TOKEN',
      mutability: 'IMMUTABLE'
    },
    second: {
      type: 'TOKEN',
      mutability: 'MUTABLE'
    },
    third: {
      type: 'TOKEN',
      mutability: 'SEGMENTED'
    }
  }
}

class DraftJs extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor (props, context) {
    super(props, context)

    this._focusEditor = this._focusEditor.bind(this)
    this._editorOnChange = this._editorOnChange.bind(this)
    this._keyCommands = this._keyCommands.bind(this)
    this.getSelectionValue = this.getSelectionValue.bind(this)

    const decorator = new CompositeDecorator([
      {
        strategy: findLinkEntities,
        component: Link
      }
    ])

    const blocks = convertFromRaw(rawContent)

    this.state = {
      editorState: EditorState.createWithContent(blocks, decorator),
      linkModal: false
    }

    // Controls
    this._onInlineStyleClick = this._onInlineStyleClick.bind(this)
    // Modal
    this.handleModalLinkOpen = this._handleModalLinkOpen.bind(this)
    this.handleModalLinkClose = this._handleModalLinkClose.bind(this)
    this.LinkModal = this.LinkModal.bind(this)
    this.createLink = this._createLink.bind(this)
  }

  _focusEditor () {
    this.editor.focus()
  }

  _editorOnChange (editorState) {
    console.log(window.getSelection())
    this.setState({
      editorState
    })
  }

  _keyCommands (command) {
    /**
     * Command Params
     * built in const command
     */
    const editorState = this.state.editorState
    // get the new state from the editor state
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      // pass the new modified state to the editorState
      this._editorOnChange(newState)
      return 'Handled'
    }
    return 'not-handled'
  }

  /**
   * Editor Commands
   */
  _onInlineStyleClick (style) {
    const editorState = this.state.editorState
    this._editorOnChange(RichUtils.toggleInlineStyle(editorState, style))
  }

  getSelectionValue () {
    /**
     * Retrives any links (Entity) and display them in the input
     *
     * process:
     * 1. get the editor state
     * 2. get the block in the state where the selection (cursor) is at
     * 3. checks if the selection is inbetween non conforming scope (ul, li etc...)
     * 4. if not get the content state of the editor
     * 5. get the key of the block on where is the selector
     * 6. get the position where the selection begin
     * 7. get that Block from the content using the key from (5)
     * 8. fetch the entity stored in that block
     * 9. if there's an entity. Get that value from the content state
     * 10. pass the value to the state - in this case the input box -.
     */
    const editorState = this.state.editorState
    const selection = editorState.getSelection()
    if (!selection.isCollapsed()) {
      const contentState = editorState.getCurrentContent()
      const startKey = selection.getStartKey()
      const startOffset = selection.getStartOffset()
      const blockWithLinkAtBegining = contentState.getBlockForKey(startKey)
      const linkKey = blockWithLinkAtBegining.getEntityAt(startOffset)

      let url = ''
      if (linkKey) {
        const linkInstance = contentState.getEntity(linkKey)
        url = linkInstance.getData().url
      }

      this.setState({
        urlValue: url
      })
    }
  }

  _createLink () {
    /**
     * Created a new entity
     *
     * Process
     * 1. Get the state and the value to be passed in the entity
     * 2. Get the current state of the EditorState
     * 3. Create the entity (injunction with the stateContent). LINK is just a name. Pass the type and the value to store
     * 4. Get the latest entity key added
     * 5. Create a new Editorial state given the new added Entities. Override the currentContent object.
     * 6. Set the Anchor link to the selected text
     */
    const {editorState, urlValue} = this.state
    const contentState = editorState.getCurrentContent()
    const contentStateWithEntity = contentState.createEntity(
      'LINK', // this can be anything. Just an identifier
      'MUTABLE',
      {url: urlValue}
    )
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity
    })
    this.setState({
      editorState: RichUtils.toggleLink(
        newEditorState,
        newEditorState.getSelection(),
        entityKey
      ),
      linkModal: false
    })
  }

  /**
   * Entity Example
   */

  /**
   * Modal
   */
  _handleModalLinkOpen () {
    this.setState({linkModal: true}, this.getSelectionValue)
  }

  _handleModalLinkClose () {
    this.setState({linkModal: false})
  }

  LinkModal () {
    return (
      <Modal
        trigger={<Button icon='linkify' onClick={this.handleModalLinkOpen} />}
        open={this.state.linkModal}
        onClose={this.handleModalLinkClose}
        size='small'>
        <Modal.Header>
          <p>Link</p>
        </Modal.Header>
        <Modal.Content>
          <Input fluid>
            <input
              onChange={(e) => this.setState({urlValue: e.target.value})}
              value={this.state.urlValue}
              ref={input => { this.input = input }}
            />
          </Input>
          <Button onClick={this.createLink}>Confirm</Button>
        </Modal.Content>
      </Modal>
    )
  }

  render () {
    return (
      <Container>
        <ToolbarContainer>
          <Button.Group>
            <Button
              icon='bold'
              onClick={() => this._onInlineStyleClick('BOLD')}
            />
            <Button
              icon='italic'
              onClick={() => this._onInlineStyleClick('ITALIC')}
            />
            <Button
              icon='text cursor'
              onClick={this.getSelectionValue}
            />
            {this.LinkModal()}
            <Button
              icon='unlinkify'
            />
          </Button.Group>
        </ToolbarContainer>
        <EditorContainer onClick={this._focusEditor} id='editor'>
          <Editor
            handleKeyCommand={this._keyCommands}
            editorState={this.state.editorState}
            onChange={this._editorOnChange}
            ref={editor => {
              this.editor = editor
            }}
          />
        </EditorContainer>
        <TextArea
          disabled
          value={JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()), null, 4)}
        />
      </Container>
    )
  }
}

function findLinkEntities (contentBlock, callback, contentState) {
  // loop through the blocks
  contentBlock.findEntityRanges(
    character => {
      // check if there's an entity key in the block
      const entityKey = character.getEntity()
      // if yes and it returns true, the component will render
      return (entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK')
    },
    callback
  )
}

function Link ({contentState, entityKey, children}) {
  // get the value stored in the entity
  const url = contentState.getEntity(entityKey).getData()
  return (
    <a href={url}>{children}</a>
  )
}

function getDecoratedStyle (mutability) {
  switch (mutability) {
    case 'IMMUTABLE': return styles.immutable
    case 'MUTABLE': return styles.mutable
    case 'SEGMENTED': return styles.segmented
    default: return null
  }
}

function TokenSpan ({contentState, entityKey, offsetKey, children}) {
  const style = getDecoratedStyle(
    contentState.getEntity(entityKey).getMutability()
  )
  return (
    <b data-offset-key={offsetKey} style={style}>
      {children}
    </b>
  )
}

function getEntityStrategy (mutalbility) {
  return function (contentBlock, callback, contentState) {
    contentBlock.findEntityRanges(
      (character) => {
        const entityKey = character.getEntity()
        if (entityKey === null) return false
        return contentState.getEntity(entityKey).getMutability() === mutalbility
      },
      callback
    )
  }
}

export default DraftJs
