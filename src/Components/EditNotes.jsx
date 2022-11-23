import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import ReactDOM from 'react-dom/client';
import 
{ TextField , FormLabel,
FormControl,Input,InputLabel, Button, Select, MenuItem, RadioGroup, Radio, FormControlLabel, FormGroup, TextareaAutosize } 
from "@mui/material";
import ViewNotes from './ViewNotes';
import swal from 'sweetalert';
import LoginIcon from '@mui/icons-material/Login';


const root=ReactDOM.createRoot(document.getElementById("root"));
export default class EditNotes extends React.Component {
  
    constructor()
    {
     super();
     this.state={
         aid:sessionStorage.getItem("userId"),
         nid:sessionStorage.getItem("notesId"),
         ntitle:"",
         ndesc:"",
     }
    }
 
    getData = (e) =>{
     this.setState({
         [e.target.name] : e.target.value
     });
    }
 
    isValid = () =>{
     if((this.state.ntitle === "") || 
     (this.state.ndesc === ""))
         return false;
     else
         return true;
    }

    EditNotes = (e) => {
     e.preventDefault();
     let nt = this.state.ntitle;
     let nd= this.state.ndesc;
     const edit = {
        notesTitle : nt,
        notesDescription : nd,
     }
     console.log(edit);
       
        axios.put("http://localhost:5129/NotesInfo/EditNotes/"+this.state.nid+"/"+this.state.aid,edit).then(r=>{
         if(r.data){
            swal({
                title: "Success :)",
                text: "Note Edited Successfully!!!",
                icon: "success",
              }).then(()=>{
                window.location = '/ViewNotes'
              });
            }
         else{
            alert("Notes cannot be edited or not found")
         }
       })
    }
    render()
    {
    return (
        <>
        <header className="header">
            <div className="right">
            <Button type="button" startIcon={<LoginIcon/>} variant="standard" onClick={() => {window.location ='/Login'}}>Logout</Button>
            </div>
        </header>
        <br/>
        <br/>
        <br/>
        <Paper sx={{ width: '100%' }}>
          <form onSubmit={this.EditNotes}>
                    <FormControl required fullWidth margin="normal">
                        <InputLabel htmlFor="nid" className="labels">Notes Id</InputLabel>
                        <Input name="nid" disableUnderline={true} type="number" className="inputs" onChange={this.getData} value={this.state.nid}/>
                    </FormControl>
                    <FormControl required fullWidth margin="normal">
                        <InputLabel htmlFor="ntitle" className="labels">Notes Title</InputLabel>
                        <Input name="ntitle" disableUnderline={true} type="text" className="inputs" onChange={this.getData} value={this.state.ntitle}/>
                    </FormControl>
                    <FormControl required fullWidth margin="normal">
                        <InputLabel htmlFor="ndesc" className="labels">Notes Description</InputLabel>
                        <Input name="ndesc" type="text"  disableUnderline={true} className="inputs" onChange={this.getData} value={this.state.ndesc}/>
                    </FormControl>
                    <Button
                    disableRipple
                    fullWidth
                    variant="text"
                    type="submit"
                    onClick={() => {window.location ='/ViewNotes'}}>View All Notes</Button>
                    <Button
                    disableRipple
                    fullWidth
                    variant="text"
                    type="submit"
                    onClick={this.EditNotes}>Edit Notes</Button>
                </form>
        </Paper>    
        </>
    )
}
}

