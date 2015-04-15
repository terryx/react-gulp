var React = require('react');
var Main = require('./components/Main');

var App = React.createClass({
  render: function() {
    return <Main>Hello World</Main>
  }
});

React.render(<App/>, document.body);
