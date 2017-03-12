import React from 'react'
import css from 'styled-components'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import Wysiwig from 'components/Wysiwig'

import {
  formValueSelector
} from './../selectors'

import {
  reduxForm,
  Field,
  FieldArray
} from 'redux-form/immutable'

import {
  Grid,
  Divider,
  Header,
  Icon,
  Button,
  Rail
} from 'semantic-ui-react'

import Input from 'components/ReduxFields/Input'
import Select from 'components/ReduxFields/Select'

const Article = css.article`
  margin: 1em;
`

function renderPost ({
  fields,
  meta: { touched, error },
  postBody
}) {
  postBody = (postBody) ? postBody.toJS() : []
  return (
    <Grid as='section'>
      {
        fields.map((section, index) => {
          return (
            <Grid.Row key={index}>
              <Grid.Column computer={16} textAlign='center'>
                <Field
                  name={`${section}.type`}
                  component={Select}
                  selection
                  options={[
                    {text: 'Image', value: 0},
                    {text: 'text', value: 1}
                  ]}
                />
                <Button onClick={() => fields.remove(index)} negative icon='trash' />
              </Grid.Column>
              <Grid.Column computer={16}>
                {
                  postBody[index] && postBody[index].type === 0 &&
                  <p>Image</p>
                }
                {
                  postBody[index] && postBody[index].type === 1 &&
                  <Wysiwig value={'thisnsfsdf'} />
                }
              </Grid.Column>
            </Grid.Row>
          )
        })
      }
      <Grid.Row>
        <Grid.Column computer={16} textAlign='center'>
          <Button
            color='orange'
            basic
            onClick={() => fields.push()}
          >
            <Icon name='plus' />
            Add Post Section
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

function StandardPostRead ({
  openWysiwig
}) {
  return (
    <Article>
      <Rail attached internal position='right'>
        <Button.Group floated='right'>
          <Button
            color='orange'
            onClick={openWysiwig}>
            <Icon name='plus' />
            New
          </Button>
          <Button
            color='orange'
            basic
            onClick={openWysiwig}>
            <Icon name='edit' />
            Edit
          </Button>
        </Button.Group>
      </Rail>
      <header>
        <Header as='h1' className='post-header'>
          Some New Bacon Title
          <Header.Subheader className='post-header'>
            How some bacons are better than others
          </Header.Subheader>
          <Header.Subheader className='meta-header'>
            By <Link>Author name</Link> | Date: YYYY-MM-DD
          </Header.Subheader>
        </Header>
      </header>
      <section className='article-body'>
        <p>Bacon ipsum dolor amet pastrami bresaola frankfurter turducken.
        Strip steak biltong prosciutto frankfurter beef.
        Kevin flank ribeye porchetta strip steak drumstick cow prosciutto landjaeger jowl beef shankle kielbasa. Turkey andouille beef frankfurter venison,
        pork belly doner alcatra rump swine capicola brisket landjaeger.</p>

        <p>Picanha t-bone salami meatloaf.
        Beef ribs boudin kevin pork belly short ribs
        chicken pig tail kielbasa meatloaf.
        Biltong picanha hamburger strip steak.
        Shoulder burgdoggen jerky beef prosciutto
        frankfurter pig ribeye cupim short ribs kevin
        tri-tip cow pancetta.
        Pork chop tenderloin capicola landjaeger pork loin
        drumstick prosciutto. Cow venison andouille, boudin
        hamburger ham leberkas tongue jerky landjaeger
        kielbasa filet mignon pancetta pork belly prosciutto.
        Capicola ribeye t-bone swine flank.</p>

        <p>Bresaola beef chicken porchetta spare ribs.
        Corned beef venison filet mignon biltong.
        Meatball doner beef ribs corned beef sirloin tongue
        ham hock t-bone landjaeger tail pork loin tenderloin
        turducken shankle capicola. Doner shankle chicken alcatra
        meatloaf pancetta tenderloin strip steak beef corned
        beef cow short loin swine.</p>

        <p>Tongue prosciutto salami bresaola meatloaf shoulder pastrami
        short ribs pork belly. Meatloaf tail salami kevin pork chop pastrami.
        Hamburger doner boudin burgdoggen short loin.
        Ham pork belly chicken meatloaf ham hock, pork loin biltong strip
        steak flank turducken boudin salami tongue shank bresaola.</p>

        <p>T-bone ground round pork chop beef ribs swine tri-tip ham
        hock beef strip steak. Pork chop pastrami pig shoulder pork
        belly short ribs. Ham boudin rump, meatball landjaeger pork
        chop salami bresaola pork tenderloin t-bone prosciutto.
        Salami drumstick tail, ham hock spare ribs porchetta
        frankfurter corned beef chicken jerky swine sirloin picanha cow flank.
        Venison kielbasa tail, t-bone doner swine ground round ball tip
        hamburger.</p>

        <p>Does your lorem ipsum text long for something a little meatier?
        Give our generator a try… it’s tasty!</p>
      </section>
    </Article>
  )
}

function StandardPostEdit ({
  closeWysiwig,
  formValues
}) {
  return (
    <Article>
      <Button.Group floated='right'>
        <Button onClick={closeWysiwig}>
          <Icon name='eye' />
          Post View
        </Button>
      </Button.Group>
      <Divider clearing hidden />
      <header>
        <Field
          component={Input}
          name='header'
          placeholder='Post Title'
          fluid
          size='large'
        />
        <Divider hidden fitted />
        <Field
          component={Input}
          name='sub_header'
          placeholder='Post Excerpt'
          fluid
        />
        <Divider hidden />
        <Field
          component={Input}
          name='slug'
          placeholder='slug'
          size='tiny'
          label={'https://www.example.com/post/'}
        />
      </header>
      <Divider hidden />
      <FieldArray
        component={renderPost}
        name='post_body'
        postBody={formValues.get('post_body')}
      />
    </Article>
  )
}

function StandardPost ({
  control,
  formValues,
  openWysiwig,
  closeWysiwig
}) {
  return (
    <Grid.Row>
      <Grid.Column computer={12} widescreen={9}>
        {
        control === 'read' &&
        <StandardPostRead
          openWysiwig={openWysiwig}
        />
      }
        {
        control === 'edit' &&
        <StandardPostEdit
          formValues={formValues}
          closeWysiwig={closeWysiwig}
        />
      }
      </Grid.Column>
    </Grid.Row>
  )
}

function validations (values) {
  const errors = []
  return errors
}

const StandardPostRedux = reduxForm({
  form: 'standardForm',
  endableReinitalize: true,
  validations
})(StandardPost)

const mapStateToProps = createStructuredSelector({
  formValues: formValueSelector()
})

function mapDispatchToProps (dispatch) {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StandardPostRedux)
