import React from 'react'
import {
  reduxForm,
  Field
} from 'redux-form/immutable'

import {
  Button,
  Grid,
  Icon,
  Header
} from 'semantic-ui-react'

import ModalDefault from 'components/ModalDefault'

import Input from 'components/ReduxFields/Input'
import TextBox from 'components/ReduxFields/TextBox'

function submitValues (values) {
  console.info(values)
}

function AnnouncementInfo ({
  trigger,
  handleSubmit
}) {
  return (
    <ModalDefault
      header={<Header as='h2'>Announcement Info</Header>}
      size='small'
      trigger={trigger}
    >
      <Grid relaxed>
        <Grid.Column computer={16}>
          <Field
            name='announcement_title'
            component={Input}
          />
        </Grid.Column>
        <Grid.Column computer={16}>
          <Field
            name='announcement_body'
            component={TextBox}
          />
        </Grid.Column>
        <Grid.Column computer={16}>
          <Button
            floated='right'
            positive
            onClick={handleSubmit(submitValues)}
          >
            <Icon name='save' />
            Save
          </Button>
        </Grid.Column>
      </Grid>
    </ModalDefault>
  )
}

function validations (values) {
  const errors = []

  return errors
}

const AnnouncementInfoRedux = reduxForm({
  form: 'AnnouncementInfo',
  enableReinitialize: true,
  validations
})(AnnouncementInfo)

export default AnnouncementInfoRedux
