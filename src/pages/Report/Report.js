import React, { Component } from 'react';
import { Form, Spinner } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import fetchAPI from '../../utils/fetchAPI';
import authentication from '../../utils/react-azure-adb2c'
import  {  } from 'react-router-dom'

//import Reaptcha from 'reaptcha';

window.id = 0;

export default class Report extends Component {

 

  state = {
    text: '',
    sources: [],
    tempSource: '',
    isReported: false,
    isLoading: false,
  }


  handleAddNew = () => {
    const { sources, tempSource } = this.state;
    this.setState({ sources: [...sources, tempSource], tempSource: '' })
  }

  handleSubmit = async () => {
    
    const adb2cToken = authentication.getAccessToken();
    this.setState({ isLoading: true });
    try {
      const response = await fetchAPI.postData('https://we-checkdenfakt-apimgm.azure-api.net/we-sendfact-fa/messagearchive', { text: this.state.text }, adb2cToken)
      
    } catch (e) {
      
      this.setState({ isReported: false, isLoading: false })
    } finally {
      this.props.history.push('/voting');
    }
  }

  render () {
    const { text, isReported, isLoading } = this.state; 
    // Declare a new state variable, which we'll call "count"
    return (
    <div>
      <div className="text-center">
      <h1 className="display-4">Falschnachricht melden</h1>
      <p className="lead">Du hast eine Falschnachricht entdeckt? Teile sie hier mit uns!</p>
      </div>
     
      <div className="d-flex justify-content-center mt-n3">
        <div className="polygon background-color-1">
        <Form className="container">
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label></Form.Label>
          <Form.Control
            onChange={({ currentTarget }) => this.setState({ text: currentTarget.value })} 
            as="textarea" 
            rows="6"
            value={text}
            placeholder="Füge hier eine URL oder Textnachricht ein"
          />
        </Form.Group>
        {/* <div>
          <p className="lead">Deine Belege:</p>
          {sources.map(source => <p>{source}</p>)}
          <Form.Control
              onChange={({ currentTarget }) => this.setState({ tempSource: currentTarget.value })}
              value={tempSource}
              placeholder="Quellen einfügen"
          />
          <a onClick={this.handleAddNew}>Weiteren Beleg hinzufügen +</a>
        </div> */}
        {isLoading ? <Spinner animation="border" /> : <Button 
        disabled={!text} 
        onClick={this.handleSubmit} 
        variant="primary"
      >
        Nachricht einreichen
      </Button>}
      </Form>}
    </div>
    </div>
        </div>
    );
  }
}
