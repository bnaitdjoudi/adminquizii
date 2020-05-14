import React from 'react';
import './App.css';
import MainPage from "./componets/MainPage";
import {BrowserRouter as Router} from "react-router-dom";
import auth from "./userstuff/Authaurization";
import Login from "./componets/Login";
function App() {
  const  user = auth.getCurrentUser();
  return (

    
    <Router>
    <div className="App">
      {user!=undefined?
      <MainPage/>
      :<Login/>}
    </div>
    </Router>
  );
}

export default App;
