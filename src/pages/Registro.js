import { Form, Alert} from "react-bootstrap";
import { useState} from "react";
import { Modal} from "react-bootstrap"
import { Tabs } from 'antd';
import Axios from "axios";

function Registro() {

  const [usuario, setUsuario] = useState("");

  const [inputEmail, setinputEmail] = useState("");
  const [inputPassword, setinputPassword] = useState("");
  const [inputRepPassword, setinputRepPassword] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [data, setData] = useState(null);

  const [feedback, setFeedback] = useState({ empty: true });
  const [feedbacklogin, setFeedbacklogin] = useState({ empty: true });



  const registrar = () => {
    Axios({
      method: "POST",
      data: {
        usuario: usuario,
        email: inputEmail,
        password: inputPassword,
      },
      withCredentials: true,
      url: "http://localhost:3001/signup",
    }).then((res) => console.log(res));
  };
  const login = () => {
    Axios({
      method: "POST",
      data: {
        email: loginEmail,
        password: loginPassword,
      },
      withCredentials: true,
      url: "http://localhost:3001/login",
    }).then((res) => console.log(res));
  };

  const getUser = () => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:3001/perfil",
    }).then((res) => {
      setData(res.data);
      console.log(res.data);
    });
  };
  const logout = () => {
    Axios({
      method: "POST",
      withCredentials: true,
      url: "http://localhost:3001/logout",
    });
  };

   

  const { TabPane } = Tabs;

    

  return (
    <>
    
  {/* ----------Login---------------- */}
 <div>
 <br></br>
      <br></br>
    <Modal.Dialog >
    <Tabs type="card" className="colortext" >
    <TabPane tab="Entrar" key="1" >
    <Modal.Body >    
    <Form.Group controlId="formBasicEmaillogin"  >
    <Form.Label>Email</Form.Label>
    <Form.Control  
      type="email"
      placeholder="Introduce tu email"
      onChange={(e) => setLoginEmail(e.target.value)}              
    />
    </Form.Group>
    <Form.Group controlId="formBasicPasswordlogin">
    <Form.Label>Contraseña</Form.Label>
    <Form.Control 
      type="password"
      placeholder="Contraseña"
      onChange={(e) => setLoginPassword(e.target.value)}
       />
    </Form.Group>              
   </Modal.Body>
   <Modal.Footer>
   <Form.Group>
     {feedbacklogin.empty ? (
         <h1> </h1>
     ) : (
       <Alert variant={feedbacklogin.data.logged ? "success" : "danger "}>
         {feedbacklogin.data.mensaje}
       </Alert>
     )}
   </Form.Group>      
   <button type="button" className="btn btn-outline-warning float-right" onClick={() => login()}>Entrar</button>
   </Modal.Footer>


  {/* ----------Registros---------------- */}


    
  </TabPane>
  <TabPane tab="Regístrate" key="2">
  <Modal.Body>       
   <Form.Group controlId="formBasicUsers">
  <Form.Label>Usuario</Form.Label>
  <Form.Control
    type="text"
    placeholder="Introduce tu usuario"
    onChange={(e) => setUsuario(e.target.value)}
    value={usuario}               
  />
  </Form.Group>
  <Form.Group controlId="formBasicEmail">
  <Form.Label>Email</Form.Label>
  <Form.Control
    type="email"
    placeholder="Introduce tu email"
    onChange={(e) => setinputEmail(e.target.value)}               
  />
  </Form.Group>
  <Form.Group controlId="formBasicPassword">
  <Form.Label>Contraseña</Form.Label>
  <Form.Control
    type="password"
    placeholder="Contraseña"
    onChange={(e) => setinputPassword(e.target.value)}
  />
  </Form.Group>     
  <Form.Group controlId="formBasicrepPassword">
  <Form.Label>Repite la contraseña</Form.Label>
  <Form.Control
    type="password"
    placeholder="Repite la Contraseña"
    onChange={(e) => setinputRepPassword(e.target.value)}
    />
  </Form.Group>
   </Modal.Body>
   <Modal.Footer>
   <Form.Group>
     {feedback.empty ? (
         <h1> </h1>
     ) : (
       <Alert variant={feedback.data.logged ? "danger " : "success"}>
         {feedback.data.mensaje}
       </Alert>
     )}
   </Form.Group>
   <button type="button" className="btn btn-outline-warning float-right" onClick={() => registrar()}>Enviar</button> 
  </Modal.Footer>
  </TabPane>    
  </Tabs>     
  </Modal.Dialog>
  </div>
  <br></br>
      <br></br>  <br></br>
      <br></br>
      <br></br>
      <br></br>
      <button onClick={logout}>Logout</button>
      <div>
        <h1>Comprobar sesión</h1>
        <button onClick={getUser}>Iniciada?</button>
        {data ? (
          data.logged ? (
            <h1>Sesion iniciada {data.user.usuario}</h1>
          ) : (
            <h1>Nope, sesión inexistente</h1>
          )
        ) : null}
      </div>

    </>
  
  );

}

export default Registro;