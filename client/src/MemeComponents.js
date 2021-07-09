import { PersonSquare } from 'react-bootstrap-icons';
import {Col,Row, Figure, Image, Button, Dropdown} from 'react-bootstrap';
import {useState, useEffect} from 'react' ;
import {ImagesData} from './Meme.js';
import API from './API.js';
import {  Link} from 'react-router-dom';

const images = ImagesData;
const fonts = ['Arial, Helvetica, sans-serif', '"Times New Roman", Times, Serif', ];

function MemeList(props){
    let [memes, setMemes] = useState([]);

    let [loading, setLoading] = useState(true);

    //fetch the memes (visibility handled on serverside)
    useEffect(() => {
        API.MainLoadMemes().then(memelist => {
          setMemes(memelist);
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
            
            <h1 className = "memehead"><strong>List of all memes </strong></h1>
            
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

function CreatorsList(props){
    return(
        <>
        </>
    );

}

function MemePage(props){
    
    let [meme, setMeme] = useState();

    let [loading, setLoading] = useState(true);

    //fetch the memes (visibility handled on serverside)
    useEffect(() => {
        console.log("hello");
        API.RetrieveMeme(props.id).then(memeret => {
          setMeme(memeret);
          setLoading(false);
        }).catch(err =>{
          setLoading(false);
        });
      },[]);

    if(loading === true){
        return(
            <>
                <h1> loading the page </h1>
            </>
        );
    }else{
        return(
            <>
                <h1><strong>{meme.title}</strong> by <strong>{meme.c_name}</strong></h1>
                <MemeComponent item = {meme}/>
            </>
        );
    }
}



function CreatorMemes(props){
    return(
        <>
        </>
    );

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
        </>
    );    
}

// LOCAL COMPONENTS

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
    const image = images[meme.imageId];;
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
        "word-wrap" : "break-word",
        overflow : "hidden",
        "text-overflow" : "ellipsis",
        "font-family" : font,
        "background-color" : background,
        "text-align" : "center",
        "margin-left" : meme.image.w_size,
        "margin-right": meme.image.w_size,

        color : color,
        position: "relative",
        top: p.top,
        left: p.left,
        "z-index": 1030
    }))
    return(
        <>
    
            <Image src = {props.item.image.location} className = "meme-image" width = {meme.image.width}/>
            
            {
             writings.map((w, i) => <WritingComponent style = {styles[i]} key ={i} writing = {w} />)
            }
            
            <CopyButton/>
        </>
    );
}

const WritingComponent = (props) =>{
    return(
        <>
            
            <Figure.Caption style = {props.style} class = "text-break">
                
                
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

const Meme = {MemeList, CreatorsList, CreatorMemes, MemePage, ImageList, MemeCopy, MissingPage};

export default Meme;