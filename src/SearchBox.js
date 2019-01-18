import React, { Component } from 'react'

export default class SearchBox extends Component {
  render() {
    return (
      <div className="input-group">
        <input className="input-group-input" type="text" placeholder="Find a great widget for your app!" onChange={(e) => this.props.searchChange(e)} />
        <span className="input-group-button">
          <button className="btn">Search</button>
        </span>
      </div>
    )
  }
}
