import React from 'react';
import { Box, ListItemAvatar, Avatar, ListItemText } from '@material-ui/core';
import { StyledListItem } from './Styles';

function ChatMessage({ user, message }) {
  return (
    <Box display='flex' flexDirection={user === message.user ? 'row-reverse' : 'row'}>
      <StyledListItem user={user} message={message} loading={false}>
        <ListItemAvatar>
          <Avatar alt='Remy Sharp' src='' />
        </ListItemAvatar>
        <ListItemText primary={message.user} secondary={message.msg} />
      </StyledListItem>
    </Box>
  );
}

export default ChatMessage;
