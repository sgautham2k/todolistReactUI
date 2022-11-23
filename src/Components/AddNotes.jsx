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
import swal from 'sweetalert';
import ViewNotes from './ViewNotes';
import LoginIcon from '@mui/icons-material/Login';


const root=ReactDOM.createRoot(document.getElementById("root"));
export default class AddNotes extends React.Component {
  
    constructor()
    {
     super();
     this.state={
         aid:sessionStorage.getItem("userId"),
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

    AddNotes = (e) => {
     e.preventDefault();
     let nt = this.state.ntitle;
     let nd= this.state.ndesc;
     let appid=this.state.aid;
     const notes = {
        notesTitle : nt,
        notesDescription : nd,
        appUserId : appid
     }
     console.log(notes);
       
        axios.post("http://localhost:5129/NotesInfo/AddNotes",notes).then(r=>{
         if(r.data){
            swal({
                title: "Success :)",
                text: "New Note Added Successfully!!!",
                icon: "success",
              }).then(()=>{
                window.location = '/ViewNotes'
              });
            }
         else{
            alert("Notes not added")
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
          <form onSubmit={this.AddNotes}>
            
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
                    onClick={this.AddNotes}>Add Notes</Button>
                </form>
        </Paper> 
        </>   
    )
}
}

