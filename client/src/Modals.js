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

    const selectProtect = (value)=>{
        if(value){
            setProtect(1);
        }else{
            setProtect(0);
        }
    }
    const selectColor = (value)=>{
        switch(value){
            case 'Black (white background)':
                setColor(0);
                break;
            case 'White (black background)':
                setColor(1);
                break;
            case 'Green (no background)':
                setColor(2);
                break;
            case 'Blue (no background)':
                setColor(3);
                break;
            default:
                setColor(-1);
                break;
        }
    }
    const selectFont = (value) =>{
        switch(value){
            case 'Arial':
                setFont(0);
                break;
            case 'Times New Roman':
                setFont(1);
                break;
            default:
                setFont(-1);
                break;
        }
    }

    const handleSubmit = (event) =>{
        let valid = true;
        let localerror = [];
        if(title === ""){
            valid = false;
            localerror.push("title can't be empty ");
        }

        if(fArray.filter(f => f.field === "").length >= image.n_fields){
            valid = false;
            localerror.push("you need at least one non-empty text field");
        }

        if(valid === true){
            const meme = new MemeClass(-1, title, image.id, fArray.filter(f => f.n<=image.n_fields).map(f=> f.field),
                protect, font, color,userC.userInfo.username, userC.userInfo.c_id);
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
              <Form.Check type="checkbox" label="Protected" checked = {protect} onChange={(ev) => selectProtect(ev.target.value)}/>
            </Form.Group>
            <Form.Group controlid="formColorSelect">
                <Form.Label>Select the text color</Form.Label>
                <Form.Control as = "select" onSelect = {(ev) => selectColor(ev.target.value)}>
                    <option>Black (white background)</option>
                    <option>White (black background)</option>
                    <option>Green (no background)</option>
                    <option>Blue (no background)</option>
                </Form.Control>  
            </Form.Group>
            <Form.Group controlid="formFontSelect">
                <Form.Label>Select the text font</Form.Label>
                <Form.Control as = "select" onSelect = {(ev) => selectFont(ev.target.value)}>
                    <option>Arial</option>
                    <option>Times New Roman</option>
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

    const selectProtect = (value)=>{
        if(value){
            setProtect(1);
        }else{
            setProtect(0);
        }
    }
    const selectColor = (value)=>{
        switch(value){
            case 'Black (white background)':
                setColor(0);
                break;
            case 'White (black background)':
                setColor(1);
                break;
            case 'Green (no background)':
                setColor(2);
                break;
            case 'Blue (no background)':
                setColor(3);
                break;
            default:
                setColor(-1);
                break;
        }
    }
    const selectFont = (value) =>{
        switch(value){
            case 'Arial':
                setFont(0);
                break;
            case 'Times New Roman':
                setFont(1);
                break;
            default:
                setFont(-1);
                break;
        }
    }

    return(
        <>
        

        </>
    );
}

export {CreateModal, ConfirmModal, CopyModal};