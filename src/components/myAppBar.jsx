import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ImportantDevicesIcon from '@material-ui/icons/ImportantDevices';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
   
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  bellButton:{
      marginRight:theme.spacing(2),
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>          
            <ImportantDevicesIcon edge="start" className={classes.menuButton}/>          
          <Typography variant="h6" className={classes.title}>
            Students Documents Management System
          </Typography>
          {/*<IconButton color="inherit" className={classes.bellButton} component={Link} to="/notices">
              <NotificationsNoneIcon/>
          </IconButton>*/}
          <Button color="inherit" className={classes.menuButton} component={ Link } to="/login">Login</Button>
          {/* <Button color="inherit" component={ Link } to="/signUp">Sign Up</Button> */}
        </Toolbar>
      </AppBar>
    </div>
  );
}
