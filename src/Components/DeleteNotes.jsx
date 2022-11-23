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
export default class DeleteNotes extends React.Component {
  
    constructor()
    {
     super();
     this.state={
         aid:sessionStorage.getItem("userId"),
         ntitle:"",
         ndesc:"",
         list:[]
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

    componentDidMount()
   {
      axios.get("http://localhost:5129/NotesInfo/GetNotesByAppUserId/"+this.state.aid).then(r=>
    {   
    sessionStorage.setItem("notesId",r.data.notesId)   
    console.log(r.data);
    this.setState({list:r.data});
   }) 
   }

   Show=(e)=>{
    var rb=document.getElementsByName("rbSelect");
    var tbl=document.getElementById("tbl");
    let nid=0;
    for(var i=0;i<rb.length;i++)
    {
        if(rb[i].checked)
        {
            nid=tbl.rows[i+1].cells.item(1).innerHTML;
        }
    }
    sessionStorage.setItem("NID",nid);
  }

    DeleteNotes = (e) => {
    var tbl=document.getElementById("tbl");
     let nid=Number(sessionStorage.getItem("NID"));
        axios.delete("http://localhost:5129/NotesInfo/DeleteNotes/"+nid+"/"+this.state.aid).then(r=>{
         if(r.data){
            swal({
                title: "Success :)",
                text: "Note Deleted Successfully!!!",
                icon: "success",
              }).then(()=>{
                window.location = '/DeleteNotes'
              }).then(()=>{
                window.location = '/ViewNotes'
              });
            }
         else{
            alert("Notes cannot be deleted or not found")
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
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table" id="tbl">
              <TableHead>
                <TableRow>
                <TableCell align="center" colSpan={3}>Select Note to Delete</TableCell>
                 <TableCell align="center" colSpan={3}>Notes ID</TableCell>
                 <TableCell align="center" colSpan={3}>Notes Title</TableCell>
                 <TableCell align="center" colSpan={3}>Notes Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.list.map(x=>
                      <TableRow>
                         <TableCell align="center" colSpan={3}>
                    <input type="radio" name="rbSelect" value="Select" onChange={this.Show}/>
                    </TableCell>
                      <TableCell align="center" colSpan={3}>{x.notesId}
                  </TableCell>
                  <TableCell align="center" colSpan={3}>{x.notesTitle}
                  </TableCell>
                  <TableCell align="center" colSpan={3}>{x.notesDescription}
                  </TableCell>
                 </TableRow>, 
                      )}
              </TableBody>
            </Table>
          </TableContainer>
          <Button
          disableRipple
          fullWidth
          variant="text"
          type="submit"
          onClick={() => {window.location ='/ViewNotes'}}>View All Notes</Button>
          <Button variant="outlined" color="error" onClick={this.DeleteNotes}>Delete Note</Button>
        </Paper>    
        </>
    )
}
}
