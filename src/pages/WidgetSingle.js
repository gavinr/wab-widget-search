import React, { Component } from 'react'

export default class WidgetSingle extends Component {

  getCategoryLinks(currentWidget) {
    let retLinks = [];
    currentWidget.categories.forEach((category, i) => {
      retLinks.push(<a href={category} className="btn btn-clear" key={i}>{category}</a>);
    });
    return retLinks;
  }

  makeLicense(data) {
    if (data === 'http://www.apache.org/licenses/LICENSE-2.0') {
      return (<a href="https://choosealicense.com/licenses/apache-2.0/" target="_blank" rel="noopener noreferrer" >Apache 2.0</a>);
    } else if (data === 'MIT' || data === 'MIT License') {
      return (<a href="https://choosealicense.com/licenses/mit/" target="_blank" rel="noopener noreferrer" >Apache 2.0</a>);
    } else if (data.startsWith('http://')) {
      // return '<a href="' + data + '" target="_blank">' + data + '</a>';
      return (<a href={data} target="_blank" rel="noopener noreferrer" >{data}</a>);
    }
    return data;
  };
  
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
              <div className="column-8">
                {currentWidget.thumbnail ? <img src={currentWidget.thumbnail} alt="Widget thumbnail" /> : ''}
                <a href={currentWidget.url} target="_blank" rel="noopener noreferrer" className="btn btn-fill">Download from Homepage</a>
                <div>License: {this.makeLicense(currentWidget.license)}</div>
                <div>Author: {currentWidget.author}</div>


                { categories }
              </div>
              <div className="column-16">
                <h1>{currentWidget.name}</h1>
                <p>{currentWidget.description}</p>
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
