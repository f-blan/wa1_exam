import {Col,Row, Navbar, Form, Button,Dropdown, Container, Image} from 'react-bootstrap';
import { EmojiWink, PersonCircle } from 'react-bootstrap-icons';
import { Route, Switch, Link, Redirect} from 'react-router-dom';
import Meme from './MemeComponents.js';
import {UserContext} from './Contexts.js';
import {useContext, useState} from 'react' ;
import {LoginBody} from './LoginComponent.js'
import {SupportPictures} from './Meme.js';

const supps = SupportPictures;

function MemeBody(props){
    

    let [selected, setSelected] = useState("Memes");

    
    return(
        <>
          <Container fluid>
            <MemeNav logout = {props.doLogout} loading = {props.loading}/>
            <Row>
            <MemeSide selected = {selected} setSelected = {setSelected} logout = {props.doLogout}/>

             
            <MainRoutes setSelected = {setSelected}/>
  
            
            </Row>
          </Container>
        </>
    );
}

function MemeNav(props){
    const meme_icon = <EmojiWink size = {25}/> ;
    const user_icon = <Link to = '/'><PersonCircle size = {30} onClick = {props.logout} className = "icon-user"/></Link>;
  
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
                  <span className = "welcome-msg">Welcome, {user.userInfo.username}!</span>
                </Col>
                : 
                <Col xs = {{ span: 2, offset: 0 }} variant = "dark">
                  <span className = "welcome-msg" >Welcome, Internet sailor!</span>
                </Col>
                }
                
                {user.loggedIn ? 
                <Col xs = {{ span: 1, offset: 1 }} variant = "dark">
                  <Image src = {supps[user.userInfo.pfp_id].location} style = {{width: 40, height: 40, borderRadius : 20}}/>
                  
                </Col>
                : 
                <Col xs = {{ span: 1, offset: 1 }} variant = "dark">
                  {user_icon}
                </Col>
                }
                
                
                 
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
    //on the logout i link to /create to force redirect to / and therefore reload of the tasks (this avoids some extra logic in other parts of application)
    return (
        <>
        <Col xs = {12} md={4} className="aside">
            <SideRow selected = {selected} linkTo = "/memes" name = "Memes" task = {props.setSelected}/>
            <SideRow selected = {selected} linkTo = "/creators" name = "Creators" task = {props.setSelected}/>

            <>{user.loggedIn ?
            <>
                <SideRow selected = {selected} linkTo = {my_path} name = "My profile" task = {props.setSelected}/>
                <SideRow selected = {selected} linkTo = "/create" name = "Create a meme" task = {props.setSelected}/>
                <SideRow selected = {selected} linkTo = "/create" name = "Logout" task = {props.logout}/>               
            </>
            :
            <> 
                <SideRow selected = {selected} linkTo = "/login" name = "Login" task = {props.setSelected}/>
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
                <Link to = {{pathname : path}}>
                <Button variant="success" className="filter-button" size="lg">{props.name}</Button>
                </Link>
                <Dropdown.Divider className="filter-divider" />
            </>
        );
    }else{
        return(
            <>
                <Link to={{pathname : path}}>
                <Button variant="light" onClick = {() => props.task(props.name)} className="filter-button" size="lg">{props.name}</Button>
                </Link>
                <Dropdown.Divider className="filter-divider" />
            </>
        );
    }

}

function MainRoutes(props){
  const user = useContext(UserContext);
  
    return(
      <>
        <Col xs = {12} md={7} className="tasks">
        
        <Switch>
        <Route exact path = "/memes/:id" render = {({match}) =>{
            
            return(
            <Meme.MemePage id = {match.params.id} setSelected = {props.setSelected}/>
            );
        }
        }/>

        <Route exact path="/memes" render ={() =>{
          
          return(
          <Meme.MainList/> 
          );
        }
        }/>
        

        <Route exact path="/creators/:id" render ={({match}) =>{
          
          return(
          <Meme.CreatorPage id = {match.params.id}/> 
          );
        }
        }/>


        <Route exact path="/creators" render ={() =>{
          
          return(
          <Meme.CreatorsList/> 
          );
        }
        }/>

        <Route exact path = "/create/preview" render = {({location}) =>{
         
          return(
          <>{user.loggedIn ? 
            <>{location.state ?
              <Meme.PreviewPage meme = {location.state.meme} setSelected = {props.setSelected}/> 
              :
              <Redirect to = "/"/>
            }</>
            : 
            
              <Redirect to ="/" />}</>
          );
          }
        }/>

        <Route exact path="/create" render ={() =>{
          
          return(
          
            <>{user.loggedIn ? <Meme.ImageList/> : <Redirect to ="/" />}</>
          );
          }
        }/>

                
        <Route exact path="/login"  render={()=>{
          
          return(
          <>{user.loggedIn ? <Redirect to ="/" /> : <LoginBody/>}</>
          );
          }
        }/>

        <Route exact path="/"  render={({match})=>
          <>
          <Meme.MainList/> 
          
          </>
        }/>
        <Route exact path="*"  render={({match})=>
          <>
          <Meme.MissingPage show = {true}/> 
          
          </>
        }/>
      </Switch>
      </Col>
      
      </>
    );
  }
  

export {MemeBody};