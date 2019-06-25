import React from 'react'

export default function WidgetSingleSidebar({currentWidget, categories}) {

  function makeLicense(data) {
    if (data === 'http://www.apache.org/licenses/LICENSE-2.0') {
      return (<a href="https://choosealicense.com/licenses/apache-2.0/" target="_blank" rel="noopener noreferrer" >Apache 2.0</a>);
    } else if (data === 'MIT' || data === 'MIT License') {
      return (<a href="https://choosealicense.com/licenses/mit/" target="_blank" rel="noopener noreferrer" >Apache 2.0</a>);
    } else if (data && data.startsWith('http://')) {
      // return '<a href="' + data + '" target="_blank">' + data + '</a>';
      return (<a href={data} target="_blank" rel="noopener noreferrer" >{data}</a>);
    }
    return data;
  };

  return (
    <div>
      {currentWidget.thumbnail ? <img src={currentWidget.thumbnail} alt="Widget thumbnail" /> : ''}
      <a href={currentWidget.url} target="_blank" rel="noopener noreferrer" className="btn btn-fill trailer-1">Download from Homepage</a>
      {currentWidget.preview !== '' && 
        <a href={currentWidget.preview} target="_blank" rel="noopener noreferrer" className="btn btn-clear btn-fill trailer-1">Live Preview</a>
      }
      
      <div className="trailer-1">
        {currentWidget.hasOwnProperty('githubStars') && 
          <div>Popularity: {currentWidget.githubStars} GitHub Stars</div>
        }

        {currentWidget.geonetLikes && 
          <div>Popularity: {currentWidget.geonetLikes} Likes, {currentWidget.geonetComments} Comments</div>
        }
        
        <div>Author: {currentWidget.author}</div>
        <div>License: {makeLicense(currentWidget.license)}</div>
      </div>

      { categories }
    </div>
  )
}
