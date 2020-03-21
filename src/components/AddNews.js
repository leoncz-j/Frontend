import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import fetchAPI from '../utils/fetchAPI';
import apisdk from '../constants/apisdk';

export class AddNews extends Component {
  state = {
    url: '',
    text: '',
    type: '',
  }

  onChangeValue = (property, { currentTarget }) => {
    const value = currentTarget.value;
    this.setState({ [property]: value });
  }

  handleSubmit = async () => {
    
    const response = await fetchAPI.getData(apisdk.VALIDATE, {
      text: this.state.text,
    });
    // const response = await fetchAPI.postData(apisdk.VALIDATE, {
    //   text: this.state.text,
    // });
    console.log(this.state, response);
  }

  render () {
    return (
    <Form>
      {/* <Form.Group controlId="exampleForm.ControlInput1">
        <Form.Label>Url</Form.Label>
        <Form.Control 
          onChange={(e, ee) => this.onChangeValue('url', e, ee)} 
          type="url" 
          placeholder="name@example.com" 
        />
      </Form.Group> */}
      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Label></Form.Label>
        <Form.Control
          onChange={(e, ee) => this.onChangeValue('text', e, ee)} 
          as="textarea" 
          rows="10"
          placeholder="Füge hier eine URL oder Textnachricht ein"
        />
      </Form.Group>
      <Button onClick={this.handleSubmit} variant="primary">
        Nachricht überprüfen
      </Button>
    </Form>
    );
  }
}