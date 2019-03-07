import React, { Component } from 'react';
import './App.css';
import List from './List';
import ListItems from './ListItems';

class App extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      currentItem: {text:'', homepage:''},
      currentItem2: {text:'', description:''},
    };
  };
  handleInput = e => {
    const itemText = e.target.value;
    const currentItem = {text:itemText, id: Date.now()};
    this.setState( {
      currentItem,
    });
  };
  handleInput2 = e => {
    const itemText2 = e.target.value;
    const currentItem2 = {text:itemText2, id: Date.now()};
    this.setState( {
      currentItem2,
    });
  };
  componentDidMount() {
    this.getItems();
  }
  getItems = e => {
    fetch("https://www.onlinetool.in/api/products/")
    .then(result =>  result.json())
    .then(results => this.setState({'items': results}))
  }
  addItem = e => {
    e.preventDefault()
    const newItem = this.state.currentItem;
    const newItem2 = this.state.currentItem2;
    if(newItem.text !== '' && newItem2.text !== '') {
      var data = JSON.stringify({
        "homepage": newItem.text,
        "description": newItem2.text
      });

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      fetch("https://www.onlinetool.in/api/products/", {
        method: "POST",
        body: data,
        headers: myHeaders
      }).then(res => {
        if(res.status === 201) {
          return res.json();
        }
        throw new Error('response code was not ok.');
      })
      .then (arrayData => {
        if(arrayData.homepage === newItem.text && arrayData.description === newItem2.text) {
          const items = [...this.state.items, {id:newItem.id, homepage:newItem.text, description: newItem2.text}];
          this.setState({
          items: items,
          currentItem: { text:'', homepage:''},
          currentItem2: { text:'', description:''},
        })
       } else {
        throw new Error('response data was not ok.');
      }
    })
      .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
      });
    }
  }
  render() {
    return (
      <div className="App">
      <List 
        addItem={this.addItem} 
        inputElement = {this.inputElement}
        inputElement2={this.inputElement2}
        handleInput = {this.handleInput}
        handleInput2 = {this.handleInput2}
        currentItem = {this.state.currentItem}
        currentItem2 = {this.state.currentItem2}
      />

      <ListItems entries={this.state.items}/>
      </div>

      );
    }
  }

  export default App;
