import React, { useState, useEffect } from 'react';
import AddDocumentForm from "./AddDocumentForm";
import PageHeader from "../../components/PageHeader";
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import useTable from "../../components/useTable";
import Controls from "../../components/controls/Controls";
import { Search } from "@material-ui/icons";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Popup from "../../components/Popup";
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";
import {getDepartments} from "../../services/departmentService";
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import { deleteDocument, getMyDocuments} from '../../services/documentsService';
import { addDocument, getOneDocument } from '../../services/documentsService';
import { Worker } from '@react-pdf-viewer/core';
import { Viewer,SpecialZoomLevel } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { fullScreenPlugin } from '@react-pdf-viewer/full-screen';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '@react-pdf-viewer/full-screen/lib/styles/index.css';
import { pdfjs } from 'react-pdf';
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import Tooltip from '@material-ui/core/Tooltip';


// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.entry`;
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker ;


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
    
}))

const headCells = [
    { id: 'type', label: 'Document Type' },
    { id: 'date', label: 'Date Uploaded' },
    { id: 'description', label: 'Description' },   
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function StudentDocuments() {

    const classes = useStyles();  
    const [url, setUrl] = useState("") ;  
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records, setRecords] = useState([])
    const [depart, setDepart] = useState([])
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [openPdf, setOpenPdf] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const fullScreenPluginInstance = fullScreenPlugin();
    


    useEffect(()=>{
        const fetchData = async()=>{
            try {
                const allDocuments = await getMyDocuments();
                const allDepart = await getDepartments();
                setRecords(allDocuments.data);
                
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
                    return items.filter(x => x.dc_name.toLowerCase().includes(target.value))
            }
        })
    }
    
        const addOrEdit = async(document) => {
  
            const res = await addDocument(document);
            setRecords([res.data,...records]);
          
        setOpenPopup(false)
        
        setNotify({
            isOpen: true,
            message: 'Document Uploaded Successfully',
            type: 'success'
        })
    }

    const onDelete = async id => {
       
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })

        await deleteDocument(id)
        const orginalDocs = records;
        const updatedDocs = orginalDocs.filter(m => m.doc_id != id);
        setRecords(updatedDocs);
       
        setNotify({
            isOpen: true,
            message: 'Deleted Successfully',
            type: 'error'
        })
    }
    

    const onViewPdf= async (id, category) =>{
        if(category != "Passport"){

            const oneDoc = await getOneDocument(id);        
            const file = new Blob([oneDoc.data], {
                type: "application/pdf"
              });
              console.log(file);
              const fileURL = window.URL.createObjectURL(file);
              setUrl(fileURL);        
            setOpenPdf(true);

        }
        else{

        }
    }

    return (
        <>
            <PageHeader
                title="My Documents"
                subTitle="List of All Uploaded Documents"
                icon={<FileCopyOutlinedIcon fontSize="large" />}
            />
            <Paper className={classes.pageContent}>

                <Toolbar>
                    <Controls.Input
                        label="Search Document"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}
                    />
                    <Controls.Button
                        text="Upload"
                        variant="outlined"
                        startIcon={<CloudUploadIcon />}
                        className={classes.newButton}
                        onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                    />
                </Toolbar>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item =>
                                (<TableRow key={item.doc_id}>
                                    <TableCell>{item.dc_name}</TableCell>
                                    <TableCell>{new Date(item.uploaded_date).toDateString()}</TableCell>
                                    <TableCell>{item.description}</TableCell>                                    
                                    <TableCell>                                       
                                        <Controls.Button
                                            type="button"
                                            text="view"
                                            size="small"
                                            variant="outlined" 
                                            onClick={()=>{                                               
                                                onViewPdf(item.doc_id,item.dc_name);
                                                
                                            }}/>
                                        <Tooltip title="Delete">                                                
                                        <Controls.Button
                                            type="button"
                                            text="delete"
                                            size="small"
                                            color="secondary"
                                            onClick={() => {
                                                setConfirmDialog({
                                                    isOpen: true,
                                                    title: 'Are you sure to delete this record?',
                                                    subTitle: "You can't undo this operation",
                                                    onConfirm: () => { onDelete(item.doc_id) }
                                                })
                                            }} />
                                        </Tooltip>                                        
                                    </TableCell>
                                </TableRow>)
                            )
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </Paper>
            
            <Popup
                title="Add Document Form"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <AddDocumentForm
                    recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit} />
            </Popup>
            <Popup
                title="Document Preview"
                openPopup={openPdf}
                setOpenPopup={setOpenPdf}
            >
                <>
                <Viewer fileUrl={url} 
                         plugins={[
                            // Register plugins
                            defaultLayoutPluginInstance
                            // fullScreenPluginInstance
                            
                        ]}
                        />                
                </>       
                
            </Popup>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </>
    )
}
