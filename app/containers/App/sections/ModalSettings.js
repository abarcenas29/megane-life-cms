import React from 'react'
import {
  Menu,
  Header
} from 'semantic-ui-react'

import ModalDefault from 'components/ModalDefault'

import SettingsNavigation from './SettingsNavigation'
import SettingsGeneral from './SettingsGeneral'

function ModalSettings ({
  activeTab,
  handleModalTab,
  ...props
}) {
  return (
    <ModalDefault
      size='small'
      defaultOpen
      header={<Header as='h2'>Global Settings</Header>}
    >
      <Menu attached='top' tabular>
        <Menu.Item
          name='general'
          active={(activeTab === 'general')}
          onClick={handleModalTab}
        >
          General
        </Menu.Item>
        <Menu.Item
          name='links'
          active={(activeTab === 'links')}
          onClick={handleModalTab}
        >
          Navigation
        </Menu.Item>
      </Menu>
      {
        activeTab === 'links' &&
        <SettingsNavigation />
      }
      {
        activeTab === 'general' &&
        <SettingsGeneral />
      }
    </ModalDefault>
  )
}

export default ModalSettings
