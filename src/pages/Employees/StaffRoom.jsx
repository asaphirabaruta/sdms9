import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ImportantDevicesIcon from '@material-ui/icons/ImportantDevices';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import ScheduleOutlinedIcon from '@material-ui/icons/ScheduleOutlined';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import StarBorder from '@material-ui/icons/StarBorder';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import NotificationsOutlinedIcon from '@material-ui/icons/NotificationsOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import PowerSettingsNewOutlinedIcon from '@material-ui/icons/PowerSettingsNewOutlined';
import EmployeesTbl from './EmployeesTbl';
import { Route, Switch, Redirect,Link } from 'react-router-dom';
import Settings from '../../components/settings';
import StudentList from './StudentsList';
import MyAccount from '../../components/MyAccount';
import Timetable from '../../components/timetable';
import Notifications from '../../components/notifications';
import staffAuth from '../../services/staffAuthService';
import Tooltip from '@material-ui/core/Tooltip';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    flexGrow: 1,
    zIndex: theme.zIndex.drawer + 1,
  },
  title:{
      flexGrow: 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  other:{
    marginRight: theme.spacing(4),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

export default function StaffRoom() {
  const classes = useStyles();
  const staff = staffAuth.getCurrentUser();
  console.log(staff);
  

  const [open, setOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };  

  const handleClick = () => {
    setOpen(!open);
}

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <ImportantDevicesIcon />
          </IconButton>
          
          <Typography variant="h6" noWrap className={classes.title}>
          Students Documents Management System
          </Typography>

          <Typography>
          {staff.email}
          </Typography>

          <IconButton color="inherit">
              <EmailOutlinedIcon/>
          </IconButton>

          <IconButton color="inherit">
              <PersonOutlineIcon/>
          </IconButton>

          <Tooltip title="Logout">
          <IconButton color="inherit" component={Link} to="/logout">
              <PowerSettingsNewOutlinedIcon/>
          </IconButton>
          </Tooltip>
          
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            { (staff.isAdmin &&
              <ListItem 
                button
                selected={selectedIndex === 2}
                onClick={(event) => handleListItemClick(event, 2)} 
                component={ Link } 
                to="/staffRoom/staffMembers" >
                <ListItemIcon><PeopleAltOutlinedIcon/></ListItemIcon>
                <ListItemText primary='Employees' />
              </ListItem>) }

              <ListItem 
                button 
                selected={selectedIndex === 1}
                onClick={(event) => handleListItemClick(event, 1)}
                component={ Link } 
                to="/staffRoom/studentList" >
                <ListItemIcon><PeopleOutlineIcon/></ListItemIcon>
                <ListItemText primary='Students' />
              </ListItem>
              <ListItem 
              button              
              onClick={handleClick}>
                    <ListItemIcon>
                    <FileCopyOutlinedIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Documents" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                    <ListItem 
                      button
                      selected={selectedIndex === 3}
                      onClick={(event) => handleListItemClick(event, 3)} 
                      className={classes.nested}>
                        <ListItemIcon>
                        <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="Transcripts" />
                    </ListItem>
                    <ListItem 
                      button
                      selected={selectedIndex === 4}
                      onClick={(event) => handleListItemClick(event, 4)} 
                      className={classes.nested}>
                        <ListItemIcon>
                        <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="ID" />
                    </ListItem>
                    <ListItem 
                      button
                      selected={selectedIndex === 5}
                      onClick={(event) => handleListItemClick(event, 5)} 
                      className={classes.nested}>
                        <ListItemIcon>
                        <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="A2 Certificates" />
                    </ListItem>
                    <ListItem 
                      button 
                      selected={selectedIndex === 6}
                      onClick={(event) => handleListItemClick(event, 6)}
                      className={classes.nested}>
                        <ListItemIcon>
                        <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="Student ID" />
                    </ListItem>
                    <ListItem 
                      button 
                      selected={selectedIndex === 7}
                      onClick={(event) => handleListItemClick(event, 7)}
                      className={classes.nested}>
                        <ListItemIcon>
                        <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="Passport" />
                    </ListItem>
                    <ListItem 
                      button 
                      selected={selectedIndex === 8}
                      onClick={(event) => handleListItemClick(event, 8)}
                      className={classes.nested}>
                        <ListItemIcon>
                        <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="Bank Slips" />
                    </ListItem>
                    </List>
                </Collapse>

              

              <ListItem 
                button 
                selected={selectedIndex === 9}
                onClick={(event) => handleListItemClick(event, 9)}
                component={ Link } 
                to="/staffRoom/timetable" >
                <ListItemIcon><ScheduleOutlinedIcon/></ListItemIcon>
                <ListItemText primary='Timetable' />
              </ListItem>

              <ListItem 
                button 
                selected={selectedIndex === 10}
                onClick={(event) => handleListItemClick(event, 10)}
                component={ Link } 
                to="/staffRoom/notifications" >
                <ListItemIcon><NotificationsOutlinedIcon/></ListItemIcon>
                <ListItemText primary='Notifications' />
            </ListItem> 
            
          </List>          
         
          <Divider/>
          <List>
              <ListItem 
              button 
              selected={selectedIndex === 11}
              onClick={(event) => handleListItemClick(event, 11)}
              component={ Link } 
              to="/staffRoom/myAccount" >
                  <ListItemIcon><AccountCircleOutlinedIcon/></ListItemIcon>
                  <ListItemText primary="My Account"/>
              </ListItem>
              <ListItem 
              button 
              selected={selectedIndex === 12}
              onClick={(event) => handleListItemClick(event, 12)}
              component={ Link } 
              to="/staffRoom/settings" >
                  <ListItemIcon><SettingsOutlinedIcon/></ListItemIcon>
                  <ListItemText primary="Settings"/>
              </ListItem>
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        <Switch>
          
            <Route path="/staffRoom/staffMembers" component={EmployeesTbl}/>
            <Route path="/staffRoom/settings" component={Settings}/>
            <Route path="/staffRoom/studentList" component={StudentList}/>
            <Route path="/staffRoom/myAccount" component={MyAccount}/>
            <Route path="/staffRoom/timetable" component={Timetable}/>
            <Route path="/staffRoom/notifications" component={Notifications}/>
            <Redirect from="/staffRoom" to="/staffRoom/studentList"/>           
        
        </Switch>        
      </main>
    </div>
  );
}
