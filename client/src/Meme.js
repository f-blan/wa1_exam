// this file contains the basic classes that form a meme and the images data
import anakin from './images/anakin.png';
import cat from './images/cat.png';
import drake from './images/drake.jpg';
import blackGuy from './images/happy_sad.jpg';
import theBoys from './images/the_boys.png';
import buttons from './images/two_buttons.jpg';
import vegeta from './images/vegeta.jpg';

function Image(id, name,location,width, n_fields, max_lengths, positionings, w_size) {
    this.id = id;
    this.name = name;
    this.location = location;
    this.n_fields = n_fields;
    this.positionings = positionings;
    this.max_lengths = max_lengths;
    this.w_size = w_size;
    this.width = width;
  
    this.toString = () => {
      return `Id: ${this.id}, ` +
      `name: ${this.name}, n_fields: ${this.n_fields}, Positionings: ${this.positionings}`;
    }
    
  }

  function MemeClass(id, title, imageId, fields, visibility, font, color,  c_name, c_id) {
    this.id = id;
    this.title = title;
    this.imageId = imageId;
    this.fields = fields;
    this.font = font;
    this.color = color;
    this.visibility = visibility;
    this.c_name =c_name;
    this.c_id = c_id;
    
  
    this.toString = () => {
      return `Id: ${this.id}, ` +
      `Title: ${this.title}, image: ${this.image.name}, Fields: ${this.fields}, Font = ${this.font}, Color = ${this.color}` +
      `Visibility : ${this.visibility}, Creator name: ${this.c_name}, Creator id )ì= ${this.c_id}`;
    }
  
    
    
  }
  
  //create and return default images array (with parameters related to the positions of the text fields)
  function ImagesCreate(){
    let defaults = [];

    const pos_anakin = [{top : "-46%", left: "-12.5%", desc : "top left"}, {top : "-50%", left: "12.5%", desc : "top right"}, 
            {top : "-15%", left: "12.5%", desc : "bottom right"}];
    defaults.push(new Image(0, "For the Better, Right?", anakin,"50%", 3, 48, pos_anakin, "40%"));
    
    const pos_cat = [{top : "-73%", left : "-17.5%", desc : "Woman text"}, {top : "-77%", left: "17.5%", desc : "Cat text"}];
    defaults.push(new Image(1, "Woman Yelling at a Cat", cat,"75%", 2, 60, pos_cat, "35%"));

    const pos_drake = [{top : "-65%", left: "15%", desc : "top right"}, {top : "-28%", left: "15%", desc : "bottom right"}]
    defaults.push(new Image(2, "Drake", drake,"75%", 2, 100, pos_drake, "35%"));

    const pos_disappointed = [{top : "-70%", left: "-20%", desc : "top left"},{top : "-25%", left: "-20%", desc : "bottom left"}]
    defaults.push(new Image(3, "Disappointed Black Guy", blackGuy,"75%", 2, 100, pos_disappointed, "35%"));
    
    const pos_boys = [{top : "-81%", left: "0%", desc : "top"}]
    defaults.push(new Image(4, "Me and the Boys", theBoys, "80%", 1, 100, pos_boys, "15%"));

    const pos_struggle = [{top : "-67%", left: "-11%", desc : "button left"}, {top : "-76%", left: "4%", desc : "button right"},
            {top : "-25%", left: "0%", desc : "bottom text"}];
    defaults.push(new Image(5, "Daily Struggle", buttons, "50%", 3, 40, pos_struggle, "45%"));

    const pos_vegeta = [{top : "-60%", left: "-20%", desc : "Quote"}];
    defaults.push(new Image(6, "Vegeta quote", vegeta, "75%", 1, 50, pos_vegeta, "39%"));

    return defaults;
  }
  const ImagesData = ImagesCreate();
  const DefaultImages = ["./images/anakin.png", "./images/cat.png", "./images/drake.jpg","./images/happy_sad.jpg", 
       "./images/the_boys.jpg",  "./images/two_buttons.jpg", "./images/vegeta.jpg"];


//------------------------------TEMPLATE MEMES (for testing purposes)---------------------------------------
    const images = ImagesData;    


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

    const memearray = [meme1, meme2,meme3,meme4,meme5,meme6,meme7]
//

  export {Image, MemeClass, DefaultImages, ImagesData, memearray};