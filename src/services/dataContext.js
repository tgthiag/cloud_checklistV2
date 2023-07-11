import React, { createContext, useState } from "react";

const MyContext = createContext();

function MyProvider({children}) {
  const [dataContext, setDataContext] = useState({});

  const updateState = (newState) => {
    setDataContext(newState);
  };

  return (
    <MyContext.Provider value={{ dataContext, updateState }}>
      {children}
    </MyContext.Provider>
  );
}
export {MyContext, MyProvider};
