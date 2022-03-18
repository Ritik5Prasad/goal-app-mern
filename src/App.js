import React,{useState} from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Todo from './Todo/Todo'
import Login from './Login/Login'
import './App.css'
export const CredentialsContext = React.createContext();
function App() {
  const credentialsState = useState(null);
  return (
    
    <BrowserRouter>
     <CredentialsContext.Provider value={credentialsState}>
        <Routes>
          <Route exact path='/' element={<Login />}>
            </Route>
          <Route   path='/Todo'      element={<Todo />}> 
           </Route>
           </Routes>
           </CredentialsContext.Provider>
    </BrowserRouter>
    
  )
}

export default App