import React, {Suspense} from 'react';
import './App.css';
import MainPage from "./componets/MainPage";
import {BrowserRouter as Router} from "react-router-dom";
import auth from "./userstuff/Authaurization";
import Login from "./componets/Login";
import { Provider } from 'react-redux';
import store from "./store";


function App() {
  const  user = auth.getCurrentUser();
  
  return (

    <Provider store={store}>
    
    <Router>
       <Suspense fallback="loading">
    <div className="App">
      {user!==undefined?

      <MainPage/>
      :<Login/>}
    </div>
    </Suspense>
    </Router>
    </Provider>
  );
}

export default App;
