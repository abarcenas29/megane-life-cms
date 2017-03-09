/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react'
import css from 'styled-components'

import MainNav from './sections/MainNav'
import ModalSettings from './sections/ModalSettings'

const PageContainer = css.div`
  display: flex;
  flex-direction: column;
`

const Content = css.div`
  flex-grow: 1;
`

export default class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor (props, context) {
    super(props, context)

    this.state = {
      settingsTab: {
        activeTab: 'general'
      }
    }

    this.handleModalTab = this.handleModalTab.bind(this)
  }

  handleModalTab (e, { name }) {
    const settingsTab = {
      activeTab: name
    }
    this.setState({settingsTab})
  }

  render () {
    return (
      <PageContainer>
        <MainNav />
        <Content>
          {React.Children.toArray(this.props.children)}
        </Content>
        <ModalSettings
          handleModalTab={this.handleModalTab}
          activeTab={this.state.settingsTab.activeTab} />
      </PageContainer>
    )
  }
}
