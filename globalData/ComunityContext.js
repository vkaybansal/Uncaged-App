import { createContext, useState } from "react";

export const CommunityContext = createContext({});

export default function CommunityContextProvider({ children }) {
  const [community, setCommunity] = useState({
    currCom: null,
    updateCommunity: (com) => {
      changeCurrCom(com);
    },
  });

  function changeCurrCom(newCom) {
    if (newCom != null) {
      const com = newCom.data.getCommunity;
      setCommunity({
        currCom: com,
        updateCommunity: async (com) => {
          changeCurrCom(com);
        },
      });
    }
  }

  if (typeof community != "undefined")
    return (
      <CommunityContext.Provider value={community}>
        {children}
      </CommunityContext.Provider>
    );
}
