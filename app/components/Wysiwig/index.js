/**
*
* Wysiwig
*
*/

import React, { Component } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import {
  EditorState,
  convertFromHTML,
  ContentState
} from 'draft-js'
import css from 'styled-components'

import './../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const toolbar = {
  options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list',
    'link', 'image', 'remove', 'history'],
  fontFamily: {
    options: ['Open Sans', 'Arial']
  },
  inline: {
    options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace']
  }
}

class Wysiwig extends Component {
  constructor (props, context) {
    super(props, context)

    const sample = `<p>I'm a block</p>`
    const blockHTML = convertFromHTML(sample)
    console.log(blockHTML)
    const state = ContentState.createFromBlockArray(
      blockHTML.contentBlocks,
      blockHTML.entityMap
    )

    this.state = {
      editorState: EditorState.createWithContent(state)
    }

    this.editorOnChange = this.editorOnChange.bind(this)
  }

  editorOnChange (editorState) {
    this.setState({editorState: editorState})
  }

  render () {
    return (
      <div>
        <Editor
          toolbarOnFocus
          editorState={this.state.editorState}
          toolbar={toolbar}
          onEditorStateChange={this.editorOnChange}
          toolbarClassName='demo-toolbar-absolute'
        />
      </div>
    )
  }
}

export default Wysiwig
