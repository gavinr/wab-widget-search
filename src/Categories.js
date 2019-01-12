import React, { Component } from 'react'

export default class Categories extends Component {
  render() {
    return (
      <nav className="js-accordion accordion">
        <div className="accordion-section is-active">
          <h4 className="accordion-title ">Categories</h4>
          <div className="accordion-content">
            { 
              this.props.categories.map((category, i) => {
                return <a href="/todo" className="side-nav-link" key={i}>{category}</a>
              }) 
            }
          </div>
        </div>
      </nav>
    )
  }
}
