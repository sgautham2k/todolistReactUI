import React, { lazy , useState} from 'react';
import {Route,Redirect,BrowserRouter as Router,useLocation, Routes} from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import ViewNotes from './Components/ViewNotes';
import AddNotes from './Components/AddNotes';
import EditNotes from './Components/EditNotes';
import DeleteNotes from './Components/DeleteNotes';

const Routing = () =>{
    return(
        <>
            <Routes>
                <Route exact path="/" element={<Register />} />
                <Route exact path="/Login" element={<Login />} />
                <Route exact path="/Register" element={<Register />} />
                <Route exact path="/ViewNotes" element={<ViewNotes />} />
                <Route exact path="/AddNotes" element={<AddNotes />} />
                <Route exact path="/EditNotes" element={<EditNotes />} />
                <Route exact path="/DeleteNotes" element={<DeleteNotes />} />
            </Routes>
        </>
    );
}

export default Routing;