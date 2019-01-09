import React, { Component } from 'react';

class Card extends Component {
  render() {
    return (
      <div className="card card-bar-blue block trailer-1">
        <div className="card-content">
          <h4>{this.props.title}</h4>
          <p className="font-size--1 card-last">Every color can in calcite can be used as a colored "bar" along the top of a card to provide a bit visual punch with <code>.card-bar-blue</code>.</p>
          <a href="../color/#ui-colors" className="btn btn-clear btn-fill leader-1">What colors?</a>
        </div>
      </div>
    );
  }
}

export default Card;
