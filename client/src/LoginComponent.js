import {useState, useContext} from 'react' ;
import API from './API.js';
import { Form, Button, Alert, Row, Container, Col} from 'react-bootstrap';
import {UserContext} from './Contexts.js';

function LoginBody(props){
    const userC = useContext(UserContext);
    const [message, setMessage] = useState("");
    const setUserInfo = userC.setUserInfo;
    const setLoggedIn = userC.setLoggedIn;
    const [userName, setUserName] = useState("");
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

        
        if(userName === "" || password === ""){
            valid = 1;
        }        

        

        if(valid===0){
            doLogIn(userName, password);
        }else if(valid===1){
            setMessage("Empty username or password");
        }else{
            setMessage("Please insert a valid credential");
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
                <Form.Label>username</Form.Label>
                <Form.Control type='userName' value={userName} onChange={ev => setUserName(ev.target.value)} />
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
