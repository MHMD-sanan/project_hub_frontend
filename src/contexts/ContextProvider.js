import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();
// navbar item status setting
const initialState = {
  chat: false,
  userProfile: false,
  notification: false,
};

export const ContextProvider = ({ children }) => {
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor] = useState("#1E4DB7");
  const [currentMode, setCurrentMode] = useState("Light");
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);
  const [singleProject, setSingleProject] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [selectedProject, setSelectedProject] = useState();
  // for developer context
  const [loggedDeveloper, setLoggedDeveloper] = useState();
  const [projects, setProjects] = useState([]);
  const [role, setRole] = useState("");
  // for chat
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState();
  const [notification, setNotification] = useState(0);

  const setMode = (e) => {
    setCurrentMode(e.target.value);
    localStorage.setItem("themeMode", e.target.value);
  };

  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem("colorMode", color);
  };
  // handle navbar item click
  const handleClick = (clicked) =>
    setIsClicked({ ...initialState, [clicked]: true });

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StateContext.Provider
      value={{
        loggedDeveloper,
        setLoggedDeveloper,
        projects,
        setProjects,
        selectedProject,
        setSelectedProject,
        developers,
        setDevelopers,
        singleProject,
        setSingleProject,
        currentColor,
        currentMode,
        activeMenu,
        screenSize,
        setScreenSize,
        handleClick,
        isClicked,
        initialState,
        setIsClicked,
        setActiveMenu,
        setCurrentColor,
        setCurrentMode,
        setMode,
        setColor,
        role,
        setRole,
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
        notification,
        setNotification,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
