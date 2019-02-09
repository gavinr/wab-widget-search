import React from 'react'

export default function Categories({categories, currentCategory, categoryChange}) {
  function c(e, category) {
    e.preventDefault();
    categoryChange(category);
  }

  return (
    <nav className="js-accordion accordion">
      <div className="accordion-section is-active">
        <h4 className="accordion-title ">Categories</h4>
        <div className="accordion-content">
          { 
            categories.map((category, i) => {
              return <a href="/todo" className={`side-nav-link ${currentCategory === category ? 'is-active' : ''}`} key={i} onClick={(e) => {c(e, category)}}>{category}</a>
            }, this)
          }
        </div>
      </div>
    </nav>
  )
}
