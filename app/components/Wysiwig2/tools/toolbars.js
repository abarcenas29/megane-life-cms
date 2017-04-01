import React from 'react'
import css from 'styled-components'

import {
  Button,
  Dropdown,
  Grid,
  Icon,
  Input,
  Label,
  Menu,
  Popup,
  Segment
} from 'semantic-ui-react'

import ModalDefault from 'components/ModalDefault'

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
  blockOnChange,
  handleQuoteBoxModal
}) {
  const selection = editorState.getSelection()
  const blockType = editorState.getCurrentContent()
                                .getBlockForKey(selection.getStartKey())
                                .getType()
  return (
    <BlockButtonContainer top={top}>
      <Button.Group
        color='orange'
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
                active={(blockType === 'ordered-list-item')}
                onMouseDown={e => {
                  // this prevents the button to be in-focus
                  e.preventDefault()
                }}
                onClick={e => {
                  blockOnChange(e, {value: 'ordered-list-item'})
                }}>
                <Icon name='ordered list' color='orange' />
              </Menu.Item>
              <Menu.Item
                link
                active={(blockType === 'unordered-list-item')}
                onMouseDown={e => {
                  // this prevents the button to be in-focus
                  e.preventDefault()
                }}
                onClick={e => {
                  blockOnChange(e, {value: 'unordered-list-item'})
                }}>
                <Icon name='unordered list' color='orange' />
              </Menu.Item>
              <Menu.Item
                link
                active={(blockType === 'blockquote')}
                onMouseDown={e => {
                  // this prevents the button to be in-focus
                  e.preventDefault()
                }}
                onClick={e => {
                  blockOnChange(e, {value: 'blockquote'})
                }}>
                <Icon name='quote left' color='orange' />
              </Menu.Item>
              <Menu.Item
                link
                onMouseDown={e => e.preventDefault()}
                onClick={e => handleQuoteBoxModal(true)}
              >
                <Icon color='orange' name='square outline' />
              </Menu.Item>
            </Menu>
          </Popup.Content>
        </Popup>

      </Button.Group>
    </BlockButtonContainer>
  )
}

export function InlineToolbar ({
  top,
  left,
  inLineStyle,
  handleInlineModal,
  createEntity,
  removeEntity
}) {
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
          <Button
            onMouseDown={e => e.preventDefault()}
            onClick={() => inLineStyle('STRIKETHROUGH')}
            icon='strikethrough'
          />
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
          <Linkify
            handleInlineModal={handleInlineModal}
            createEntity={createEntity}
          />
          <Button
            onMouseDown={e => e.preventDefault()}
            onClick={removeEntity}
            icon='unlinkify'
          />
          <Button
            onMouseDown={e => e.preventDefault()}
            onClick={() => createEntity('QUOTE', {quote: 'this is a quote'})}
            icon='square outline'
          />
        </Button.Group>
      </Label>
    </InlineToolbarContainer>
  )
}

export function Linkify ({handleInlineModal, createEntity}) {
  let url = ''
  return (
    <ModalDefault
      header={'Attach Link'}
      trigger={
        <Button
          onMouseDown={e => e.preventDefault()}
          icon='linkify'
        />
      }
      onOpen={() => handleInlineModal(true)}
      onClose={() => handleInlineModal(false)}
    >
      <Grid>
        <Grid.Row>
          <Grid.Column stretched>
            <label>URL Link</label>
            <Input onChange={(e) => {
              url = e.target.value
            }} fluid />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column stretched>
            <label>Search Blog Link</label>
            <Input fluid />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column stretched>
            <Segment padded />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column computer={16}>
            <Button
              floated='right'
              primary
              onClick={() => createEntity('LINK', {url})}>
              <Icon name='save' />
              Save
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </ModalDefault>
  )
}
