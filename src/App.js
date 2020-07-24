import React,{Component} from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import './App.css';
import TopNavBar from './Components/Navbar/Navbar'
import Home from './Components/LandingPage/Home';
import Login from './Components/Login'
import Profile from './Components/Profile'
import Register from './Components/Register'
import FooterPage from './Components/Footer'
import SecurityQuestions from './Components/SecurityQuestions'
import chatPage from './Components/ChatModule/chatPage'

class App extends Component {
  render(){
  return (
   <Router>
     <div className="App">
       <TopNavBar />
       <Route exact path="/" component={Home}/>
       <div className="Container">
         <Route exact path="/register" component={Register}/>
         <Route exact path="/login" component={Login}/>
         <Route exact path="/profile" component={Profile}/>
         <Route exact path="/securityquestions" component={SecurityQuestions}/>
         <Route exact path="/chatservice" component={chatPage}/>
         
       </div>
       <FooterPage />
     </div>
   </Router>
  );
  }
}

export default App;