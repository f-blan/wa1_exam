import {useState, useContext} from 'react' ;
import API from './API.js';
import { Form, Button, Alert, Row, Container, Col, Modal} from 'react-bootstrap';
import {UserContext} from './Contexts.js';

function LoginBody(props){
    const user = useContext(UserContext);
    const [message, setMessage] = useState("");
    const setUserInfo = user.setUserInfo;
    const setLoggedIn = user.setLoggedIn;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const doLogIn = (username, password) =>{
        API.login(username, password).then(user => {
        
            setUserInfo(user);
            setLoggedIn(true);
            
          
        }).catch(err => setMessage(err));
      
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        setMessage("");

        let valid = 0;

        if(!email.includes("@") || !email.includes(".")){
            valid = 2;
        }
        if(email === "" || password === ""){
            valid = 1;
        }        

        

        if(valid===0){
            doLogIn(email, password);
        }else if(valid===1){
            setMessage("Empty email or password");
        }else{
            setMessage("Please insert a valid email (ex: salvo@domain.asd)");
        }
        
    }


    return(
        
        <Container fluid>
        
        <Row>
        <Col xs = {{ span: 4, offset: 4 }} className = "login-credentials">
        <Form>
            <Form.Row>
            
            <h2>Login as a Creator!</h2>
            
           
            </Form.Row>
            {message ? <Alert variant='danger'>{message}</Alert> : ''}
            <Form.Group controlId='username'>
                <Form.Label>email</Form.Label>
                <Form.Control type='email' value={email} onChange={ev => setEmail(ev.target.value)} />
            </Form.Group>
            <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' value={password} onChange={ev => setPassword(ev.target.value)} />
            </Form.Group>
            <Button variant = 'success'onClick={handleSubmit}>Login</Button>
        </Form>
        </Col>
        </Row>
        </Container>
    );
 
}

export {LoginBody};
