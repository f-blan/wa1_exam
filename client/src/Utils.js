import React from 'react';
import {Col,Row, Navbar, Form, Button,Dropdown} from 'react-bootstrap';
import { EmojiWink, PersonCircle } from 'react-bootstrap-icons';
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from 'react-router-dom';
import Meme from './MemeComponents.js';
import {UserContext} from './Contexts.js';
import {useContext, useState, useEffect} from 'react' ;
import {LoginBody} from './LoginComponent.js'

function MemeBody(props){
    const user = useContext(UserContext);
    const loggedIn = user.loggedIn;
    const userInfo = user.userInfo;

    let [selected, setSelected] = useState("Memes");
  
    return(
        <>
            <MemeNav logout = {props.doLogout}/>
            <Row>
            <MemeSide selected = {selected} setSelected = {setSelected}/>
            <Switch>

             
            <MainRoutes/>
  
            </Switch>
            </Row>
        </>
    );
}

function MemeNav(props){
    const meme_icon = <EmojiWink size = {25}/> ;
    const user_icon = <Link to = '/login'><PersonCircle size = {30} onClick = {props.logout} className = "icon-user"/></Link>;
  
    const user = useContext(UserContext);
    return(
        <>
            <Navbar bg="success" expand="xs" variant = "dark" className = "navbar-todo">
                <Col xs={2}>
                <Link to = {{pathname : '/'}}>
                <Navbar.Brand>{meme_icon} 
                  Meme Generator
                </Navbar.Brand>
                </Link>
                </Col>
                <Col xs ={{ span: 4, offset: 2 }}>
                <Form.Control type="text" placeholder="Search..." />
  
                </Col>
  
                {user.loggedIn ? 
                <Col xs = {{ span: 2, offset: 0 }} variant = "dark">
                  Welcome, {user.userInfo.name}!
                </Col>
                : 
                <Col xs = {{ span: 2, offset: 0 }} variant = "dark">
                  <span className = "welcome-msg" >Welcome, Internet sailor!</span>
                </Col>
                }
                
                
                <Col xs = {{ span: 1, offset: 1 }}>
        
                {user_icon}
                </Col>
                
                 
            </Navbar>
  
  
        </>
  
    );
}

function MemeSide(props){
    const user = useContext(UserContext);
    const selected = props.selected;

    let my_path= "/";
    if(user.loggedIn === true){
        my_path = `/creators/${user.userInfo.id}`;
    }
    return (
        <>
        <Col xs = {12} md={4} className="aside">
            <SideRow selected = {selected} linkTo = "/memes" name = "Memes" setSelected = {props.setSelected}/>
            <SideRow selected = {selected} linkTo = "/creators" name = "Creators" setSelected = {props.setSelected}/>

            <>{user.loggedIn ?
            <>
                <SideRow selected = {selected} linkTo = {my_path} name = "My memes" setSelected = {props.setSelected}/>
                <SideRow selected = {selected} linkTo = {my_path} name = "Create a meme" setSelected = {props.setSelected}/>
            </>
            :
            <> 
            </>}
            </>
            
    
        </Col>
        </>
        );
}

function SideRow(props){
    let path = props.linkTo;
    
    
    if(props.selected === props.name){
        return(
            <>
                <Button variant="success" className="filter-button" size="lg">{props.name}</Button>
                <Dropdown.Divider className="filter-divider" />
            </>
        );
    }else{
        return(
            <>
                <Link to={{pathname : path}}>
                <Button variant="light" onClick = {() => props.setSelected(props.name)} className="filter-button" size="lg">{props.name}</Button>
                </Link>
                <Dropdown.Divider className="filter-divider" />
            </>
        );
    }

}

function MainRoutes(props){
    
    return(
      <>
        <Col xs = {12} md={7} className="tasks">
        <Route path = "/memes/:id/copy" render = {({match}) =>
            <Meme.MemeCopy id = {match.params.id}/>
        }/>

        <Route path = "/memes/:id" render = {({match}) =>
            <Meme.MemePage id = {match.params.id}/>
        }/>

        <Route path="/memes" render ={() =>
          
          <Meme.MemeList/> 
        
        }/>
        

        <Route path="/creators/:id" render ={({match}) =>
          
          <Meme.CreatorMemes id = {match.params.id}/> 
        
        }/>


        <Route path="/creators" render ={() =>
          
          <Meme.CreatorsList/> 
        
        }/>

        <Route path = "/create/:id" render = {({match}) =>
    
            <Meme.MemeCreate id = {match.params.id}/>

        }/>

        <Route path="/create" render ={() =>
          
          <Meme.ImageList/> 
        
        }/>

                
        <Route path="/login"  render={()=>
          <LoginBody/> 
        }/>

        <Route exact path="/"  render={()=>
          <Meme.MemeList/> 
        }/>

        <Route path="/" render ={() =>
          
          <Meme.MissingPage/> 
        
        }/>
      </Col>
      </>
    );
  }
  

export {MemeBody};