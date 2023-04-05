/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
import { Spinner } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "../../../components/Developer/Footer";
import Navbar from "../../../components/Developer/Navbar";
import { useStateContext } from "../../../contexts/ContextProvider";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { setBoard } from "../../../redux/developer/KanbanBoard";
import { setSingleProject } from "../../../redux/developer/SingleProject";

function Home() {
  const { projects, loggedDeveloper, setRole } = useStateContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(false);
  const isLogin = useSelector((state) => state.developerLogin.value);

  useEffect(() => {
    console.log(isLogin);
    if(isLogin===false) navigate("/developer/login")
  },[])

  const gotoProject = async (id, role) => {
    try {
      setLoading(true);
      setRole(role);
      dispatch(setSingleProject({ id }));
      const { data } = await axiosPrivate.post(
        "/view_singleProject",
        { id },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
          // eslint-disable-next-line comma-dangle
        }
      );
      dispatch(
        setBoard({
          board: data.kanban.boards,
          // eslint-disable-next-line comma-dangle
        })
      );
      setLoading(false);
      navigate("/developer/project");
    } catch (error) {
      navigate("/developer/login");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-between bg-gray-900 h-screen mt-16">
        {loading ? (
          <Spinner
            size="xl"
            w={28}
            h={28}
            alignSelf="center"
            margin="auto"
            color="blue.500"
          />
        ) : (
          <>
            <div className="flex justify-center h-full w-1/3">
              <div className="flex flex-col">
                <img
                  src={loggedDeveloper.user.imgPath}
                  alt="profile img"
                  className="rounded-full md:w-64 md:h-64 mt-10"
                />
                <h1 className="text-white font-semibold text-2xl mt-10 ml-4">
                  {loggedDeveloper.user.name}
                </h1>
                <h1 className="text-gray-400 ml-12">Full Stack Developer</h1>
                <Link to="/developer/profile">
                  {" "}
                  <button
                    type="button"
                    className="text-white border-1 rounded-md mt-14 border-slate-800 p-2 w-full"
                  >
                    Edit Profile
                  </button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center h-full w-2/3">
              <div className="flex flex-col md:w-3/4 md:h-3/4 mt-10 overflow-y-scroll">
                <h1 className="flex justify-center mb-10 font-bold text-white text-2xl">
                  Your Ongoing Projects
                </h1>
                {/* div for single card */}
                {projects
                  ? projects.map((item, index) => (
                      <div
                        key={index}
                        className="border-1 border-slate-800 h-fit font-semibold text-blue mb-5 pb-4 text-white rounded-md"
                      >
                        <div className="flex justify-between my-4">
                          <div>
                            <button
                              type="button"
                              onClick={() =>
                                gotoProject(item.projectId._id, item.role)
                              }
                            >
                              <h1 className="text-lg ml-3">
                                {item.projectId.name}
                              </h1>
                            </button>
                            {/* <h1 className="text-gray-400 text-sm mt-3">
              {item.update}
            </h1> */}
                          </div>
                          <h6 className="text-sm mt-4 mr-2">{item.role}</h6>
                        </div>
                      </div>
                    ))
                  : ""}
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
