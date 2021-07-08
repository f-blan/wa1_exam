
import {Col} from 'react-bootstrap';
import {useState} from 'react' ;

function MemeList(props){
    return(
        <>
        </>
    );

}

function CreatorsList(props){
    return(
        <>
        </>
    );

}

function MemePage(props){
    return(
        <>
        </>
    );

}

function CreatorMemes(props){
    return(
        <>
        </>
    );

}

function ImageList(props){
    let [image, setImage] = useState(-1);

    if(image == -1){


    }
    return(
        <>
        <Col xs = {12} md={7} className="tasks">
            <h1>Please wait for loading of the tasks...</h1>
        </Col>
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

const Meme = {MemeList, CreatorsList, CreatorMemes, MemePage, ImageList, MemeCopy, MissingPage};

export default Meme;