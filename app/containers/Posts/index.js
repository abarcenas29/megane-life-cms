/*
 *
 * Posts
 *
 */

import React, { PureComponent } from 'react'
import { fromJS } from 'immutable'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import StandardPost from './sections/StandardPost'

import {
  Grid
} from 'semantic-ui-react'

export class Posts extends PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor (props, context) {
    super(props, context)

    this.state = {
      control: 'edit',
      post: fromJS({
        post_body: []
      })
    }

    this.openWysiwig = this.openWysiwig.bind(this)
    this.closeWysiwig = this.closeWysiwig.bind(this)
  }

  openWysiwig () {
    this.setState({control: 'edit'})
  }

  closeWysiwig () {
    this.setState({control: 'read'})
  }

  render () {
    return (
      <Grid centered relaxed>
        <StandardPost
          control={this.state.control}
          openWysiwig={this.openWysiwig}
          closeWysiwig={this.closeWysiwig}
          initialValues={this.state.post}
        />
      </Grid>
    )
  }
}

const mapStateToProps = createStructuredSelector({})

function mapDispatchToProps (dispatch) {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
