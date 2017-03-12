import React from 'react'
import css from 'styled-components'

import {
  Button,
  Item,
  Header,
  Checkbox
} from 'semantic-ui-react'

import AnnouncementInfo from './AnnouncementInfo'

const AnnouncementControls = css.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`

function AnnounceItem () {
  return (
    <Item>
      <Item.Content>
        <Item.Header>
          <Header as='h4'>Announcement Title</Header>
        </Item.Header>
        <Item.Description>
          Spicy jalapeno bacon ipsum dolor amet ham jerky sausage, pork chop pig meatloaf pastrami porchetta alcatra.
          Ribeye turducken bresaola beef pork fatback pork belly pork loin. Hamburger beef ribs salami turducken.
          Hamburger fatback capicola burgdoggen beef, pastrami rump cupim swine spare ribs prosciutto salami ground round.
        </Item.Description>
        <Item.Extra>
          <AnnouncementControls>
            <Checkbox
              toggle
            />
            <AnnouncementInfo
              trigger={
                <Button basic floated='right' color='orange'>
                  Edit
                </Button>
              }
            />
          </AnnouncementControls>
        </Item.Extra>
      </Item.Content>
    </Item>
  )
}

export default AnnounceItem
