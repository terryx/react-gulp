'use strict';

import React from 'react';
import ReactZeroClipboard from 'react-zeroclipboard';
import Promise from 'bluebird';
import Main from './components/Main';

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

var peer = new Peer({
  key: '256hdt0npeng66r',
  debug: 0,
  config: {
    'iceServers': [{
      url: 'stun:stun.l.google.com:19302'
    }]
  }
});

var App = React.createClass({

  getInitialState: function() {
    return {
      connectionId: null,
      sender: {},
      receiver: []
    }
  },

  getUserMedia: function() {

    return new Promise(function(resolve, reject) {
      navigator.getUserMedia({
        audio: true,
        video: true
      }, (stream) => {

        resolve(stream);

      }, (err) => {
        reject(err);
      });

    });
  },

  getUrlParams: function() {
    var queryString, params;

    queryString = window.location.search;
    if (!queryString) {
      return;
    }

    queryString = queryString.substr(1);
    params = {};
    queryString.split("&").forEach(function(part) {
      var item = part.split("=");
      params[item[0]] = decodeURIComponent(item[1]);
    });
    return params;
  },

  componentWillMount: function() {},

  componentDidMount: function() {

    peer.on('open', (connectionId) => {
      console.log('My peer ID is: ' + connectionId);

      this.getUserMedia().then((stream) => {

        let url = URL.createObjectURL(stream);

        let sender = {
          stream: stream,
          url: url,
          connectionId: connectionId
        }

        let params = this.getUrlParams();

        //try to join existing room
        if (params && params.rid) {
          console.log('params ' + params.rid)
          let call = peer.call(params.rid, stream);

          this.joinConnection(call);

        }

        this.setState({
          sender: sender,
          connectionId: connectionId
        });

        return;

      });

    });


    //sender receive stream
    peer.on('call', (call) => {
console.log(call)
      call.answer(this.state.sender.stream);
      this.joinConnection(call);

    });

    peer.on('error', function(err) {
      //alert(err.message);
      console.log(err.message)
    });

  },

  joinConnection: function(call) {

    if (!call) {
      return;
    }

    // if (window.existingCall) {
    //   window.existingCall.close();
    // }

    //Wait for stream on the call, then set peer video display
    call.on('stream', (stream) => {

      console.log(stream)

      let receiver = this.state.receiver;

      receiver.push({
        stream: stream,
        url: URL.createObjectURL(stream),
        connectionId: this.state.connectionId
      });

      this.setState({
        receiver: receiver
      });

      // $('#their-video').prop('src', URL.createObjectURL(stream)); 
    });
  },


  render: function() {
    var text = 'asd';

    return (
      <div className="pane">
        <div className="bar bar-header">
          <h1 className="title">
            <ReactZeroClipboard text={this.state.roomUrl}>
              <button className="button"></button>
            </ReactZeroClipboard>
          </h1>
        </div>
          <div className="item">
             <button type="button" className="button button-assertive">
                
             </button>
             <input type="text" value={this.state.myConnectionId} readOnly/>
          </div>
          <div className="item">
             <button type="button" className="button button-positive" onClick={this.joinConnection}>
                Join a room
             </button>
             <input type="text" ref="connectionId"/>
          </div>
        <Main sender={this.state.sender} receiver={this.state.receiver} />
      </div>
    );
  }
});

React.render(<App/>, document.body);
