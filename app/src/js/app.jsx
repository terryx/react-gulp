'use strict';

import React from 'react';
import Main from './components/Main.jsx';

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {}

  componentWillUnmount() {}

  componentDidMount() {}

  render() {
    return (
      <div>Hello React World</div>
    )
  }
}
React.render(<App/>, document.body);
