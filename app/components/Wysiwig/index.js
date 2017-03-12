/**
*
* Wysiwig
*
*/

import React, { Component } from 'react'
import { fromJS } from 'immutable'
import { Editor } from 'react-draft-wysiwyg'
import css from 'styled-components'

import './../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const toolbar = {
  options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list',
    'link', 'image', 'remove', 'history'],
  fontFamily: {
    options: ['Open Sans', 'Arial']
  }
}

class Wysiwig extends Component {
  constructor (props, context) {
    super(props, context)

    this.state = {
      editorState: fromJS({})
    }

    this.editorOnChange = this.editorOnChange.bind(this)
  }

  editorOnChange (editorState) {
    console.log(editorState.toJS())
    this.setState({editorState: editorState})
  }

  render () {
    return (
      <div>
        <Editor
          toolbar={toolbar}
          onEditorStateChange={this.editorOnChange}
        />
      </div>
    )
  }
}

export default Wysiwig
