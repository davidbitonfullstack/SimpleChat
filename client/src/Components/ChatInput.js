import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { InputBase, Divider, IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { chatInputStyles, StyledPaper } from './Styles';

function ChatInput({ input, value }) {
  const [message, setMessage] = useState('');
  const classes = chatInputStyles();

  return (
    <StyledPaper className={classes.root}>
      <InputBase
        value={value}
        onChange={(e) => setMessage(e.target.value)}
        className={classes.input}
        placeholder='Input message and send'
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            input(message);
          }
        }}
      />
      <Divider className={classes.divider} orientation='vertical' />
      <IconButton onClick={() => input(message)} type='submit' color='primary' className={classes.iconButton} aria-label='directions'>
        <SendIcon />
      </IconButton>
    </StyledPaper>
  );
}

ChatInput.propTypes = {
  input: PropTypes.func,
  value: PropTypes.string,
};

export default ChatInput;
