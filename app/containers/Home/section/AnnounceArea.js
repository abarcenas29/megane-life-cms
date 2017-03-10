import React from 'react'
import {
  Button,
  Grid,
  Message,
  Header
} from 'semantic-ui-react'

function AnnounceArea ({
  onClose,
  visibility,
  SettingsModalOpen
}) {
  return (
    <Grid.Row>
      {
        visibility &&
        <Grid.Column computer={12} widescreen={10}>
          <Button
            icon='cogs'
            size='tiny'
            basic
            onClick={SettingsModalOpen}
          />
          <Message
            onDismiss={onClose}
            color='orange'
          >
            <Message.Header>
              <Header as='h2'>Announcement Title</Header>
            </Message.Header>
            <Message.Content>
              <p>AAA</p>
            </Message.Content>
          </Message>
        </Grid.Column>
      }
    </Grid.Row>
  )
}

export default AnnounceArea
