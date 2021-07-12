import { PersonSquare } from 'react-bootstrap-icons';
import {Col,Row, Figure, Image, Button, Dropdown} from 'react-bootstrap';
import {useState, useEffect, useContext} from 'react' ;
import {ImagesData, SupportPictures} from './Meme.js';
import API from './API.js';
import {  Link, Redirect} from 'react-router-dom';
import {UserContext} from './Contexts.js';
import {CreateModal, ConfirmModal, CopyModal} from './Modals.js'

const images = ImagesData;
const fonts = ['Arial, Helvetica, sans-serif', '"Times New Roman", Times, Serif', ];
const supps = SupportPictures;
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
                    <Col xs = {{span : 1, offset : 1}}>
                        <Image src = {supps[c.pfp_id].location} style = {{width: 40, height: 40, borderRadius : 20}}/>
                    </Col>
                    <Col xs = {{span : 2, offset : 0}}>
                        <Link to = {"/creators/" + c.c_id}>{c.username}</Link>
                    </Col>
                    <Col xs = {{span : 7, offset : 1}}>
                        {c.quote}
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

//from here we take care of visualizing, copying and deleting a meme from all cases (logged/not logged, owner/not owner)
function MemePage(props){
    const userC = useContext(UserContext);
    let [meme, setMeme] = useState();

    let [loading, setLoading] = useState(true);

    let [copyMeme, setCopyMeme] = useState(undefined);
    //modal for copy
    const [showC, setShowC] = useState(false);
    const handleCloseC = () => setShowC(false);
    const handleShowC = () => setShowC(true);

    //modal for deleting
    const [showD, setShowD] = useState(false);
    const handleCloseD = () => {
        setShowD(false);
        API.deleteMeme(meme.id);
    }
    const handleShowD = () => setShowD(true);
    
    
    //fetch the memes (visibility handled on serverside)
    useEffect(() => {
        API.RetrieveMeme(props.id).then(memeret => {
          setMeme(memeret);
          setLoading(false);
        }).catch(err =>{
          setLoading(false);
        });
      },[props.id]);
    //waiting for server response
    if(loading === true){
        return(
            <>
                <h1> loading the page </h1>
            </>
        );
        //the meme does not exist!
    }else if(meme ===undefined){
        return(
            <>
                <MissingPage show = {true}/>
            </>
        );
    }else{
        //we compiled the modal for a copy and succeded (redirect to preview)
        
        if(copyMeme !== undefined){
            return(
            <Redirect to ={{
                pathname : "/create/preview",
                //why am i not just passing meme state? Because it gives problems ("object could not be cloned")
                state : {meme : {title : copyMeme.title,imageId : copyMeme.imageId, fields : copyMeme.fields, 
                     visibility: copyMeme.visibility, font : copyMeme.font, color : copyMeme.color}}
             }
                 } />
            );
        }else{
        //meme exists and we didn't try to copy it (yet). We visualize the copy and delete buttons accordingly to logged user
        return(
            <>
                <h1><strong>{meme.title}</strong> by <strong>{meme.c_name}</strong></h1>
                <MemeComponent item = {meme}/>
                <>{userC.loggedIn ? 
                    <>{userC.userInfo.id === meme.c_id ? 
                            <>
                            <Row className= "buttonrow">
                                <Col xs = {{span : 1, offset : 8}}>
                                    <GenericButton variant = "secondary" task = {() => handleShowD()} text = "Delete"/>
                                </Col>
                                <Col xs = {{span : 1, offset : 1}}>
                                    <GenericButton variant = "success" task = {() => handleShowC()} text = "Copy"/>
                                </Col>
                            
                            </Row>
                            <ConfirmModal show = {showD} title = "Are you sure?" 
                            msg = "Meme will be deleted and you will be directed to main page" btnmsg = "Yes" handleClose = {handleCloseD}/>
                            
                            
                            <CopyModal show = {showC} image = {images[meme.imageId]} 
                            owner = {userC.userInfo.id === meme.c_id} copied = {meme} handleClose = {handleCloseC} 
                            goPreview = {(createdcopy)=>{setCopyMeme(createdcopy); handleCloseC()}}/>
                            </>
                        :
                            <>
                                <Row className= "buttonrow">
                                    <Col xs = {{span:1, offset: 9}}>
                                <GenericButton variant = "success" task = {() => handleShowC()} text = "Copy"/>
                                </Col>
                                </Row>
                            <CopyModal show = {showC} image = {images[meme.imageId]} 
                            owner = {userC.userInfo.c_id === meme.c_id} copied = {meme} handleClose = {handleCloseC} 
                            goPreview = {(createdcopy)=>{setCopyMeme(createdcopy); handleCloseC()}}/>
                            </>
                        
                        
                    }</>
                
                : 
                    <>
                    
                    </>
                }</>
            </>
        );
        }
    }
}

function PreviewPage(props){
    let meme = props.meme;

    let [show, setShow] = useState(false);
    let [modalTitle, setModalTitle] = useState("");
    let [modalMsg, setModalMsg] = useState("");

    const handleClose = () => {
        setShow(false);
        
    };

    function submitMeme(meme) {
        API.addMeme(meme).then(()=>{
            setModalTitle("Success!");
            setModalMsg("Meme created successfully!");
            setShow(true);
        }).catch(() =>{
            setModalTitle("Ooops!");
            setModalMsg("Something went wrong...");
            setShow(true);
        });
      }
   
    return(
        <>
                <h1><strong>Preview for {meme.title}</strong></h1>
                <MemeComponent item = {meme}/>
                <Row className = "buttonrow">
                <Col xs = {{span : 1, offset : 9}}>
                <Button type="button" className="relative-right-bottom" size="lg" variant="success" onClick = {() => submitMeme(props.meme)}>
                    Confirm
                </Button>
                </Col>
                </Row>
                <ConfirmModal show = {show} title={modalTitle} msg = {modalMsg} btnmsg = "Go To Main Page" handleClose = {handleClose}/>

        </>
    );
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
                <MissingPage show={true}/>
            </>
        );
    }else{
        const image = supps[creator.pfp_id];
        return(
            <>
                <h1><strong>{creator.username}</strong>'s profile</h1>
                <Row>
                    <Col xs = {{span : 6, offset : 0}}>
                    <Image src = {image.location} style = {{width: 400, height: 400, borderRadius : 200}}/>
                    </Col>
                    <Col xs = {{span : 6, offset : 0}}>
                        <h3>Quote:</h3>
                        <span>{creator.quote}</span>
                    </Col>

                </Row>
                <h2 className = "memehead"><strong>List of all memes from {creator.username} </strong></h2>
                <MemeList creatorId = {creator.id}/>
            </>
        );
    }
}

function ImageList(props){
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    let [meme, setMeme] = useState(undefined);
    let [selectedImage, setSelectedImage] = useState(0);
    
    if(meme === undefined){
    return(
        <>
        
            <h1><strong>As a first step, select an image as a base for your meme:</strong></h1>
            <Dropdown.Divider/>
            {
              images.map((i) => <ImageComponent image = {i} key ={i.id} selectImage = {(id) => {setSelectedImage(id); handleShow()}}/>)
            }
            <CreateModal image = {images[selectedImage]} show = {show} handleClose = {handleClose} goPreview={(createdmeme) => {setMeme(createdmeme); handleClose()}}/>
        
        </>
    );
    }else{
        return(
            <>

                <Redirect to ={{
                   pathname : "/create/preview",
                   //why am i not just passing meme state? Because it gives problems ("object could not be cloned")
                   state : {meme : {title : meme.title,imageId : meme.imageId, fields : meme.fields, 
                        visibility: meme.visibility, font : meme.font, color : meme.color}}
                }
                    } />
            </>
        );
    }

}

function MemeCopy(props){
    return(
        <>
        </>
    );

}

function MissingPage(props){
    const image = supps[4];
    if(props.show === true){
    return(
        <>
        <h1>Welp!</h1>
        <Row>
                    <Col xs = {{span : 6, offset : 3}}>
                    <Image src = {image.location} style = {{width: 400, height: 400}}/>
                    </Col>
                    

        </Row>
        <Row>
        <h2>Looks like this page does not exist, or you cannot view its content</h2>    
        </Row>
        
        </>
    );
    }else{
        return(
            <>
            </>
        );
    }
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
            background = "white";
            break;
        case 3:
            color = "blue";
            background = "white";
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
        
        "fontSize" : image.f_size,
        color : color,
        position: "relative",
        top: p.top,
        left: p.left,
        "zIndex": 1030
    }))
    return(
        <>
    
            
            {
             writings.map((w, i) => <WritingComponent style = {styles[i]} key ={i} writing = {w} />)
            }
            <Image src = {image.location} className = "meme-image" width = {image.width}/>
            
            
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

function ImageComponent(props){
    const image = props.image;

    return(
        <>
            <h2>{image.name}</h2>
            <Image src = {image.location} className = "meme-image" width = {image.width}/>
            <SelectButton id = {image.id} selectImage = {props.selectImage}/>
            <Dropdown.Divider/>
        </>
    );
}

function SelectButton(props){
    return(
        <>
            <Button type="button" className="relative-right-bottom" size="lg" variant="success" onClick={() => props.selectImage(props.id)}>
                Select
            </Button>
        </>
    );
}



function GenericButton(props){
    return(
        <Button type="button" className= "relative-right-bottom" size="lg" variant={props.variant} onClick={() => props.task()}>
                {props.text}
        </Button>
    );
}

const Meme = {MainList, CreatorsList, CreatorPage, MemePage, ImageList, MemeCopy, MissingPage, PreviewPage};

export default Meme;