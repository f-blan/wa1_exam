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
  
  const API = {login, logout, getUserInfo}
  export default API;

  