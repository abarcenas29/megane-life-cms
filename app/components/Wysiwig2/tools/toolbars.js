import React from 'react'
import css from 'styled-components'

import {
  Button,
  Icon,
  Label,
  Menu,
  Popup,
  Dropdown
} from 'semantic-ui-react'

const BlockButtonContainer = css.div`
  position: absolute;
  top: ${props => props.top}px;
  left: -90px;
`

const InlineToolbarContainer = css.div`
  position: absolute !important;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
`

export function BlockToolbar ({
  top,
  editorState,
  blockOnChange
}) {
  const selection = editorState.getSelection()
  const blockType = editorState.getCurrentContent()
                                .getBlockForKey(selection.getStartKey())
                                .getType()
  return (
    <BlockButtonContainer top={top}>
      <Button.Group
        color='orange'
        basic
      >
        <Button icon='image' />
        <Popup
          trigger={<Button icon='bars' />}
          hideOnScroll
          hoverable
          position='top right'
        >
          <Popup.Content>
            <Menu compact size='small' secondary>
              <Menu.Item>
                <Dropdown
                  placeholder='Paragraph'
                  simple
                  selection
                  defaultValue={blockType}
                  scrolling
                  onChange={blockOnChange}
                  onMouseDown={e => e.preventDefault()}
                  options={[
                    {text: 'Heading 1', value: 'header-one'},
                    {text: 'Heading 2', value: 'header-two'},
                    {text: 'Heading 3', value: 'header-three'},
                    {text: 'Heading 4', value: 'header-four'},
                    {text: 'Heading 5', value: 'header-five'},
                    {text: 'Heading 6', value: 'header-six'},
                    {text: 'Default', value: 'unstyled'}
                  ]}
                />
              </Menu.Item>
              <Menu.Item
                link
                onMouseDown={e => {
                  // this prevents the button to be in-focus
                  e.preventDefault()
                }}
                onClick={e => {
                  e.stopImmediatePropagation()
                }}>
                <Icon name='ordered list' color='orange' />
              </Menu.Item>
              <Menu.Item link>
                <Icon name='unordered list' color='orange' />
              </Menu.Item>
              <Menu.Item link>
                <Icon name='quote left' color='orange' />
              </Menu.Item>
            </Menu>
          </Popup.Content>
        </Popup>

      </Button.Group>
    </BlockButtonContainer>
  )
}

export function InlineToolbar ({top, left, inLineStyle}) {
  return (
    <InlineToolbarContainer
      top={top}
      left={left}
    >
      <Label
        color='orange'
      >
        <Button.Group color='orange' size='tiny'>
          <Button
            onMouseDown={(e) => {
              e.preventDefault()
            }}
            onClick={() => inLineStyle('BOLD')}
            icon='bold'
          />
          <Button
            onMouseDown={(e) => {
              e.preventDefault()
            }}
            onClick={() => inLineStyle('ITALIC')}
            icon='italic'
          />
          <Button
            onMouseDown={(e) => {
              e.preventDefault()
            }}
            onClick={() => inLineStyle('UNDERLINE')}
            icon='underline'
          />
          <Button icon='strikethrough' />
          <Button
            onMouseDown={(e) => {
              e.preventDefault()
            }}
            icon='code'
            onClick={() => inLineStyle('CODE')}
          />
        </Button.Group>
        {'|'}
        <Button.Group color='orange'>
          <Button icon='linkify' />
          <Button icon='unlinkify' />
        </Button.Group>
      </Label>
    </InlineToolbarContainer>
  )
}
