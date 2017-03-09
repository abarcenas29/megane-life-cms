import React from 'react'
import css from 'styled-components'

import {
  Field,
  FieldArray,
  reduxForm
} from 'redux-form/immutable'

import Select from 'components/ReduxFields/Select'

import {
  Button,
  Form,
  Grid,
  Header,
  Icon
} from 'semantic-ui-react'

const GridRow = css(Grid.Row)`
  padding: 0.25rem 0 !important;
`

function RenderNavigation ({ fields, meta: { touched, error } }) {
  return (
    <Grid padded stackable>
      <Grid.Row>
        <Grid.Column width={4}>
          <Header as='h3'>Type</Header>
        </Grid.Column>
        <Grid.Column width={8}>
          <Header as='h3'>Link</Header>
        </Grid.Column>
      </Grid.Row>
      {
        fields.map((link, index, field) => {
          return (
            <GridRow key={index}>
              <Grid.Column width={4}>
                <Field
                  name={`${link}.type`}
                  component={Select}
                  fluid
                  selection
                  options={[
                    {text: 'Pages', value: 1},
                    {text: 'Category', value: 2}
                  ]}
                />
              </Grid.Column>
              <Grid.Column width={10}>
                <Field
                  name={`${link}.link`}
                  component={Select}
                  fluid
                  selection
                  options={[
                    {text: 'Pages', value: 1},
                    {text: 'Category', value: 2}
                  ]}
                />
              </Grid.Column>
              <Grid.Column width={1}>
                <Button
                  basic
                  icon='trash'
                  negative
                  onClick={() => fields.remove(index)}
                />
              </Grid.Column>
            </GridRow>
          )
        })
      }
      <Grid.Row>
        <Grid.Column width={8}>
          <Button
            size='large'
            positive
            onClick={() => fields.push({})}
            type='button'
          >
            <Icon name='save' />
            Save
          </Button>
        </Grid.Column>
        <Grid.Column width={8} textAlign='right'>
          <Button
            size='large'
            primary
            onClick={() => fields.push({})}
            type='button'
          >
            <Icon name='plus' />
            Add Menu
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

function SettingsNavigation () {
  return (
    <Form>
      <FieldArray
        component={RenderNavigation}
        name='navigation'
      />
    </Form>
  )
}

function validation (values) {
  const errors = []
  return errors
}

const NavForm = reduxForm({
  form: 'ModalNavigationForm',
  enableReinitialize: true,
  validation
})(SettingsNavigation)

export default NavForm
