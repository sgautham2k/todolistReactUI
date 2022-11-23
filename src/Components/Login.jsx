import { Typography,TextField, List, ListItem } from "@mui/material";
import React from "react";
import {Box} from "@mui/material";
import Button from "@mui/material/Button";
import LoginOutlinedIcon  from "@mui/icons-material/LoginOutlined";
import '../index.css';
import axios from "axios";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Register from "./Register";
import HomeIcon from '@mui/icons-material/Home';
import swal from 'sweetalert';
import ViewNotes from "./ViewNotes";

const root=ReactDOM.createRoot(document.getElementById("root"));

export default class Login extends React.Component{
    constructor(){
        super();
        this.state={
            email:'',
            pwd:''
        }
    }
    
    Getdata=(e)=>{
        this.setState({[e.target.name]:e.target.value});
    }

    submit=(e)=>{
        e.preventDefault();
        let em=this.state.email;
        let pass=this.state.pwd;
        const root=ReactDOM.createRoot(document.getElementById("root"));
        axios.get("http://localhost:5129/api/RegisterLogin/Login/"+em+"/"+pass).then(r=>{  
            console.log(r.data);              
            if(r.data.length  != 0){
            sessionStorage.setItem("status","true");
            sessionStorage.setItem("userId",r.data.appUserId);
            sessionStorage.setItem("emailId",r.data.emailId);
            sessionStorage.setItem("name",r.data.name);
                swal({
                    title: "Success :)",
                    text: "Logged In Successfully",
                    icon: "success",
                  }).then(()=>{
                    window.location = '/ViewNotes'
                  });
            }
             else{
                swal({
                    title: "Failed :(",
                    text: "Invalid Credentials",
                    icon: "error",
                  });
             }
        });    
    }

    render(){
        return(
            <>
            <header className="header">
                </header>
            <Box textAlign={"center"}  margin="auto" width={350} marginTop={6}  padding={5}>
                <Typography variant="h3">Login</Typography>
                <br/>
                <form onSubmit={this.submit}>  
                    <div className="space">
                    <TextField variant="filled" label="Email Id / User Name" type={"text"} name="email" fullWidth onInput={this.Getdata} required/>
                    </div>
                    <div className="space" >
                    <TextField variant="filled" label="Password" type={"password"} name="pwd" fullWidth onInput={this.Getdata} required/>
                    </div>    
                    <br/>
                    <div className="space">
                    <Button variant="contained" type="submit" endIcon={<LoginOutlinedIcon />}  color="warning" sx={{":hover":{backgroundColor:"green"}}} onClick={this.submit}> Login</Button>
                    </div>   
                </form>
                <p> ------ New User? ------</p>
                <Button variant="contained" onClick={() => {window.location ='/Register'}}>
                    Create new ToDo List account
                </Button>  
            </Box>
            </>
        )
    }
}