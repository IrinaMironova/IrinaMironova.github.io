import React, { Component } from 'react'
import "@material/list/dist/mdc.list.min.css"

class ListItems extends Component {
  createTasks(item) {

  	return (<li key={item.id}>
  		<span> {item.homepage} </span>
  		
  		<span> {item.description} </span>
  		</li>)
    
  }
  render() {
    const listEntries = this.props.entries
    const listItems = listEntries.map(this.createTasks)

    return <ul className="theList mdc-list">{listItems}</ul>
  }
}

export default ListItems