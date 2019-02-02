import React, { Component } from 'react'

export default class About extends Component {
  render() {
    return (
      <div className="panel panel-white panel-no-padding padding-leader-1 padding-trailer-1">
        <div className="grid-container">
          <main className="column-24" role="main">
            This site is based on an open source list of Web AppBuilder widgets, maintained on <a href="https://github.com/gavinr/wab-widget-search">GitHub</a>.
          </main>
        </div>
      </div>
    )
  }
}
