import React, { createContext, useState } from "react";

const MenuContext = createContext(undefined);
const MenuDispatchContext = createContext(undefined);

function MenuProvider({ children }) {
  const [Menu, setMenu] = useState(null);

  return (
    <MenuContext.Provider value={Menu}>
      <MenuDispatchContext.Provider value={setMenu}>
        {children}
      </MenuDispatchContext.Provider>
    </MenuContext.Provider>
  );
}

export { MenuProvider, MenuContext, MenuDispatchContext };