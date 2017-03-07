import React from 'react'
import {
  Menu,
  Icon,
  Image
} from 'semantic-ui-react'

import Logo from 'images/mlogo.svg'

function MainNav () {
  return (
    <Menu fluid stackable borderless>
      <Menu.Menu>
        <Menu.Item>
          <Image src={Logo} size='small' />
        </Menu.Item>
        <Menu.Item link>
          Anime
        </Menu.Item>
        <Menu.Item link>
          Manga
        </Menu.Item>
        <Menu.Item link>
          Podcast
        </Menu.Item>
      </Menu.Menu>
      <Menu.Menu position='right'>
        <Menu.Item link>
          <Icon name='facebook' size='large' />
        </Menu.Item>
        <Menu.Item link>
          <Icon name='twitter' size='large' />
        </Menu.Item>
        <Menu.Item link>
          <Icon name='search' size='large' />
        </Menu.Item>
        <Menu.Item link>
          <Icon name='options' size='large' />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  )
}

export default MainNav
