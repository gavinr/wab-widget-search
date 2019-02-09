import React from 'react'

export default function SearchBox({searchChange}) {
  return (
    <div className="input-group">
      <input className="input-group-input" type="text" placeholder="Find a great widget for your app!" onChange={(e) => searchChange(e)} />
      <span className="input-group-button">
        <button className="btn">Search</button>
      </span>
    </div>
  )
}
