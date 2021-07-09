const url = 'http://localhost:3000';


async function login(username, password){
    const body = {username : username, password : password};
    const response = await fetch(url + "/api/login", {
        method : "POST",
        headers : {
            'Content-Type' : 'application/json',
          },
          body : JSON.stringify(body),
    });
  
    if(response.ok){
      const user = await response.json();
      return user;
    }else {
      try {
        const errDetail = await response.json();
        throw errDetail.message;
      }
      catch(err) {
        throw err;
      }
    }
  }



async function logout(){
    await fetch(url + "/api/logout", {
        method : "DELETE",
        headers : {
            'Content-Type' : 'application/json',
          },
    });
  }
  
  async function getUserInfo(){
    const response = await fetch(url + "/api/session", {
        method : "GET",
        headers : {
            'Content-Type' : 'application/json',
          },
    });
    const userInfo = await response.json();
    if(response.ok){
      return userInfo;
    }else{
      throw userInfo;
    }
  }

  async function MainLoadMemes(){
    const response = await fetch(url + "/api/memes", {
      method : "GET",
      headers : {
        'Content-Type' : 'application/json',
      },
    
    } );

    if(response.ok){
      const memes = await response.json();
      return memes;
    }else {
      try {
        const errDetail = await response.json();
        throw errDetail.message;
      }
      catch(err) {
        throw err;
      }
    }
  }

  async function LoadMemesOf(c_id){
    const response = await fetch(url + "/api/memes/" + c_id, {
      method : "GET",
      headers : {
        'Content-Type' : 'application/json',
      },
    
    } );

    if(response.ok){
      const memes = await response.json();
      return memes;
    }else {
      try {
        const errDetail = await response.json();
        throw errDetail.message;
      }
      catch(err) {
        throw err;
      }
    }
  }

  async function RetrieveMeme(id){
    const response = await fetch(url + "/api/retrieveMeme/" + id, {
      method : "GET",
      headers : {
        'Content-Type' : 'application/json',
      },
    
    } );

    if(response.ok){
      const meme = await response.json();
      console.log("retrieved");
      return meme;
    }else {
      try {
        const errDetail = await response.json();
        throw errDetail.message;
      }
      catch(err) {
        throw err;
      }
    }
  }

  async function deleteMeme(id){
    await fetch(url + "/api/deleteMeme/" +id, {
        method : "DELETE",
        headers : {
            'Content-Type' : 'application/json',
          },
    });
}

async function addMeme(meme){
  await fetch(url + "/api/addMeme", {
        method : "POST",
        headers : {
          'Content-Type' : 'application/json',
        },
        body : JSON.stringify(meme),
      } );
}
  
  const API = {login, logout, getUserInfo, addMeme, deleteMeme, RetrieveMeme, LoadMemesOf, MainLoadMemes}
  export default API;

  