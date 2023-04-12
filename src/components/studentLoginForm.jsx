import React, { useState } from 'react';
import { Form } from './useForm';
import Controls from './controls/Controls';
import { makeStyles } from '@material-ui/core/styles';
import InputPassword from './controls/InputPassword';
import { Link } from 'react-router-dom';
import studentAuth from '../services/studentAuthService';

const useStyles = makeStyles((theme)=>({
    root:{
        marginLeft:theme.spacing(4),
        marginTop:theme.spacing(4),
    },
    mainButton:{
        marginLeft:theme.spacing(6),
        marginTop: theme.spacing(4),
    },
    anotherButton:{
        marginTop: theme.spacing(4),
    }
}))

export default function StudentLoginForm(props){
    const classes = useStyles();       

    const [student, setStudent]= useState({
        reg:'',
        password:''
    })


    const handleChange = e =>{
        const account = {...student};
        account[e.currentTarget.name]= e.currentTarget.value;
        setStudent(account);
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();        
        await studentAuth.login(student.reg, student.password);
        window.location ='/studentRoom';
        console.log(studentAuth.getCurrentUser());
    }

    return (
        <div className={classes.root}>
            <Form onSubmit={handleSubmit}>
                <Controls.Input
                    name="reg"
                    label="Registration Number"
                    value={student.reg}
                    onChange={handleChange}
                    />               
                <InputPassword
                    name="password"
                    label="Password"
                    value={student.password}
                    onChange={handleChange}
                    />
                <Controls.Button
                    type="submit"
                    text="Login"
                    className={classes.mainButton}                   
                    />
                <Controls.Button
                    type="button"
                    text="Forgot Password"
                    className={classes.anotherButton}
                    {/*component={Link}
                    to="/signUp"*/}
                    />
            </Form>
        </div>
    );
}
