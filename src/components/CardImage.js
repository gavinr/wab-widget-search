import React, { Component } from 'react'

export default class CardImage extends Component {
  render() {
    return (
      <figure className="card-image-wrap">
        <img className="card-image" src={this.props.image} alt="" />
        <figcaption className="card-image-caption">
          { this.props.caption }
        </figcaption>
      </figure>
    )
  }
}
