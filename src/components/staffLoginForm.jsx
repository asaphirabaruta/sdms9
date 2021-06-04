import React, {useState} from 'react';
import Controls from './controls/Controls';
import { Form } from './useForm';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import InputPassword from './controls/InputPassword';
import staffAuth from '../services/staffAuthService';

const useStyles = makeStyles((theme)=>({
    root:{
        marginLeft:theme.spacing(4),
        marginTop: theme.spacing(4),
    },
    mainButton:{
        marginLeft:theme.spacing(15),
        marginTop: theme.spacing(4),
    },
}))

export default function StaffLoginForm(){
    const classes = useStyles();

    const [staff, setStaff]= useState({
        email:'',
        password:''
    })


    const handleChange = e =>{
        const account = {...staff};
        account[e.currentTarget.name]= e.currentTarget.value;
        setStaff(account);
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();        
        await staffAuth.login(staff.email, staff.password);
        window.location ='/staffRoom';
        console.log(staffAuth.getCurrentUser());
    }

    return(
        <div className={classes.root}>
            <Form onSubmit={handleSubmit} >
                <Controls.Input
                    name="email"
                    label="Email"
                    value={staff.email}
                    onChange ={handleChange}
                    />
                <InputPassword
                    name= "password"
                    label="Password"
                    value ={staff.password}
                    onChange ={handleChange}
                    /> 
                <Controls.Button
                    type="submit"
                    text="Login"
                    className={classes.mainButton}
                    // component={ Link }
                    // to="/staffRoom"
                    />
            </Form>
        </div>
    )
}