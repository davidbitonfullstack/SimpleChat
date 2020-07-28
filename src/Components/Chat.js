import React, { Component } from 'react';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import { StyledLogin, StyledTitle, StyledBottom, StyledBody } from './Styles';

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

  componentDidMount() {
    this.ws.onopen = () => {
      console.log('connected');
    };

    this.ws.onmessage = (evt) => {
      const message = JSON.parse(evt.data);
      debugger;
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
    debugger;
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
  };

  render() {
    return (
      <StyledBody>
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
      </StyledBody>
    );
  }
}

export default Chat;
