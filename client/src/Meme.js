// this file contains the basic classes that form a meme

function Image(id, name,location, n_fields, max_lengths, positionings) {
    this.id = id;
    this.name = name;
    this.location = location;
    this.n_fields = n_fields;
    this.positionings = positionings;
    this.max_lengths = max_lengths;
    
  
    this.toString = () => {
      return `Id: ${this.id}, ` +
      `name: ${this.name}, n_fields: ${this.n_fields}, Positionings: ${this.positionings}`;
    }
    
  }

  function Meme(id, title, image, fields, visibility, font, color,  c_name, c_id) {
    this.id = id;
    this.title = title;
    this.image = image;
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
  
  //create and return default images array
  function DefaultImages(){
    let defaults = [];

    const pos_anakin = [{top : "65%", left: "25%", desc : "top left"}, {top : "75%", left: "75%", desc : "top right"}, 
            {top : "15%", left: "25%", desc : "bottom right"}];
    defaults.push(new Image(1, "For the Better, Right?", "./images/anakin.png", 3, 30, pos_anakin));
    
    const pos_cat = [{top : "90%", left : "25%", desc : "Woman text"}, {top : "95%", left: "75%", desc : "Cat text"}];
    defaults.push(new Image(2, "Woman Yelling at a Cat", "./images/cat.png", 2, 15, pos_cat));

    const pos_drake = [{top : "75%", left: "65%", desc : "top right"}, {top : "25%", left: "65%", desc : "bottom right"}]
    defaults.push(new Image(3, "Drake", "./images/drake.jpg", 2, 30, pos_drake));

    const pos_disappointed = [{top : "75%", left: "25%", desc : "top left"},{top : "25%", left: "25%", desc : "bottom left"}]
    defaults.push(new Image(4, "Disappointed Black Guy", "./images/happy_sad.jpg", 2, 30, pos_disappointed));
    
    const pos_boys = [{top : "85%", left: "50%", desc : "top"}]
    defaults.push(new Image(5, "Me and the Boys", "./images/the_boys.jpg", 1, 50, pos_boys));

    const pos_struggle = [{top : "65%", left: "35%", desc : "button left"}, {top : "70%", left: "70%", desc : "button right"},
            {top : "15%", left: "50%", desc : "bottom text"}];
    defaults.push(new Image(6, "Daily Struggle", "./images/two_buttons.jpg", 3, 15, pos_struggle));

    const pos_vegeta = [{top : "75%", left: "25%", desc : "Quote"}];
    defaults.push(new Image(6, "Vegeta quote", "./images/vegeta.jpg", 1, 50, pos_vegeta));

    return defaults;
  }
  

  export {Image, Meme, DefaultImages};