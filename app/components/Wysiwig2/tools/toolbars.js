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

const BlockButtonContainer = css(Button.Group)`
  position: absolute;
  top: ${props => props.top}px;
  left: -90px;
`

const LabelStyle = css(Label)`
  position: absolute !important;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
`

export function BlockToolbar ({
  top
}) {
  return (
    <BlockButtonContainer
      color='orange'
      basic
      top={top}
    >
      <Button icon='image' />
      <Popup
        trigger={<Button icon='bars' />}
        hideOnScroll
        hoverable
      >
        <Popup.Content>
          <Menu compact size='small' secondary>
            <Menu.Item>
              <Dropdown
                placeholder='Paragraph'
                simple
                selection
                options={[
                  {text: 'Heading 1', value: 1, key: 1},
                  {text: 'Heading 2', value: 2, key: 2},
                  {text: 'Heading 3', value: 3, key: 3},
                  {text: 'Heading 4', value: 4, key: 4}
                ]}
              />
            </Menu.Item>
            <Menu.Item link>
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

    </BlockButtonContainer>
  )
}

export function InlineToolbar ({top, left}) {
  return (
    <LabelStyle
      color='orange'
      top={top}
      left={left}
      pointing='above'
    >
      <Button.Group color='orange' size='tiny'>
        <Button icon='bold' />
        <Button icon='italic' />
        <Button icon='underline' />
      </Button.Group>
      {'|'}
      <Button.Group color='orange'>
        <Button icon='linkify' />
        <Button icon='unlinkify' />
      </Button.Group>
    </LabelStyle>
  )
}
