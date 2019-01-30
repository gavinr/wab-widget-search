import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Header from './Header';
import Body from './Body';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      widgetsJson: []
    };
  }

  async componentDidMount() {
    // const url = 'https://s3.us-east-2.amazonaws.com/wab-widget-search/widgets.json';
    const url = 'https://www.arcgis.com/sharing/rest/content/items/60f1147723334e9aa1cafdddd2ce4239/data';
    try {
      const res = await fetch(url);
      const widgetsJson = await res.json();

      // https://reactjs.org/docs/faq-ajax.html
      this.setState({
        widgetsJson: widgetsJson
      });
    } catch (err) {
      console.error('Could not get widget JSON! Check the URL: ', url, err);
    }
  }

  render() {
    const { widgetsJson } = this.state;
    return (
      <div className="App">
        <Header></Header>
        <Body widgetsJson={widgetsJson}></Body>
      </div>
    );
  }
}

export default App;
