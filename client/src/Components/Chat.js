import React, { Component } from 'react';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import { StyledLogin, StyledTitle, StyledBottom } from './Styles';
import { CssBaseline } from '@material-ui/core';
import { MuiThemeProvider } from 'material-ui/styles';
import { getMessages, postMessage } from '../Api/Server';

const baseAddress = process.env.API_URL || window.location.protocol + '//' + window.location.hostname + '/api';
const websocketUrl = `${baseAddress.replace('http', 'ws')}/websocket`;

class Chat extends Component {
  constructor() {
    super();

    this.state = {
      user: '',
      isLoggedIn: false,
      messages: [],
    };
  }

  ws = new WebSocket(websocketUrl);

  async componentDidMount() {
    const response = await getMessages();
    response.map((message) => {
      this.setState({
        messages: [
          ...this.state.messages,
          {
            msg: message.message,
            user: message.user,
          },
        ],
      });
    });

    this.ws.onopen = () => {
      console.log('connected');
    };

    this.ws.onmessage = (evt) => {
      const message = JSON.parse(evt.data);
      this.addMessage(message);
    };

    this.ws.onclose = () => {
      console.log('disconnected');

      this.setState({
        ws: new WebSocket(websocketUrl),
      });
    };
  }

  addMessage = (message) => {
    this.setState((state) => ({
      messages: [
        ...state.messages,
        {
          msg: message.message,
          user: message.user,
        },
      ],
    }));
  };

  submitMessage = (messageString) => {
    const message = { user: this.state.user, message: messageString };
    this.ws.send(JSON.stringify(message));
    this.addMessage(message);
    postMessage(message);
  };

  render() {
    return (
      <MuiThemeProvider>
        <CssBaseline />
        {this.state.isLoggedIn ? (
          <div>
            <StyledTitle>Hello {this.state.user}</StyledTitle>
            {this.state.messages.map((message) => (
              <div key={message.msg}>
                <ChatMessage user={this.state.user} message={message} />
              </div>
            ))}
            <StyledBottom>
              <ChatInput value={this.state.searchVal} input={(value) => this.submitMessage(value)} />
            </StyledBottom>
          </div>
        ) : (
          <StyledLogin login={(value) => this.setState({ isLoggedIn: true, user: value })} />
        )}
      </MuiThemeProvider>
    );
  }
}

export default Chat;
