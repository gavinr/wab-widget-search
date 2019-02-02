import React, { Component } from 'react'

export default class WidgetSingle extends Component {
  render() {
    return (
      <div className="panel panel-white panel-no-padding padding-leader-1 padding-trailer-1">
        <div className="grid-container">
          <main className="column-24" role="main">
            {this.props.match.params.widgetSlug}
          </main>
        </div>
      </div>
    )
  }
}
