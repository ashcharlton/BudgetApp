import React, { createContext, useState } from "react";

const AccountContext = createContext(undefined);
const AccountDispatchContext = createContext(undefined);

function AccountProvider({ children }) {
  const [account, setAccount] = useState(null);

  return (
    <AccountContext.Provider value={account}>
      <AccountDispatchContext.Provider value={setAccount}>
        {children}
      </AccountDispatchContext.Provider>
    </AccountContext.Provider>
  );
}

export { AccountProvider, AccountContext, AccountDispatchContext };