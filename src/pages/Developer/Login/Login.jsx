import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button } from "@chakra-ui/react";
import { ToastContainer, toast } from "react-toastify";
import axios from "../../../api/developer";
import { useStateContext } from "../../../contexts/ContextProvider";
import { changeStatus } from "../../../redux/developer/developerAuth";

function Login() {
  const { setProjects, setLoggedDeveloper } = useStateContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const generateError = (err) => {
    toast.error(err, {
      position: "bottom-right",
    });
  };

  const handleLogin = async () => {
    setLoading(true);
    const credentials = {
      email,
      password,
    };
    try {
      const { data } = await axios.post("/login", credentials, {
        withCredentials: true,
      });
      if (data.status) {
        dispatch(changeStatus());
        const user = data.details;
        const { accessToken } = data;
        setLoggedDeveloper({ accessToken, user });
        setProjects(data.details.projects);
        setLoading(false);
        navigate("/developer/home");
      } else {
        setLoading(false);
        generateError(data.message);
      }
    } catch (error) {
      setLoading(false);
      generateError(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-900 h-screen">
      <div className="flex justify-center items-center w-full h-full md:h-2/4 md:w-1/2  bg-gray-800 rounded-md">
        <div className="flex flex-col">
          <h1 className="flex justify-center text-gray-900  text-xl font-semibold">
            <p className="text-white text-2xl">Developer Login Page</p>
          </h1>
          <input
            className="mt-10 rounded-lg w-96 h-12 bg-gray-900 p-5 text-white"
            type="text"
            placeholder="User Name"
            name="name"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="mt-3 rounded-lg w-96 h-12 bg-gray-900 p-5 text-white"
            type="password"
            required
            placeholder="User Password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="mt-5">
          <Button variant="solid" colorScheme="blue" size="md" width="40" isLoading={loading} onClick={handleLogin}>
            Login
          </Button>
      </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
