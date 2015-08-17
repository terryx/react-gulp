'use strict';

import React from 'react';

class Main extends React.Component {

  render() {
    return (
      <div>{this.props.greeting}</div>
    )
  }
}

Main.propTypes = {
  greeting: React.PropTypes.number
};

export default Main;
