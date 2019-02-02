import React, { Component } from 'react'

export default class Categories extends Component {
  categoryChange(e, category) {
    e.preventDefault();
    this.props.categoryChange(category);
  }

  render() {
    return (
      <nav className="js-accordion accordion">
        <div className="accordion-section is-active">
          <h4 className="accordion-title ">Categories</h4>
          <div className="accordion-content">
            { 
              this.props.categories.map((category, i) => {
                return <a href="/todo" className={`side-nav-link ${this.props.currentCategory === category ? 'is-active' : ''}`} key={i} onClick={(e) => {this.categoryChange(e, category)}}>{category}</a>
              }, this)
            }
          </div>
        </div>
      </nav>
    )
  }
}
