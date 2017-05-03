/**
*
* ImageGallery
*
*/

import React from 'react'
import css from 'styled-components'

import {
  Button,
  Divider,
  Form,
  Grid,
  Image,
  Input,
  List
} from 'semantic-ui-react'

import ModalDefault from 'components/ModalDefault'

const ModalHeader = css.div`
  display: flex;
`

const ImageContainer = css.div`
  display: inline-block;
  width: 10em;
  height: 10em;
  background-size: cover;
  background-image: url('http://placehold.it/350x350');
  margin: 0.5em;
`

const ImageListContainer = css(Grid.Column)`
  display: flex;
  flex-wrap: wrap;
`

const ImagePreviewContainer = css(Grid.Column)`
  background-color: #F3F3F3;
`

class ImageGallery extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render () {
    const { ...props } = this.props
    return (
      <ModalDefault
        header={
          <ModalHeader>
            <h3 style={{margin: 0}}>Image Gallery</h3>
          </ModalHeader>
        }
        {...props}
      >
        <Grid padding>
          <ImageListContainer computer={12}>
            <ImageContainer />
            <ImageContainer />
            <ImageContainer />
            <ImageContainer />
            <ImageContainer />
          </ImageListContainer>
          <ImagePreviewContainer computer={4}>
            <h4>Image Details</h4>
            <Image src='http://placehold.it/350x250' />
            <List>
              <List.Item>
                <List.Content as='a'>Edit Image</List.Content>
              </List.Item>
              <List.Item>
                <List.Content as='a'>Delete</List.Content>
              </List.Item>
            </List>
            <Divider />
            <Form as='div'>
              <Form.Field>
                <label>URL</label>
                <Input placeholder='AAA' />
              </Form.Field>
              <Form.Field>
                <label>Caption</label>
                <Input placeholder='AAA' />
              </Form.Field>
              <Form.Field>
                <label>Size</label>
                <Input
                  type='range'
                  min={0}
                  max={100}
                  step={1}
                  value={50}
                />
              </Form.Field>
              <Form.Field>
                <label>Alignment</label>
                <Button.Group>
                  <Button icon='left align' />
                  <Button icon='center align' />
                  <Button icon='right align' />
                </Button.Group>
              </Form.Field>
            </Form>
          </ImagePreviewContainer>
          <Grid.Column computer={16}>
            <Button>Cancel</Button>
            <Button primary floated='right'>Insert Image</Button>
          </Grid.Column>
        </Grid>
      </ModalDefault>
    )
  }
}

ImageGallery.propTypes = {

}

export default ImageGallery
