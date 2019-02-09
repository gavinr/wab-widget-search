import React from 'react';
import CardImage from './CardImage';

function Card({thumbnail, title, description, link}) {
  let image = '';
  if(thumbnail) {
    image = <CardImage image={thumbnail}></CardImage>;
  }
  return (
    <div className="card card-bar-blue block trailer-1">
      {image}
      <div className="card-content">
        <h4>{title}</h4>
        <p className="font-size--1 card-last">{description}</p>
        <a href={link} className="btn btn-clear btn-fill leader-1">More Info</a>
      </div>
    </div>
  );
}

export default Card;
