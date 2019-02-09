import React, { Component } from 'react'
import WidgetSingleSidebar from './WidgetSingleSidebar';

export default class WidgetSingle extends Component {

  getCategoryLinks(currentWidget) {
    let retLinks = [];
    currentWidget.categories.forEach((category, i) => {
      retLinks.push(<a href={category} className="btn btn-clear" key={i}>{category}</a>);
    });
    return retLinks;
  }
  
  
  render() {
    
    if(this.props.widgetsJson.length > 0) {
      const currentWidget = this.props.widgetsJson.filter((widget) => {
        // console.log('widget', widget);
        // console.log('check', widget.slug === this.props.match.params.widgetSlug);
        return widget.slug === this.props.match.params.widgetSlug;
      })[0];

      let categories;
      if(currentWidget.categories.length > 0) {
        categories = (<div>
            <h4>Categories:</h4>
            <div>
              {this.getCategoryLinks(currentWidget)}
            </div>
          </div>
        );
      }

      return (
        <div className="panel panel-white panel-no-padding padding-leader-1 padding-trailer-1">
          <div className="grid-container">
            <main className="column-24" role="main">
              <div className="column-16">
                <h1 className="trailer-1">{currentWidget.name}</h1>
                <p>{currentWidget.description}</p>
              </div>
              <div className="column-8">
                <WidgetSingleSidebar currentWidget={currentWidget} categories={categories} />
              </div>
            </main>
          </div>
        </div>
      )
    } else {
      return (<div></div>);
    }
  }
}
