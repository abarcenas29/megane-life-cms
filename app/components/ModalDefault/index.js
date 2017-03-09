/**
*
* ModalDefault
*
*/

import React from 'react'

import {
  Modal
} from 'semantic-ui-react'

function ModalDefault ({header, children, ...props}) {
  return (
    <Modal {...props}>
      <Modal.Header>
        {header}
      </Modal.Header>
      <Modal.Content>
        {children}
      </Modal.Content>
    </Modal>
  )
}

ModalDefault.propTypes = {

}

export default ModalDefault
