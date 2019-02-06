import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import WidgetSingle from './pages/WidgetSingle';
import { BrowserRouter as Router, Route } from "react-router-dom";

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
    
          <Route exact path="/" render={(props) => <Home {...props} widgetsJson={widgetsJson} />} />
          <Route exact path="/about" component={About} />
          <Route path="/widget/:widgetSlug" render={(props) => <WidgetSingle {...props} widgetsJson={widgetsJson} />} />
        </div>
      </Router>
    );
  }
}

export default App;
