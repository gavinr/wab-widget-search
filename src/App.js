import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Header from './Header';
import Body from './Body';
import About from './About';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

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
      <Router>
        <div className="App">
          <Header />
    
          <Route exact path="/" render={(props) => <Body {...props} widgetsJson={widgetsJson} />} />
          <Route exact path="/about" component={About} />
        </div>
      </Router>
    );
  }
}

export default App;
