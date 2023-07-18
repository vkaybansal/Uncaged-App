import { createContext, useState } from "react";

export const ComNavContext = createContext({
  navigation: null,
  setNavigation: () => {},
});

export default function ComNavContextProvider({ children }) {
  const [communityNav, setCommunityNav] = useState({});
  const val = { communityNav, setCommunityNav };

  return (
    <ComNavContext.Provider value={val}>{children}</ComNavContext.Provider>
  );
}
