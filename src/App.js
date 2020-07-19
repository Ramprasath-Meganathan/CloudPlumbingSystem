import React,{Component} from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import './App.css';
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import Login from './Components/Login'
import Profile from './Components/Profile'
import Register from './Components/Register'
import Footer from './Components/Footer'
import SecurityQuestions from './Components/SecurityQuestions'

class App extends Component {
  render(){
  return (
   <Router>
     <div className="App">
       <Navbar/>
       <Route exact path="/" component={Home}/>
       <div className="Container">
         <Route exact path="/register" component={Register}/>
         <Route exact path="/login" component={Login}/>
         <Route exact path="/profile" component={Profile}/>
         <Route exact path="/securityquestions" component={SecurityQuestions}/>
       </div>
       <Footer/>
     </div>
   </Router>
  );
  }
}

export default App;
