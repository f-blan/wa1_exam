import { PersonSquare } from 'react-bootstrap-icons';
import {Col,Row, Figure, Image, Button, Dropdown} from 'react-bootstrap';
import {useState, useEffect, useContext} from 'react' ;
import {ImagesData} from './Meme.js';
import API from './API.js';
import {  Link} from 'react-router-dom';
import {UserContext} from './Contexts';

const images = ImagesData;
const fonts = ['Arial, Helvetica, sans-serif', '"Times New Roman", Times, Serif', ];

function MainList(){
    return(
        <>
            <h1 className = "memehead"><strong>List of all memes </strong></h1>
            <MemeList/>
        </>
    );
}


function CreatorsList(props){
    let [creators, setCreators] = useState([]);

    let [loading, setLoading] = useState(true);

    //fetch the memes (visibility handled on serverside)
    useEffect(() => {
        API.LoadCreators().then(creatorslist => {
          setCreators(creatorslist);
          setLoading(false);
        }).catch(err =>{
          setLoading(false);
        });
      },[]);

      if(loading){
        return(
          <>
          
            <h1>Please wait for loading of the memes...</h1>
          
          </>
        );
      }else{
        
      
        return(
            <>
            
            <h1 className = "memehead"><strong>List of all creators</strong></h1>
            <Dropdown.Divider/>
            
            {
              creators.map((c) => 
                  <div key = {c.c_id}>
                  <Row>
                  <Col>
                    <Link to = {"/creators/" + c.c_id}>{c.username}</Link>
                  </Col>
                  </Row>
                  <Dropdown.Divider/>
                  </div>
                  )
            }
        
            </>
    
        );
      }

}

function MemePage(props){
    const userC = useContext(UserContext);
    let [meme, setMeme] = useState();

    let [loading, setLoading] = useState(true);

    
    //fetch the memes (visibility handled on serverside)
    useEffect(() => {
        API.RetrieveMeme(props.id).then(memeret => {
          setMeme(memeret);
          setLoading(false);
        }).catch(err =>{
          setLoading(false);
        });
      },[props.id]);

    if(loading === true){
        return(
            <>
                <h1> loading the page </h1>
            </>
        );
    }else if(meme ===undefined){
        return(
            <>
                <MissingPage/>
            </>
        );
    }else{
        return(
            <>
                <h1><strong>{meme.title}</strong> by <strong>{meme.c_name}</strong></h1>
                <MemeComponent item = {meme}/>
                <>{userC.loggedIn ? <CopyButton/> : <></>}</>
            </>
        );
    }
}



function CreatorPage(props){
    let [creator, setCreator] = useState();

    let [loading, setLoading] = useState(true);

    
    //fetch the memes (visibility handled on serverside)
    useEffect(() => {
        API.RetrieveCreator(props.id).then(creatorInfo => {
          setCreator(creatorInfo);
          setLoading(false);
        }).catch(err =>{
          setLoading(false);
        });
      },[props.id]);

    if(loading === true){
        return(
            <>
                <h1> loading the page </h1>
            </>
        );
    }else if(creator ===undefined){
        return(
            <>
                <MissingPage/>
            </>
        );
    }else{
        return(
            <>
                <h1 className = "memehead"><strong>List of all memes from {creator.username} </strong></h1>
                <MemeList creatorId = {creator.id}/>
            </>
        );
    }
}

function ImageList(props){
    


    
    return(
        <>
        
            <h1>Please wait for loading of the tasks...</h1>
        
        </>
    );

}

function MemeCopy(props){
    return(
        <>
        </>
    );

}

function MissingPage(){
    return(
        <>
        <h1>Page doesn't exitst or you have not permission to view it</h1>
        </>
    );    
}

// LOCAL COMPONENTS

//i'm using this component to show a list of memes, either all memes, memes from one creator, public or protected
function MemeList(props){
    let [memes, setMemes] = useState([]);
    let [loading, setLoading] = useState(true);

    

    //fetch the memes (visibility handled on serverside)
    useEffect(() => {
        if(props.creatorId === undefined){
            API.MainLoadMemes().then(memelist => {
                setMemes(memelist);
                setLoading(false);
            }).catch(err =>{
                setLoading(false);
                setMemes([]);
            });
        }else{
            API.LoadMemesOf(props.creatorId).then(memelist => {
                setMemes(memelist);
                setLoading(false);
            }).catch(err =>{
                console.log("caught!")
                setLoading(false);
                setMemes([]);
            });
        }
        
      },[props.creatorId]);

      if(loading){
        return(
          <>
          
            <h1>Please wait for loading of the memes...</h1>
          
          </>
        );
      }else{
        
      
        return(
            <>
            
            <Row>
                <Col xs = {{ span: 2, offset: 0 }}>
                    <strong>Title</strong>
                </Col>
                <Col xs = {{span: 1, offset: 0}}>
                    <strong>Creator</strong>
                </Col>
                <Col xs = {{span: 1, offset: 0}}>

                </Col>
                <Col xs = {{ span: 3, offset: 0 }}>
                    <strong>Image</strong>
                </Col>
                <Col xs = {{span: 4, offset : 0}}>
                    <strong>Font</strong>
                </Col>

                <Col xs ={{span: 1, offset : 0}} >
                    <strong>Visibility</strong>
                </Col>

            </Row>
            <Dropdown.Divider/>
            {
              memes.map((m) => <MemeRow meme = {m} key ={m.id} />)
            }
        
            </>
    
        );
      }

}


function MemeRow(props){
    const meme = props.meme;

    return(
        <>
        
        <Row>
        
        <Col xs = {{ span: 2, offset: 0 }}>
            <Link to= {`/memes/`+meme.id}>{meme.title}</Link>
        </Col>
        <Col xs = {{span: 1, offset: 0}}>
            {meme.c_name}
        </Col>
        <Col xs = {{span: 1, offset: 0}}>

        </Col>
        <Col xs = {{ span: 3, offset: 0 }}>
            {images[meme.imageId].name}
        </Col>
        <Col xs = {{span: 4, offset : 0}}>
            {fonts[meme.font]}
        </Col>

        <Col xs ={{span: 1, offset : 0}} >
            <>{meme.visibility ? <PersonSquare/> : <></>}</>
        </Col>

        </Row>
        
        <Dropdown.Divider/>
        </>
    );

}

function MemeComponent(props){
    const meme = props.item;
    const image = images[meme.imageId];
    const writings = meme.fields;
    const positionings = images[meme.imageId].positionings;

    let styles = [];
    let background = "";
    let color = "";
    let font = fonts[meme.font];

    

    switch(meme.color){
        case 0:
            background = "black";
            color = "white";
            break;
        case 1:
            background = "white";
            color = "black";
            break;
        case 2:
            color = "green";
            break;
        case 3:
            color = "blue";
            break;
        default:
            background = "black";
            color = "white";
            break;
    }

    positionings.map((p) => styles.push({
        "wordWrap" : "break-word",
        overflow : "hidden",
        "textOverflow" : "ellipsis",
        "fontFamily" : font,
        "backgroundColor" : background,
        "textAlign" : "center",
        "marginLeft" : image.w_size,
        "marginRight": image.w_size,

        color : color,
        position: "relative",
        top: p.top,
        left: p.left,
        "zIndex": 1030
    }))
    return(
        <>
    
            <Image src = {image.location} className = "meme-image" width = {image.width}/>
            
            {
             writings.map((w, i) => <WritingComponent style = {styles[i]} key ={i} writing = {w} />)
            }
            
            
        </>
    );
}

const WritingComponent = (props) =>{
    return(
        <>
            
            <Figure.Caption style = {props.style} className = "text-break">
                
                
                    {props.writing}
                
                
            </Figure.Caption>
            
        </>
    );
}

function CopyButton(props){
    return(
        <>
            <Button type="button" className="fixed-right-bottom" size="lg" variant="success">
                Copy
            </Button>
        </>
    );

}

const Meme = {MainList, CreatorsList, CreatorPage, MemePage, ImageList, MemeCopy, MissingPage};

export default Meme;