import React from 'react'
import {
  Field,
  reduxForm
} from 'redux-form/immutable'
import {
  Button,
  Form,
  Grid,
  Icon
} from 'semantic-ui-react'

import Input from 'components/ReduxFields/Input'
import TextBox from 'components/ReduxFields/TextBox'

function SettingsGeneral () {
  return (
    <Form>
      <Grid padded stackable>
        <Grid.Row>
          <Grid.Column
            computer={4}
            verticalAlign='middle'
          >
            <label>Site Name</label>
          </Grid.Column>
          <Grid.Column
            computer={12}
          >
            <Field
              fluid
              component={Input}
              name='site_name'
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column
            computer={4}
            verticalAlign='middle'
          >
            <label>Site Url</label>
          </Grid.Column>
          <Grid.Column
            computer={12}
          >
            <Field
              fluid
              component={Input}
              name='site_url'
              label='https://'
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column computer={4}>
            <label>Description</label>
          </Grid.Column>
          <Grid.Column computer={12}>
            <Field
              name='tagline'
              component={TextBox}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column
            computer={4}
            verticalAlign='middle'
          >
            <label>Social Accounts</label>
          </Grid.Column>
          <Grid.Column
            computer={12}
          >
            <Field
              fluid
              component={Input}
              name='facebook'
              icon='facebook'
              iconPosition='left'
            />
            <Field
              fluid
              component={Input}
              name='twitter'
              icon='twitter'
              iconPosition='left'
            />
            <Field
              fluid
              component={Input}
              name='email'
              icon='envelope outline'
              iconPosition='left'
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign='right'>
            <Button positive>
              <Icon name='save' />
              Save
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Form>
  )
}

const GeneralForm = reduxForm({
  form: 'GeneralForm',
  enableReinitialize: true,
  validations
})(SettingsGeneral)

function validations (values) {
  const errors = []
  return errors
}

export default GeneralForm
