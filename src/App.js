import './App.css';
import {BrowserRouter, Route} from 'react-router-dom'
import Registro from "./pages/Registro"

function App() {

  

    

  return (
    <>
     <BrowserRouter>
      <Route exact path="/login">
      <Registro/>
      </Route>
            </BrowserRouter>
</>
  )
}

export default App;
