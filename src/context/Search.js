import { useContext, useState, createContext } from "react";

// 1. Create the context
const SearchContext = createContext();

// 2. Provider Component
const SearchProvider = ({ children }) => {
  const [searchState, setSearchState] = useState({
    keyword: "",
    results: [],
  });

  return (
    <SearchContext.Provider value={[searchState, setSearchState]}>
      {children}
    </SearchContext.Provider>
  );
};

// 3. Custom hook to access search context
const useSearch = () => useContext(SearchContext);

// 4. Export
export { useSearch, SearchProvider };
