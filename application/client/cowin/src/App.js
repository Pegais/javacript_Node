// import Axios from "axios"
import './App.css';
import Dash from './Components/dash';
import {BrowserRouter as Router,Switch,Route,BrowserRouter} from 'react-router-dom'
import Loginpage from './Components/Loginpage'
import Signup from './Components/Signup';
import LoginNew from "./Components/loginNew";
import { useEffect, createContext, useReducer, useContext} from 'react'
import {reducer,initialState} from './Components/userReducer'
import Notifier from './Components/Notifier'
export const UserContext = createContext()
function App() {
  
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
   <Router>
       <Switch>
        <Route path='/' exact render={(prop)=>(
            <>
            <Loginpage/>
            </>
        )}/>
        <Route path='/signup' component={Signup}/>
        <Route path='/notifier' component={Notifier}/>
        <Route path='/loginNew' component={LoginNew}/>
        <Route path='/dash' component={Dash}/>

         </Switch>
     
  </Router>
  </UserContext.Provider>
  );
}

export default App;