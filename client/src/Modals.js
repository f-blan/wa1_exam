import { Modal, Form, Button} from 'react-bootstrap';
import {useState, useContext} from 'react' ;
import {MemeClass} from './Meme.js';
import {UserContext} from './Contexts.js';
import {  Link} from 'react-router-dom';

function CreateModal(props){
    let userC = useContext(UserContext);
    let image = props.image;
    let [title, setTitle] = useState("");
    let [field1, setField1] = useState("");
    let [field2, setField2] = useState("");
    let [field3, setField3] = useState("");
    let [protect, setProtect] = useState(0);
    let [color, setColor] = useState(0);
    let [font, setFont] = useState(0);
    let [error, setError] = useState("");

    let fArray = [{n : 1,field: field1, setField : setField1}, 
        {n : 2,field: field2, setField : setField2},{n : 3,field: field3, setField : setField3}];
    
    const handleSubmit = (event) =>{
        
        
        let valid = true;
        let localerror = [];

        let visibility;
        if(protect){
            visibility = 1;
        }else{
            visibility = 0;
        }

        if(title === ""){
            valid = false;
            localerror.push("title can't be empty ");
        }

        if(fArray.filter(f => f.field === "").length >= 3){
            valid = false;
            localerror.push("you need at least one non-empty text field");
        }

        if(fArray.filter((f,i) => f.field.length > image.max_lengths).length>0){
            valid = false;
            localerror.push("the input fields exceed the maximum length ");
        }

        if(valid === true){
            const meme = new MemeClass(-1, title, image.id, fArray.filter(f => f.n<=image.n_fields).map(f=> f.field),
                visibility, font, color,userC.userInfo.username, userC.userInfo.c_id);
            props.goPreview(meme);

        }else{
            setTitle("");
            setField1("");
            setField2("");
            setField3("");
            setProtect(0);
            setColor(-1);
            setFont(-1);
            setError(localerror);
        }

    }
    return(
      <>
      <Modal show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Now select all the properties:</Modal.Title>
          </Modal.Header>
          <Form>
          <Modal.Body>
            <Form.Group controlid="formTitle">
              <Form.Label>Title {props.id}</Form.Label>
              <Form.Control required type = "text" placeholder="...enter Title" value = {title} onChange={(ev) =>setTitle(ev.target.value)}/>
            </Form.Group>
            {
                image.positionings.map((im, i) => <FieldForm description = {image.positionings[i].desc} id = {i} key = {i} field = {fArray[i].field} setField = {fArray[i].setField}/>)
            }
            <Form.Group controlid="formProtected">
              <Form.Check type="checkbox" label="Protected" checked = {protect} onChange={() => setProtect(i => !i)}/>
            </Form.Group>
            <Form.Group controlid="formColorSelect">
                <Form.Label>Select the text color</Form.Label>
                <Form.Control as = "select" onChange = {(ev) => setColor(parseInt(ev.target.value))}>
                    <option value = {0}>White (black background)</option>
                    <option value ={1}>Black (white background)</option>
                    <option value = {2}>Green (white background)</option>
                    <option value = {3}>Blue (white background)</option>
                </Form.Control>  
            </Form.Group>
            <Form.Group controlid="formFontSelect">
                <Form.Label>Select the text font</Form.Label>
                <Form.Control as = "select" onChange = {(ev) => setFont(parseInt(ev.target.value))}>
                    <option value = {0}>Arial</option>
                    <option value = {1}>Times New Roman</option>
                </Form.Control>  
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <span className='important'>{error}</span>
            <Button variant="secondary" onClick={props.handleClose}>
              Close
            </Button>
            <Button variant="success" onClick={handleSubmit}>
              See Preview
            </Button>
          </Modal.Footer>
  
  
          </Form>
        </Modal>
      </>
    );
  }

  function FieldForm(props){

    return(
        <>
            <Form.Group controlid={`formField${props.id}`}>
              <Form.Label>{props.description}</Form.Label>
              <Form.Control required type = "text" placeholder="...enter text field" value = {props.field} onChange={(ev) => props.setField(ev.target.value)}/>
            </Form.Group>

        </>
    );
  }

function ConfirmModal(props){
    return(
        <Modal show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{props.msg}!</Modal.Body>
          <Modal.Footer>
            <Link to = "/"><Button variant="success" onClick={props.handleClose}>
              {props.btnmsg}
            </Button></Link>
          </Modal.Footer>
        </Modal>
    );
}

//similar to CreateModal but is aware of the copied meme's attributes and acts accordingly to user ownership 
function CopyModal(props){
    let image = props.image;
    let toCopy = props.copied;
    let [title, setTitle] = useState(toCopy.title);
    let [field1, setField1] = useState(image.n_fields >=1 ?  toCopy.fields[0] : "");
    let [field2, setField2] = useState(image.n_fields >=2 ?  toCopy.fields[1] : "");
    let [field3, setField3] = useState(image.n_fields >=3 ?  toCopy.fields[2] : "");
    let [protect, setProtect] = useState(toCopy.visibility);
    let [color, setColor] = useState(toCopy.color);
    let [font, setFont] = useState(toCopy.font);
    let [error, setError] = useState("");

    let fArray = [{n : 1,field: field1, setField : setField1}, 
        {n : 2,field: field2, setField : setField2},{n : 3,field: field3, setField : setField3}];
    

    const handleSubmit = (event) =>{
        let valid = true;
        let localerror = [];

        let visibility;

      
        if(protect){
            visibility = 1;
        }else{
            visibility = 0;
        }

        if(title === ""){
            valid = false;
            localerror.push("title can't be empty ");
        }

        if(fArray.filter(f => f.field === "").length >= 3){
            valid = false;
            localerror.push("you need at least one non-empty text field");
        }

        if(fArray.filter((f,i) => f.field.length > image.max_lengths)>0){
            valid = false;
            localerror.push("the input fields exceed the maximum length ");
        }

        if(valid === true){
            const meme = new MemeClass(-1, title, image.id, fArray.filter(f => f.n<=image.n_fields).map(f=> f.field),
                visibility, font, color, "",-1);
            props.goPreview(meme);

        }else{
            setTitle("");
            setField1("");
            setField2("");
            setField3("");
            setProtect(0);
            setColor(-1);
            setFont(-1);
            setError(localerror);
        }
    }
    return(
        <>
        <Modal show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Select the properties you want to change:</Modal.Title>
          </Modal.Header>
          <Form>
          <Modal.Body>
            <Form.Group controlid="formTitle">
              <Form.Label>Title {props.id}</Form.Label>
              <Form.Control required type = "text" placeholder="...enter Title" value = {title} onChange={(ev) =>setTitle(ev.target.value)}/>
            </Form.Group>
            {
                image.positionings.map((im, i) => <FieldForm description = {image.positionings[i].desc} id = {i} key = {i} field = {fArray[i].field} setField = {fArray[i].setField}/>)
            }
            <>{props.owner || toCopy.visibility === 0 ?
            <Form.Group controlid="formProtected">
                <Form.Check type="checkbox" label="Protected" checked = {protect} onChange={() => setProtect(i => !i)}/>
            </Form.Group>
            :
            <>
            </>
            }</>
            
            <Form.Group controlid="formColorSelect">
                <Form.Label>Select the text color</Form.Label>
                <Form.Control value = {color} as = "select" onChange = {(ev) => setColor(parseInt(ev.target.value))}>
                    <option value = {0}>White (black background)</option>
                    <option value ={1}>Black (white background)</option>
                    <option value = {2}>Green (white background)</option>
                    <option value = {3}>Blue (white background)</option>
                </Form.Control>  
            </Form.Group>
            <Form.Group controlid="formFontSelect">
                <Form.Label>Select the text font</Form.Label>
                <Form.Control value = {font} as = "select" onChange = {(ev) => setFont(parseInt(ev.target.value))}>
                    <option value = {0}>Arial</option>
                    <option value = {1}>Times New Roman</option>
                </Form.Control>  
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <span className='important'>{error}</span>
            <Button variant="secondary" onClick={props.handleClose}>
              Close
            </Button>
            <Button variant="success" onClick={handleSubmit}>
              See Preview
            </Button>
          </Modal.Footer>
  
  
          </Form>
        </Modal>
      </>
    );
}

export {CreateModal, ConfirmModal, CopyModal};