import React, { useState, useEffect } from 'react';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';
import {getDoc_Categories} from "../../services/doc_CategoriesService";
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
   
    Buttons: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(30)
    }
}))

const initialFValues = {    
    staff_email: '',
    phone: '',   
    doc_category_id: '',    
}

export default function AddDocumentForm(props) {

    const classes = useStyles(); 
    const { addOrEdit } = props;
    const [doc, setDoc] = useState([]);
    const [myFile, setMyFile] = useState(null);
   

    useEffect(()=>{
        const fetchData = async()=>{
            try {
                
                const allDoc = await getDoc_Categories(); 
                console.log(allDoc);
                setDoc(allDoc.data);                                
            } catch (err) {
                
            }
        }
        fetchData();
        
    },[]);

    const validate = (fieldValues = values) => {
        let temp = { ...errors }       
        // if ('staff_email' in fieldValues)
        //     temp.staff_email = (/$^|.+@.+..+/).test(fieldValues.staff_email) ? "" : "Email is not valid."
        if ('description' in fieldValues)
            temp.description = fieldValues.description.length !==0 ? "" : "Minimum 10 numbers required."
        if ('doc_category_id' in fieldValues)
            temp.doc_category_id = fieldValues.doc_category_id.length !== 0 ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        // setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = async e => {
        e.preventDefault()
        // if (validate()) {
        //     addOrEdit({
        //         name:values.staff_name,
        //         role:1,
        //         email:values.document,
        //         phone:values.description,
        //         city:values.city,
        //         passcode:'computer' 
        //     }, resetForm);          
            
        // }
        
        const data = new FormData();
        data.append("dc_id", values.doc_category_id)
        data.append("desc", values.description);
        data.append("document", myFile);
        addOrEdit(data);
        

    }

    const handleFileChange = e =>{
        setMyFile(e.target.files[0]);
        
    }

    return (
        <Form onSubmit={handleSubmit}>            
                    <Controls.Select
                        name="doc_category_id"
                        label="Type of Document"
                        value={values.doc_category_id}
                        onChange={handleInputChange}
                        options={doc}
                        error={errors.doc_category_id}
                    />
                    
                    <Controls.Input                        
                        type="file"
                        name="document"
                        value={values.document}
                        onChange={handleFileChange}
                        // error={errors.staff_email}
                    />

                    <Controls.Input
                        label="Description"
                        name="description"                        
                        value={values.description}
                        onChange={handleInputChange}
                        error={errors.phone}
                    />                            
                    
                    <div className={classes.Buttons}>
                        <Controls.Button
                            type="submit"
                            text="Submit" />
                        {/* <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm} /> */}
                    </div>               
        </Form>
    )
}
