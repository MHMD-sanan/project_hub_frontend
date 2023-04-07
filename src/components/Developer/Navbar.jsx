import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeStatus } from "../../redux/developer/developerAuth";
import { useNavigate } from "react-router-dom";
import axios from "../../api/developer";
import { BellIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import NotificationBadge, { Effect } from "react-notification-badge";

import { useStateContext } from "../../contexts/ContextProvider";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { notification, setNotification, setSelectedChat,loggedDeveloper } = useStateContext();
  const Links = [
    { name: "HOME", link: "/" },
    { name: "CHAT", link: "/developer/chat" },
    { name: "LOGOUT", link: "/developer/login" },
  ];

  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    dispatch(changeStatus());
    try {
      await axios.get("/logout", {
        withCredentials: true,
      });
      navigate("/developer/login");
    } catch (error) {
      navigate("/developer/login");
    }
  };

  return (
    <div className="w-full fixed top-0 left-0 z-50">
      <div className="md:flex items-center justify-between bg-gray-800 py-4 md:px-10 px-7">
        <div
          className="font-bold text-2xl cursor-pointer flex items-center
      text-white"
        >
          PROJECT HUB
        </div>

        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden text-white"
        >
          <ion-icon name={open ? "close" : "menu"} />
        </div>

        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute bg-gray-900 md:static left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-16" : "top-[-490px]"
          }`}
        >
          {Links.map((link) =>
            link.name === "LOGOUT" ? (
              <button key={link.link} type="button" onClick={handleLogout}>
                {" "}
                <li key={link.name} className="md:ml-8 text-sm md:my-0">
                  <NavLink className="text-white hover:text-gray-200 font-bold duration-500">
                    {link.name}
                  </NavLink>
                </li>
              </button>
            ) : (
              <li key={link.name} className="md:ml-8 text-sm md:my-0 my-7">
                <NavLink
                  to={link.link}
                  className="text-white hover:text-gray-200 font-bold duration-500"
                >
                  {link.name}
                </NavLink>
              </li>
            )
          )}
          <li className="md:ml-8 text-md md:my-0 my-7">
            <Menu>
            <MenuButton p={1}>
              <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
              />
              <BellIcon textColor="white" fontSize="xl" />
            </MenuButton>
              <MenuList pl={2}>
                {!notification.length && "No New Messages"}
                {notification.map((notif) => (
                  <MenuItem
                    key={notif._id}
                    onClick={() => {
                      setSelectedChat(notif.chat);
                      setNotification(notification.filter((n) => n !== notif));
                    }}
                  >
                    {notif.chat.isGroupChat
                      ? `New Message`
                      : ""}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
