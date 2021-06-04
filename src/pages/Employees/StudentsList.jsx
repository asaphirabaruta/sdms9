import React, { useState, useEffect } from 'react';
import PageHeader from "../../components/PageHeader";
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import useTable from "../../components/useTable";
import Controls from "../../components/controls/Controls";
import { Search } from "@material-ui/icons";
import {getStudents} from "../../services/studentsService";
import {getDepartments} from "../../services/departmentService";


const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(2),
        padding: theme.spacing(1)
    },
    searchInput: {
        width: '75%'
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    },
    skelet:{
        width:theme.spacing(10)
    }
}))



const headCells = [
    { id: 'number', label: '#' },
    { id: 'fullName', label: 'Student Name' },
    { id: 'email', label: 'Reg Number' },
    { id: 'mobile', label: 'Bank slip' },
    { id: 'id', label: 'Personal ID' },
    { id: 'department', label: 'Admission ' },
    { id: 'actions', label: 'Passport photo', disableSorting: true }
]

export default function StudentList() {

    const classes = useStyles(); 
    
    const [records, setRecords] = useState([])
    const [depart, setDepart] = useState([])
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })  

    useEffect(()=>{
        const fetchData = async()=>{
            try {
                const allStudents = await getStudents();
                const allDepart = await getDepartments();
                setRecords(allStudents.data);
                setDepart(allDepart.data);
                             
            } catch (err) {
                
            }
        }
        fetchData();
        
    },[]);

    
    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value === "")
                    return items;
                else
                    return items.filter(x => x.full_name.toLowerCase().includes(target.value))
            }
        })
    } 

   
    return (
        <>
            <PageHeader
                title="Student's Documents"
                subTitle="List of All Documents Uploaded by Students"
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            />
            <Paper className={classes.pageContent}>

                <Toolbar>
                    <Controls.Input
                        label="Search Student"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}
                    />                    
                </Toolbar>
                <TblContainer>
                    <TblHead />                       
                    <TableBody>
                        {                        
                            recordsAfterPagingAndSorting().map(item =>
                                (<TableRow key={item.reg_number}>
                                    <TableCell>{item.num}</TableCell>
                                    <TableCell>{item.full_name}</TableCell>
                                    <TableCell>{item.reg_number}</TableCell>
                                    <TableCell><Controls.Button variant="outlined" text="view" size="small"/></TableCell>
                                    <TableCell><Controls.Button variant="outlined" text="view" size="small"/></TableCell>
                                    <TableCell><Controls.Button variant="outlined" text="view" size="small"/></TableCell>
                                    <TableCell><Controls.Button variant="outlined" text="view" size="small"/></TableCell>
                                </TableRow>)
                            )
                        }
                    </TableBody>
                   
                </TblContainer>
                <TblPagination />
            </Paper>            
        </>
    )
}

