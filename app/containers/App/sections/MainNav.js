import React from 'react'
import css from 'styled-components'
import {
  Menu,
  Icon,
  Image
} from 'semantic-ui-react'

import Logo from 'images/mlogo.svg'

const MenuStyle = css(Menu)`
  margin-bottom: 0 !important;
`

function MainNav ({
  openSettingsModal
}) {
  return (
    <MenuStyle fluid stackable borderless>
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
          <Icon name='options' size='large' onClick={openSettingsModal} />
        </Menu.Item>
      </Menu.Menu>
    </MenuStyle>
  )
}

export default MainNav
