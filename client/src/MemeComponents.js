
import {Col,Row, Figure, Image, Button} from 'react-bootstrap';
import {useState} from 'react' ;
import {ImagesData,MemeClass} from './Meme.js';

const images = ImagesData;

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
    let fields1 = ["hi", "hey", "fuck you maderglabberaaaaaaaaa"];
    let meme1 = new MemeClass(1, "Title", images[0], fields1, 0, 1, 0, 1, "aasd" );

    let fields2 = ["the woman", "me myselfaaaaa asd asd asd asd asd asd asd asd asd sd asd asd "]
    let meme2 = new MemeClass(2, "Title2", images[1], fields2,0,1,1, 1, "asd");

    let fields3 = ["me being happy, very very happy asd asd asd asd asd asd asd asd asd asd ", 
    "no being happy, not very happy asd asd asd asd asd as dads asd asd "];
    let meme3 = new MemeClass(3, "Title3", images[2], fields3, 0, 0, 1,"asd",1);

    let fields4 = ["when asd asd asd asd asd asd asd asd asd asdd", "asda asd asd asd asd asd sad sad asd "];
    let meme4 = new MemeClass(4,"Title4", images[3], fields4, 0, 1,1, "asd",1  );

    let fields5 = ["me and the boys copying code from biglab2 sad asd asd asd asd sda asd dsa sad asd sad asd "];
    let meme5 = new MemeClass(5, "Title5", images[4], fields5, 0, 0, 1, "asd", 2);

    let fields6 = ["panino con la carne di cavallo asdas asd", "panino con la salsiccia asd asd asd ", "Peppino l'arrostitore tenebroso"];
    let meme6 = new MemeClass(6, "Title6", images[5], fields6, 0, 1, 3,"asd",1);

    let fields7 = ["quando asd asd asd sad das sad das sad sa sa sa sa sad dss da sd s ad  s ad sadsadsads ad sa d sadsad sada dsa wodjsof oasihf io oawifb sa pifhsa pfh fpsaohf pksah dophfdk pah"];
    let meme7 = new MemeClass(7, "tutke6", images[6], fields7, 0,1,1,"sad",1);
    return(
        <>
            <h1>{meme4.title}</h1>
            <MemeComponent item = {meme7}/>
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

// LOCAL COMPONENTS

function MemeComponent(props){
    const meme = props.item;
    const writings = meme.fields;
    const positionings = meme.image.positionings;

    let styles = [];
    let background = "";
    let color = "";
    let font = "";

    if(meme.font === 1){
        font = '"Times New Roman", Times, Serif';
    }else{
        font = 'Arial, Helvetica, sans-serif';
    }

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