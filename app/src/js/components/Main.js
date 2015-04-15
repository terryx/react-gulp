var React = require('react');

var Main = React.createClass({
  render: function() {
    return (
      <h1 className="text-primary">{this.props.children}s</h1>
    );
  }
});

module.exports = Main;
