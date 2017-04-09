import React, { Component } from 'react'
import ModalDefault from 'components/ModalDefault'
import css from 'styled-components'
import aniListImage from 'images/aniList.png'
import _ from 'lodash'

import { fromJS } from 'immutable'
import {
  Button,
  Grid,
  Header,
  Icon,
  Item,
  Input,
  Image,
  Menu,
  Segment
} from 'semantic-ui-react'

const SegmentedStyle = css(Segment)`
  max-height: 20em;
  overflow-y: auto;
`

const ImageIcon = css(Image)`
  width: 12px;
  margin-right: 0.5em;
`

class Linkify extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      activeTab: 'inside-link',
      input: fromJS(''),
      data: fromJS({})
    }

    this.handleActiveTab = this.handleActiveTab.bind(this)
    this.handleUrlInput = this.handleUrlInput.bind(this)
    this.handleSubmitEntity = this.handleSubmitEntity.bind(this)
    this.labelGenerator = this.labelGenerator.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (!_.isEqual(this.props.data, nextProps.entityData)) {
      this.setState({
        input: nextProps.entityData.get('input'),
        data: nextProps.entityData
      }, () => {
        this.handleActiveTab(nextProps.entityData.get('type'))
      })
    }
  }

  handleUrlInput (e, props) {
    this.setState({
      input: fromJS(props.value)
    })
  }

  handleActiveTab (tab) {
    this.setState({activeTab: tab})
  }

  handleSubmitEntity (tab, value) {
    const { createEntity } = this.props
    const { input } = this.state
    const url = this.labelGenerator(tab)

    const data = {
      url: `${url}${input}`,
      input: `${input}`,
      type: tab
    }

    this.setState({
      data: fromJS(data)
    }, () => {
      createEntity('LINK', data)
    })
  }

  labelGenerator (tab) {
    switch (tab) {
      case 'AniList':
        return 'https://anilist.co/'
      case 'inside-link':
        return 'https://www.magene.life/'
      case 'twitter':
        return 'https://www.twitter.com/'
      case 'facebook':
        return 'https://www.facebook.com/'
      case 'outside-link':
        return 'https://'
    }
  }

  render () {
    const { handleInlineModal } = this.props
    const { activeTab, input } = this.state
    return (
      <ModalDefault
        header={<Header as='h3'>Link Controls</Header>}
        trigger={
          <Button
            onMouseDown={e => e.preventDefault()}
            icon='linkify'
          />
        }
        onOpen={() => handleInlineModal(true)}
        onClose={() => handleInlineModal(false)}
      >
        <Grid>
          <Grid.Column computer={16}>
            <Menu tabular>
              <Menu.Item
                link
                active={(activeTab === 'outside-link')}
                onClick={() => this.handleActiveTab('outside-link')}
              >
                <Icon name='globe' />
                Web Links
              </Menu.Item>
              <Menu.Item
                link
                active={(activeTab === 'inside-link')}
                onClick={() => this.handleActiveTab('inside-link')}
              >
                <Icon name='linkify' />
                Megane Posts
              </Menu.Item>
              <Menu.Item
                link
                active={(activeTab === 'twitter')}
                onClick={() => this.handleActiveTab('twitter')}
              >
                <Icon name='twitter' />
                Twitter
              </Menu.Item>
              <Menu.Item
                link
                active={(activeTab === 'facebook')}
                onClick={() => this.handleActiveTab('facebook')}
              >
                <Icon name='twitter' />
                Facebook
              </Menu.Item>
              <Menu.Item
                link
                active={(activeTab === 'AniList')}
                onClick={() => this.handleActiveTab('AniList')}
              >
                <ImageIcon src={aniListImage} />
                AniList
              </Menu.Item>
            </Menu>
          </Grid.Column>
          <Grid.Column computer={16}>
            <Input
              onChange={this.handleUrlInput}
              value={input}
              label={this.labelGenerator(activeTab)}
              fluid
            />
            {
              activeTab === 'inside-link' &&
              <SegmentedStyle>
                <Item.Group divided>
                  <Item><Item.Content>AAA</Item.Content></Item>
                  <Item><Item.Content>BBB</Item.Content></Item>
                  <Item><Item.Content>CCC</Item.Content></Item>
                  <Item><Item.Content>DDD</Item.Content></Item>
                  <Item><Item.Content>EEE</Item.Content></Item>
                  <Item><Item.Content>FFF</Item.Content></Item>
                  <Item><Item.Content>GGG</Item.Content></Item>
                </Item.Group>
              </SegmentedStyle>
            }
            {
              activeTab === 'AniList' &&
              <SegmentedStyle>
                <Item.Group divided>
                  <Item><Item.Content>AAA</Item.Content></Item>
                  <Item><Item.Content>BBB</Item.Content></Item>
                  <Item><Item.Content>CCC</Item.Content></Item>
                  <Item><Item.Content>DDD</Item.Content></Item>
                  <Item><Item.Content>EEE</Item.Content></Item>
                  <Item><Item.Content>FFF</Item.Content></Item>
                  <Item><Item.Content>GGG</Item.Content></Item>
                </Item.Group>
              </SegmentedStyle>
            }
          </Grid.Column>
          <Grid.Column computer={16}>
            <Button
              floated='right'
              color='orange'
              onMouseDown={e => e.preventDefault()}
              onClick={(e) => this.handleSubmitEntity(activeTab)}
              basic>
              <Icon name='save' />
              Save
            </Button>
          </Grid.Column>
        </Grid>
      </ModalDefault>
    )
  }
}

export default Linkify
