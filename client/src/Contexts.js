import React from 'react';

const UserContext = React.createContext({loggedin : false, userInfo : undefined});

export{UserContext};