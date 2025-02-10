//this file is for my own understanding of the context API implementation

// Importing the createContext function from React to create a context
import { createContext } from "react";

// Importing a list of food items from a file in the assets folder
import {food_list} from '../assets/assets.js';

// Creating a context called StoreContext with a default value of null
export const StoreContext = createContext(null);

// Defining the StoreContextProvider component which will wrap other components and provide them with context values
const StoreContextProvider = (props) => {

  // Defining the values that we want to pass to the components using the context API
  const contextValue = {
    food_list // The list of food items that we imported earlier
  };

  // Returning the StoreContext.Provider component which will wrap around child components, passing the context values to them
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children} {/* Render the child components that are nested inside the StoreContextProvider */}
    </StoreContext.Provider>
  );
};

// Exporting the StoreContextProvider component to be used in other parts of the application
export default StoreContextProvider;
