import React from 'react';
import FullWidthTabs from '../../components/myTabs';
import ButtonAppBar from '../../components/myAppBar';
import Filing_system from '../../Filing_system.svg';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root:{
        display:"flex"
    },
    image:{
        height:400,
        marginTop:theme.spacing(8)
    },
  }));

export default function Login(){
    const classes = useStyles();
    return(<div>
        <ButtonAppBar/>  
        <div className={classes.root}>
            <img src={Filing_system} alt="documents organizing" className={classes.image}/>
            <FullWidthTabs/> 
            </div>       
    </div>)
}

