import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';
import {getDepartments} from "../../services/departmentService";
import InputPassword from '../../components/controls/InputPassword';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme)=>({   
    Buttons:{
        marginTop: theme.spacing(2),
    }
}))

const genderItems = [ 
    { id: 'male', title: 'Male' },
    { id: 'female', title: 'Female' },    
]

const initialFValues = {
    id: 0,
    staff_name: '',
    staff_email: '',
    phone: '',
    password1:'',
    password2:'',    
    gender: 'male',
    departmentId: '',    
}

export default function EmployeeForm(props) {
    const classes = useStyles();
    const { addOrEdit, recordForEdit } = props;
    const [depart, setDepart] = useState([]);
   

    useEffect(()=>{
        const fetchData = async()=>{
            try {                
                const allDepart = await getDepartments();                
                setDepart(allDepart.data);                                
            } catch (err) {
                
            }
        }
        fetchData();
        
    },[]);

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('staff_name' in fieldValues)
            temp.staff_name = fieldValues.staff_name ? "" : "This field is required."
        if ('staff_email' in fieldValues)
            temp.staff_email = (/$^|.+@.+..+/).test(fieldValues.staff_email) ? "" : "Email is not valid."
        if ('phone' in fieldValues)
            temp.phone = fieldValues.phone.length > 9 ? "" : "Minimum 10 numbers required."
        if ('departmentId' in fieldValues)
            temp.departmentId = fieldValues.departmentId.length !== 0 ? "" : "This field is required."
        if ('password1' in fieldValues)
            temp.password1 = fieldValues.password1.length !== 0 ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            addOrEdit({
                name:values.staff_name,
                role:values.departmentId,
                email:values.staff_email,
                phone:values.phone,                
                passcode:values.password1
            }, resetForm);          
            
        }
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        label="Full Name"
                        name="staff_name"
                        value={values.staff_name}
                        onChange={handleInputChange}
                        error={errors.staff_name}
                    />
                    <Controls.Input
                        label="Email"
                        name="staff_email"
                        value={values.staff_email}
                        onChange={handleInputChange}
                        error={errors.staff_email}
                    />
                    <Controls.Input
                        label="Mobile"
                        name="phone"
                        value={values.phone}
                        onChange={handleInputChange}
                        error={errors.phone}
                    />
                    <Controls.RadioGroup
                        name="gender"
                        label="Gender"
                        value={values.gender}
                        onChange={handleInputChange}
                        items={genderItems}
                    />

                </Grid>
                <Grid item xs={6}>
                    <Controls.Select
                        name="departmentId"
                        label="Department"
                        value={values.departmentId}
                        onChange={handleInputChange}
                        options={depart}
                        error={errors.departmentId}
                    />
                    <InputPassword
                        name="password1"
                        label="Create password"
                        value={values.password1}
                        onChange ={handleInputChange}
                        />
                    <InputPassword
                        name="password2"
                        label="Re-type password"
                        value={values.password2}
                        onChange ={handleInputChange}
                        />                   

                    <div className={classes.Buttons}>
                        <Controls.Button
                            type="submit"
                            text="Submit" />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}
