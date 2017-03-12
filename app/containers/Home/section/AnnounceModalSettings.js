import React from 'react'
import css from 'styled-components'
import { fromJS } from 'immutable'
import {
  Button,
  Checkbox,
  Grid,
  Header,
  Icon,
  Item,
  Segment
} from 'semantic-ui-react'

import ModalDefault from 'components/ModalDefault'

import AnnouncementItem from './AnnounceItem'
import AnnouncementInfo from './AnnouncementInfo'

const AddButtonContainer = css.div`
  display: flex;
  justify-content: center;
`

const ItemGroup = css(Item.Group)`
  overflow-y: auto;
  height: 20em;
`

function AnnounceModalSettings ({...props}) {
  return (
    <ModalDefault
      {...props}
      header={<Header as='h2'>Announcement Modal Settings</Header>}
      size='small'
    >
      <Grid>
        <Grid.Column width={16}>
          <Checkbox toggle label='Show Announcement' />
        </Grid.Column>
        <Grid.Column width={16}>
          <Header as='h3'>Announcement List</Header>
        </Grid.Column>
        <Grid.Column width={16}>
          <AddButtonContainer>
            <AnnouncementInfo
              initialValues={fromJS({})}
              trigger={
                <Button primary>
                  <Icon name='plus' />
                  Add Announcement
                </Button>
              }
            />
          </AddButtonContainer>
          <Segment>
            <ItemGroup divided link>
              <AnnouncementItem />
              <AnnouncementItem />
              <AnnouncementItem />
              <AnnouncementItem />
              <AnnouncementItem />
              <AnnouncementItem />
              <AnnouncementItem />
              <AnnouncementItem />
              <AnnouncementItem />
              <AnnouncementItem />
            </ItemGroup>
          </Segment>
        </Grid.Column>
      </Grid>
    </ModalDefault>
  )
}

export default AnnounceModalSettings
