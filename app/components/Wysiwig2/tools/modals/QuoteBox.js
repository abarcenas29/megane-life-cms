import React, { Component } from 'react'
import css from 'styled-components'

import ModalDefault from 'components/ModalDefault'

import {
  Button,
  Grid,
  Header,
  Input,
  Icon
} from 'semantic-ui-react'

const Label = css.label`
  display: block;
  margin: 0.5em 0;
`

class ModalQuoteBoxSettings extends Component {
  constructor (props, context) {
    super(props, context)

    this.state = {
      widthRange: 50,
      alignment: 'center',
      quote: 'put your quote here'
    }

    this.handleWidthRange = this.handleWidthRange.bind(this)
    this.handleAlignmentChange = this.handleAlignmentChange.bind(this)
    this.handleQuoteTextChange = this.handleQuoteTextChange.bind(this)
  }

  handleQuoteTextChange (value) {
    this.setState({
      quote: value
    })
  }

  handleWidthRange (value) {
    this.setState({
      widthRange: parseInt(value)
    })
  }

  handleAlignmentChange (alignment) {
    this.setState({
      alignment
    })
  }

  render () {
    const {createAtomicBlock, ...props} = this.props
    const { alignment, widthRange, quote } = this.state
    return (
      <ModalDefault
        header={
          <Header as='h3'>
            <Icon
              name='square outline'
              color='orange'
            />
            Quote Box Prompt
          </Header>
        }
        size='small'
        {...props}
      >
        <Grid>
          <Grid.Column computer={16}>
            <Label>Quote Text</Label>
            <Input
              onChange={(e, props) => {
                this.handleQuoteTextChange(props.value)
              }}
              fluid
            />
          </Grid.Column>
          <Grid.Column computer={8}>
            <Label>Alignment</Label>
            <Button.Group>
              <Button
                onMouseDown={e => e.preventDefault()}
                onClick={() => this.handleAlignmentChange('left')}
                active={(alignment === 'left')}
                icon='align left'
              />
              <Button
                onMouseDown={e => e.preventDefault()}
                onClick={() => this.handleAlignmentChange('center')}
                active={(alignment === 'center')}
                icon='align center'
              />
              <Button
                onMouseDown={e => e.preventDefault()}
                onClick={() => this.handleAlignmentChange('right')}
                active={(alignment === 'right')}
                icon='align right' />
            </Button.Group>
          </Grid.Column>
          <Grid.Column computer={8}>
            <Label>Width {parseInt(this.state.widthRange)}</Label>
            <Input
              type='range'
              min={0}
              max={100}
              step={1}
              onChange={(e, props) => this.handleWidthRange(props.value)}
            />
          </Grid.Column>
          <Grid.Column computer={16}>
            <Button negative>
              <Icon name='trash' />
              Delete
            </Button>
            <Button
              basic
              floated='right'
              color='orange'
              onMouseDown={e => e.preventDefault()}
              onClick={() => createAtomicBlock('QUOTE', {alignment, widthRange, quote})}
            >
              <Icon name='save' />
              Save
            </Button>
          </Grid.Column>
        </Grid>
      </ModalDefault>
    )
  }
}

export default ModalQuoteBoxSettings
