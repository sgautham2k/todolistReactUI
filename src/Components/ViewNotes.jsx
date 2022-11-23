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
import { rootShouldForwardProp } from '@mui/material/styles/styled';
import AddNotes from './AddNotes';
import EditNotes from './EditNotes';
import DeleteNotes from './DeleteNotes';
import LoginIcon from '@mui/icons-material/Login';

const root=ReactDOM.createRoot(document.getElementById("root"));
export default class ViewNotes extends React.Component {
  
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
    console.log(r.data);
    this.setState({list:r.data});
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
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                 <TableCell align="center" colSpan={3}>Notes ID</TableCell>
                 <TableCell align="center" colSpan={3}>Notes Title</TableCell>
                 <TableCell align="center" colSpan={3}>Notes Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.list.map(x=>
                      <TableRow>
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
        </Paper>    
        <Button variant="contained" color="success" type="submit" onClick={() => {window.location ='/AddNotes'}}>Add Notes</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Button variant="contained" color="success" type="submit" onClick={() => {window.location ='/EditNotes'}}>Edit Notes</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Button variant="contained" color="success" type="submit" onClick={() => {window.location ='/DeleteNotes'}}>Delete Notes</Button>
      </>
    )
}
}
