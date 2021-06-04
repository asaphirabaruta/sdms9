import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import StarBorder from '@material-ui/icons/StarBorder';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import PowerSettingsNewOutlinedIcon from '@material-ui/icons/PowerSettingsNewOutlined';
import ImportantDevicesIcon from '@material-ui/icons/ImportantDevices';
import { Link } from 'react-router-dom';
import studentAuth from '../../services/studentAuthService';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import Divider from '@material-ui/core/Divider';
import StudentDocuments from './StudentDocuments';
import { getMyPassport } from '../../services/documentsService';
import { api1 } from '../../config.json';
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
  other:{
    marginRight: theme.spacing(4),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  large:{
    width: theme.spacing(8),
    height: theme.spacing(9),
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(12)
  },
  
}));

export default function ClippedDrawer() {
  const classes = useStyles();
  const student = studentAuth.getCurrentUser();

  const [open, setOpen] = React.useState(false);
  const [myphoto, setMyphoto]= useState([]);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  useEffect(()=>{
    const fetchData = async ()=>{
      try {

        const photo = await getMyPassport();     
        setMyphoto(photo.data);

      } catch (err) {
        console.error(err.message);
      }
    }
    fetchData();
  },[])

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
          <Button edge="end" color="inherit" >{student.reg}</Button>
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
        <Avatar alt={student.name} src={api1 +'/' + myphoto} className={classes.large} />
          <List>
            <ListItem>
            <ListItemIcon>
                    <PersonOutlineIcon/>
                    </ListItemIcon>
              <ListItemText primary={student.name}/>
            </ListItem>
            <Divider/>
            <ListItem button onClick={handleClick}>
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
                        selected={selectedIndex === 1}
                        onClick={(event) => handleListItemClick(event, 1)}
                        className={classes.nested}>
                        <ListItemIcon>
                        <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="My Documents" />
                    </ListItem>
                    <ListItem 
                        button 
                        selected={selectedIndex === 2}
                        onClick={(event) => handleListItemClick(event, 2)}
                        className={classes.nested}>
                        <ListItemIcon>
                        <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="Transcripts" />
                    </ListItem>                    
                    </List>
                </Collapse>
          </List>
         
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        <StudentDocuments/>       
      </main>
    </div>
  );
}
