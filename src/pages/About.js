import React from 'react'

export default function About() {
  return (
    <div className="panel panel-white panel-no-padding padding-leader-1 padding-trailer-1">
      <div className="grid-container">
        <main className="column-24" role="main">
          <p>This site is based on an open source list of custom Web AppBuilder widgets, maintained on <a href="https://github.com/gavinr/wab-widget-search">GitHub</a>. If we're missing a widget or something is wrong with the data, let us know by <a href="https://github.com/gavinr/wab-widget-search/issues/new">opening an issue</a>.</p>
          <p>Out-of-the-box widgets from Esri are listed <a href="https://developers.arcgis.com/web-appbuilder/guide/widget-overview.htm">here</a>.</p>
        </main>
      </div>
    </div>
  )
}
