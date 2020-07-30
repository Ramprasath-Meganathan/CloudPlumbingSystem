import React,{Component} from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import './App.css';
import TopNavBar from './Components/Navbar/Navbar'
import Landing from './Components/LandingPage/Landing';
import Login from './Components/Authentication/Login'
import Register from './Components//Register/Register'
import FooterPage from './Components/Footer'
import SecurityQuestions from './Components/Register/SecurityQuestions'
import MFA2 from './Components/Authentication/MFA2'
import chatPage from './Components/ChatModule/chatPage'
import DataProcessing from './Components/DataProcessing/DataProcessing'
import PredictionService from "./Components/PredictionService/predictionService"
import Home from "./Components/Home/Home"
import OnlineSupportPage from './Components/onlineSupportLex/onlineSupportPage'

class App extends Component {
  render(){
  return (
   <Router>
     <div className="App">
       <TopNavBar />
       <Route exact path="/" component={Home}/>
       <div style={{ paddingBottom: '150px'}} className="Container">
         <Route exact path="/register" component={Register}/>
         <Route exact path="/login" component={Login}/>
         <Route exact path="/securityquestions" component={SecurityQuestions}/>
         <Route exact path="/mfa2" component={MFA2}/>
         <Route exact path="/chatservice" component={chatPage}/>
         <Route exact path="/landing" component={Landing}/> 
         <Route exact path="/dataprocessing" component={DataProcessing}/>
         <Route exact path="/predictionService" component={PredictionService}/>
         <Route exact path="/onlinesupportpage" component={OnlineSupportPage}/>
       </div>
       <FooterPage />
     </div>
   </Router>
  );
  }
}

export default App;
