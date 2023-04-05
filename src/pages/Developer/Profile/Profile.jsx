/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react"
import { useToast } from '@chakra-ui/react'
// import { useSelector, useDispatch } from "react-redux";
import Footer from "../../../components/Developer/Footer";
import Navbar from "../../../components/Developer/Navbar";
import { useStateContext } from "../../../contexts/ContextProvider";
import usePrivateAxios from "../../../hooks/useAxiosPrivate";
// import { setLoggedDeveloper } from "../../../redux/developer/loggedDevelper";

function Profile() {
  const navigate = useNavigate();
  const axios = usePrivateAxios();
  const { loggedDeveloper, setLoggedDeveloper } = useStateContext();
  const [loading, setLoading] = useState(false);
  const Ctoast = useToast();
  // const dispatch = useDispatch();
  // const test = useSelector((state) => {
  //   return state.loggedDeveloper.value;
  // });
  const generateError = (err) => {
    toast.error(err, {
      position: "top-right",
    });
  };

  const [values, setValues] = useState({
    id: loggedDeveloper.user._id,
    name: loggedDeveloper.user.name,
    email: loggedDeveloper.user.email,
    password: loggedDeveloper.user.password,
    domain: loggedDeveloper.user.domain,
    image: "noImage",
    imgPath: loggedDeveloper.user.imgPath,
  });
  const handleChanges = async () => {
    try {
      setLoading(true);
      let details;
      if (values.image === "noImage") {
        details = {
          id: values.id,
          name: values.name,
          email: values.email,
          password: values.password,
          domain: values.domain,
          imgPath: values.imgPath,
        };
      } else {
        details = {
          id: values.id,
          name: values.name,
          email: values.email,
          password: values.password,
          domain: values.domain,
          image: values.image,
        };
      }
      const { data } = await axios.patch("/update_profile", details, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // dispatch(
      //   setLoggedDeveloper({
      //     details: data.details,
      //     // eslint-disable-next-line comma-dangle
      //   })
      // );
      if (data.status) {
        const user = data.details;
        const { accessToken } = data;
        setLoading(false);
        Ctoast({
          title: 'Your account updated successfully',
          status: 'success',
          duration: 5000,
          position:"top-right",
          isClosable: true,
        })
        setLoggedDeveloper({ accessToken, user });
      } else {
        setLoading(false);
        Ctoast({
          title: 'Something went wrong',
          status: "error",
          duration: 5000,
          position:"top-right",
          isClosable: true,
        })
      }
    } catch (error) {
      navigate("/developer/login");

    }
  };

  const handleProfile = (e) => {
    if (values.image.type === "image/jpeg" || values.image.type === "image/png") {
      setValues({ ...values, image: e.target.files[0] });
    } else {
      generateError("Cant upload this image");
      setValues({ ...values, image: e.target.files[0] });
    }
  };
  return (
    <div>
      <Navbar />
      <div className="flex bg-gray-900 h-screen mt-16">
        <div className="flex flex-col md:h-full md:w-1/3">
          <img
            src={values.imgPath}
            alt="profile img"
            className="rounded-full w-44 h-44 md:ml-28 mt-20"
          />
          <input
            className="text-white md:ml-24 md:mt-5"
            type="file"
            required
            accept="image/*"
            onChange={(e) => handleProfile(e)}
          />
        </div>

        <div className="md:h-full md:w-3/4 bg-gray-900 flex flex-col">
          <div className="flex justify-center md:mt-10">
            <input
              className="p-3 mt-10 rounded-lg bg-gray-800 text-white w-96"
              type="text"
              defaultValue={values.name}
              placeholder="Your name"
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
          </div>
          <div className="flex justify-center">
            <input
              className="p-3 mt-10 rounded-lg bg-gray-800 text-white w-96"
              type="text"
              defaultValue={values.domain}
              placeholder="Your domain"
              name="domain"
              onChange={(e) => setValues({ ...values, domain: e.target.value })}
            />
          </div>
          <div className="flex justify-center">
            <input
              className="p-3 mt-10 rounded-lg bg-gray-800 text-white w-96"
              type="email"
              defaultValue={values.email}
              placeholder="Your email"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>
          <div className="flex justify-center">
            <input
              className="p-3 mt-10 rounded-lg bg-gray-800 text-white w-96"
              type="password"
              defaultValue={values.password}
              placeholder="Your password"
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
              required
            />
          </div>
          <div className="flex justify-center">
            {/* <button
              type="button"
              className=" bg-gray-900 border-1 border-slate-800 text-white font-semibold rounded-lg"
              onClick={handleChanges}
            >
              Save Changes
            </button> */}
            <div className="p-3 mt-10">
              <Button colorScheme="blue" isLoading={loading} onClick={handleChanges}>Save Changes</Button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </div>
  );
}

export default Profile;
