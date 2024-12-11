import { createContext, useContext, useReducer, useEffect } from "react";

const TOGGLE_DARK_MODE = "TOGGLE_DARK_MODE";

// Cargar el estado inicial desde localStorage o usar el predeterminado
const initialState = JSON.parse(localStorage.getItem("themeState")) || {
  darkMode: false,
};

const themeReducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_DARK_MODE:
      return {
        ...state,
        darkMode: !state.darkMode,
      };

    default:
      return state;
  }
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  // Guardar el estado actualizado en localStorage
  useEffect(() => {
    localStorage.setItem("themeState", JSON.stringify(state));
  }, [state]);

  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
