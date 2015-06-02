'use strict';

import React from 'react';

var Main = React.createClass({

  getDefaultProps: function() {
    return {
      receiver: []
    }
  },
  
  render: function() {
    if (!this.props.sender) {
      return (<div></div>);
    }

    let players = [];
    let sender = this.props.sender;
    let receiver = this.props.receiver;

    players.push(
      <div key={"video-sender"}>
        <video className="player" src={sender.url} muted="true" autoPlay></video>
      </div>
      )

    receiver.forEach(function(video, i) {
      players.push(
        <div key={"video" + i}>
          <video className="player" src={video.url} muted="true" autoPlay></video>
        </div>
      );
    });

    return (
      <div>{players}</div>
    )
  }

});

module.exports = Main;
