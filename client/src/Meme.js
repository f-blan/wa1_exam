// this file contains the basic classes that form a meme and the images data
import anakin from './images/anakin.png';
import cat from './images/cat.png';
import drake from './images/drake.jpg';
import blackGuy from './images/happy_sad.jpg';
import theBoys from './images/the_boys.png';
import buttons from './images/two_buttons.jpg';
import vegeta from './images/vegeta.jpg';
import giga from './images/support/gigachad.jpg';
import giorno from './images/support/giorno.png';
import shaggy from './images/support/shaggy.jpg';
import thomas from './images/support/thomas.jpg';
import wtf from './images/support/wtf.jpg';

function Image(id, name,location,width, n_fields, max_lengths, positionings, w_size,f_size) {
    this.id = id;
    this.name = name;
    this.location = location;
    this.n_fields = n_fields;
    this.positionings = positionings;
    this.max_lengths = max_lengths;
    this.w_size = w_size;
    this.width = width;
    this.f_size = f_size;
  
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

    const pos_anakin = [{top : "40%", left: "-16.5%", desc : "top left"}, {top : "37.5%", left: "16.5%", desc : "top right"}, 
            {top : "71.5%", left: "16.5%", desc : "bottom right"}];
    defaults.push(new Image(0, "For the Better, Right?", anakin,"65%", 3, 48, pos_anakin, "35%", "100%"));
    
    const pos_cat = [{top : "12%", left : "-18.5%", desc : "Woman text"}, {top : "7.5%", left: "18.5%", desc : "Cat text"}];
    defaults.push(new Image(1, "Woman Yelling at a Cat", cat,"75%", 2, 42, pos_cat, "32.5%","120%"));

    const pos_drake = [{top : "30%", left: "15%", desc : "top right"}, {top : "55%", left: "15%", desc : "bottom right"}]
    defaults.push(new Image(2, "Drake", drake,"75%", 2, 60, pos_drake, "35%", "150%"));

    const pos_disappointed = [{top : "28%", left: "-20%", desc : "top left"},{top : "55%", left: "-20%", desc : "bottom left"}]
    defaults.push(new Image(3, "Disappointed Black Guy", blackGuy,"75%", 2, 60, pos_disappointed, "35%", "150%"));
    
    const pos_boys = [{top : "5%", left: "0%", desc : "top"}]
    defaults.push(new Image(4, "Me and the Boys", theBoys, "80%", 1, 80, pos_boys, "10%", "150%"));

    const pos_struggle = [{top : "20%", left: "-11%", desc : "button left"}, {top : "12%", left: "6%", desc : "button right"},
            {top : "65%", left: "0%", desc : "bottom text"}];
    defaults.push(new Image(5, "Daily Struggle", buttons, "50%", 3, 40, pos_struggle, "42%", "100%"));

    const pos_vegeta = [{top : "33%", left: "-25%", desc : "Quote"}];
    defaults.push(new Image(6, "Vegeta quote", vegeta, "75%", 1, 150, pos_vegeta, "39%", "150%"));

    return defaults;
  }
  function pfp_create(){
    let supps = []
    supps.push(new Image(0,"gigachad", giga, "25%", undefined,undefined,undefined,undefined, undefined));
    supps.push(new Image(1,"giorno", giorno, "50%", undefined,undefined,undefined,undefined, undefined));
    supps.push(new Image(2,"thomas", thomas, "50%", undefined,undefined,undefined,undefined, undefined));
    supps.push(new Image(3,"shaggy", shaggy, "50%", undefined,undefined,undefined,undefined, undefined));
    supps.push(new Image(4,"wtf", wtf, "50%", undefined,undefined,undefined,undefined, undefined));

    return supps;
  }
  const ImagesData = ImagesCreate();
  const SupportPictures = pfp_create();



  export {Image, MemeClass, SupportPictures, ImagesData};