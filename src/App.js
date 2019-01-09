import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Header from './Header';
import Categories from './Categories';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      widgetsJson: []
    };
  }

  async componentDidMount() {
    const url = 'https://s3.us-east-2.amazonaws.com/wab-widget-search/widgets.json';
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
        <Categories widgetsJson={widgetsJson}></Categories>
      </div>
    );
  }
}

export default App;
