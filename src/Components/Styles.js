import styled from 'styled-components';
import { Typography, Paper, ListItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Login from './Login';

export const StyledBody = styled.div`
  height: 100vh;
  width: 100%;
  background-color: #bae7ff;
`;

export const StyledLogin = styled(Login)`
  && {
    position: absolute;
    top: 50%;
  }
`;

export const StyledBottom = styled.div`
  && {
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
  }
`;

export const StyledTitle = styled(Typography)`
  && {
    text-align: center;
    width: 100%;
    padding: 2%;
    background-color: #91d5ff;
    color: #efefef;
    font-size: 50px;
  }
`;

export const StyledPaper = styled(Paper)`
  && {
    margin: auto;
    width: 50%;
    padding: 10px;
  }
`;

export const StyledListItem = styled(ListItem)`
  && {
    width: 300px;
    margin: 16px 4px 0 4px;
    background-color: ${(props) => (props.user === props.message.user ? 'lightgrey' : 'deepskyblue')};
    border-radius: 50px;
  }
`;

export const loginStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const chatInputStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));
