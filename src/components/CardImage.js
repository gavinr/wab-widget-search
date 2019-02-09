import React from 'react'

export default function CardImage({image, caption}) {
  return (
    <figure className="card-image-wrap">
      <img className="card-image" src={image} alt="" />
      <figcaption className="card-image-caption">
        { caption }
      </figcaption>
    </figure>
  )
}
