/*
 *
 * Home
 *
 */

import React, { PureComponent } from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'

import { createStructuredSelector } from 'reselect'
import makeSelectHome from './selectors'

import {
  Grid
} from 'semantic-ui-react'

import AnnounceArea from './section/AnnounceArea'

import AnnounceModalSettings from './section/AnnounceModalSettings'

export class Home extends PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor (props, context) {
    super(props, context)

    this.state = {
      dismissMessage: true,
      messageModal: false
    }

    this.handleAnnouncement = this.handleAnnouncement.bind(this)
    this.announcementSettingsModalOpen = this.announcementSettingsModalOpen.bind(this)
    this.announcementSettingsModalClose = this.announcementSettingsModalClose.bind(this)
  }

  handleAnnouncement () {
    this.setState({dismissMessage: false})
  }

  announcementSettingsModalOpen () {
    this.setState({messageModal: true})
  }

  announcementSettingsModalClose () {
    this.setState({messageModal: false})
  }

  render () {
    return (
      <Grid padded centered>
        <Helmet
          title='Home'
          meta={[
            { name: 'description', content: 'Description of Home' }
          ]}
        />
        <AnnounceArea
          onClose={this.handleAnnouncement}
          visibility={this.state.dismissMessage}
          SettingsModalOpen={this.announcementSettingsModalOpen}
        />
        <AnnounceModalSettings
          open={this.state.messageModal}
          onClose={this.announcementSettingsModalClose}
        />
      </Grid>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  Home: makeSelectHome()
})

function mapDispatchToProps (dispatch) {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
