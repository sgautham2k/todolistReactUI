import { TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import '../index.css';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import axios from "axios";
import ReactDOM from "react-dom/client";
import Login from "./Login";
import swal from 'sweetalert';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

const root=ReactDOM.createRoot(document.getElementById("root"));
export default class Register extends React.Component{
    constructor(){
        super();
        this.state={
            fname:'',
            email:'',
            username:'',
            pwd:'',
            cpwd:'',
        }
    }
    
    Getdata=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }

    submit=(e)=>{
        e.preventDefault();
        let name = this.state.fname;
        let em= this.state.email;
        let phno=parseInt(this.state.phno);
        let username=this.state.username;
        if(this.state.pwd!=this.state.cpwd){
            swal({
                title: "Passwords Does Not Match",
                icon: "warning",
              });
        }
        else{
            let pwd=this.state.pwd;
            const register = {
                Name : name,
                UserName : username,
                Password:pwd,
                EmailAddress:em,
                Notes: []
            }
            console.log(register);
            
            axios.post("http://localhost:5129/api/RegisterLogin/NewRegister",register).then(r => {
                if(r.data){
                    swal({
                        title: "Success",
                        text: "New User Registered Successfully!!!",
                        icon: "success",
                      }).then(()=>{
                        window.location = '/Login'
                      });
                }
                else{
                    swal({
                        title: "Failed :(",
                        text: "Username or Email Address are already taken",
                        icon: "error",
                      });
                }
            })
        }
    }
    
    render(){
        return(
            <>
             <header className="header">
                <div className="right">
                <Button type="button" startIcon={<LoginIcon/>} variant="standard" onClick={() => {window.location ='/Login'}}>Login</Button>
                </div>
                </header>

            <Box alignContent={"center"} textAlign="center" width={400} margin="auto" marginTop={2} padding={2} borderRadius={4} 
                
            
            >
                <Typography variant="h3">ToDo List Account Registration</Typography>
                <form onSubmit={this.submit}>
                    <div >
                    <TextField variant="standard" label="Full Name" type={"text"}  name="fname" fullWidth inputProps={{ maxLength: 50 }}  onInput={this.Getdata} required/>
                    </div>
                    <div >
                    <TextField variant="standard" label="Email Id" type={"email"} inputProps={{ maxLength: 30 }} name="email" fullWidth onInput={this.Getdata} required/>
                    </div>
                    <div >
                    <TextField variant="standard" label="User Name" type={"text"} name="username"  inputProps={{ maxLength: 30 }} fullWidth onInput={this.Getdata} required/>
                    </div>
                    <div>
                    <TextField variant="standard" label="Password" type={"password"} name="pwd" inputProps={{ maxLength: 8 }} fullWidth onInput={this.Getdata} required/>
                    </div>
                    <div>
                    <TextField variant="standard" label="Confirm Password" type={"password"}  inputProps={{ maxLength: 8 }} name="cpwd" fullWidth onInput={this.Getdata} required/>
                    </div>   
                    <br/>  
                    <div className="space">
                        <Button variant="contained" type="submit" endIcon={<AppRegistrationIcon/>} color="success" onClick={this.submit}> Register</Button>
                    </div>
                </form>
            </Box>
            </>
        )
    }
}