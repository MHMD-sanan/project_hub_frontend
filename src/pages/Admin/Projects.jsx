import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/admin";
import { AiOutlineArrowRight } from "react-icons/ai";

import {
  Button,
  Navbar,
  Sidebar,
  Footer,
  Header,
} from "../../components/Admin";

import { useStateContext } from "../../contexts/ContextProvider";
import { Badge, Spinner } from "@chakra-ui/react";

function Projects() {
  const { currentColor, activeMenu, setSelectedProject } = useStateContext();
  const [project, setProject] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const { data } = await axios.get("/get_all_projects");
      setProject(data.projects);
    };
    getData();
    setLoading(false);
  }, []);

  const viewSingleProject = async (id) => {
    setSelectedProject(id);
    navigate("/admin/view_project");
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

        <div className="h-screen">
          {loading ? (
            <div className="flex">
              <Spinner
                size="xl"
                w={28}
                h={28}
                alignSelf="center"
                margin="auto"
                color="blue.500"
              />
            </div>
          ) : (
            <div className="md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
              <div className="flex justify-between">
                <Header title="Projects" />
                <Link to="/admin/add_new_project">
                  <Button
                    color="white"
                    bgColor={currentColor}
                    text="Add New Project"
                    borderRadius="10px"
                  />
                </Link>
              </div>
              <table className="w-full text-sm text-left dark:text-gray-400">
                <thead className="text-xs uppercase text-gray-400 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="py-3">
                      <p className="text-center">Name</p>
                    </th>
                    <th scope="col" className="py-3">
                      <p className="text-center">Description</p>
                    </th>
                    <th scope="col" className="py-3">
                      <p className="text-center">Status</p>
                    </th>
                    <th scope="col" className="py-3">
                      <p className="text-center">dsdsdsd</p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {project.map((item) => (
                    <tr
                      key={item._id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="py-4 text-center">{item.name}</td>
                      <td className="py-4 text-center">{item.description}</td>
                      <td className="py-4 text-center">
                        {item.status === "not started" ? (
                          <Badge colorScheme="purple">{item.status}</Badge>
                        ) : (
                          " "
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          type="button"
                          className="bg-blue-800 text-white p-2 rounded-md"
                          onClick={() => viewSingleProject(item._id)}
                        >
                          <div className="flex">
                            <p>View More</p>
                            <AiOutlineArrowRight className="ml-2 mt-1"/>
                          </div>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <Footer />
      </div>
    </div>
  );
}
export default Projects;
