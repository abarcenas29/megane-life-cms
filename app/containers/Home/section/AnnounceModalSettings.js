import React from 'react'
import {
  Checkbox,
  Header,
  Segment
} from 'semantic-ui-react'

import ModalDefault from 'components/ModalDefault'

function AnnounceModalSettings ({...props}) {
  return (
    <ModalDefault
      defaultOpen
      size='small'
      header={<Header as='h2'>Announcement Modal Settings</Header>}
    >
      <Segment.Group>
        <Segment basic>
          <Checkbox toggle label='Show Announcement' />
        </Segment>
      </Segment.Group>
    </ModalDefault>
  )
}

export default AnnounceModalSettings
