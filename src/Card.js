import React, { Component } from 'react';
import CardImage from './CardImage';

class Card extends Component {
  render() {
    let image = '';
    if(this.props.image) {
      image = <CardImage image={this.props.image}></CardImage>;
    }
    return (
      <div className="card card-bar-blue block trailer-1">
        {image}
        <div className="card-content">
          <h4>{this.props.title}</h4>
          <p className="font-size--1 card-last">{this.props.description}</p>
          <a href={this.props.download} className="btn btn-clear btn-fill leader-1">More Info</a>
        </div>
      </div>
    );
  }
}

export default Card;
