import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeAdminStatus } from "../../redux/admin/adminAuth.js";
import axios from "../../api/admin";
import { Button, useToast } from "@chakra-ui/react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const toast = useToast();

  const handleLogin = async () => {
    setloading(true);
    const credentials = {
      email,
      password,
    };
    try {
      const { data } = await axios.post("/login", credentials);
      if (data.status) {
        dispatch(changeAdminStatus());
        navigate("/admin/home");
      } else {
        toast({
          title: "invalid Credentials",
          status: 'error',
          duration: 5000,
          position: "top-right",
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: error.message,
        status: 'error',
        duration: 5000,
        position: "top-right",
        isClosable: true,
      });
    }
    setloading(false);
  };
  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-blue-700">
          Admin Sign In
        </h1>
        <form className="w-full">
          <div className="flex items-center border-b py-2">
            <input
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="email"
              placeholder="Email"
              aria-label="Full name"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center border-b py-2">
            <input
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="password"
              placeholder="Password"
              aria-label="Full name"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* <button
            type="button"
            className="mt-5 bg-blue-800 w-44 h-11 cursor-pointer rounded-xl items-center text-white"
            onClick={handleLogin}
          >
            Login
          </button> */}
          <Button className="mt-10" onClick={handleLogin} variant="solid"colorScheme="blue" width="40" isLoading={loading}>Login</Button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
