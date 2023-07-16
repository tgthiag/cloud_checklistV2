import React, { createContext, useState } from "react";

const MyContext = createContext();

function MyProvider({children}) {
  const [currentUser, setcurrentUser] = useState({});

  const updateUser = (newState) => {
    setcurrentUser(newState);
  };

  return (
    <MyContext.Provider value={{ currentUser, updateUser }}>
      {children}
    </MyContext.Provider>
  );
}
export {MyContext, MyProvider};
