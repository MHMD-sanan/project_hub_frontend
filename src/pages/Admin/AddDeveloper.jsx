import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from "react-toastify";
import axios from "../../api/admin";
import { useStateContext } from "../../contexts/ContextProvider";
import { Navbar, Sidebar, Footer } from "../../components/Admin";

const USER_REGEX = /^[A-z][A-z0-9-_ ]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function AddDeveloper() {
  const activeMenu = useStateContext();
  const navigate = useNavigate();

  const userRef = useRef();

  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);

  useEffect(() => {
    setValidName(USER_REGEX.test(name));
  }, [name]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
  }, [pwd]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  const generateError = (err) => {
    toast.error(err, {
      position: "top-right",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const devData = new FormData();
    devData.append("name", name);
    devData.append("password", pwd);
    devData.append("email", email);

    const { data } = await axios.post(
      "/add_developer",
      devData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
      {
        withCredentials: true,
        // eslint-disable-next-line comma-dangle
      }
    );
    if (data.status) {
      navigate("/admin/developers");
    } else {
      generateError(data.message);
    }
  };

  return (
    <div className="flex relative dark:bg-main-dark-bg">
      {activeMenu ? (
        <div className="w-72 fixed sidebar dark:bg-secondarSay-dark-bg bg-white ">
          <Sidebar />
        </div>
      ) : (
        <div className="w-0 dark:bg-secondary-dark-bg">
          <Sidebar />
        </div>
      )}
      <div
        className={
          activeMenu
            ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
            : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
        }
      >
        <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
          <Navbar />
        </div>
        <div className="mt-10 h-screen">
          <div className="relative flex flex-col justify-center  overflow-hidden">
            <div className="w-full h-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
              <h1 className="text-3xl font-semibold text-center text-blue-700">
                Add New Developer
              </h1>
              <form className="w-full" onSubmit={handleSubmit}>
                <div className="flex items-center border-b py-2">
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validName ? " " : "hidden"}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={validName || !name ? "hidden" : " "}
                  />
                  <input
                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    type="text"
                    ref={userRef}
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    required
                    placeholder="Developer name"
                  />
                </div>
                <p className={validName || !name ? "hidden" : ""}>
                  <FontAwesomeIcon icon={faInfoCircle} />
                  4 to 24 characters.
                  <br />
                  Must begin with a letter.
                  <br />
                  Letters, numbers, underscores, hyphens allowed.
                </p>
                <div className="flex items-center border-b py-2">
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validEmail ? " " : "hidden"}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={validEmail || !email ? "hidden" : " "}
                  />
                  <input
                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    type="email"
                    placeholder="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
                <p className={validEmail || !email ? "hidden" : ""}>
                  <FontAwesomeIcon icon={faInfoCircle} />
                  Email is not in correct format
                </p>
                <div className="flex items-center border-b py-2">
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validPwd ? " " : "hidden"}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={validPwd || !pwd ? "hidden" : " "}
                  />
                  <input
                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    type="password"
                    placeholder="Password"
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                  />
                </div>
                <p className={validPwd || !pwd ? "hidden" : ""}>
                  <FontAwesomeIcon icon={faInfoCircle} />
                  8 to 24 characters.
                  <br />
                  Must include uppercase and lowercase letters, a number and a
                  special character.
                  <br />
                  Allowed special characters:{" "}
                  <span aria-label="exclamation mark">!</span>{" "}
                  <span aria-label="at symbol">@</span>{" "}
                  <span aria-label="hashtag">#</span>{" "}
                  <span aria-label="dollar sign">$</span>{" "}
                  <span aria-label="percent">%</span>
                </p>
                <div className="mt-5">
                  {validPwd && validName ? (
                    <button
                      type="submit"
                      className="bg-blue-800 text-white p-3 rounded-md hover:drop-shadow-xl hover:bg-blue-900"
                    >
                      Add Developer
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
        <ToastContainer />

        <Footer />
      </div>
    </div>
  );
}

export default AddDeveloper;
