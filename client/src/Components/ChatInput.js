import React, { useState } from 'react';
import { Paper, InputBase, Divider, IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { chatInputStyles, StyledPaper } from './Styles';

function ChatInput({ input, value }) {
  const [message, setMessage] = useState('');
  const classes = chatInputStyles();

  return (
    <StyledPaper component='form' className={classes.root}>
      <InputBase
        value={value}
        onChange={(e) => setMessage(e.target.value)}
        className={classes.input}
        placeholder='Input message and send'
      />
      <Divider className={classes.divider} orientation='vertical' />
      <IconButton onClick={() => input(message)} color='primary' className={classes.iconButton} aria-label='directions'>
        <SendIcon />
      </IconButton>
    </StyledPaper>
  );
}

export default ChatInput;
